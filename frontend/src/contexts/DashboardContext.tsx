'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Location, Industry, Framework } from '@/lib/demo-data/types';

export interface DashboardConfig {
  location: Location;
  industry: Industry;
  framework: Framework;
}

interface DashboardContextValue {
  dashboardConfig: DashboardConfig | null;
  dashboardUrl: string;
  updateDashboardConfig: (config: DashboardConfig) => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [dashboardConfig, setDashboardConfig] = useState<DashboardConfig | null>(null);
  const [dashboardUrl, setDashboardUrl] = useState('/demo/corporate/dashboard');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dashboardConfig');
      if (saved) {
        const config: DashboardConfig = JSON.parse(saved);
        setDashboardConfig(config);
        if (config.location && config.industry && config.framework) {
          setDashboardUrl(
            `/demo/corporate/dashboard/${config.location.code.toLowerCase()}/${config.industry.id}/${config.framework.id}`,
          );
        }
      }
    } catch { /* ignore */ }
  }, []);

  const updateDashboardConfig = (config: DashboardConfig) => {
    setDashboardConfig(config);
    localStorage.setItem('dashboardConfig', JSON.stringify(config));
    if (config.location && config.industry && config.framework) {
      setDashboardUrl(
        `/demo/corporate/dashboard/${config.location.code.toLowerCase()}/${config.industry.id}/${config.framework.id}`,
      );
    }
  };

  return (
    <DashboardContext.Provider value={{ dashboardConfig, dashboardUrl, updateDashboardConfig }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used within a DashboardProvider');
  return ctx;
}
