// Stakeholder Workflow Orchestration Types
export interface StakeholderRole {
  id: string
  name: string
  permissions: Permission[]
  responsibilityLevel: 'viewer' | 'reviewer' | 'approver' | 'owner'
  department?: string
}

export interface Permission {
  action: 'view' | 'comment' | 'edit' | 'approve' | 'reject' | 'export'
  scope: 'specification' | 'evaluation' | 'workflow' | 'reports'
}

export interface WorkflowStage {
  id: string
  name: string
  type: 'review' | 'approval' | 'evaluation' | 'negotiation' | 'award'
  order: number
  requiredRoles: string[]
  parallelExecution: boolean
  timeoutDays?: number
  autoAdvance: boolean
  conditions?: StageCondition[]
}

export interface StageCondition {
  type: 'all-approved' | 'majority-approved' | 'specific-approver' | 'score-threshold'
  value?: any
}

export interface ProcurementWorkflow {
  id: string
  specificationId: string
  name: string
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled'
  currentStage: string
  stages: WorkflowStage[]
  stakeholders: WorkflowStakeholder[]
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
}

export interface WorkflowStakeholder {
  id: string
  userId: string
  role: string
  assignedStages: string[]
  notificationPreferences: NotificationPreference[]
}

export interface NotificationPreference {
  trigger: 'assigned' | 'reminder' | 'completed' | 'escalation'
  method: 'email' | 'sms' | 'dashboard'
  enabled: boolean
}

export interface StageExecution {
  id: string
  workflowId: string
  stageId: string
  status: 'pending' | 'in-progress' | 'completed' | 'overdue' | 'skipped'
  assignedTo: string[]
  startedAt?: Date
  completedAt?: Date
  dueDate?: Date
  actions: StageAction[]
}

export interface StageAction {
  id: string
  type: 'comment' | 'approve' | 'reject' | 'request-changes' | 'escalate'
  performedBy: string
  performedAt: Date
  content: string
  attachments?: string[]
}

// Workflow templates for different procurement types and complexity
export interface WorkflowTemplate {
  id: string
  name: string
  category: string
  contractValueRange: string
  stages: WorkflowStage[]
  recommendedRoles: StakeholderRole[]
  estimatedDuration: number // in days
  description: string
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
}

// Communication and collaboration
export interface StakeholderCommunication {
  id: string
  workflowId: string
  type: 'announcement' | 'reminder' | 'escalation' | 'update'
  subject: string
  message: string
  recipients: string[]
  sentAt: Date
  sentBy: string
}

export interface CollaborationSession {
  id: string
  workflowId: string
  type: 'review-meeting' | 'negotiation' | 'clarification'
  participants: string[]
  scheduledAt: Date
  agenda: string[]
  outcomes: string[]
  recordedBy: string
}