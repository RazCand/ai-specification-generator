// Multi-Dimensional Evaluation Framework Types
export interface EvaluationCriteria {
  id: string
  name: string
  weight: number // 0-100, total should equal 100
  type: 'technical' | 'commercial' | 'risk' | 'strategic'
  scoringMethod: 'weighted' | 'pass-fail' | 'ranked' | 'threshold'
  description: string
  subCriteria?: SubCriteria[]
}

export interface SubCriteria {
  id: string
  name: string
  weight: number
  scoringScale: ScoringScale
  minimumThreshold?: number
}

export interface ScoringScale {
  type: 'numeric' | 'descriptive'
  range: [number, number] // e.g., [0, 10] or [1, 5]
  descriptors?: {
    score: number
    label: string
    description: string
  }[]
}

export interface EvaluationFramework {
  id: string
  specificationId: string
  name: string
  criteria: EvaluationCriteria[]
  totalWeight: number
  riskWeighting: RiskWeighting
  strategicAlignment: StrategicAlignment
  createdAt: Date
  updatedAt: Date
}

export interface RiskWeighting {
  financial: number // Impact on budget/cost overruns
  operational: number // Service delivery/performance risk
  reputational: number // Public/stakeholder perception
  compliance: number // Regulatory/legal risk
  technical: number // Implementation/integration risk
}

export interface StrategicAlignment {
  organizationalPriorities: number
  longTermValue: number
  stakeholderImpact: number
  innovationPotential: number
  sustainability: number
}

// Vendor evaluation types
export interface VendorEvaluation {
  id: string
  frameworkId: string
  vendorId: string
  scores: CriteriaScore[]
  totalScore: number
  riskScore: number
  strategicScore: number
  recommendation: 'recommended' | 'acceptable' | 'not-recommended'
  evaluatedBy: string
  evaluatedAt: Date
  notes?: string
}

export interface CriteriaScore {
  criteriaId: string
  score: number
  justification: string
  evidence?: string[]
  subScores?: {
    subCriteriaId: string
    score: number
    notes?: string
  }[]
}

// Pre-configured evaluation templates for strategic procurement
export interface EvaluationTemplate {
  id: string
  name: string
  category: string // matches ProcurementCategory
  contractValue: string // matches BudgetRange
  criteria: EvaluationCriteria[]
  description: string
  recommendedFor: string[]
}