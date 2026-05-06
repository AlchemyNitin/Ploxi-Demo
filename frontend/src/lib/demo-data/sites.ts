// ─── Multi-Site Mock Data ──────────────────────────────────────────────────────
// Three Indian company sites with distinct sustainability metrics.

export type SiteId = 'bangalore' | 'chennai' | 'hyderabad';

export interface SiteKPI {
  name: string;
  value: number;
  unit: string;
  target: number;
  trend: 'up' | 'down' | 'stable';
  category: 'Energy' | 'Emissions' | 'Water' | 'Waste' | 'Social' | 'Governance';
  status: 'on-track' | 'at-risk' | 'critical';
}

export interface SiteAlert {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  timestamp: string;
}

export interface SiteCompliance {
  overallScore: number;       // 0-100
  tasksCompleted: number;
  tasksPending: number;
  tasksCritical: number;
  nextDeadline: string;
  framework: string;
  reportingStatus: 'On Track' | 'At Risk' | 'Submitted' | 'Overdue';
}

export interface SiteData {
  id: SiteId;
  name: string;
  shortName: string;
  type: 'Manufacturing' | 'Distribution' | 'Corporate Office';
  city: string;
  headcount: number;
  establishedYear: number;
  kpis: SiteKPI[];
  alerts: SiteAlert[];
  compliance: SiteCompliance;
  energySummary: { total: number; renewable: number; unit: string };
  emissionsSummary: { scope1: number; scope2: number; scope3: number; unit: string };
}

// ─── Bangalore Manufacturing Plant ────────────────────────────────────────────

const bangaloreSite: SiteData = {
  id: 'bangalore',
  name: 'Bangalore Manufacturing Plant',
  shortName: 'Bangalore Plant',
  type: 'Manufacturing',
  city: 'Bengaluru, Karnataka',
  headcount: 2840,
  establishedYear: 2004,
  energySummary: { total: 185000, renewable: 52000, unit: 'GJ' },
  emissionsSummary: { scope1: 14200, scope2: 9800, scope3: 38600, unit: 'tCO₂e' },
  kpis: [
    { name: 'Scope 1 Emissions',       value: 14200,  unit: 'tCO₂e',        target: 11000,  trend: 'down',   category: 'Emissions',   status: 'at-risk' },
    { name: 'Scope 2 Emissions',       value: 9800,   unit: 'tCO₂e',        target: 7500,   trend: 'down',   category: 'Emissions',   status: 'at-risk' },
    { name: 'Renewable Energy Share',  value: 28,     unit: '%',             target: 45,     trend: 'up',     category: 'Energy',      status: 'at-risk' },
    { name: 'Energy Intensity',        value: 0.52,   unit: 'GJ/unit',      target: 0.38,   trend: 'down',   category: 'Energy',      status: 'critical' },
    { name: 'Water Consumption',       value: 52400,  unit: 'KL',           target: 44000,  trend: 'down',   category: 'Water',       status: 'critical' },
    { name: 'Waste Recycled',          value: 68,     unit: '%',             target: 82,     trend: 'up',     category: 'Waste',       status: 'at-risk' },
    { name: 'Waste to Landfill',       value: 22,     unit: '%',             target: 12,     trend: 'down',   category: 'Waste',       status: 'critical' },
    { name: 'Safety Incidents (LTI)',  value: 14,     unit: 'incidents',     target: 6,      trend: 'down',   category: 'Social',      status: 'at-risk' },
    { name: 'Gender Diversity',        value: 24,     unit: '%',             target: 33,     trend: 'up',     category: 'Social',      status: 'at-risk' },
    { name: 'Training Hours/Employee', value: 18,     unit: 'hrs/year',      target: 32,     trend: 'up',     category: 'Social',      status: 'at-risk' },
    { name: 'CSR Spending',            value: 2.4,    unit: '% of PAT',     target: 2.0,    trend: 'stable', category: 'Governance',  status: 'on-track' },
    { name: 'Board Independence',      value: 58,     unit: '%',             target: 50,     trend: 'stable', category: 'Governance',  status: 'on-track' },
  ],
  alerts: [
    { id: 'blr-1', severity: 'critical', title: 'Water Usage Exceeding Target',        description: 'Monthly water consumption is 19% above the quarterly target. Immediate review required by EHS team.', timestamp: '2026-05-05T09:00:00' },
    { id: 'blr-2', severity: 'warning',  title: 'Renewable Energy Below 30%',          description: 'Renewable share at 28% — below the 30% milestone for Q1. Solar panel commissioning delayed.', timestamp: '2026-05-04T14:30:00' },
    { id: 'blr-3', severity: 'warning',  title: 'BRSR Filing Deadline in 28 Days',     description: 'Annual BRSR report due by June 30. 4 supporting documents still pending sign-off.', timestamp: '2026-05-03T10:00:00' },
    { id: 'blr-4', severity: 'info',     title: 'New Safety Protocol Effective June 1', description: 'Updated PPE requirements and incident-reporting SOP go live from June 1, 2026.', timestamp: '2026-05-02T08:00:00' },
  ],
  compliance: {
    overallScore: 64,
    tasksCompleted: 28,
    tasksPending: 12,
    tasksCritical: 3,
    nextDeadline: 'BRSR Filing — Jun 30, 2026',
    framework: 'BRSR',
    reportingStatus: 'At Risk',
  },
};

