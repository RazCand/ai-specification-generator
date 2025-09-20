// Strategic Domain Knowledge Integration for Mining and Municipal Sectors

export const getMiningDomainEnhancements = (category: string): string => {
  const miningEnhancements = {
    'it-services': `
MINING SECTOR STRATEGIC CONSIDERATIONS:
- Integration with mine management systems (SCADA, fleet management, geological modeling)
- Real-time operational data requirements and edge computing capabilities
- Remote site connectivity challenges and satellite/cellular redundancy
- Cybersecurity for critical infrastructure and operational technology (OT)
- Environmental monitoring system integration and regulatory reporting
- Safety system integration (gas detection, personnel tracking, emergency response)
- Multi-site deployment considerations across remote mining operations
- Data sovereignty requirements for geological and operational data`,

    'consulting': `
MINING SECTOR STRATEGIC CONSIDERATIONS:
- Mining industry expertise and demonstrated experience in similar operations
- Understanding of mining regulatory framework (state mining acts, environmental regulations)
- Geotechnical, metallurgical, and processing plant optimization experience
- ESG and sustainability consulting for mining operations
- Community relations and indigenous engagement expertise
- Mine closure planning and rehabilitation consulting
- Resource estimation and reserve reporting (JORC compliance)
- Mining equipment selection and operational efficiency optimization`,

    'construction': `
MINING SECTOR STRATEGIC CONSIDERATIONS:
- Remote location construction challenges and logistics
- Specialist mining infrastructure (processing plants, tailings facilities, haul roads)
- Compliance with mining-specific regulations and safety standards
- Environmental management during construction (dust, noise, water management)
- Indigenous heritage protection and cultural protocols
- Extreme weather and geological conditions considerations
- Access to skilled mining construction workforce
- Integration with ongoing mining operations and minimal disruption requirements`,

    'equipment': `
MINING SECTOR STRATEGIC CONSIDERATIONS:
- Heavy-duty mining equipment designed for continuous operation
- Integration with existing fleet management and maintenance systems
- Operator certification and specialized training requirements
- Spare parts availability in remote locations and supply chain resilience
- Equipment performance in harsh mining environments (dust, vibration, temperature)
- Automation and autonomous operation capabilities
- Environmental impact and emissions compliance
- Total cost of ownership including fuel efficiency and maintenance costs`,

    'supplies': `
MINING SECTOR STRATEGIC CONSIDERATIONS:
- Mining-specific supplies (explosives, chemicals, protective equipment, consumables)
- Supply chain resilience for remote operations and emergency inventory
- Dangerous goods handling, transport, and storage requirements
- Environmental impact of supplies and packaging waste management
- Local procurement opportunities and community benefit requirements
- Quality standards for mining applications and operational reliability
- Inventory management for seasonal access and weather-related disruptions
- Integration with mine planning and production scheduling systems`
  }

  return miningEnhancements[category as keyof typeof miningEnhancements] || ''
}

export const getMunicipalDomainEnhancements = (category: string): string => {
  const municipalEnhancements = {
    'it-services': `
MUNICIPAL SECTOR STRATEGIC CONSIDERATIONS:
- Citizen service delivery platforms and digital government initiatives
- Integration with existing council systems (rates, permits, asset management)
- Public transparency and open data requirements
- Accessibility compliance (WCAG 2.1 AA standards) for diverse community needs
- Multi-language support for culturally diverse communities
- Privacy protection for citizen data and Australian Privacy Principles compliance
- Disaster recovery and business continuity for essential services
- Cybersecurity for critical municipal infrastructure and citizen data protection`,

    'consulting': `
MUNICIPAL SECTOR STRATEGIC CONSIDERATIONS:
- Local government expertise and understanding of municipal operations
- Community engagement and consultation methodology expertise
- Urban planning, infrastructure, and sustainable development experience
- Financial management and municipal budgeting expertise
- Regulatory compliance with local government legislation
- Strategic planning and community vision development
- Asset management and infrastructure lifecycle planning
- Performance measurement and service delivery optimization`,

    'construction': `
MUNICIPAL SECTOR STRATEGIC CONSIDERATIONS:
- Public infrastructure design for community accessibility and inclusivity
- Compliance with Disability Discrimination Act and universal design principles
- Community disruption minimization and stakeholder communication
- Integration with existing municipal infrastructure and utilities
- Sustainability and climate resilience requirements
- Public art and community identity integration opportunities
- Maintenance access and long-term serviceability considerations
- Public safety during construction in populated areas`,

    'equipment': `
MUNICIPAL SECTOR STRATEGIC CONSIDERATIONS:
- Municipal service equipment (waste collection, street maintenance, parks equipment)
- Multi-purpose equipment for diverse municipal service delivery
- Operator safety and public interaction considerations
- Environmental impact and emissions reduction for urban operations
- Community noise and disruption minimization
- Local service and maintenance support availability
- Budget efficiency and total cost of ownership for ratepayer value
- Integration with municipal asset management systems`,

    'supplies': `
MUNICIPAL SECTOR STRATEGIC CONSIDERATIONS:
- Municipal service supplies (cleaning materials, signage, park maintenance, office supplies)
- Bulk purchasing opportunities for cost efficiency across departments
- Local supplier preference and economic development support
- Environmental sustainability and waste reduction considerations
- Community safety and public health requirements
- Emergency preparedness and disaster response supply needs
- Quality standards for public infrastructure and community safety
- Indigenous and local business procurement targets and social outcomes`
  }

  return municipalEnhancements[category as keyof typeof municipalEnhancements] || ''
}

