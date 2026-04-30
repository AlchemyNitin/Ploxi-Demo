import type { Industry } from './types';

export const industries: Industry[] = [
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: '🏭',
    challenges: [
      'High energy consumption in production',
      'Industrial waste management',
      'Supply chain emissions tracking',
    ],
    solutionCategories: ['energy_management', 'waste_management', 'esg_analytics'],
  },
  {
    id: 'real_estate',
    name: 'Real Estate & Construction',
    icon: '🏗️',
    challenges: [
      'Building energy efficiency',
      'Construction waste',
      'Green building certification',
    ],
    solutionCategories: ['building_automation', 'energy_management', 'waste_management'],
  },
  {
    id: 'it_datacenter',
    name: 'IT & Data Centers',
    icon: '💻',
    challenges: [
      'Data center energy consumption',
      'E-waste management',
      'Carbon-neutral cloud services',
    ],
    solutionCategories: ['energy_management', 'esg_analytics', 'waste_management'],
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: '🏥',
    challenges: [
      'Biomedical waste disposal',
      'Hospital energy management',
      'Sustainable supply chain',
    ],
    solutionCategories: ['waste_management', 'energy_management', 'water_treatment'],
  },
  {
    id: 'logistics',
    name: 'Logistics & Transportation',
    icon: '🚛',
    challenges: [
      'Fleet emissions reduction',
      'Last-mile delivery optimization',
      'Fuel transition to EVs',
    ],
    solutionCategories: ['ev_fleet_management', 'esg_analytics', 'energy_management'],
  },
  {
    id: 'finance',
    name: 'Banking & Financial Services',
    icon: '🏦',
    challenges: [
      'Green finance reporting',
      'Portfolio carbon footprinting',
      'ESG risk assessment',
    ],
    solutionCategories: ['esg_analytics', 'building_automation'],
  },
  {
    id: 'cement',
    name: 'Cement & Materials',
    icon: '🧱',
    challenges: [
      'Process emissions reduction',
      'Alternative fuels adoption',
      'Water-intensive processes',
    ],
    solutionCategories: ['energy_management', 'water_treatment', 'waste_management'],
  },
  {
    id: 'steel',
    name: 'Steel & Metals',
    icon: '⚙️',
    challenges: [
      'High-temperature process decarbonisation',
      'Scrap metal recycling',
      'Water usage in cooling',
    ],
    solutionCategories: ['energy_management', 'water_treatment', 'waste_management'],
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: '🚗',
    challenges: [
      'EV transition strategy',
      'Supply chain sustainability',
      'End-of-life vehicle management',
    ],
    solutionCategories: ['ev_fleet_management', 'waste_management', 'energy_management'],
  },
  {
    id: 'education',
    name: 'Education & Campuses',
    icon: '🎓',
    challenges: [
      'Campus carbon neutrality',
      'Student engagement in sustainability',
      'Green campus certification',
    ],
    solutionCategories: ['building_automation', 'energy_management', 'water_treatment'],
  },
];