// ─── Chennai Distribution Center ──────────────────────────────────────────────

const chennaiSite: SiteData = {
  id: 'chennai',
  name: 'Chennai Distribution Center',
  shortName: 'Chennai DC',
  type: 'Distribution',
  city: 'Chennai, Tamil Nadu',
  headcount: 1240,
  establishedYear: 2011,
  energySummary: { total: 68000, renewable: 29000, unit: 'GJ' },
  emissionsSummary: { scope1: 5600, scope2: 4100, scope3: 12800, unit: 'tCO₂e' },
  kpis: [
    { name: 'Scope 1 Emissions',          value: 5600,   unit: 'tCO₂e',      target: 4500,   trend: 'down',   category: 'Emissions',  status: 'at-risk' },
    { name: 'Scope 2 Emissions',          value: 4100,   unit: 'tCO₂e',      target: 3200,   trend: 'down',   category: 'Emissions',  status: 'at-risk' },
    { name: 'Renewable Energy Share',     value: 43,     unit: '%',           target: 50,     trend: 'up',     category: 'Energy',     status: 'at-risk' },
    { name: 'Fleet Fuel Efficiency',      value: 8.2,    unit: 'km/L',        target: 10.5,   trend: 'up',     category: 'Energy',     status: 'at-risk' },
    { name: 'Water Consumption',          value: 18200,  unit: 'KL',          target: 16000,  trend: 'down',   category: 'Water',      status: 'at-risk' },
    { name: 'Packaging Waste Recovered',  value: 78,     unit: '%',           target: 90,     trend: 'up',     category: 'Waste',      status: 'at-risk' },
    { name: 'Last-Mile EV Usage',         value: 31,     unit: '%',           target: 50,     trend: 'up',     category: 'Emissions',  status: 'at-risk' },
    { name: 'Safety Incidents (LTI)',     value: 6,      unit: 'incidents',   target: 3,      trend: 'down',   category: 'Social',     status: 'at-risk' },
    { name: 'Gender Diversity',           value: 31,     unit: '%',           target: 38,     trend: 'up',     category: 'Social',     status: 'at-risk' },
    { name: 'Training Hours/Employee',    value: 26,     unit: 'hrs/year',    target: 32,     trend: 'up',     category: 'Social',     status: 'on-track' },
    { name: 'CSR Spending',               value: 1.8,    unit: '% of PAT',   target: 2.0,    trend: 'up',     category: 'Governance', status: 'at-risk' },
    { name: 'Supplier ESG Audits',        value: 62,     unit: '%',           target: 80,     trend: 'up',     category: 'Governance', status: 'at-risk' },
  ],
  alerts: [
    { id: 'chn-1', severity: 'warning',  title: 'Fleet EV Target Behind Schedule',    description: 'EV adoption at 31% vs Q2 target of 42%. Procurement of 18 additional EVs approved — delivery expected July.', timestamp: '2026-05-05T11:00:00' },
    { id: 'chn-2', severity: 'info',     title: 'Solar Rooftop Expansion Approved',   description: '500 kWp rooftop solar expansion approved by management. Installation scheduled for August 2026.', timestamp: '2026-05-04T09:30:00' },
    { id: 'chn-3', severity: 'warning',  title: 'Packaging Waste Recovery Gap',       description: 'Recovery rate at 78% vs 90% target. Vendor audit reveals three non-compliant packaging suppliers.', timestamp: '2026-05-03T16:00:00' },
    { id: 'chn-4', severity: 'info',     title: 'GRI Report Submission — On Track',   description: 'Annual GRI report 85% complete. Final sign-off meeting scheduled for May 22, 2026.', timestamp: '2026-05-02T13:00:00' },
  ],
  compliance: {
    overallScore: 76,
    tasksCompleted: 38,
    tasksPending: 8,
    tasksCritical: 1,
    nextDeadline: 'GRI Disclosure — May 31, 2026',
    framework: 'GRI',
    reportingStatus: 'On Track',
  },
};

