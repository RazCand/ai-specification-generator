import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { generateSpecificationContent } from '@/services/aiService'
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

    // Generate AI content
    const aiContent = await generateSpecificationContent(formData)
    
    // Save to database
    const specification = await prisma.specification.create({
      data: {
        title: formData.projectTitle,
        category: formData.category,
        formData: formData as any,
        content: aiContent as any,
        status: 'generated'
      }
    })

    // Return response
    res.status(200).json({
      id: specification.id,
      formData,
      content: aiContent,
      generatedAt: specification.createdAt,
      version: specification.version
    })

  } catch (error) {
    console.error('Error generating specification:', error)
    res.status(500).json({ 
      error: 'Failed to generate specification',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}