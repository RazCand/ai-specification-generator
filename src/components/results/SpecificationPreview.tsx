import React, { useState } from 'react'
import { Download, FileText, RefreshCw, CheckCircle, Edit3, Shield, AlertTriangle, TrendingUp } from 'lucide-react'
import { GeneratedSpecification } from '@/types'
import ExportOptions from './ExportOptions'

interface Props {
  specification: GeneratedSpecification & {
    isStrategic?: boolean
    riskAssessment?: any
    metadata?: {
      domain?: string
      strategicPriority?: string
      enhancedFeatures?: boolean
    }
  }
  onStartOver: () => void
}

const SpecificationPreview: React.FC<Props> = ({ specification, onStartOver }) => {
  const [showExportOptions, setShowExportOptions] = useState(false)
  const [activeSection, setActiveSection] = useState('executive-summary')

  const isStrategic = specification.isStrategic || false
  const hasRiskAssessment = specification.riskAssessment != null

  const sections = [
    { id: 'executive-summary', title: 'Executive Summary', content: specification.content.executiveSummary },
    { id: 'scope', title: 'Project Scope', content: specification.content.scope },
    { id: 'requirements', title: 'Requirements', content: specification.content.requirements },
    { id: 'technical-specs', title: 'Technical Specifications', content: specification.content.technicalSpecs },
    { id: 'compliance', title: 'Compliance & Standards', content: specification.content.compliance },
    { id: 'evaluation', title: 'Evaluation Criteria', content: specification.content.evaluation },
    { id: 'timeline', title: 'Timeline & Milestones', content: specification.content.timeline },
    { id: 'budget', title: 'Budget Considerations', content: specification.content.budget }
  ]

  // Add risk assessment section for strategic procurements
  if (hasRiskAssessment) {
    sections.push({
      id: 'risk-assessment',
      title: 'Risk Assessment',
      content: formatRiskAssessment(specification.riskAssessment)
    })
  }

  function formatRiskAssessment(riskAssessment: any): string {
    if (!riskAssessment) return 'Risk assessment not available'

    return `
<div class="risk-assessment">
  <div class="risk-overview">
    <h4>Overall Risk Level: <span class="risk-${riskAssessment.riskLevel}">${riskAssessment.riskLevel.toUpperCase()}</span></h4>
    <p><strong>Risk Score:</strong> ${riskAssessment.overallRiskScore}/100</p>
  </div>

  <div class="risk-categories">
    <h4>Risk Categories:</h4>
    ${riskAssessment.categories?.map((cat: any) => `
      <div class="risk-category">
        <h5>${cat.type.charAt(0).toUpperCase() + cat.type.slice(1)} Risk (${cat.score}/100)</h5>
        <p><strong>Impact:</strong> ${cat.impact} | <strong>Probability:</strong> ${cat.probability}</p>
        ${cat.factors?.map((factor: any) => `
          <p>• ${factor.name}: ${factor.description}</p>
        `).join('') || ''}
      </div>
    `).join('') || ''}
  </div>

  <div class="mitigation-strategies">
    <h4>Recommended Mitigation Strategies:</h4>
    ${riskAssessment.mitigationStrategies?.map((strategy: any) => `
      <p>• ${strategy.strategy}</p>
    `).join('') || ''}
  </div>
</div>
    `
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">
            {isStrategic ? 'Strategic Specification Generated!' : 'Specification Generated Successfully!'}
          </h1>
          {isStrategic && (
            <Shield className="w-8 h-8 text-blue-500 ml-3" />
          )}
        </div>
        <p className="text-lg text-gray-600">
          {isStrategic
            ? 'Strategic procurement specification with enhanced intelligence and risk assessment'
            : 'Review your procurement specification and export when ready'
          }
        </p>

        {/* Strategic Features Badge */}
        {isStrategic && (
          <div className="mt-4 flex justify-center space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <TrendingUp className="w-4 h-4 mr-1" />
              Strategic Intelligence
            </span>
            {hasRiskAssessment && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Risk Assessment
              </span>
            )}
            {specification.metadata?.domain && specification.metadata.domain !== 'general' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {specification.metadata.domain.charAt(0).toUpperCase() + specification.metadata.domain.slice(1)} Domain
              </span>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Sections</h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <button
                onClick={() => setShowExportOptions(true)}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              
              <button
                onClick={onStartOver}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Start Over
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {specification.formData.projectTitle}
                  </h2>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <span>Department: {specification.formData.department}</span>
                    <span>•</span>
                    <span>Category: {specification.formData.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    <span>•</span>
                    <span>Budget: {specification.formData.budgetRange}</span>
                    {specification.metadata?.domain && specification.metadata.domain !== 'general' && (
                      <>
                        <span>•</span>
                        <span>Domain: {specification.metadata.domain.charAt(0).toUpperCase() + specification.metadata.domain.slice(1)}</span>
                      </>
                    )}
                    <span>•</span>
                    <span>Generated: {new Date(specification.generatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Version {specification.version}
                  </span>
                  {isStrategic && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Strategic
                    </span>
                  )}
                  {hasRiskAssessment && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Risk Assessed
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={`${activeSection === section.id ? 'block' : 'hidden'}`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {section.title}
                    </h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="prose max-w-none">
                    <div 
                      className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportOptions && (
        <ExportOptions
          specification={specification}
          onClose={() => setShowExportOptions(false)}
        />
      )}
    </div>
  )
}

export default SpecificationPreview