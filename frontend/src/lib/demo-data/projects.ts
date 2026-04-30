import type { DemoProject } from './types';

export const demoProjects: DemoProject[] = [
  {
    id: 'proj_001', name: 'Rooftop Solar Installation — Phase 1', category: 'Energy',
    status: 'in-progress', priority: 'high', lead: 'Amit Sharma', team: ['Priya K.', 'Ravi M.'],
    budget: 4500000, spent: 2800000, startDate: '2025-06-01', endDate: '2025-12-31', progress: 62,
    milestones: [
      { name: 'Site Survey', date: '2025-06-15', done: true },
      { name: 'Procurement', date: '2025-07-30', done: true },
      { name: 'Installation', date: '2025-10-15', done: false },
      { name: 'Commissioning', date: '2025-12-31', done: false },
    ],
    ghgReduction: '120 tCO₂e/yr', vendor: 'Quark Solar',
  },
  {
    id: 'proj_002', name: 'Wastewater Recycling Plant Upgrade', category: 'Water',
    status: 'planning', priority: 'medium', lead: 'Neha Verma', team: ['Suresh P.'],
    budget: 6000000, spent: 500000, startDate: '2025-09-01', endDate: '2026-03-31', progress: 15,
    milestones: [
      { name: 'Feasibility Study', date: '2025-09-30', done: true },
      { name: 'Vendor Selection', date: '2025-11-15', done: false },
      { name: 'Construction', date: '2026-01-31', done: false },
      { name: 'Testing & Go-Live', date: '2026-03-31', done: false },
    ],
    ghgReduction: '45 tCO₂e/yr', vendor: 'Furaat Water Solutions',
  },
  {
    id: 'proj_003', name: 'Fleet EV Transition — Pilot', category: 'Transport',
    status: 'completed', priority: 'high', lead: 'Karan Joshi', team: ['Divya S.', 'Arjun B.'],
    budget: 8000000, spent: 7800000, startDate: '2025-01-15', endDate: '2025-07-31', progress: 100,
    milestones: [
      { name: 'Vehicle Procurement', date: '2025-02-28', done: true },
      { name: 'Charging Infra Setup', date: '2025-04-30', done: true },
      { name: 'Driver Training', date: '2025-05-31', done: true },
      { name: 'Full Deployment', date: '2025-07-31', done: true },
    ],
    ghgReduction: '200 tCO₂e/yr', vendor: 'Green Fleet Solutions',
  },
  {
    id: 'proj_004', name: 'BRSR Compliance Reporting System', category: 'Compliance',
    status: 'in-progress', priority: 'critical', lead: 'Meera Nair', team: ['Rohit K.'],
    budget: 800000, spent: 600000, startDate: '2025-04-01', endDate: '2025-10-31', progress: 75,
    milestones: [
      { name: 'Requirements Mapping', date: '2025-04-30', done: true },
      { name: 'Platform Integration', date: '2025-07-15', done: true },
      { name: 'Data Migration', date: '2025-09-15', done: false },
      { name: 'Audit Readiness', date: '2025-10-31', done: false },
    ],
    ghgReduction: 'N/A', vendor: 'Breathe ESG',
  },
  {
    id: 'proj_005', name: 'Plastic Waste Recovery Program', category: 'Waste',
    status: 'on-hold', priority: 'low', lead: 'Rahul Desai', team: ['Anita M.'],
    budget: 2000000, spent: 200000, startDate: '2025-08-01', endDate: '2026-02-28', progress: 10,
    milestones: [
      { name: 'Baseline Audit', date: '2025-08-31', done: true },
      { name: 'Partner Onboarding', date: '2025-10-15', done: false },
      { name: 'Collection Deployment', date: '2025-12-31', done: false },
      { name: 'Impact Measurement', date: '2026-02-28', done: false },
    ],
    ghgReduction: '30 tCO₂e/yr', vendor: 'Plastic Fischer',
  },
];
