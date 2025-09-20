export interface SpecificationFormData {
  projectTitle: string
  category: ProcurementCategory
  budgetRange: BudgetRange
  timeline: string
  urgency: UrgencyLevel
  keyRequirements: string[]
  complianceRequirements?: string[]
  successCriteria?: string[]
  additionalNotes?: string
  contactPerson: string
  department: string
  domain?: DomainType
  strategicPriority?: StrategicPriority
}

export type ProcurementCategory = 
  | 'it-services'
  | 'consulting'
  | 'construction'
  | 'supplies'
  | 'maintenance'
  | 'professional-services'
  | 'equipment'
  | 'software'
  | 'training'

export type BudgetRange = 
  | 'under-10k'
  | '10k-50k'
  | '50k-100k'
  | '100k-500k'
  | '500k-1m'
  | 'over-1m'

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical'

export type DomainType = 'general' | 'mining' | 'municipal'

export type StrategicPriority =
  | 'cost-optimization'
  | 'innovation-focus'
  | 'risk-mitigation'
  | 'capability-building'
  | 'strategic-partnership'

export interface GeneratedSpecification {
  id: string
  formData: SpecificationFormData
  content: {
    executiveSummary: string
    scope: string
    requirements: string
    technicalSpecs: string
    compliance: string
    evaluation: string
    timeline: string
    budget: string
  }
  riskAssessment?: any // Will be populated by risk assessment service
  evaluationFramework?: any // Will be populated by evaluation service
  workflowStatus?: 'draft' | 'review' | 'approved' | 'active' | 'completed'
  generatedAt: Date
  version: number
}