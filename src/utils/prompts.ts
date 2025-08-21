export const getPromptForCategory = (category: string): string => {
  const prompts = {
    'it-services': `
Focus on IT service delivery including:
- Service level agreements (SLAs) with specific uptime requirements
- Technical support tiers and response times
- Data security compliance (ISO 27001, Australian Privacy Principles)
- Integration capabilities with existing council systems
- Scalability requirements and performance benchmarks
- Backup, disaster recovery, and business continuity
- Required vendor certifications and security clearances
- Change management and version control processes`,
    
    'consulting': `
Focus on professional consulting services including:
- Consultant qualifications, certifications, and demonstrated experience
- Detailed methodology and project approach
- Clear deliverables with acceptance criteria
- Knowledge transfer and capability building requirements
- Intellectual property ownership and licensing
- Regular reporting schedules and communication protocols
- Quality assurance frameworks and review processes
- Risk management and mitigation strategies`,
    
    'construction': `
Focus on construction and infrastructure including:
- Compliance with National Construction Code and Australian Standards
- Work Health and Safety (WHS) requirements and site safety plans
- Environmental impact assessments and sustainability measures
- Material specifications, quality standards, and testing requirements
- Project management methodology and supervision requirements
- Insurance coverage including public liability and professional indemnity
- Progress payment schedules and performance guarantees
- Defects liability period and maintenance requirements`,
    
    'supplies': `
Focus on goods and supplies procurement including:
- Detailed product specifications and quality standards
- Delivery schedules, logistics, and warehousing requirements
- Warranty terms, after-sales support, and maintenance agreements
- Volume discounts and bulk purchasing arrangements
- Sustainability criteria and environmental certifications
- Local content requirements and supplier diversity
- Packaging, handling, and storage specifications
- Returns policy and defect resolution procedures`,
    
    'maintenance': `
Focus on maintenance and facility services including:
- Preventive maintenance schedules and procedures
- Emergency response times and service level commitments
- Spare parts availability and inventory management
- Technician qualifications, training, and certifications
- Equipment lifecycle management and replacement planning
- Performance monitoring, reporting, and KPI tracking
- Health and safety compliance for maintenance activities
- Environmental considerations and waste management`,
    
    'professional-services': `
Focus on professional advisory services including:
- Professional registrations, accreditations, and industry memberships
- Demonstrated expertise and relevant case studies
- Conflict of interest policies and independence requirements
- Professional indemnity insurance and liability coverage
- Confidentiality agreements and data protection measures
- Quality standards and peer review processes
- Ongoing support and advisory arrangements
- Fee structures and billing transparency`,
    
    'equipment': `
Focus on equipment procurement including:
- Technical specifications, performance criteria, and testing standards
- Installation, commissioning, and handover procedures
- Operator training, certification, and competency requirements
- Maintenance agreements, service schedules, and support availability
- Warranty coverage, terms, and claim procedures
- Compliance with Australian Design Rules and safety standards
- Energy efficiency ratings and environmental impact
- Upgrade pathways and future compatibility`,
    
    'software': `
Focus on software solutions including:
- Functional requirements and technical specifications
- Licensing models, user access, and scalability options
- Data migration, integration, and API requirements
- Security standards, encryption, and access controls
- Support levels, response times, and maintenance windows
- Training programs, documentation, and user adoption
- Customization capabilities and configuration options
- Backup, recovery, and business continuity features`,
    
    'training': `
Focus on training and development services including:
- Learning objectives, outcomes, and competency frameworks
- Trainer qualifications, experience, and teaching credentials
- Training delivery methods (face-to-face, online, blended)
- Assessment methods, certification, and recognition processes
- Participant capacity, scheduling, and venue requirements
- Training materials, resources, and ongoing support
- Evaluation methods and feedback collection
- Continuous improvement and program updates`
  }

  return prompts[category as keyof typeof prompts] || prompts['consulting']
}