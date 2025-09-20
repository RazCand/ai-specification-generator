// Strategic Risk Intelligence Types
export interface RiskAssessment {
  id: string
  specificationId: string
  overallRiskScore: number // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  categories: RiskCategory[]
  mitigationStrategies: MitigationStrategy[]
  assessedAt: Date
  assessedBy: string
  reviewDate: Date
}

export interface RiskCategory {
  type: RiskType
  score: number // 0-100
  impact: 'low' | 'medium' | 'high' | 'critical'
  probability: 'unlikely' | 'possible' | 'likely' | 'certain'
  factors: RiskFactor[]
}

export type RiskType =
  | 'financial'
  | 'operational'
  | 'technical'
  | 'compliance'
  | 'market'
  | 'supplier'
  | 'reputational'
  | 'environmental'
  | 'political'

export interface RiskFactor {
  id: string
  name: string
  description: string
  severity: number // 1-10
  likelihood: number // 1-10
  evidenceSource: string
  category: RiskType
}

export interface MitigationStrategy {
  id: string
  riskFactorId: string
  strategy: string
  responsibleParty: string
  timeframe: string
  cost: number
  effectiveness: number // 1-10
  status: 'planned' | 'implementing' | 'completed' | 'monitoring'
}

// Market Intelligence
export interface MarketIntelligence {
  id: string
  category: string
  region: string
  supplierCount: number
  averageContractValue: number
  marketConcentration: 'fragmented' | 'concentrated' | 'monopolistic'
  competitionLevel: 'high' | 'medium' | 'low'
  priceTrend: 'increasing' | 'stable' | 'decreasing'
  innovationRate: 'high' | 'medium' | 'low'
  riskFactors: string[]
  opportunities: string[]
  lastUpdated: Date
}

export interface SupplierIntelligence {
  supplierId: string
  name: string
  category: string[]
  capabilities: string[]
  capacity: 'low' | 'medium' | 'high'
  financialStability: number // 0-100
  performanceHistory: PerformanceRecord[]
  riskFlags: RiskFlag[]
  certifications: string[]
  geographicCoverage: string[]
  lastAssessed: Date
}

export interface PerformanceRecord {
  contractId: string
  projectName: string
  value: number
  outcome: 'successful' | 'acceptable' | 'problematic' | 'failed'
  onTime: boolean
  onBudget: boolean
  qualityScore: number // 0-100
  clientSatisfaction: number // 0-100
  completedDate: Date
}

export interface RiskFlag {
  type: 'financial' | 'operational' | 'compliance' | 'performance'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  dateIdentified: Date
  status: 'active' | 'resolved' | 'monitoring'
}

// Predictive Analytics
export interface ProcurementPrediction {
  id: string
  specificationId: string
  predictions: {
    budgetVariance: {
      predicted: number
      confidence: number
      factors: string[]
    }
    timelineVariance: {
      predicted: number // days
      confidence: number
      factors: string[]
    }
    successProbability: {
      score: number // 0-100
      keyFactors: string[]
    }
    recommendedActions: string[]
  }
  modelVersion: string
  generatedAt: Date
}

// Domain-specific risk frameworks
export interface MiningRiskFramework {
  environmentalCompliance: number
  safetyRegulations: number
  communityRelations: number
  resourceVolatility: number
  operationalComplexity: number
  geopoliticalStability: number
}

export interface MunicipalRiskFramework {
  publicAccountability: number
  regulatoryCompliance: number
  communityImpact: number
  budgetConstraints: number
  politicalStability: number
  serviceDelivery: number
}