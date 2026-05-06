// ─── Demo Data Barrel Export ──────────────────────────────────────────────────
// Import from '@/lib/demo-data' to access all typed mock datasets.

export * from './types';
export { locations } from './locations';
export { frameworks } from './frameworks';
export { industries } from './industries';
export { solutions } from './solutions';
export { vendors } from './vendors';
export { complianceData } from './compliance';
export { vendorBenchmarks, peerBenchmarks } from './benchmarking';
export { demoProjects } from './projects';
export { rfpVendors, submittedRFPs } from './rfp';
export { procurementItems } from './procurement';
export { sites, siteMap, getSiteById } from './sites';
export type { SiteData, SiteKPI, SiteAlert, SiteCompliance, SiteId } from './sites';
export { demoRoles, roleMap, DEFAULT_ROLE_ID, ALL_NAV_LABELS } from './roles';
export type { DemoRole, NavLabel } from './roles';
