'use client';

import React from 'react';
import Link from 'next/link';
import {
  Settings,
  BarChart3,
  Building2,
  MapPin,
  FileText,
  Users,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Info,
  AlertCircle,
  ShieldCheck,
  Zap,
  Droplets,
  Leaf,
} from 'lucide-react';
import { locations, industries, frameworks, vendors } from '@/lib/demo-data';
import SubpageHeader from '@/components/SubpageHeader';
import DashboardNavbar from '@/components/DashboardNavbar';
import { useRBAC } from '@/contexts/RBACContext';
import type { SiteKPI, SiteAlert } from '@/lib/demo-data/sites';

// ─── Alert severity styles ────────────────────────────────────────────────────

const alertStyles = {
  critical: {
    border: 'border-red-200 bg-red-50',
    icon: AlertCircle,
    iconColor: 'text-red-500',
    titleColor: 'text-red-800',
    descColor: 'text-red-700',
  },
  warning: {
    border: 'border-amber-200 bg-amber-50',
    icon: AlertTriangle,
    iconColor: 'text-amber-500',
    titleColor: 'text-amber-800',
    descColor: 'text-amber-700',
  },
  info: {
    border: 'border-blue-200 bg-blue-50',
    icon: Info,
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-800',
    descColor: 'text-blue-700',
  },
} as const;

// ─── KPI status styles ────────────────────────────────────────────────────────

const statusStyles: Record<string, string> = {
  'on-track': 'bg-emerald-100 text-emerald-700',
  'at-risk':  'bg-amber-100 text-amber-700',
  'critical': 'bg-red-100 text-red-700',
};

const statusBarColor: Record<string, string> = {
  'on-track': 'bg-emerald-500',
  'at-risk':  'bg-amber-400',
  'critical': 'bg-red-500',
};

const statusLabel: Record<string, string> = {
  'on-track': 'On Track',
  'at-risk':  'At Risk',
  'critical': 'Critical',
};

