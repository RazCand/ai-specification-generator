import React, { useState } from 'react'
import { Download, FileText, RefreshCw, CheckCircle, Edit3 } from 'lucide-react'
import { GeneratedSpecification } from '@/types'
import ExportOptions from './ExportOptions'

interface Props {
  specification: GeneratedSpecification
  onStartOver: () => void
}

const SpecificationPreview: React.FC<Props> = ({ specification, onStartOver }) => {
  const [showExportOptions, setShowExportOptions] = useState(false)
  const [activeSection, setActiveSection] = useState('executive-summary')

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

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">
            Specification Generated Successfully!
          </h1>
        </div>
        <p className="text-lg text-gray-600">
          Review your procurement specification and export when ready
        </p>
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
                    <span>Generated: {new Date(specification.generatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Version {specification.version}
                  </span>
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