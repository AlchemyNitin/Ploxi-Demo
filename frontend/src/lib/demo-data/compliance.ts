import type { ComplianceData } from './types';

export const complianceData: ComplianceData = {
  regions: {
    IN: {
      name: 'India',
      flag: '🇮🇳',
      primaryFrameworks: ['BRSR', 'GRI'],
      categories: {
        environmental: {
          name: 'Environmental',
          color: 'text-green-700',
          bgColor: 'bg-green-50',
          tasks: [
            { id: 'in_env_01', title: 'Annual GHG Emissions Report', description: 'Submit Scope 1 & 2 emissions data per BRSR requirements', category: 'Environmental', priority: 'critical', status: 'pending', deadline: '2025-12-31', authority: 'SEBI', tags: ['BRSR', 'Emissions'] },
            { id: 'in_env_02', title: 'Water Consumption Disclosure', description: 'Report total water withdrawal, consumption and discharge', category: 'Environmental', priority: 'high', status: 'in-progress', deadline: '2025-11-30', authority: 'CPCB', tags: ['Water', 'BRSR'] },
            { id: 'in_env_03', title: 'Waste Management Report', description: 'Disclose hazardous and non-hazardous waste generated and recycled', category: 'Environmental', priority: 'medium', status: 'pending', deadline: '2026-01-31', authority: 'SPCB', tags: ['Waste', 'Circular Economy'] },
            { id: 'in_env_04', title: 'Energy Efficiency Audit', description: 'Mandatory energy audit for designated consumers under EC Act', category: 'Environmental', priority: 'high', status: 'completed', deadline: '2025-09-30', authority: 'BEE', tags: ['Energy', 'Audit'] },
          ],
        },
        social: {
          name: 'Social',
          color: 'text-blue-700',
          bgColor: 'bg-blue-50',
          tasks: [
            { id: 'in_soc_01', title: 'Employee Diversity Report', description: 'Report workforce diversity including gender, disability and category-wise data', category: 'Social', priority: 'high', status: 'pending', deadline: '2025-12-31', authority: 'SEBI', tags: ['BRSR', 'Diversity'] },
            { id: 'in_soc_02', title: 'CSR Expenditure Report', description: 'Disclose CSR spending per Section 135 of Companies Act', category: 'Social', priority: 'critical', status: 'in-progress', deadline: '2025-11-15', authority: 'MCA', tags: ['CSR', 'Companies Act'] },
            { id: 'in_soc_03', title: 'Health & Safety Compliance', description: 'Report workplace safety incidents and training hours', category: 'Social', priority: 'medium', status: 'pending', deadline: '2026-01-31', authority: 'DGFASLI', tags: ['Safety', 'Labour'] },
          ],
        },
        governance: {
          name: 'Governance',
          color: 'text-purple-700',
          bgColor: 'bg-purple-50',
          tasks: [
            { id: 'in_gov_01', title: 'Board Composition Disclosure', description: 'Report board diversity, independence and ESG oversight structure', category: 'Governance', priority: 'high', status: 'completed', deadline: '2025-09-30', authority: 'SEBI', tags: ['Board', 'BRSR'] },
            { id: 'in_gov_02', title: 'Anti-Corruption Policy Filing', description: 'Disclose anti-bribery and anti-corruption policies and incidents', category: 'Governance', priority: 'medium', status: 'pending', deadline: '2025-12-31', authority: 'SEBI', tags: ['Ethics', 'Governance'] },
          ],
        },
      },
      documents: [
        { id: 'in_doc_01', title: 'BRSR Template 2024-25', description: 'Official SEBI BRSR template for listed companies', type: 'Template', size: '2.4 MB', lastUpdated: '2025-04-15' },
        { id: 'in_doc_02', title: 'GHG Protocol Guide — India', description: 'India-specific guidelines for greenhouse gas accounting', type: 'Guide', size: '5.1 MB', lastUpdated: '2025-03-20' },
        { id: 'in_doc_03', title: 'CSR Compliance Checklist', description: 'Section 135 checklist for CSR spending and reporting', type: 'Checklist', size: '1.2 MB', lastUpdated: '2025-06-01' },
      ],
      regulations: [
        { id: 'in_reg_01', title: 'SEBI BRSR Framework', description: 'Mandatory ESG disclosure for top 1000 listed companies', authority: 'SEBI', lastAmendment: '2024-07-01', applicability: 'Listed companies by market cap' },
        { id: 'in_reg_02', title: 'Companies Act Section 135', description: 'CSR spending requirements for qualifying companies', authority: 'Ministry of Corporate Affairs', lastAmendment: '2024-01-15', applicability: 'Companies with net worth ≥₹500 Cr' },
        { id: 'in_reg_03', title: 'BEE Energy Conservation Act', description: 'Mandatory energy audits for designated consumers', authority: 'Bureau of Energy Efficiency', lastAmendment: '2023-12-01', applicability: 'Designated industrial consumers' },
      ],
    },
    US: {
      name: 'United States',
      flag: '🇺🇸',
      primaryFrameworks: ['SASB', 'GRI', 'TCFD'],
      categories: {
        environmental: {
          name: 'Environmental',
          color: 'text-green-700',
          bgColor: 'bg-green-50',
          tasks: [
            { id: 'us_env_01', title: 'SEC Climate Disclosure', description: 'File climate-related financial disclosures per SEC rules', category: 'Environmental', priority: 'critical', status: 'pending', deadline: '2025-12-31', authority: 'SEC', tags: ['SEC', 'Climate'] },
            { id: 'us_env_02', title: 'EPA GHG Reporting', description: 'Submit GHG emissions data to the EPA Facility Level Registry', category: 'Environmental', priority: 'high', status: 'in-progress', deadline: '2025-11-30', authority: 'EPA', tags: ['EPA', 'Emissions'] },
            { id: 'us_env_03', title: 'SASB Industry Standards Report', description: 'Prepare industry-specific sustainability metrics per SASB', category: 'Environmental', priority: 'high', status: 'pending', deadline: '2026-01-31', authority: 'ISSB/SASB', tags: ['SASB', 'Materiality'] },
          ],
        },
        social: {
          name: 'Social',
          color: 'text-blue-700',
          bgColor: 'bg-blue-50',
          tasks: [
            { id: 'us_soc_01', title: 'EEO-1 Workforce Report', description: 'Submit workforce demographics to EEOC', category: 'Social', priority: 'high', status: 'completed', deadline: '2025-09-30', authority: 'EEOC', tags: ['Diversity', 'Federal'] },
            { id: 'us_soc_02', title: 'OSHA Safety Report', description: 'Annual workplace injury and illness log', category: 'Social', priority: 'medium', status: 'pending', deadline: '2026-02-01', authority: 'OSHA', tags: ['Safety'] },
          ],
        },
        governance: {
          name: 'Governance',
          color: 'text-purple-700',
          bgColor: 'bg-purple-50',
          tasks: [
            { id: 'us_gov_01', title: 'Proxy Statement ESG Disclosures', description: 'Include ESG oversight in annual proxy statement', category: 'Governance', priority: 'high', status: 'pending', deadline: '2025-12-31', authority: 'SEC', tags: ['Proxy', 'Board'] },
          ],
        },
      },
      documents: [
        { id: 'us_doc_01', title: 'SEC Climate Disclosure Guide', description: 'SEC final rule guidance for climate-related disclosures', type: 'Guide', size: '8.2 MB', lastUpdated: '2025-05-20' },
        { id: 'us_doc_02', title: 'SASB Standards Navigator', description: 'Industry-specific SASB reporting reference', type: 'Reference', size: '3.7 MB', lastUpdated: '2025-04-10' },
      ],
      regulations: [
        { id: 'us_reg_01', title: 'SEC Climate Disclosure Rule', description: 'Mandatory climate-related financial disclosures for public companies', authority: 'SEC', lastAmendment: '2025-03-06', applicability: 'All SEC registrants' },
        { id: 'us_reg_02', title: 'EPA Greenhouse Gas Reporting', description: 'Mandatory GHG reporting for large emitters', authority: 'EPA', lastAmendment: '2024-11-01', applicability: 'Facilities emitting ≥25,000 tCO₂e/yr' },
      ],
    },
    EU: {
      name: 'European Union',
      flag: '🇪🇺',
      primaryFrameworks: ['ESRS', 'GRI', 'TCFD'],
      categories: {
        environmental: {
          name: 'Environmental',
          color: 'text-green-700',
          bgColor: 'bg-green-50',
          tasks: [
            { id: 'eu_env_01', title: 'CSRD / ESRS Report', description: 'Prepare comprehensive sustainability report under CSRD', category: 'Environmental', priority: 'critical', status: 'in-progress', deadline: '2025-12-31', authority: 'EFRAG', tags: ['CSRD', 'ESRS'] },
            { id: 'eu_env_02', title: 'EU Taxonomy Alignment Assessment', description: 'Assess business activities against EU Taxonomy criteria', category: 'Environmental', priority: 'high', status: 'pending', deadline: '2025-11-30', authority: 'European Commission', tags: ['Taxonomy', 'Green Deal'] },
            { id: 'eu_env_03', title: 'CBAM Reporting', description: 'Carbon Border Adjustment Mechanism import declarations', category: 'Environmental', priority: 'high', status: 'pending', deadline: '2026-01-31', authority: 'European Commission', tags: ['CBAM', 'Carbon'] },
          ],
        },
        social: {
          name: 'Social',
          color: 'text-blue-700',
          bgColor: 'bg-blue-50',
          tasks: [
            { id: 'eu_soc_01', title: 'CSDDD Due Diligence Plan', description: 'Develop corporate sustainability due diligence plan per CSDDD', category: 'Social', priority: 'high', status: 'pending', deadline: '2026-01-31', authority: 'European Commission', tags: ['CSDDD', 'Human Rights'] },
            { id: 'eu_soc_02', title: 'Gender Pay Gap Report', description: 'Report gender pay disparities per EU Pay Transparency Directive', category: 'Social', priority: 'medium', status: 'pending', deadline: '2026-03-31', authority: 'National Authority', tags: ['Pay Equity', 'Diversity'] },
          ],
        },
        governance: {
          name: 'Governance',
          color: 'text-purple-700',
          bgColor: 'bg-purple-50',
          tasks: [
            { id: 'eu_gov_01', title: 'Double Materiality Assessment', description: 'Conduct double materiality assessment per ESRS requirements', category: 'Governance', priority: 'critical', status: 'in-progress', deadline: '2025-12-31', authority: 'EFRAG', tags: ['ESRS', 'Materiality'] },
          ],
        },
      },
      documents: [
        { id: 'eu_doc_01', title: 'ESRS Implementation Guide', description: 'Step-by-step ESRS reporting implementation', type: 'Guide', size: '12.4 MB', lastUpdated: '2025-06-15' },
        { id: 'eu_doc_02', title: 'EU Taxonomy Compass', description: 'Activity classification and alignment criteria', type: 'Reference', size: '6.8 MB', lastUpdated: '2025-05-01' },
      ],
      regulations: [
        { id: 'eu_reg_01', title: 'Corporate Sustainability Reporting Directive (CSRD)', description: 'Comprehensive sustainability reporting requirements', authority: 'European Commission', lastAmendment: '2024-07-01', applicability: 'Large EU companies and listed SMEs' },
        { id: 'eu_reg_02', title: 'EU Taxonomy Regulation', description: 'Classification system for environmentally sustainable activities', authority: 'European Commission', lastAmendment: '2024-06-15', applicability: 'Financial market participants and large companies' },
      ],
    },
    AE: {
      name: 'United Arab Emirates',
      flag: '🇦🇪',
      primaryFrameworks: ['GRI', 'TCFD'],
      categories: {
        environmental: {
          name: 'Environmental',
          color: 'text-green-700',
          bgColor: 'bg-green-50',
          tasks: [
            { id: 'ae_env_01', title: 'Abu Dhabi ESG Disclosure', description: 'ADX ESG reporting for listed companies', category: 'Environmental', priority: 'high', status: 'pending', deadline: '2025-12-31', authority: 'ADX/SCA', tags: ['ADX', 'ESG'] },
            { id: 'ae_env_02', title: 'Net Zero 2050 Progress Report', description: 'Report progress towards UAE Net Zero 2050 Strategic Initiative', category: 'Environmental', priority: 'medium', status: 'pending', deadline: '2026-03-31', authority: 'MOCCAE', tags: ['Net Zero', 'Vision 2050'] },
          ],
        },
        social: {
          name: 'Social',
          color: 'text-blue-700',
          bgColor: 'bg-blue-50',
          tasks: [
            { id: 'ae_soc_01', title: 'Emiratization Compliance Report', description: 'Report on national workforce participation targets', category: 'Social', priority: 'high', status: 'in-progress', deadline: '2025-12-31', authority: 'MOHRE', tags: ['Emiratization', 'Labour'] },
          ],
        },
        governance: {
          name: 'Governance',
          color: 'text-purple-700',
          bgColor: 'bg-purple-50',
          tasks: [
            { id: 'ae_gov_01', title: 'Corporate Governance Report', description: 'Annual corporate governance disclosure per SCA requirements', category: 'Governance', priority: 'high', status: 'completed', deadline: '2025-09-30', authority: 'SCA', tags: ['Governance', 'SCA'] },
          ],
        },
      },
      documents: [
        { id: 'ae_doc_01', title: 'ADX ESG Reporting Guide', description: 'Abu Dhabi Securities Exchange ESG metrics guide', type: 'Guide', size: '3.5 MB', lastUpdated: '2025-04-20' },
      ],
      regulations: [
        { id: 'ae_reg_01', title: 'UAE Net Zero 2050 Strategic Initiative', description: 'National strategy for carbon neutrality by 2050', authority: 'UAE Government', lastAmendment: '2024-11-28', applicability: 'All economic sectors' },
      ],
    },
  },
};
