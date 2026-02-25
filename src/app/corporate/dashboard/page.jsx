'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const savedConfig = localStorage.getItem('dashboardConfig');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        if (config.location?.id && config.industry?.id && config.framework?.id) {
          router.replace(
            `/corporate/dashboard/${config.location.id}/${config.industry.id}/${config.framework.id}`
          );
          return;
        }
      } catch (e) {
        // fall through to corporate page
      }
    }
    // No saved config — send back to corporate landing where they can run Quick Assessment
    router.replace('/corporate');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 font-medium">Loading your dashboard…</p>
      </div>
    </div>
  );
}
