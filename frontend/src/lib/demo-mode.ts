/**
 * Demo Mode Utility
 * Reads the NEXT_PUBLIC_DEMO_MODE environment variable to determine
 * whether the application should use mock data or real backend services.
 */
export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
}
