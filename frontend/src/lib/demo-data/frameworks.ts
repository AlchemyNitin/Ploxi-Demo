import type { Framework } from './types';

export const frameworks: Framework[] = [
  {
    id: 'brsr',
    name: 'BRSR',
    fullName: 'Business Responsibility and Sustainability Reporting',
    description:
      'Mandatory ESG disclosure framework issued by SEBI for top 1000 listed companies in India, covering environmental, social, and governance aspects.',
    applicability: 'IN',
    keyMetrics: [
      'Total CSR expenditure',
      'Carbon emissions (Scope 1 & 2)',
      'Percentage of treated effluents',
      'Employee gender diversity',
      'Community development projects',
    ],
  },
  {
    id: 'sasb',
    name: 'SASB',
    fullName: 'Sustainability Accounting Standards Board',
    description:
      'Framework focused on financially material ESG factors by sector. Common in the US; often referenced globally for investor communications.',
    applicability: 'US,EU,IN,AE',
    keyMetrics: [
      'Water withdrawal by business activity',
      'Absolute energy use',
      'Waste generated & recycled',
      'Product lifecycle emissions',
      'Workforce safety incident rate',
    ],
  },
  {
    id: 'tcfd',
    name: 'TCFD',
    fullName: 'Task Force on Climate-related Financial Disclosures',
    description:
      'Global climate-risk disclosure framework focused on financial risks and opportunities associated with climate change. Mandatory in some regions.',
    applicability: 'EU,US,AE,IN',
    keyMetrics: [
      'Board oversight of climate risk',
      'Climate scenario stress testing',
      'Scope 1, 2, & 3 GHG emissions',
      'Proportion of low-carbon investments',
    ],
  },
  {
    id: 'gri',
    name: 'GRI',
    fullName: 'Global Reporting Initiative',
    description:
      'Most widely used global standard for sustainability and ESG reporting. Designed for all sectors and organization sizes with broad stakeholder emphasis.',
    applicability: 'IN,US,EU,AE',
    keyMetrics: [
      'Total energy consumption',
      'Water discharged by quality and destination',
      'Material used and sourced sustainably',
      'Incidents of discrimination',
      'Board diversity metrics',
    ],
  },
  {
    id: 'esrs',
    name: 'ESRS',
    fullName: 'European Sustainability Reporting Standards',
    description:
      'EU-mandated reporting under CSRD with detailed topical & cross-cutting ESG standards. Applies to large EU companies and value chain partners.',
    applicability: 'EU',
    keyMetrics: [
      'Carbon intensity per product',
      'Use of renewable energy',
      'Biodiversity measures',
      'Gender pay gap',
      'Anti-corruption initiatives',
    ],
  },
];
