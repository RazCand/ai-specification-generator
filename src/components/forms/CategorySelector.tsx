import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import { Monitor, Users, Building, Package, Wrench, GraduationCap, Server, Code, BookOpen } from 'lucide-react'

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
}

interface Props {
  register: UseFormRegister<SpecFormData>
  error?: string
}

const categories = [
  { value: 'it-services', label: 'IT Services', icon: Monitor, description: 'Software development, system integration, IT support' },
  { value: 'consulting', label: 'Consulting', icon: Users, description: 'Professional advisory services, strategy consulting' },
  { value: 'construction', label: 'Construction', icon: Building, description: 'Building works, infrastructure, civil engineering' },
  { value: 'supplies', label: 'Supplies', icon: Package, description: 'Office supplies, materials, equipment procurement' },
  { value: 'maintenance', label: 'Maintenance', icon: Wrench, description: 'Facility maintenance, equipment servicing' },
  { value: 'professional-services', label: 'Professional Services', icon: GraduationCap, description: 'Legal, accounting, HR services' },
  { value: 'equipment', label: 'Equipment', icon: Server, description: 'Machinery, vehicles, technical equipment' },
  { value: 'software', label: 'Software', icon: Code, description: 'Software licenses, applications, platforms' },
  { value: 'training', label: 'Training', icon: BookOpen, description: 'Staff training, education services' }
]

const CategorySelector: React.FC<Props> = ({ register, error }) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Procurement Category <span className="text-red-500">*</span>
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <label
              key={category.value}
              className="relative flex cursor-pointer rounded-lg border border-gray-300 p-4 focus-within:ring-2 focus-within:ring-blue-500 hover:bg-gray-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50"
            >
              <input
                {...register('category', { required: 'Please select a category' })}
                type="radio"
                value={category.value}
                className="absolute top-2 right-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mr-3 flex-shrink-0">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">
                    {category.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {category.description}
                  </div>
                </div>
              </div>
            </label>
          )
        })}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default CategorySelector