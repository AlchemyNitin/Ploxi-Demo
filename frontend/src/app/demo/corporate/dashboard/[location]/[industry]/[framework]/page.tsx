'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Settings, Home, BarChart3, Building2, MapPin, FileText, Users, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { locations, industries, frameworks, vendors } from '@/lib/demo-data';
import SubpageHeader from '@/components/SubpageHeader';
import DashboardNavbar from '@/components/DashboardNavbar';


// Generate sample metrics based on industry/framework
function generateMetrics(industryId: string, frameworkId: string) {
  const metricSets: Record<string, { name: string; value: number; unit: string; target: number; trend: 'up' | 'down' | 'stable'; category: string }[]> = {
    brsr: [
      { name: 'Scope 1 Emissions', value: 12400, unit: 'tCO₂e', target: 10000, trend: 'down', category: 'Environmental' },
      { name: 'Scope 2 Emissions', value: 8200, unit: 'tCO₂e', target: 6000, trend: 'down', category: 'Environmental' },
      { name: 'Water Consumption', value: 45000, unit: 'KL', target: 38000, trend: 'down', category: 'Environmental' },
      { name: 'Waste Recycled', value: 72, unit: '%', target: 85, trend: 'up', category: 'Environmental' },
      { name: 'CSR Spending', value: 2.8, unit: '% of PAT', target: 2.0, trend: 'up', category: 'Social' },
      { name: 'Gender Diversity', value: 28, unit: '%', target: 35, trend: 'up', category: 'Social' },
      { name: 'Safety Incidents', value: 12, unit: 'incidents', target: 5, trend: 'down', category: 'Social' },
      { name: 'Board Independence', value: 62, unit: '%', target: 50, trend: 'stable', category: 'Governance' },
    ],
    sasb: [
      { name: 'Energy Intensity', value: 0.45, unit: 'GJ/unit', target: 0.35, trend: 'down', category: 'Environmental' },
      { name: 'Total Energy', value: 185000, unit: 'GJ', target: 160000, trend: 'down', category: 'Environmental' },
      { name: 'Water Withdrawal', value: 32000, unit: 'ML', target: 25000, trend: 'down', category: 'Environmental' },
      { name: 'Waste to Landfill', value: 18, unit: '%', target: 10, trend: 'down', category: 'Environmental' },
      { name: 'Product Lifecycle GHG', value: 8500, unit: 'tCO₂e', target: 6000, trend: 'down', category: 'Environmental' },
      { name: 'LTIR', value: 0.8, unit: 'per 200k hrs', target: 0.5, trend: 'down', category: 'Social' },
    ],
    tcfd: [
      { name: 'Scope 1+2+3 Emissions', value: 52000, unit: 'tCO₂e', target: 40000, trend: 'down', category: 'Climate Risk' },
      { name: 'Low-Carbon Investments', value: 24, unit: '%', target: 40, trend: 'up', category: 'Strategy' },
      { name: 'Climate Risk Score', value: 68, unit: '/100', target: 80, trend: 'up', category: 'Risk' },
      { name: 'Renewable Energy Share', value: 32, unit: '%', target: 50, trend: 'up', category: 'Strategy' },
    ],
    gri: [
      { name: 'Energy Consumption', value: 240000, unit: 'GJ', target: 200000, trend: 'down', category: 'Environmental' },
      { name: 'Water Discharged', value: 18000, unit: 'KL', target: 12000, trend: 'down', category: 'Environmental' },
      { name: 'Materials Sustainably Sourced', value: 45, unit: '%', target: 60, trend: 'up', category: 'Environmental' },
      { name: 'Board Diversity', value: 38, unit: '%', target: 50, trend: 'up', category: 'Governance' },
      { name: 'Training Hours/Employee', value: 24, unit: 'hrs', target: 40, trend: 'up', category: 'Social' },
    ],
    esrs: [
      { name: 'Carbon Intensity', value: 0.32, unit: 'tCO₂e/unit', target: 0.20, trend: 'down', category: 'Environmental' },
      { name: 'Renewable Energy', value: 48, unit: '%', target: 75, trend: 'up', category: 'Environmental' },
      { name: 'Biodiversity Score', value: 65, unit: '/100', target: 80, trend: 'up', category: 'Environmental' },
      { name: 'Gender Pay Gap', value: 8, unit: '%', target: 3, trend: 'down', category: 'Social' },
    ],
  };
  return metricSets[frameworkId] || metricSets.gri;
}

