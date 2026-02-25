'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  ShoppingBag,
  Shield,
  Menu,
  X,
  Briefcase,
  FileText,
} from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✅ Preserve the full dashboard URL if already on a dashboard route
  const dashboardUrl = pathname.startsWith('/corporate/dashboard/')
    ? pathname
    : '/corporate/dashboard';

  const navigationItems = [
    {
      name: 'Dashboard',
      href: dashboardUrl,
      icon: BarChart3,
      description: 'ESG metrics and analytics',
    },
    {
      name: 'Benchmarking',
      href: '/corporate/benchmarking',
      icon: TrendingUp,
      description: 'Industry comparisons',
    },
    {
      name: 'Marketplace',
      href: '/corporate/marketplace',
      icon: ShoppingBag,
      description: 'Solution providers',
    },
    {
      name: 'Compliance',
      href: '/corporate/compliance',
      icon: Shield,
      description: 'Regulatory tracking',
    },
    {
      name: 'Project Management',
      href: '/corporate/services',
      icon: Briefcase,
      description: 'Projects and services',
    },
    {
      name: 'RFP',
      href: '/corporate/rfp',
      icon: FileText,
      description: 'Request for Proposal',
    },
  ];

  const isActive = (href) => {
    if (href.startsWith('/corporate/dashboard')) {
      return pathname.startsWith('/corporate/dashboard');
    }
    if (href === '/corporate/marketplace') {
      return pathname === '/corporate/marketplace' || pathname.startsWith('/corporate/vendor');
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
            <Image
              src="/images/ploxi earth logo.jpeg"
              alt="Ploxi Earth"
              width={40}
              height={40}
              className="h-10 w-10 object-contain rounded-md"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-2 hover:bg-gray-50
                    ${active ? 'text-green-700 bg-[#e9f1ea]' : 'text-gray-700 hover:text-green-700'}
                  `}
                >
                  <Icon
                    className={`w-4 h-4 ${active ? 'text-green-600' : 'text-gray-500 group-hover:text-green-600'
                      }`}
                  />
                  <span>{item.name}</span>

                  {/* Active Indicator */}
                  {active && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/corporate/register"
              className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle navigation"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                      ${active
                        ? 'text-green-700 bg-[#e9f1ea] border-l-4 border-green-600'
                        : 'text-gray-700 hover:text-green-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon
                      className={`w-5 h-5 ${active ? 'text-green-600' : 'text-gray-500'}`}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                    </div>
                  </Link>
                );
              })}

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/corporate/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