export const getStrategicProcurementContext = (budgetRange: string, urgency: string): string => {
  const contextMap = {
    'over-1m': {
      'critical': `
STRATEGIC PROCUREMENT CONTEXT - CRITICAL HIGH-VALUE CONTRACT:
This is a strategic procurement requiring executive oversight and comprehensive risk management.
- Implement rigorous vendor due diligence including financial stability analysis
- Establish comprehensive performance monitoring and governance frameworks
- Consider market impact and supplier relationship management
- Implement robust contract management and performance measurement
- Plan for stakeholder communication and public accountability
- Consider long-term strategic implications and vendor partnership potential`,

      'high': `
STRATEGIC PROCUREMENT CONTEXT - HIGH-VALUE CONTRACT:
This procurement requires enhanced governance and strategic planning.
- Conduct thorough market analysis and competitive positioning
- Implement comprehensive evaluation criteria including strategic alignment
- Consider total cost of ownership and lifecycle value
- Plan for vendor relationship management and partnership development
- Establish clear performance metrics and accountability frameworks
- Consider innovation opportunities and future capability development`,

      'medium': `
STRATEGIC PROCUREMENT CONTEXT - PLANNED HIGH-VALUE CONTRACT:
This procurement allows for comprehensive strategic planning and market engagement.
- Conduct extensive market consultation and capability assessment
- Implement thorough risk assessment and mitigation planning
- Consider innovation and capability development opportunities
- Plan for comprehensive stakeholder engagement and communication
- Establish long-term vendor partnership and relationship management
- Optimize for strategic value beyond cost considerations`,

      'low': `
STRATEGIC PROCUREMENT CONTEXT - LONG-TERM HIGH-VALUE CONTRACT:
This procurement enables comprehensive strategic planning and optimization.
- Conduct market shaping activities and supplier development
- Implement innovation challenges and capability building initiatives
- Consider strategic partnership and collaborative arrangements
- Plan for comprehensive benchmarking and continuous improvement
- Establish industry leadership and best practice development
- Optimize for transformational outcomes and strategic advantage`
    }
  }

  const budgetContext = contextMap[budgetRange as keyof typeof contextMap]
  if (budgetContext) {
    return budgetContext[urgency as keyof typeof budgetContext] || ''
  }

  return ''
}

export const getEnhancedPromptForCategory = (
  category: string,
  domain: 'mining' | 'municipal' | 'general',
  budgetRange: string,
  urgency: string
): string => {
  let basePrompt = getPromptForCategory(category)

  // Add domain-specific enhancements
  if (domain === 'mining') {
    basePrompt += '\n\n' + getMiningDomainEnhancements(category)
  } else if (domain === 'municipal') {
    basePrompt += '\n\n' + getMunicipalDomainEnhancements(category)
  }

  // Add strategic context for high-value contracts
  if (budgetRange === 'over-1m' || budgetRange === '500k-1m') {
    basePrompt += '\n\n' + getStrategicProcurementContext(budgetRange, urgency)
  }

  return basePrompt
}

// Import the original function to maintain compatibility
export { getPromptForCategory } from './prompts'