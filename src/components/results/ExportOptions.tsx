import React, { useState } from 'react'
import { X, Download, Mail, Link } from 'lucide-react'
import { GeneratedSpecification } from '@/types'
import toast from 'react-hot-toast'

interface Props {
  specification: GeneratedSpecification
  onClose: () => void
}

const ExportOptions: React.FC<Props> = ({ specification, onClose }) => {
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState<'pdf' | 'word' | 'html'>('pdf')

  const handleExport = async () => {
    setIsExporting(true)
    try {
      // Simple download as text for now - can be enhanced later
      const content = `
PROCUREMENT SPECIFICATION
${specification.formData.projectTitle}

Generated: ${new Date(specification.generatedAt).toLocaleDateString()}
Department: ${specification.formData.department}
Category: ${specification.formData.category}

EXECUTIVE SUMMARY
${specification.content.executiveSummary}

PROJECT SCOPE
${specification.content.scope}

REQUIREMENTS
${specification.content.requirements}

TECHNICAL SPECIFICATIONS
${specification.content.technicalSpecs}

COMPLIANCE & STANDARDS
${specification.content.compliance}

EVALUATION CRITERIA
${specification.content.evaluation}

TIMELINE & MILESTONES
${specification.content.timeline}

BUDGET CONSIDERATIONS
${specification.content.budget}
      `
      
      const blob = new Blob([content], { type: 'text/plain' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${specification.formData.projectTitle.replace(/[^a-z0-9]/gi, '_')}_specification.txt`
      link.click()
      window.URL.revokeObjectURL(url)
      
      toast.success('Specification exported successfully!')
      onClose()
    } catch (error) {
      toast.error('Failed to export specification')
    } finally {
      setIsExporting(false)
    }
  }

  const copyShareLink = () => {
    const shareUrl = `${window.location.origin}/specification/${specification.id}`
    navigator.clipboard.writeText(shareUrl)
    toast.success('Share link copied to clipboard!')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">Export Specification</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Export Format
            </label>
            <div className="space-y-3">
              {[
                { value: 'pdf', label: 'PDF Document', description: 'Best for sharing and printing' },
                { value: 'word', label: 'Word Document', description: 'Editable format for modifications' },
                { value: 'html', label: 'HTML Web Page', description: 'For web viewing and embedding' }
              ].map((format) => (
                <label
                  key={format.value}
                  className="flex items-start cursor-pointer"
                >
                  <input
                    type="radio"
                    name="format"
                    value={format.value}
                    checked={exportFormat === format.value}
                    onChange={(e) => setExportFormat(e.target.value as any)}
                    className="mt-1 mr-3"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {format.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-3">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download {exportFormat.toUpperCase()}
                </>
              )}
            </button>

            <button
              onClick={copyShareLink}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50"
            >
              <Link className="w-4 h-4 mr-2" />
              Copy Share Link
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExportOptions