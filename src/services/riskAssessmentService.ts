import { RiskAssessment, RiskCategory, RiskFactor, MitigationStrategy, RiskType } from '@/types/risk'
import { SpecificationFormData } from '@/types'
import openai from '@/lib/openai'

export class RiskAssessmentService {

  async generateRiskAssessment(
    specificationId: string,
    formData: SpecificationFormData,
    generatedContent: any
  ): Promise<RiskAssessment> {

    const riskPrompt = this.buildRiskAssessmentPrompt(formData, generatedContent)

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a strategic risk assessment specialist for complex procurement contracts.
          Analyze procurement specifications and identify potential risks across financial, operational,
          technical, compliance, market, supplier, reputational, environmental, and political dimensions.

          Return your assessment as a structured JSON object with risk categories, scores (0-100),
          impact levels, probability assessments, and specific risk factors with evidence.`
        },
        {
          role: 'user',
          content: riskPrompt
        }
      ],
      max_tokens: 3000,
      temperature: 0.2
    })

    const aiResponse = response.choices[0].message.content
    return this.parseRiskAssessment(specificationId, aiResponse || '')
  }

  private buildRiskAssessmentPrompt(formData: SpecificationFormData, content: any): string {
    return `
PROCUREMENT RISK ASSESSMENT REQUEST

Project Details:
- Title: ${formData.projectTitle}
- Category: ${formData.category}
- Budget Range: ${formData.budgetRange}
- Timeline: ${formData.timeline}
- Urgency: ${formData.urgency}
- Department: ${formData.department}

Key Requirements:
${formData.keyRequirements.map(req => `- ${req}`).join('\n')}

${formData.complianceRequirements?.length ? `
Compliance Requirements:
${formData.complianceRequirements.map(req => `- ${req}`).join('\n')}
` : ''}

Generated Specification Scope:
${content.scope}

Technical Specifications:
${content.technicalSpecs}

Please assess risks across these categories:
1. FINANCIAL: Budget overruns, cost escalation, hidden costs
2. OPERATIONAL: Service delivery, performance, business disruption
3. TECHNICAL: Implementation complexity, integration risks, obsolescence
4. COMPLIANCE: Regulatory, legal, standards adherence
5. MARKET: Supplier availability, competition, pricing volatility
6. SUPPLIER: Vendor capability, financial stability, performance history
7. REPUTATIONAL: Public perception, stakeholder confidence, media attention
8. ENVIRONMENTAL: Sustainability, environmental impact, climate risks
9. POLITICAL: Policy changes, political stability, public scrutiny

For each category, provide:
- Risk score (0-100)
- Impact level (low/medium/high/critical)
- Probability (unlikely/possible/likely/certain)
- 3-5 specific risk factors with descriptions
- Evidence sources or reasoning

Format as JSON with this structure:
{
  "overallRiskScore": number,
  "riskLevel": "low|medium|high|critical",
  "categories": [
    {
      "type": "financial",
      "score": number,
      "impact": "low|medium|high|critical",
      "probability": "unlikely|possible|likely|certain",
      "factors": [
        {
          "name": "string",
          "description": "string",
          "severity": number (1-10),
          "likelihood": number (1-10),
          "evidenceSource": "string"
        }
      ]
    }
  ]
}
`
  }

  private parseRiskAssessment(specificationId: string, aiResponse: string): RiskAssessment {
    try {
      // Extract JSON from AI response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response')
      }

      const parsed = JSON.parse(jsonMatch[0])

      return {
        id: this.generateId(),
        specificationId,
        overallRiskScore: parsed.overallRiskScore || 50,
        riskLevel: parsed.riskLevel || 'medium',
        categories: this.processRiskCategories(parsed.categories || []),
        mitigationStrategies: this.generateMitigationStrategies(parsed.categories || []),
        assessedAt: new Date(),
        assessedBy: 'AI Risk Engine',
        reviewDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      }
    } catch (error) {
      console.error('Risk assessment parsing error:', error)
      return this.createFallbackAssessment(specificationId)
    }
  }

  private processRiskCategories(categories: any[]): RiskCategory[] {
    return categories.map(cat => ({
      type: cat.type as RiskType,
      score: cat.score || 50,
      impact: cat.impact || 'medium',
      probability: cat.probability || 'possible',
      factors: (cat.factors || []).map((factor: any) => ({
        id: this.generateId(),
        name: factor.name || 'Unnamed Risk Factor',
        description: factor.description || 'No description provided',
        severity: factor.severity || 5,
        likelihood: factor.likelihood || 5,
        evidenceSource: factor.evidenceSource || 'AI Analysis',
        category: cat.type as RiskType
      }))
    }))
  }

  private generateMitigationStrategies(categories: any[]): MitigationStrategy[] {
    const strategies: MitigationStrategy[] = []

    categories.forEach(category => {
      if (category.score > 60) { // High risk categories need mitigation
        category.factors?.forEach((factor: any) => {
          strategies.push({
            id: this.generateId(),
            riskFactorId: this.generateId(), // In real implementation, would match factor IDs
            strategy: this.generateMitigationStrategy(category.type, factor.name),
            responsibleParty: 'Project Manager',
            timeframe: 'During procurement phase',
            cost: 0, // To be estimated
            effectiveness: 7, // Default effectiveness
            status: 'planned'
          })
        })
      }
    })

    return strategies
  }

  private generateMitigationStrategy(riskType: string, factorName: string): string {
    const strategies = {
      financial: 'Implement robust budget monitoring, require detailed cost breakdowns, include price escalation clauses',
      operational: 'Establish clear SLAs, implement performance monitoring, develop contingency plans',
      technical: 'Conduct technical due diligence, require proof of concept, plan phased implementation',
      compliance: 'Engage legal experts, conduct compliance audits, implement monitoring systems',
      market: 'Conduct market analysis, engage multiple suppliers, develop backup options',
      supplier: 'Perform vendor due diligence, require financial guarantees, implement performance bonds',
      reputational: 'Develop communication strategy, engage stakeholders early, implement transparency measures',
      environmental: 'Conduct environmental impact assessment, require sustainability certifications',
      political: 'Engage government relations, monitor policy changes, develop advocacy strategy'
    }

    return strategies[riskType as keyof typeof strategies] || 'Develop specific risk mitigation plan'
  }

  private createFallbackAssessment(specificationId: string): RiskAssessment {
    return {
      id: this.generateId(),
      specificationId,
      overallRiskScore: 50,
      riskLevel: 'medium',
      categories: [],
      mitigationStrategies: [],
      assessedAt: new Date(),
      assessedBy: 'AI Risk Engine (Fallback)',
      reviewDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }
}

export const riskAssessmentService = new RiskAssessmentService()