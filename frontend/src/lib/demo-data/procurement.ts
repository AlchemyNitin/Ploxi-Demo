import type { ProcurementItem } from './types';

export const procurementItems: ProcurementItem[] = [
  {
    id: 'proc_001', name: 'Industrial Solar Panel Array (100kW)', category: 'Energy',
    type: 'Product', description: 'High-efficiency monocrystalline solar panel system for commercial rooftops.',
    price: { min: 3500000, max: 5500000, currency: 'INR', unit: 'per system' },
    supplier: 'Quark Solar', specifications: { 'Panel Type': 'Monocrystalline', 'Capacity': '100 kW', 'Warranty': '25 years', 'Efficiency': '22%' },
    certifications: ['BIS', 'IEC 61215'], targetIndustries: ['manufacturing', 'real_estate', 'it_datacenter'],
    sustainability: { 'Carbon Offset': '120 tCO₂e/yr', 'Payback Period': '4-5 years' },
  },
  {
    id: 'proc_002', name: 'STP Upgrade Kit — 500 KLD', category: 'Water',
    type: 'Product', description: 'Sewage treatment plant upgrade with MBR technology for water recycling.',
    price: { min: 5000000, max: 7500000, currency: 'INR', unit: 'per project' },
    supplier: 'Furaat Water Solutions', specifications: { 'Capacity': '500 KLD', 'Technology': 'MBR', 'Recovery Rate': '90%', 'Output Quality': 'Class A' },
    certifications: ['CPCB', 'ISO 14001'], targetIndustries: ['manufacturing', 'real_estate', 'healthcare'],
    sustainability: { 'Water Savings': '450 KLD', 'Energy Use': '0.8 kWh/m³' },
  },
  {
    id: 'proc_003', name: 'Smart BMS Platform License', category: 'Building',
    type: 'Service', description: 'Cloud-based building management system with IoT sensor integration.',
    price: { min: 200000, max: 500000, currency: 'INR', unit: 'per year' },
    supplier: 'Smart Building Automation', specifications: { 'Sensors': 'Up to 500', 'Protocols': 'BACnet, Modbus, MQTT', 'Dashboard': 'Real-time', 'API': 'REST' },
    certifications: ['IGBC', 'ISO 50001'], targetIndustries: ['real_estate', 'education', 'healthcare'],
    sustainability: { 'Energy Savings': '15-25%', 'ROI': '2-3 years' },
  },
  {
    id: 'proc_004', name: 'ESG Compliance SaaS — Annual', category: 'Analytics',
    type: 'Service', description: 'Full-stack ESG reporting, carbon accounting, and regulatory compliance platform.',
    price: { min: 500000, max: 1200000, currency: 'INR', unit: 'per year' },
    supplier: 'Breathe ESG', specifications: { 'Frameworks': 'BRSR, GRI, SASB, TCFD', 'Users': 'Unlimited', 'Data Sources': '50+', 'AI Features': 'Auto-classification' },
    certifications: ['SOC 2', 'ISO 27001'], targetIndustries: ['finance', 'manufacturing', 'it_datacenter'],
    sustainability: { 'Compliance Rate': '99%', 'Time Saved': '60%' },
  },
  {
    id: 'proc_005', name: 'EV Charging Hub (10 ports)', category: 'Transport',
    type: 'Product', description: 'Commercial-grade DC fast charging station with fleet management integration.',
    price: { min: 4000000, max: 6000000, currency: 'INR', unit: 'per hub' },
    supplier: 'Green Fleet Solutions', specifications: { 'Ports': '10 (CCS2 + CHAdeMO)', 'Power': '60 kW per port', 'Uptime': '99.5%', 'Fleet App': 'Included' },
    certifications: ['BIS', 'AIS 138'], targetIndustries: ['logistics', 'automotive'],
    sustainability: { 'CO₂ Avoided': '200 tCO₂e/yr', 'Green Power': 'Optional solar canopy' },
  },
];
