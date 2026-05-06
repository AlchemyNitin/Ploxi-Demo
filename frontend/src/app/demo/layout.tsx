'use client';

import React from 'react';
import { CartProvider } from '@/contexts/CartContext';
import { DashboardProvider } from '@/contexts/DashboardContext';
import { RBACProvider } from '@/contexts/RBACContext';
import Link from 'next/link';

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <DashboardProvider>
        <RBACProvider>
          {/* Demo Banner */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center py-2 px-4 text-sm font-medium">
            <span className="mr-2">🎯</span>
            You are viewing the <strong>Demo Version</strong> of Ploxi Earth.
            <Link href="/" className="ml-2 underline hover:text-primary-100 transition-colors">
              ← Back to Production
            </Link>
          </div>
          {children}
        </RBACProvider>
      </DashboardProvider>
    </CartProvider>
  );
}
