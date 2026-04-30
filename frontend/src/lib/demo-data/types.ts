// ─── Shared Types for Demo Data ──────────────────────────────────────────────

export interface Location {
  code: string;
  name: string;
  flag: string;
  currency: string;
  primaryFrameworks: string[];
  reportingAuthority: string;
}

export interface Industry {
  id: string;
  name: string;
  icon: string;
  challenges: string[];
  solutionCategories: string[];
}

export interface Framework {
  id: string;
  name: string;
  fullName: string;
  description: string;
  applicability: string;
  keyMetrics: string[];
}

export interface Vendor {
  id: string;
  name: string;
  type: string;
  description: string;
  solutions: string[];
  targetIndustries: string[];
  targetRegions: string[];
  contact: { email: string; phone: string };
  website: string;
  rating?: number;
  certifications?: string[];
}

export interface Solution {
  id: string;
  name: string;
  icon: string;
  description: string;
  vendors: string[];
}

// ─── Compliance Types ─────────────────────────────────────────────────────────

export interface ComplianceTask {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: string;
  deadline: string;
  authority: string;
  tags?: string[];
}

export interface ComplianceCategory {
  name: string;
  color: string;
  bgColor: string;
  tasks: ComplianceTask[];
}

export interface ComplianceDocument {
  id: string;
  title: string;
  description: string;
  type: string;
  size: string;
  lastUpdated: string;
}

export interface ComplianceRegulation {
  id: string;
  title: string;
  description: string;
  authority: string;
  lastAmendment: string;
  applicability: string;
}

export interface ComplianceRegion {
  name: string;
  flag: string;
  primaryFrameworks: string[];
  categories: Record<string, ComplianceCategory>;
  documents: ComplianceDocument[];
  regulations: ComplianceRegulation[];
}

export interface ComplianceData {
  regions: Record<string, ComplianceRegion>;
}

// ─── Benchmarking Types ───────────────────────────────────────────────────────

export interface VendorBenchmark {
  id: string;
  name: string;
  category: string;
  region: string;
  ghgReduction: number;
  avgCost: number;
  roi: number;
  paybackPeriod: number;
  financingAvailable: boolean;
  financingOptions: string[];
  certifications: string[];
  clientSatisfaction: number;
  projectsDelivered: number;
  sustainability: {
    carbonNeutral: boolean;
    renewableEnergy: number;
    localSourcing: number;
  };
}

export interface PeerBenchmark {
  id: string;
  name: string;
  ticker: string;
  region: string;
  totalEmissions: number;
  scope1: number;
  scope2: number;
  scope3Reported: boolean;
  energyIntensity: number;
  waterIntensity: number;
  wasteRecycled: number;
  greenBuildingCoverage: number;
  esgScore: number;
  reportingFramework: string[];
  netZeroTarget: number;
  renewableEnergyShare: number;
  revenueSize: string;
  sustainabilityReport: string;
}

// ─── Project Types ────────────────────────────────────────────────────────────

export interface ProjectMilestone {
  name: string;
  date: string;
  done: boolean;
}

export interface DemoProject {
  id: string;
  name: string;
  category: string;
  status: 'completed' | 'in-progress' | 'planning' | 'on-hold';
  priority: 'critical' | 'high' | 'medium' | 'low';
  lead: string;
  team: string[];
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  progress: number;
  milestones: ProjectMilestone[];
  ghgReduction: string;
  vendor: string;
}

// ─── RFP Types ────────────────────────────────────────────────────────────────

export interface RFPVendor {
  id: string;
  name: string;
  type: string;
  description: string;
  certifications: string[];
}

export interface SubmittedRFP {
  id: string;
  title: string;
  createdAt: string;
  deadline: string;
  status: 'open' | 'responses_received' | 'under_review' | 'awarded';
  vendors: number;
  responses: number;
  complianceReqs: string[];
  estimatedValue: string;
}

// ─── Procurement Types ────────────────────────────────────────────────────────

export interface ProcurementItem {
  id: string;
  name: string;
  category: string;
  type: string;
  description: string;
  price: { min: number; max: number; currency: string; unit: string };
  supplier: string;
  specifications: Record<string, string>;
  certifications: string[];
  targetIndustries: string[];
  sustainability: Record<string, string>;
}

// ─── Cart Types ───────────────────────────────────────────────────────────────

export const CART_ITEM_TYPES = {
  REPORTING: 'reporting',
  COMPLIANCE: 'compliance',
  PROJECT: 'project',
  PRODUCT: 'product',
  SERVICE: 'service',
} as const;

export type CartItemType = (typeof CART_ITEM_TYPES)[keyof typeof CART_ITEM_TYPES];

export interface CartItem {
  id: string;
  name: string;
  description: string;
  type: CartItemType;
  price: number;
  quantity: number;
  addedAt: string;
}
