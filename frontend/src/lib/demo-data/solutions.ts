import type { Solution } from './types';

export const solutions: Solution[] = [
  {
    id: 'energy_management',
    name: 'Energy Management',
    icon: '⚡',
    description:
      'Advanced energy monitoring, optimization, and integration of renewables such as solar and wind for industrial and commercial sectors.',
    vendors: ['quark_solar', 'biofuture_additives', 'radiance_energy', 'apollo_power_systems', 'kishan_infrastructure'],
  },
  {
    id: 'water_treatment',
    name: 'Water Treatment',
    icon: '💧',
    description:
      'Industrial water reuse, recycling, digital water quality monitoring, and conservation solutions for sustainable operations.',
    vendors: ['furaat', 'aqverium', 'digital_paani', 'flow_dynamics'],
  },
  {
    id: 'waste_management',
    name: 'Waste Management',
    icon: '♻️',
    description:
      'Circular economy platforms, recycling technologies, AI-driven waste segregation, plastic removal, and upcycling solutions.',
    vendors: ['plastic_fischer', 'advent_envirotech', 'circular_waste_solutions', 'outdid_unified'],
  },
  {
    id: 'esg_analytics',
    name: 'ESG Analytics',
    icon: '📊',
    description:
      'Reporting dashboards, automated ESG data collection, carbon accounting, scenario analysis, and regulatory compliance tools.',
    vendors: ['breathe_esg', 'snowkap', 'causal_dynamics', 'earth_sync'],
  },
  {
    id: 'building_automation',
    name: 'Building Automation',
    icon: '🏢',
    description:
      'IoT management of HVAC, smart lighting, occupancy sensors, and building energy controls for green and smart buildings.',
    vendors: ['smart_building_automation', 'kishan_infrastructure'],
  },
  {
    id: 'ev_fleet_management',
    name: 'EV Fleet Management',
    icon: '🚘',
    description:
      'Electric vehicle fleet transition, charging infrastructure, route optimization, and real-time fleet analytics.',
    vendors: ['green_fleet_solutions', 'outdid_unified'],
  },
];
