// ─── Demo RBAC Role Definitions ───────────────────────────────────────────────
// Simulated role-based access control for the corporate dashboard demo.
// No real authentication — purely frontend state management.

import type { SiteId } from './sites';

// Nav item labels must match those in DashboardNavbar NAV_ITEMS
export const ALL_NAV_LABELS = [
  'Dashboard',
  'Benchmarking',
  'Marketplace',
  'Compliance',
  'Project Management',
  'RFP',
] as const;

export type NavLabel = (typeof ALL_NAV_LABELS)[number];

export interface DemoRole {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  /** 'all' means access to every site */
  allowedSites: SiteId[] | 'all';
  canCompareSites: boolean;
  /** Subset of ALL_NAV_LABELS visible to this role */
  visibleNavItems: NavLabel[];
  /** Contextual dashboard heading shown to this role */
  dashboardTitle: string;
  /** Badge text shown in the role selector */
  accessBadge: string;
  /** Tailwind color class for the badge */
  badgeColor: 'emerald' | 'blue' | 'amber' | 'violet';
  /** Avatar initials */
  initials: string;
}

export const demoRoles: DemoRole[] = [
  {
    id: 'cso',
    label: 'Chief Sustainability Officer',
    shortLabel: 'CSO',
    description:
      'Enterprise-wide oversight of all sustainability operations, strategy, and ESG reporting across all company sites.',
    allowedSites: 'all',
    canCompareSites: true,
    visibleNavItems: ['Dashboard', 'Benchmarking', 'Marketplace', 'Compliance', 'Project Management', 'RFP'],
    dashboardTitle: 'Enterprise Sustainability Overview',
    accessBadge: 'Enterprise Access',
    badgeColor: 'emerald',
    initials: 'CSO',
  },
  {
    id: 'sustainability_manager',
    label: 'Sustainability Manager',
    shortLabel: 'Sust. Manager',
    description:
      'Manages ESG analytics, environmental KPI monitoring, and sustainability reporting across operational sites.',
    allowedSites: 'all',
    canCompareSites: true,
    visibleNavItems: ['Dashboard', 'Compliance', 'Benchmarking', 'Project Management'],
    dashboardTitle: 'Sustainability Operations Dashboard',
    accessBadge: 'Ops Access',
    badgeColor: 'blue',
    initials: 'SM',
  },
  {
    id: 'site_manager_blr',
    label: 'Site Manager — Bangalore Plant',
    shortLabel: 'Site Mgr (BLR)',
    description:
      'Responsible for day-to-day sustainability compliance and EHS operations at the Bangalore Manufacturing Plant.',
    allowedSites: ['bangalore'],
    canCompareSites: false,
    visibleNavItems: ['Dashboard', 'Compliance'],
    dashboardTitle: 'Bangalore Plant — Site Dashboard',
    accessBadge: 'Site Restricted',
    badgeColor: 'amber',
    initials: 'BLR',
  },
  {
    id: 'site_manager_chn',
    label: 'Site Manager — Chennai DC',
    shortLabel: 'Site Mgr (CHN)',
    description:
      'Responsible for sustainability operations, fleet emissions, and logistics ESG compliance at the Chennai Distribution Center.',
    allowedSites: ['chennai'],
    canCompareSites: false,
    visibleNavItems: ['Dashboard', 'Compliance'],
    dashboardTitle: 'Chennai Distribution Center — Site Dashboard',
    accessBadge: 'Site Restricted',
    badgeColor: 'amber',
    initials: 'CHN',
  },
];

export const roleMap: Record<string, DemoRole> = Object.fromEntries(
  demoRoles.map((r) => [r.id, r]),
);

export const DEFAULT_ROLE_ID = 'cso';
