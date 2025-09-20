import openai from '@/lib/openai'
import { getPromptForCategory } from '@/utils/prompts'
import { getEnhancedPromptForCategory } from '@/utils/domainPrompts'
import { riskAssessmentService } from './riskAssessmentService'

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
  domain?: 'general' | 'mining' | 'municipal'
  strategicPriority?: string
}

export async function generateSpecificationContent(formData: FormData) {
  try {
    console.log('Strategic specification generation for:', formData.projectTitle)
    console.log('Domain:', formData.domain, 'Priority:', formData.strategicPriority)

    const basePrompt = buildBasePrompt(formData)

    // Use enhanced prompts with domain knowledge
    const domain = formData.domain || 'general'
    const categoryPrompt = getEnhancedPromptForCategory(
      formData.category,
      domain,
      formData.budgetRange,
      formData.urgency
    )

    const strategicContext = getStrategicContext(formData)

    const fullPrompt = `${basePrompt}\n\n${categoryPrompt}\n\n${strategicContext}\n\nPlease generate a comprehensive strategic procurement specification with the following sections:
    1. Executive Summary (emphasize strategic value and risk considerations)
    2. Project Scope (include stakeholder impact analysis)
    3. Requirements (prioritize by strategic importance)
    4. Technical Specifications (include future-proofing considerations)
    5. Compliance & Standards (emphasize risk mitigation)
    6. Evaluation Criteria (include strategic alignment metrics)
    7. Timeline & Milestones (include risk-based contingencies)
    8. Budget Considerations (include total cost of ownership and strategic value)

    Format the response as a structured document suitable for strategic procurement processes requiring executive oversight.`

    console.log('About to call OpenAI for strategic specification generation')

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a strategic procurement intelligence specialist for complex, high-value contracts.
          Generate professional, comprehensive procurement specifications that integrate strategic thinking,
          risk management, and stakeholder considerations. Focus on contracts valued at $1M+ that require
          executive oversight and long-term strategic thinking.`
        },
        {
          role: 'user',
          content: fullPrompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.2
    })

    const generatedContent = response.choices[0].message.content
    console.log('Strategic specification generated, length:', generatedContent?.length)

    const parsed = parseSpecificationContent(generatedContent || '')
    console.log('Strategic specification parsing completed')

    return {
      specification: parsed,
      isStrategic: isStrategicProcurement(formData),
      requiresRiskAssessment: shouldGenerateRiskAssessment(formData),
      domain: formData.domain || 'general'
    }

  } catch (error) {
    console.error('Strategic AI service error:', error)
    throw new Error('Failed to generate strategic specification content')
  }
}

function getStrategicContext(formData: FormData): string {
  if (!isStrategicProcurement(formData)) return ''

  return `
STRATEGIC PROCUREMENT INTELLIGENCE CONTEXT:
This is a strategic procurement requiring enhanced governance and risk management.

Strategic Priority: ${formData.strategicPriority || 'Not specified'}
Domain Expertise: ${formData.domain || 'General'}
Budget Classification: ${formData.budgetRange}
Urgency Level: ${formData.urgency}

Additional Strategic Considerations:
- This procurement may impact multiple stakeholders and requires comprehensive communication planning
- Consider long-term strategic relationships and vendor partnership potential
- Implement comprehensive risk assessment and mitigation planning
- Plan for performance monitoring and strategic value measurement
- Consider innovation opportunities and capability development potential
- Ensure compliance with strategic procurement governance requirements
`
}

function isStrategicProcurement(formData: FormData): boolean {
  return formData.budgetRange === 'over-1m' ||
         formData.budgetRange === '500k-1m' ||
         formData.urgency === 'critical'
}

function shouldGenerateRiskAssessment(formData: FormData): boolean {
  return isStrategicProcurement(formData)
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