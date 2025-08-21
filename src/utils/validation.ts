import Joi from 'joi'

const specificationSchema = Joi.object({
  projectTitle: Joi.string().min(3).required(),
  category: Joi.string().valid(
    'it-services', 'consulting', 'construction', 'supplies', 
    'maintenance', 'professional-services', 'equipment', 'software', 'training'
  ).required(),
  budgetRange: Joi.string().valid(
    'under-10k', '10k-50k', '50k-100k', '100k-500k', '500k-1m', 'over-1m'
  ).required(),
  timeline: Joi.string().required(),
  urgency: Joi.string().valid('low', 'medium', 'high', 'critical').required(),
  keyRequirements: Joi.alternatives().try(
    Joi.array().items(Joi.string().min(1)).min(1),
    Joi.string().min(1)
  ).required(),
  complianceRequirements: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  ).optional(),
  successCriteria: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  ).optional(),
  additionalNotes: Joi.string().optional(),
  contactPerson: Joi.string().min(2).required(),
  department: Joi.string().min(2).required()
})

export function validateSpecificationInput(data: any): { success: boolean; data?: any; errors?: string[] } {
  const { error, value } = specificationSchema.validate(data)
  
  if (error) {
    return {
      success: false,
      errors: error.details.map(d => d.message)
    }
  }
  
  return {
    success: true,
    data: value
  }
}