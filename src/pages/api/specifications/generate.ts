import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { generateSpecificationContent } from '@/services/aiService'
import { riskAssessmentService } from '@/services/riskAssessmentService'
import { validateSpecificationInput } from '@/utils/validation'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    console.log('Request body received:', JSON.stringify(req.body, null, 2))
    
    // Validate input
    const validation = validateSpecificationInput(req.body)
    
    console.log('Validation result:', validation)
    
    if (!validation.success) {
      console.log('Validation failed with errors:', validation.errors)
      return res.status(400).json({
        error: 'Validation failed',
        details: validation.errors
      })
    }

    const formData = validation.data

    console.log('Generating strategic specification with enhanced AI service...')

    // Generate AI content with enhanced strategic intelligence
    const aiResult = await generateSpecificationContent(formData)

    // Extract specification content and metadata
    const aiContent = aiResult.specification || aiResult
    const isStrategic = aiResult.isStrategic || false
    const requiresRiskAssessment = aiResult.requiresRiskAssessment || false

    let riskAssessment = null

    // Generate risk assessment for strategic procurements
    if (requiresRiskAssessment) {
      console.log('Generating risk assessment for strategic procurement...')
      try {
        riskAssessment = await riskAssessmentService.generateRiskAssessment(
          'temp-id', // Will be updated after saving
          formData,
          aiContent
        )
        console.log('Risk assessment generated successfully')
      } catch (riskError) {
        console.error('Risk assessment generation failed:', riskError)
        // Continue without risk assessment rather than failing the whole request
      }
    }

    // Save to database with enhanced metadata
    const specification = await prisma.specification.create({
      data: {
        title: formData.projectTitle,
        category: formData.category,
        formData: formData as any,
        content: aiContent as any,
        status: isStrategic ? 'strategic-review' : 'generated'
      }
    })

    // Update risk assessment with correct specification ID
    if (riskAssessment) {
      riskAssessment.specificationId = specification.id
    }

    console.log(`${isStrategic ? 'Strategic' : 'Standard'} specification generated successfully`)

    // Return enhanced response
    res.status(200).json({
      id: specification.id,
      formData,
      content: aiContent,
      isStrategic,
      riskAssessment,
      generatedAt: specification.createdAt,
      version: specification.version,
      metadata: {
        domain: formData.domain || 'general',
        strategicPriority: formData.strategicPriority,
        enhancedFeatures: isStrategic
      }
    })

  } catch (error) {
    console.error('Error generating specification:', error)
    res.status(500).json({ 
      error: 'Failed to generate specification',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}