const categoryIcons: Partial<Record<SiteKPI['category'], React.ElementType>> = {
  Emissions:  Leaf,
  Energy:     Zap,
  Water:      Droplets,
  Waste:      Leaf,
  Social:     Users,
  Governance: ShieldCheck,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage({
  params,
}: {
  params: { location: string; industry: string; framework: string };
}) {
  const { activeRole, activeSite } = useRBAC();

  const location  = locations.find((l) => l.code.toLowerCase() === params.location);
  const industry  = industries.find((i) => i.id === params.industry);
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

  const filteredVendors = vendors.filter(
    (v) =>
      (!v.targetRegions.length || v.targetRegions.includes(location.code)) &&
      (!v.targetIndustries.length || v.targetIndustries.includes(industry.id)),
  );

  const { kpis, alerts, compliance, energySummary, emissionsSummary } = activeSite;

  const scoreColor =
    compliance.overallScore >= 80 ? 'text-emerald-600' :
    compliance.overallScore >= 65 ? 'text-amber-600' : 'text-red-500';

  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;
  const warningCount  = alerts.filter((a) => a.severity === 'warning').length;

  const renewablePct = Math.min(
    Math.round((energySummary.renewable / energySummary.total) * 100),
    100,
  );

  return (
    <div className="page-shell min-h-screen bg-white">
      <SubpageHeader
        subtitle="Sustainability Dashboard"
        backHref="/demo/corporate"
        backLabel="← Corporate Home"
      />
      <DashboardNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{activeRole.dashboardTitle}</h1>
            <p className="text-gray-500 mt-1 text-sm">
              {activeSite.name}&nbsp;&nbsp;·&nbsp;&nbsp;
              {industry.name}&nbsp;&nbsp;·&nbsp;&nbsp;
              {framework.name}
            </p>
          </div>
          <Link
            href="/demo/corporate"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm flex-shrink-0"
          >
            <Settings className="w-4 h-4" />
            <span>Edit Config</span>
          </Link>
        </div>

        {/* ── Site + Compliance Summary ────────────────────────────────────── */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Site Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <div className="font-medium text-blue-900 text-sm leading-tight">{activeSite.shortName}</div>
                  <div className="text-xs text-blue-700">{activeSite.city}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl">
                <Building2 className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <div>
                  <div className="font-medium text-purple-900 text-sm leading-tight">{industry.name}</div>
                  <div className="text-xs text-purple-700">{activeSite.type}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl">
                <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <div className="font-medium text-green-900 text-sm leading-tight">{framework.name}</div>
                  <div className="text-xs text-green-700 leading-tight">{compliance.nextDeadline}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <div>
                  <div className={`text-xl font-bold leading-none ${scoreColor}`}>
                    {compliance.overallScore}
                    <span className="text-sm font-normal text-gray-400">/100</span>
                  </div>
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full inline-block mt-1 ${
                    compliance.reportingStatus === 'On Track' ? 'bg-emerald-100 text-emerald-700' :
                    compliance.reportingStatus === 'At Risk'  ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {compliance.reportingStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 pt-4 border-t border-gray-100">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                ✓ {compliance.tasksCompleted} Completed
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                ⧖ {compliance.tasksPending} Pending
              </span>
              {compliance.tasksCritical > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium">
                  ⚠ {compliance.tasksCritical} Critical
                </span>
              )}
              <span className="ml-auto text-xs text-gray-400 self-center">
                Framework: {compliance.framework}
              </span>
            </div>
          </div>
        </section>

        {/* ── Energy & Emissions Snapshot ──────────────────────────────────── */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="md:col-span-2 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-5 border border-emerald-200">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">Energy Consumption</span>
              </div>
              <div className="text-2xl font-bold text-emerald-900">
                {energySummary.total.toLocaleString()}
                <span className="text-sm font-normal text-emerald-700 ml-1">{energySummary.unit}</span>
              </div>
              <div className="text-xs text-emerald-600 mt-1">Total Consumption</div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 bg-emerald-200 rounded-full h-1.5">
                  <div
                    className="bg-emerald-600 h-1.5 rounded-full"
                    style={{ width: `${renewablePct}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-emerald-700 whitespace-nowrap">
                  {renewablePct}% Renewable
                </span>
              </div>
            </div>

            <div className="bg-red-50 rounded-2xl p-5 border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-4 h-4 text-red-400" />
                <span className="text-xs font-semibold text-red-700">Scope 1</span>
              </div>
              <div className="text-xl font-bold text-red-900">{emissionsSummary.scope1.toLocaleString()}</div>
              <div className="text-xs text-red-600 mt-0.5">{emissionsSummary.unit}</div>
            </div>

            <div className="bg-orange-50 rounded-2xl p-5 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-semibold text-orange-700">Scope 2</span>
              </div>
              <div className="text-xl font-bold text-orange-900">{emissionsSummary.scope2.toLocaleString()}</div>
              <div className="text-xs text-orange-600 mt-0.5">{emissionsSummary.unit}</div>
            </div>

            <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-4 h-4 text-yellow-500" />
                <span className="text-xs font-semibold text-yellow-700">Scope 3</span>
              </div>
              <div className="text-xl font-bold text-yellow-900">{emissionsSummary.scope3.toLocaleString()}</div>
              <div className="text-xs text-yellow-600 mt-0.5">{emissionsSummary.unit}</div>
            </div>
          </div>
        </section>

        {/* ── Site Alerts ──────────────────────────────────────────────────── */}
        {alerts.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-gray-900">Site Alerts</h2>
              {criticalCount > 0 && (
                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                  {criticalCount} Critical
                </span>
              )}
              {warningCount > 0 && (
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                  {warningCount} Warning
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {alerts.map((alert: SiteAlert) => {
                const s = alertStyles[alert.severity];
                const Icon = s.icon;
                return (
                  <div key={alert.id} className={`rounded-xl border p-4 ${s.border}`}>
                    <div className="flex items-start gap-3">
                      <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${s.iconColor}`} />
                      <div className="min-w-0">
                        <div className={`text-sm font-semibold ${s.titleColor}`}>{alert.title}</div>
                        <div className={`text-xs mt-1 leading-relaxed ${s.descColor}`}>{alert.description}</div>
                        <div className="text-[10px] text-gray-400 mt-1.5">
                          {new Date(alert.timestamp).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── KPI Metrics Grid ─────────────────────────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-center space-x-3 mb-6">
            <BarChart3 className="w-6 h-6 text-primary-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Sustainability KPIs</h2>
              <p className="text-gray-500 text-sm">
                {activeSite.name} &mdash; {framework.fullName}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {kpis.map((m: SiteKPI, i: number) => {
              const progress = Math.min((m.value / m.target) * 100, 100);
              const TrendIcon =
                m.trend === 'up' ? TrendingUp :
                m.trend === 'down' ? TrendingDown : Minus;
              const trendColor =
                m.trend === 'down' ? 'text-green-600' :
                m.trend === 'up' ? 'text-blue-600' : 'text-gray-500';
              const CatIcon = categoryIcons[m.category] ?? Leaf;

              return (
                <div
                  key={i}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <CatIcon className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-400 font-medium">{m.category}</span>
                    </div>
                    <TrendIcon className={`w-4 h-4 ${trendColor}`} />
                  </div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">{m.name}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-0.5">
                    {typeof m.value === 'number' && m.value > 1000
                      ? m.value.toLocaleString()
                      : m.value}
                    <span className="text-sm font-normal text-gray-400 ml-1">{m.unit}</span>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">
                    Target:{' '}
                    {typeof m.target === 'number' && m.target > 1000
                      ? m.target.toLocaleString()
                      : m.target}{' '}
                    {m.unit}
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${statusBarColor[m.status] ?? 'bg-primary-500'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className={`inline-block mt-2 px-2 py-0.5 text-xs rounded-full font-medium ${statusStyles[m.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {statusLabel[m.status] ?? m.status}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Solution Providers ──────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Solution Providers</h2>
                <p className="text-gray-500 text-sm">
                  Verified vendors for {industry.name} in {location.name}
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-400">{filteredVendors.length} vendors</span>
          </div>

          {filteredVendors.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <p className="text-gray-500 mb-4">No vendors found for this configuration.</p>
              <Link href="/demo/corporate" className="btn-primary">
                Modify Configuration
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredVendors.map((v) => (
                <div
                  key={v.id}
                  className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{v.name}</h3>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        v.type === 'Product'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {v.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{v.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {v.solutions.slice(0, 2).map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full"
                      >
                        {s.replace(/_/g, ' ')}
                      </span>
                    ))}
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
