// Pilot Customer Validation Framework for Phase 1

export interface PilotCustomer {
  id: string
  name: string
  type: 'mining' | 'municipal' | 'energy' | 'construction'
  size: 'small' | 'medium' | 'large' | 'enterprise'
  expectedContractValue: string
  primaryUseCase: string
  validationCriteria: ValidationCriteria[]
  contactInfo: {
    primaryContact: string
    email: string
    role: string
  }
  status: 'prospect' | 'engaged' | 'pilot-active' | 'completed' | 'converted'
}

export interface ValidationCriteria {
  category: 'specification-quality' | 'time-savings' | 'risk-reduction' | 'stakeholder-alignment' | 'user-experience'
  metric: string
  baseline?: number
  target: number
  actual?: number
  validated: boolean
  feedback?: string
}

export interface PilotValidationMetrics {
  // Core Value Propositions
  timeToSpecification: {
    baseline: number // hours with manual process
    withPlatform: number // hours with AI platform
    improvement: number // percentage improvement
  }

  specificationQuality: {
    completeness: number // 0-100 score
    compliance: number // 0-100 score
    strategicAlignment: number // 0-100 score
    stakeholderSatisfaction: number // 0-100 score
  }

  riskReduction: {
    identifiedRisks: number
    mitigationStrategies: number
    riskScoreImprovement: number
  }

  userExperience: {
    easeOfUse: number // 0-10 scale
    learningCurve: number // hours to proficiency
    featureUtilization: number // percentage of features used
    recommendationScore: number // Net Promoter Score
  }
}

export interface PilotFeedback {
  customerId: string
  date: Date
  category: 'feature-request' | 'bug-report' | 'improvement' | 'praise' | 'concern'
  priority: 'low' | 'medium' | 'high' | 'critical'
  description: string
  response?: string
  status: 'open' | 'in-progress' | 'resolved' | 'wont-fix'
  impact: 'user-satisfaction' | 'platform-improvement' | 'strategic-direction'
}

// Pilot validation test scenarios
export const pilotTestScenarios = {
  mining: [
    {
      name: "Mining Equipment Procurement",
      budget: "over-1m",
      category: "equipment",
      description: "Heavy mining equipment for open-pit operation",
      keyValidations: ["technical-specification-accuracy", "safety-compliance", "environmental-requirements"]
    },
    {
      name: "Mining Consulting Services",
      budget: "500k-1m",
      category: "consulting",
      description: "Geological and metallurgical consulting for new operation",
      keyValidations: ["specialist-requirements", "risk-assessment", "stakeholder-management"]
    }
  ],

  municipal: [
    {
      name: "Municipal IT Infrastructure",
      budget: "over-1m",
      category: "it-services",
      description: "Citizen services platform and data center upgrade",
      keyValidations: ["citizen-impact-assessment", "accessibility-compliance", "integration-requirements"]
    },
    {
      name: "Municipal Construction Project",
      budget: "over-1m",
      category: "construction",
      description: "Community center and public space development",
      keyValidations: ["community-consultation", "sustainability-requirements", "public-accountability"]
    }
  ]
}

// Key success metrics for Phase 1 validation
export const phase1SuccessMetrics = {
  customerAcquisition: {
    target: 10, // 5-10 pilot customers
    leadTime: 30, // days to first pilot engagement
    conversionRate: 50 // percentage of prospects that become pilots
  },

  platformPerformance: {
    specificationGenerationTime: 30, // minutes (target)
    riskAssessmentAccuracy: 80, // percentage (target)
    userSatisfactionScore: 8, // out of 10 (target)
    featureCompleteness: 70 // percentage of planned features (target)
  },

  businessValidation: {
    timeToValue: 7, // days for customer to see value
    repeatUsage: 80, // percentage of pilots that generate multiple specs
    referralGeneration: 30, // percentage of pilots that provide referrals
    retentionRate: 90 // percentage of pilots that want to continue
  }
}

export class PilotValidationService {

  generatePilotPlan(customer: PilotCustomer): PilotPlan {
    return {
      customerId: customer.id,
      duration: this.calculatePilotDuration(customer),
      phases: this.definePilotPhases(customer),
      successCriteria: this.defineSuccessCriteria(customer),
      resources: this.calculateResources(customer),
      timeline: this.generateTimeline(customer)
    }
  }

  private calculatePilotDuration(customer: PilotCustomer): number {
    // Duration in weeks based on customer size and complexity
    const baseMap = {
      'small': 4,
      'medium': 6,
      'large': 8,
      'enterprise': 12
    }
    return baseMap[customer.size]
  }

  private definePilotPhases(customer: PilotCustomer): PilotPhase[] {
    return [
      {
        name: "Setup & Onboarding",
        duration: 1,
        activities: ["Platform setup", "User training", "Initial configuration"],
        deliverables: ["Configured platform", "Trained users", "Success metrics baseline"]
      },
      {
        name: "Specification Generation",
        duration: 2,
        activities: ["Generate test specifications", "Validate quality", "Gather feedback"],
        deliverables: ["Sample specifications", "Quality assessment", "User feedback"]
      },
      {
        name: "Advanced Features",
        duration: 2,
        activities: ["Risk assessment testing", "Workflow setup", "Integration testing"],
        deliverables: ["Risk reports", "Workflow processes", "Integration validation"]
      },
      {
        name: "Evaluation & Next Steps",
        duration: 1,
        activities: ["Results analysis", "ROI calculation", "Future planning"],
        deliverables: ["Pilot report", "ROI analysis", "Implementation plan"]
      }
    ]
  }

  private defineSuccessCriteria(customer: PilotCustomer): string[] {
    const base = [
      "Reduce specification development time by 50%",
      "Achieve 80%+ user satisfaction score",
      "Generate 3+ complete specifications",
      "Validate risk assessment accuracy"
    ]

    const domainSpecific = {
      'mining': [
        "Validate mining-specific compliance requirements",
        "Demonstrate safety and environmental risk identification"
      ],
      'municipal': [
        "Validate citizen impact assessment capabilities",
        "Demonstrate public accountability features"
      ]
    }

    return [...base, ...(domainSpecific[customer.type] || [])]
  }

  private calculateResources(customer: PilotCustomer): PilotResources {
    return {
      customerTime: "2-4 hours per week",
      supportLevel: customer.size === 'enterprise' ? 'dedicated' : 'shared',
      trainingRequired: customer.size === 'small' ? 2 : 4, // hours
      technicalSupport: true
    }
  }

  private generateTimeline(customer: PilotCustomer): PilotMilestone[] {
    const duration = this.calculatePilotDuration(customer)
    return [
      { week: 1, milestone: "Pilot kickoff and platform setup" },
      { week: 2, milestone: "First specification generated" },
      { week: Math.floor(duration/2), milestone: "Mid-pilot review and optimization" },
      { week: duration-1, milestone: "Final specifications and testing" },
      { week: duration, milestone: "Pilot evaluation and next steps" }
    ]
  }
}

interface PilotPlan {
  customerId: string
  duration: number
  phases: PilotPhase[]
  successCriteria: string[]
  resources: PilotResources
  timeline: PilotMilestone[]
}

interface PilotPhase {
  name: string
  duration: number
  activities: string[]
  deliverables: string[]
}

interface PilotResources {
  customerTime: string
  supportLevel: 'dedicated' | 'shared'
  trainingRequired: number
  technicalSupport: boolean
}

interface PilotMilestone {
  week: number
  milestone: string
}

export const pilotValidationService = new PilotValidationService()