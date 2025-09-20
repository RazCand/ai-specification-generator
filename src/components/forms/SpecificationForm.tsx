import React from 'react'
import { useForm } from 'react-hook-form'
import FormField from './FormField'
import CategorySelector from './CategorySelector'

interface SpecFormData {
  projectTitle: string
  category: string
  budgetRange: string
  timeline: string
  urgency: 'low' | 'medium' | 'high' | 'critical'
  keyRequirements: string
  complianceRequirements: string
  successCriteria: string
  additionalNotes: string
  contactPerson: string
  department: string
  domain: 'general' | 'mining' | 'municipal'
  strategicPriority: 'cost-optimization' | 'innovation-focus' | 'risk-mitigation' | 'capability-building' | 'strategic-partnership'
}

interface Props {
  onSubmit: (data: any) => void
  isLoading: boolean
}

const SpecificationForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SpecFormData>({
    defaultValues: {
      urgency: 'medium',
      domain: 'general',
      strategicPriority: 'cost-optimization',
      keyRequirements: '',
      complianceRequirements: '',
      successCriteria: '',
      additionalNotes: ''
    }
  })

  const budgetRange = watch('budgetRange')
  const isStrategicProcurement = budgetRange === 'over-1m' || budgetRange === '500k-1m'

  const handleFormSubmit = (data: SpecFormData) => {
    // Convert single strings to arrays for backend compatibility
    const processedData = {
      ...data,
      keyRequirements: data.keyRequirements.split('\n').filter(req => req.trim() !== ''),
      complianceRequirements: data.complianceRequirements ? data.complianceRequirements.split('\n').filter(req => req.trim() !== '') : [],
      successCriteria: data.successCriteria ? data.successCriteria.split('\n').filter(req => req.trim() !== '') : []
    }
    onSubmit(processedData)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Project Title"
            required
            error={errors.projectTitle?.message}
          >
            <input
              {...register('projectTitle', { required: 'Project title is required' })}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., IT Infrastructure Upgrade"
            />
          </FormField>

          <FormField
            label="Department"
            required
            error={errors.department?.message}
          >
            <input
              {...register('department', { required: 'Department is required' })}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Information Technology"
            />
          </FormField>
        </div>

        <CategorySelector
          register={register}
          error={errors.category?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            label="Budget Range"
            required
            error={errors.budgetRange?.message}
          >
            <select
              {...register('budgetRange', { required: 'Budget range is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select budget range</option>
              <option value="under-10k">Under $10,000</option>
              <option value="10k-50k">$10,000 - $50,000</option>
              <option value="50k-100k">$50,000 - $100,000</option>
              <option value="100k-500k">$100,000 - $500,000</option>
              <option value="500k-1m">$500,000 - $1,000,000</option>
              <option value="over-1m">Over $1,000,000</option>
            </select>
          </FormField>

          <FormField
            label="Timeline"
            required
            error={errors.timeline?.message}
          >
            <input
              {...register('timeline', { required: 'Timeline is required' })}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 6 months"
            />
          </FormField>

          <FormField
            label="Urgency Level"
            required
            error={errors.urgency?.message}
          >
            <select
              {...register('urgency')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </FormField>
        </div>

        <FormField
          label="Contact Person"
          required
          error={errors.contactPerson?.message}
        >
          <input
            {...register('contactPerson', { required: 'Contact person is required' })}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., John Smith"
          />
        </FormField>
      </div>

      {/* Strategic Intelligence Fields - Show for high-value contracts */}
      {isStrategicProcurement && (
        <div className="space-y-6 bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-medium text-blue-900 border-b border-blue-200 pb-2">
            Strategic Procurement Intelligence
            <span className="text-sm font-normal text-blue-700 ml-2">
              (Enhanced for high-value contracts)
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Domain Expertise"
              required
              error={errors.domain?.message}
              description="Select the specialized domain for enhanced AI intelligence"
            >
              <select
                {...register('domain', { required: 'Domain selection is required for strategic procurement' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="general">General Procurement</option>
                <option value="mining">Mining & Resources</option>
                <option value="municipal">Municipal & Government</option>
              </select>
            </FormField>

            <FormField
              label="Strategic Priority"
              required
              error={errors.strategicPriority?.message}
              description="Primary strategic focus for this procurement"
            >
              <select
                {...register('strategicPriority', { required: 'Strategic priority is required for strategic procurement' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="cost-optimization">Cost Optimization</option>
                <option value="innovation-focus">Innovation Focus</option>
                <option value="risk-mitigation">Risk Mitigation</option>
                <option value="capability-building">Capability Building</option>
                <option value="strategic-partnership">Strategic Partnership</option>
              </select>
            </FormField>
          </div>

          <div className="bg-blue-100 p-4 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Strategic Intelligence Features:</strong> This procurement will include enhanced AI-powered risk assessment,
              multi-dimensional evaluation frameworks, and stakeholder workflow orchestration suitable for executive oversight.
            </p>
          </div>
        </div>
      )}

      {/* Requirements */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
          Requirements
        </h3>

        <FormField
          label="Key Requirements"
          required
          error={errors.keyRequirements?.message}
          description="Enter each requirement on a new line"
        >
          <textarea
            {...register('keyRequirements', { required: 'At least one requirement is needed' })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter requirements, one per line..."
          />
        </FormField>

        <FormField
          label="Compliance Requirements"
          error={errors.complianceRequirements?.message}
          description="Enter each compliance requirement on a new line (optional)"
        >
          <textarea
            {...register('complianceRequirements')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., ISO 27001 compliance required..."
          />
        </FormField>

        <FormField
          label="Success Criteria"
          error={errors.successCriteria?.message}
          description="Enter each success criteria on a new line (optional)"
        >
          <textarea
            {...register('successCriteria')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 99.9% uptime guaranteed..."
          />
        </FormField>

        <FormField
          label="Additional Notes"
          error={errors.additionalNotes?.message}
        >
          <textarea
            {...register('additionalNotes')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any additional context or special requirements..."
          />
        </FormField>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating...
            </>
          ) : (
            'Generate Specification'
          )}
        </button>
      </div>
    </form>
  )
}

export default SpecificationForm