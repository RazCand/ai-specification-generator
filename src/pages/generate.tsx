import { useState } from 'react'
import Head from 'next/head'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import Layout from '@/components/common/Layout'
import SpecificationForm from '@/components/forms/SpecificationForm'
import SpecificationPreview from '@/components/results/SpecificationPreview'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { generateSpecification } from '@/services/specificationService'
import { SpecificationFormData, GeneratedSpecification } from '@/types'

export default function Generate() {
  const [generatedSpec, setGeneratedSpec] = useState<GeneratedSpecification | null>(null)
  const [activeStep, setActiveStep] = useState(1)

  const mutation = useMutation({
    mutationFn: generateSpecification,
    onSuccess: (data) => {
      setGeneratedSpec(data)
      setActiveStep(2)
      toast.success('Specification generated successfully!')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to generate specification')
    }
  })

  const handleFormSubmit = (data: SpecificationFormData) => {
    mutation.mutate(data)
  }

  const handleStartOver = () => {
    setGeneratedSpec(null)
    setActiveStep(1)
  }

  return (
    <>
      <Head>
        <title>Generate Specification - AI Spec Generator</title>
        <meta name="description" content="Generate professional procurement specifications using AI" />
      </Head>
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    activeStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    1
                  </div>
                  <span className="text-sm font-medium text-gray-900">Input Requirements</span>
                  
                  <div className={`w-12 h-0.5 ${activeStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
                  
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    activeStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    2
                  </div>
                  <span className="text-sm font-medium text-gray-900">Review & Export</span>
                </div>
              </div>
            </div>

            {/* Content */}
            {activeStep === 1 && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Generate Procurement Specification
                  </h1>
                  <p className="text-lg text-gray-600">
                    Provide basic details and let AI create a comprehensive specification document
                  </p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-8">
                  <SpecificationForm onSubmit={handleFormSubmit} isLoading={mutation.isPending} />
                  
                  {mutation.isPending && (
                    <div className="mt-8 flex justify-center">
                      <LoadingSpinner message="Generating your specification..." />
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeStep === 2 && generatedSpec && (
              <SpecificationPreview 
                specification={generatedSpec}
                onStartOver={handleStartOver}
              />
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}