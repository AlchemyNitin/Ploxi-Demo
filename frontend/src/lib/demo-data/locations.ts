import type { Location } from './types';

export const locations: Location[] = [
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    currency: 'INR',
    primaryFrameworks: ['BRSR', 'GRI'],
    reportingAuthority: 'SEBI',
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    primaryFrameworks: ['SASB', 'GRI', 'TCFD'],
    reportingAuthority: 'SEC',
  },
  {
    code: 'EU',
    name: 'European Union',
    flag: '🇪🇺',
    currency: 'EUR',
    primaryFrameworks: ['TCFD', 'ESRS', 'GRI'],
    reportingAuthority: 'EFRAG',
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    currency: 'AED',
    primaryFrameworks: ['GRI', 'TCFD'],
    reportingAuthority: 'Ministry of Climate Change',
  },
];
