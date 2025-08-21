import React from 'react'

interface Props {
  label: string
  children: React.ReactNode
  required?: boolean
  error?: string
  description?: string
}

const FormField: React.FC<Props> = ({ label, children, required, error, description }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
      {children}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default FormField