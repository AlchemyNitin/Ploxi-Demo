import type { SubmittedRFP, RFPVendor } from './types';

export const rfpVendors: RFPVendor[] = [
  { id: 'quark_solar', name: 'Quark Solar', type: 'Product', description: 'Solar panel solutions', certifications: ['ISO 14001'] },
  { id: 'breathe_esg', name: 'Breathe ESG', type: 'Service', description: 'ESG compliance platform', certifications: ['SOC 2'] },
  { id: 'furaat', name: 'Furaat Water Solutions', type: 'Product', description: 'Wastewater treatment', certifications: ['CPCB'] },
  { id: 'smart_ba', name: 'Smart Building Automation', type: 'Product', description: 'Building management systems', certifications: ['IGBC'] },
  { id: 'green_fleet', name: 'Green Fleet Solutions', type: 'Service', description: 'EV fleet transition', certifications: ['EV Ready'] },
];

export const submittedRFPs: SubmittedRFP[] = [
  {
    id: 'rfp_001', title: 'Solar Energy System for HQ Building',
    createdAt: '2025-08-10', deadline: '2025-09-30',
    status: 'responses_received', vendors: 4, responses: 3,
    complianceReqs: ['ISO 14001', 'MNRE Approved'],
    estimatedValue: '₹45,00,000',
  },
  {
    id: 'rfp_002', title: 'ESG Reporting Platform Implementation',
    createdAt: '2025-09-01', deadline: '2025-10-15',
    status: 'under_review', vendors: 3, responses: 2,
    complianceReqs: ['SOC 2', 'ISO 27001'],
    estimatedValue: '₹8,00,000',
  },
  {
    id: 'rfp_003', title: 'Wastewater Treatment Upgrade',
    createdAt: '2025-09-20', deadline: '2025-11-30',
    status: 'open', vendors: 5, responses: 0,
    complianceReqs: ['CPCB Certified', 'ISO 14001'],
    estimatedValue: '₹60,00,000',
  },
];
