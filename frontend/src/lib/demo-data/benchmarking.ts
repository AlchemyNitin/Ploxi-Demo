import type { VendorBenchmark, PeerBenchmark } from './types';

export const vendorBenchmarks: VendorBenchmark[] = [
  {
    id: 'quark_solar', name: 'Quark Solar', category: 'Energy Management', region: 'IN',
    ghgReduction: 35, avgCost: 4500000, roi: 22, paybackPeriod: 4.5,
    financingAvailable: true, financingOptions: ['Lease', 'PPA', 'Loan'],
    certifications: ['ISO 14001', 'BIS'], clientSatisfaction: 4.7, projectsDelivered: 150,
    sustainability: { carbonNeutral: false, renewableEnergy: 95, localSourcing: 70 },
  },
  {
    id: 'breathe_esg', name: 'Breathe ESG', category: 'ESG Analytics', region: 'IN',
    ghgReduction: 12, avgCost: 800000, roi: 45, paybackPeriod: 1.5,
    financingAvailable: false, financingOptions: [],
    certifications: ['ISO 27001', 'SOC 2'], clientSatisfaction: 4.8, projectsDelivered: 300,
    sustainability: { carbonNeutral: true, renewableEnergy: 100, localSourcing: 90 },
  },
  {
    id: 'furaat', name: 'Furaat Water Solutions', category: 'Water Treatment', region: 'IN',
    ghgReduction: 18, avgCost: 6000000, roi: 28, paybackPeriod: 3.5,
    financingAvailable: true, financingOptions: ['Grant', 'Loan'],
    certifications: ['ISO 14001', 'CPCB'], clientSatisfaction: 4.5, projectsDelivered: 80,
    sustainability: { carbonNeutral: false, renewableEnergy: 40, localSourcing: 85 },
  },
  {
    id: 'plastic_fischer', name: 'Plastic Fischer', category: 'Waste Management', region: 'EU',
    ghgReduction: 8, avgCost: 2000000, roi: 15, paybackPeriod: 5,
    financingAvailable: true, financingOptions: ['Carbon Credits', 'CSR'],
    certifications: ['B Corp', 'Plastic Neutral'], clientSatisfaction: 4.6, projectsDelivered: 45,
    sustainability: { carbonNeutral: true, renewableEnergy: 80, localSourcing: 95 },
  },
  {
    id: 'smart_building_automation', name: 'Smart Building Automation', category: 'Building Automation', region: 'IN',
    ghgReduction: 25, avgCost: 3500000, roi: 32, paybackPeriod: 3,
    financingAvailable: true, financingOptions: ['ESCO', 'Lease'],
    certifications: ['IGBC Partner', 'ISO 14001'], clientSatisfaction: 4.5, projectsDelivered: 120,
    sustainability: { carbonNeutral: false, renewableEnergy: 60, localSourcing: 75 },
  },
  {
    id: 'green_fleet_solutions', name: 'Green Fleet Solutions', category: 'EV Fleet', region: 'IN',
    ghgReduction: 40, avgCost: 8000000, roi: 18, paybackPeriod: 5.5,
    financingAvailable: true, financingOptions: ['FAME II Subsidy', 'Loan'],
    certifications: ['EV Ready'], clientSatisfaction: 4.1, projectsDelivered: 35,
    sustainability: { carbonNeutral: false, renewableEnergy: 50, localSourcing: 60 },
  },
];

export const peerBenchmarks: PeerBenchmark[] = [
  {
    id: 'tata_steel', name: 'Tata Steel', ticker: 'TATASTEEL', region: 'IN',
    totalEmissions: 25500, scope1: 22000, scope2: 3500, scope3Reported: true,
    energyIntensity: 21.5, waterIntensity: 3.8, wasteRecycled: 72,
    greenBuildingCoverage: 35, esgScore: 78, reportingFramework: ['BRSR', 'GRI', 'TCFD'],
    netZeroTarget: 2045, renewableEnergyShare: 18, revenueSize: '₹2.4L Cr',
    sustainabilityReport: 'https://tatasteel.com/esg',
  },
  {
    id: 'infosys', name: 'Infosys', ticker: 'INFY', region: 'IN',
    totalEmissions: 180, scope1: 30, scope2: 150, scope3Reported: true,
    energyIntensity: 0.45, waterIntensity: 0.8, wasteRecycled: 95,
    greenBuildingCoverage: 82, esgScore: 91, reportingFramework: ['BRSR', 'GRI', 'SASB'],
    netZeroTarget: 2040, renewableEnergyShare: 62, revenueSize: '₹1.6L Cr',
    sustainabilityReport: 'https://infosys.com/esg',
  },
  {
    id: 'reliance', name: 'Reliance Industries', ticker: 'RELIANCE', region: 'IN',
    totalEmissions: 52000, scope1: 42000, scope2: 10000, scope3Reported: false,
    energyIntensity: 35.2, waterIntensity: 5.1, wasteRecycled: 58,
    greenBuildingCoverage: 25, esgScore: 65, reportingFramework: ['BRSR', 'GRI'],
    netZeroTarget: 2035, renewableEnergyShare: 12, revenueSize: '₹9.0L Cr',
    sustainabilityReport: 'https://ril.com/esg',
  },
  {
    id: 'siemens_energy', name: 'Siemens Energy', ticker: 'ENR.DE', region: 'EU',
    totalEmissions: 8500, scope1: 2500, scope2: 6000, scope3Reported: true,
    energyIntensity: 12.3, waterIntensity: 1.2, wasteRecycled: 88,
    greenBuildingCoverage: 65, esgScore: 85, reportingFramework: ['ESRS', 'GRI', 'TCFD'],
    netZeroTarget: 2030, renewableEnergyShare: 75, revenueSize: '€31B',
    sustainabilityReport: 'https://siemens-energy.com/esg',
  },
  {
    id: 'microsoft', name: 'Microsoft', ticker: 'MSFT', region: 'US',
    totalEmissions: 12000, scope1: 200, scope2: 5800, scope3Reported: true,
    energyIntensity: 0.08, waterIntensity: 0.3, wasteRecycled: 92,
    greenBuildingCoverage: 90, esgScore: 94, reportingFramework: ['SASB', 'GRI', 'TCFD'],
    netZeroTarget: 2030, renewableEnergyShare: 100, revenueSize: '$211B',
    sustainabilityReport: 'https://microsoft.com/esg',
  },
];
