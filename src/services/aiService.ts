import openai from '@/lib/openai'
import { getPromptForCategory } from '@/utils/prompts'

interface FormData {
  projectTitle: string
  category: string
  budgetRange: string
  timeline: string
  urgency: string
  keyRequirements: string[]
  complianceRequirements?: string[]
  successCriteria?: string[]
  additionalNotes?: string
  contactPerson: string
  department: string
}

export async function generateSpecificationContent(formData: FormData) {
  try {
    console.log('Form data received for:', formData.projectTitle)
    
    const basePrompt = buildBasePrompt(formData)
    const categoryPrompt = getPromptForCategory(formData.category)
    
    const fullPrompt = `${basePrompt}\n\n${categoryPrompt}\n\nPlease generate a comprehensive procurement specification with the following sections:
    1. Executive Summary
    2. Project Scope
    3. Requirements
    4. Technical Specifications
    5. Compliance & Standards
    6. Evaluation Criteria
    7. Timeline & Milestones
    8. Budget Considerations

    Format the response as a structured document suitable for Australian council procurement processes.`

    console.log('About to call OpenAI')

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert procurement specialist for Australian local councils. Generate professional, comprehensive procurement specifications that comply with Australian government procurement standards and best practices.'
        },
        {
          role: 'user',
          content: fullPrompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.3
    })

    const generatedContent = response.choices[0].message.content
    console.log('OpenAI response received, length:', generatedContent?.length)
    console.log('First 500 chars:', generatedContent?.substring(0, 500))

    try {
      const parsed = parseSpecificationContent(generatedContent || '')
      console.log('Parsing completed successfully')
      return parsed
    } catch (parseError) {
      console.error('Parsing error:', parseError)
      throw parseError
    }

  } catch (error) {
    console.error('AI service error:', error)
    throw new Error('Failed to generate specification content')
  }
}

function buildBasePrompt(formData: FormData): string {
  const keyReqs = Array.isArray(formData.keyRequirements) 
    ? formData.keyRequirements 
    : [formData.keyRequirements]
    
  return `
Project Title: ${formData.projectTitle}
Department: ${formData.department}
Category: ${formData.category}
Budget Range: ${formData.budgetRange}
Timeline: ${formData.timeline}
Urgency: ${formData.urgency}
Contact Person: ${formData.contactPerson}

Key Requirements:
${keyReqs.map(req => `- ${req}`).join('\n')}

${formData.complianceRequirements && formData.complianceRequirements.length > 0 ? `
Compliance Requirements:
${formData.complianceRequirements.map(req => `- ${req}`).join('\n')}
` : ''}

${formData.successCriteria && formData.successCriteria.length > 0 ? `
Success Criteria:
${formData.successCriteria.map(criteria => `- ${criteria}`).join('\n')}
` : ''}

${formData.additionalNotes ? `
Additional Notes: ${formData.additionalNotes}
` : ''}
  `
}

function parseSpecificationContent(content: string) {
  const sections = {
    executiveSummary: extractSection(content, 'Executive Summary'),
    scope: extractSection(content, 'Project Scope'),
    requirements: extractSection(content, 'Requirements'),
    technicalSpecs: extractSection(content, 'Technical Specifications'),
    compliance: extractSection(content, 'Compliance & Standards'),
    evaluation: extractSection(content, 'Evaluation Criteria'),
    timeline: extractSection(content, 'Timeline & Milestones'),
    budget: extractSection(content, 'Budget Considerations')
  }

  return sections
}

function extractSection(content: string, sectionTitle: string): string {
  // Try multiple patterns to handle different GPT formatting
  const patterns = [
    // "**1. Executive Summary:**" (markdown bold with number)
    new RegExp(`\\*\\*\\d*\\.?\\s*${sectionTitle}:?\\*\\*([\\s\\S]*?)(?=\\*\\*\\d+\\.|\\*\\*[A-Z][\\w\\s&]+:|$)`, 'i'),
    // "1. Executive Summary" or just "Executive Summary"
    new RegExp(`(?:^|\\n)\\d*\\.?\\s*${sectionTitle}:?([\\s\\S]*?)(?=\\n\\d+\\.|\\n[A-Z][\\w\\s&]+:|$)`, 'i'),
    // "## Executive Summary" (markdown headers)
    new RegExp(`#+\\s*${sectionTitle}([\\s\\S]*?)(?=\\n#+|$)`, 'i')
  ]
  
  for (const pattern of patterns) {
    const match = content.match(pattern)
    if (match && match[1]) {
      let result = match[1].trim()
      
      if (result.length > 50) { // Only return if we got substantial content
        return result
      }
    }
  }
  
  return `Content for ${sectionTitle} section would be generated here based on the provided requirements.`
}