// ─── Hyderabad Corporate Office ───────────────────────────────────────────────

const hyderabadSite: SiteData = {
  id: 'hyderabad',
  name: 'Hyderabad Corporate Office',
  shortName: 'Hyderabad HQ',
  type: 'Corporate Office',
  city: 'Hyderabad, Telangana',
  headcount: 680,
  establishedYear: 2016,
  energySummary: { total: 22000, renewable: 14300, unit: 'GJ' },
  emissionsSummary: { scope1: 820, scope2: 1450, scope3: 4200, unit: 'tCO₂e' },
  kpis: [
    { name: 'Scope 1 Emissions',         value: 820,    unit: 'tCO₂e',      target: 700,    trend: 'down',   category: 'Emissions',  status: 'on-track' },
    { name: 'Scope 2 Emissions',         value: 1450,   unit: 'tCO₂e',      target: 1200,   trend: 'down',   category: 'Emissions',  status: 'at-risk' },
    { name: 'Renewable Energy Share',    value: 65,     unit: '%',           target: 75,     trend: 'up',     category: 'Energy',     status: 'on-track' },
    { name: 'Building Energy Intensity', value: 120,    unit: 'kWh/m²',     target: 100,    trend: 'down',   category: 'Energy',     status: 'at-risk' },
    { name: 'Water Consumption',         value: 6800,   unit: 'KL',          target: 6000,   trend: 'stable', category: 'Water',      status: 'at-risk' },
    { name: 'Office Waste Diverted',     value: 88,     unit: '%',           target: 92,     trend: 'up',     category: 'Waste',      status: 'on-track' },
    { name: 'Paper Usage Reduced',       value: 42,     unit: '%',           target: 50,     trend: 'up',     category: 'Waste',      status: 'on-track' },
    { name: 'Safety Incidents (LTI)',    value: 0,      unit: 'incidents',   target: 0,      trend: 'stable', category: 'Social',     status: 'on-track' },
    { name: 'Gender Diversity',          value: 44,     unit: '%',           target: 50,     trend: 'up',     category: 'Social',     status: 'on-track' },
    { name: 'Training Hours/Employee',   value: 38,     unit: 'hrs/year',    target: 40,     trend: 'up',     category: 'Social',     status: 'on-track' },
    { name: 'ESG Board Meetings/Year',   value: 4,      unit: 'meetings',    target: 6,      trend: 'stable', category: 'Governance', status: 'at-risk' },
    { name: 'Net Zero Progress Score',   value: 71,     unit: '/100',        target: 80,     trend: 'up',     category: 'Governance', status: 'on-track' },
  ],
  alerts: [
    { id: 'hyd-1', severity: 'info',     title: 'TCFD Pilot Report Completed',         description: 'Hyderabad HQ has completed its first TCFD pilot report. Data submitted to enterprise sustainability team.', timestamp: '2026-05-05T10:00:00' },
    { id: 'hyd-2', severity: 'warning',  title: 'ESG Board Meeting Frequency Below Target', description: 'Only 2 of 6 planned ESG board meetings held YTD. Next session to be scheduled before June 15.', timestamp: '2026-05-04T12:00:00' },
    { id: 'hyd-3', severity: 'info',     title: 'LEED Platinum Recertification Due',   description: 'LEED Platinum recertification audit scheduled for September 2026. Preparation checklist shared with facilities.', timestamp: '2026-05-03T09:00:00' },
    { id: 'hyd-4', severity: 'info',     title: 'Employee Green Commute Initiative',   description: '62% of employees enrolled in new green commute programme. Target is 75% by year-end.', timestamp: '2026-05-01T08:30:00' },
  ],
  compliance: {
    overallScore: 88,
    tasksCompleted: 52,
    tasksPending: 5,
    tasksCritical: 0,
    nextDeadline: 'TCFD Report — Jul 15, 2026',
    framework: 'TCFD',
    reportingStatus: 'On Track',
  },
};

// ─── Exports ───────────────────────────────────────────────────────────────────

export const sites: SiteData[] = [bangaloreSite, chennaiSite, hyderabadSite];

export const siteMap: Record<SiteId, SiteData> = {
  bangalore: bangaloreSite,
  chennai:   chennaiSite,
  hyderabad: hyderabadSite,
};

export function getSiteById(id: SiteId): SiteData {
  return siteMap[id];
}
