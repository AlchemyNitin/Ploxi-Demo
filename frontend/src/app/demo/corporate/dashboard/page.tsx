'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dashboardConfig');
      if (saved) {
        const config = JSON.parse(saved);
        if (config.location && config.industry && config.framework) {
          router.replace(
            `/demo/corporate/dashboard/${config.location.code.toLowerCase()}/${config.industry.id}/${config.framework.id}`,
          );
          return;
        }
      }
    } catch { /* ignore */ }
    router.replace('/demo/corporate');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    </div>
  );
}