export default function DashboardPage({ params }: { params: { location: string; industry: string; framework: string } }) {
  const location = locations.find((l) => l.code.toLowerCase() === params.location);
  const industry = industries.find((i) => i.id === params.industry);
  const framework = frameworks.find((f) => f.id === params.framework);

  if (!location || !industry || !framework) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Configuration</h2>
          <p className="text-gray-600 mb-4">The selected combination was not found.</p>
          <Link href="/demo/corporate" className="btn-primary">Go Back</Link>
        </div>
      </div>
    );
  }

  const metrics = generateMetrics(industry.id, framework.id);
  const filteredVendors = vendors.filter(
    (v) =>
      (!v.targetRegions.length || v.targetRegions.includes(location.code)) &&
      (!v.targetIndustries.length || v.targetIndustries.includes(industry.id)),
  );

  return (
    <div className="page-shell min-h-screen bg-white">
      <SubpageHeader subtitle="Sustainability Dashboard" backHref="/demo/corporate" backLabel="← Corporate Home" />
      <DashboardNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title + Actions */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sustainability Dashboard</h1>
            <p className="text-gray-600 mt-1">{industry.name} • {location.name} • {framework.name}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/demo/corporate" className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm">
              <Settings className="w-4 h-4" /><span>Edit Config</span>
            </Link>
          </div>
        </div>

        {/* Config Summary */}
        <section className="mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div><div className="font-medium text-blue-900">{location.name}</div><div className="text-sm text-blue-700">Geographic Location</div></div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl">
                <Building2 className="w-5 h-5 text-purple-600" />
                <div><div className="font-medium text-purple-900">{industry.name}</div><div className="text-sm text-purple-700">Industry Sector</div></div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl">
                <FileText className="w-5 h-5 text-green-600" />
                <div><div className="font-medium text-green-900">{framework.name}</div><div className="text-sm text-green-700">Reporting Framework</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Grid */}
        <section className="mb-14">
          <div className="flex items-center space-x-3 mb-6">
            <BarChart3 className="w-6 h-6 text-primary-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Sustainability Metrics</h2>
              <p className="text-gray-600">{framework.fullName} metrics for {industry.name}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {metrics.map((m, i) => {
              const progress = Math.min((m.value / m.target) * 100, 100);
              const TrendIcon = m.trend === 'up' ? TrendingUp : m.trend === 'down' ? TrendingDown : Minus;
              const trendColor = m.trend === 'down' ? 'text-green-600' : m.trend === 'up' ? 'text-blue-600' : 'text-gray-500';
              return (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">{m.name}</span>
                    <TrendIcon className={`w-4 h-4 ${trendColor}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{typeof m.value === 'number' && m.value > 1000 ? m.value.toLocaleString() : m.value} <span className="text-sm font-normal text-gray-500">{m.unit}</span></div>
                  <div className="text-xs text-gray-500 mb-2">Target: {typeof m.target === 'number' && m.target > 1000 ? m.target.toLocaleString() : m.target} {m.unit}</div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">{m.category}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Vendors */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Solution Providers</h2>
                <p className="text-gray-600">Verified vendors for {industry.name} in {location.name}</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">{filteredVendors.length} vendors</span>
          </div>
          {filteredVendors.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <p className="text-gray-500 mb-4">No vendors found for this configuration.</p>
              <Link href="/demo/corporate" className="btn-primary">Modify Configuration</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredVendors.map((v) => (
                <div key={v.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{v.name}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${v.type === 'Product' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{v.type}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{v.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {v.solutions.slice(0, 2).map((s) => <span key={s} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">{s.replace(/_/g, ' ')}</span>)}
                  </div>
                  {v.rating && (
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="text-yellow-500 mr-1">★</span> {v.rating}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
