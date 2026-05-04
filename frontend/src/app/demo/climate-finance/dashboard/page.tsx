'use client';

import React, { useState } from 'react';
import {
  TrendingUp, Calendar, DollarSign, Leaf, BarChart3, ArrowUpRight
} from 'lucide-react';
import SubpageHeader from '@/components/SubpageHeader';

const mockPortfolio = {
  totalInvested: 12500000,
  totalReturns: 1875000,
  carbonOffset: 4200,
  activeProjects: 8,
};

const mockOpportunities = [
  { id: 1, name: 'Solar Farm — Rajasthan', type: 'Renewable Energy', region: 'India', minInvestment: 500000, expectedReturn: '14-18%', carbonImpact: '1,200 tCO₂e/yr', risk: 'Low', status: 'Open', timeline: '5 years', verified: true },
  { id: 2, name: 'Wind Energy Portfolio — Tamil Nadu', type: 'Renewable Energy', region: 'India', minInvestment: 1000000, expectedReturn: '12-16%', carbonImpact: '2,500 tCO₂e/yr', risk: 'Medium', status: 'Open', timeline: '7 years', verified: true },
  { id: 3, name: 'Green Building Fund — Dubai', type: 'Real Estate', region: 'UAE', minInvestment: 2000000, expectedReturn: '10-14%', carbonImpact: '800 tCO₂e/yr', risk: 'Low', status: 'Open', timeline: '4 years', verified: true },
  { id: 4, name: 'Carbon Credit Fund — EU ETS', type: 'Carbon Markets', region: 'EU', minInvestment: 300000, expectedReturn: '8-22%', carbonImpact: '5,000 tCO₂e/yr', risk: 'High', status: 'Open', timeline: '3 years', verified: true },
  { id: 5, name: 'EV Charging Network — US West', type: 'Transport', region: 'US', minInvestment: 750000, expectedReturn: '15-20%', carbonImpact: '3,200 tCO₂e/yr', risk: 'Medium', status: 'Coming Soon', timeline: '6 years', verified: false },
  { id: 6, name: 'Waste-to-Energy Plant — Maharashtra', type: 'Waste Management', region: 'India', minInvestment: 1500000, expectedReturn: '11-15%', carbonImpact: '1,800 tCO₂e/yr', risk: 'Medium', status: 'Open', timeline: '8 years', verified: true },
];

const mockEvents = [
  { id: 1, title: 'Green Finance Summit 2025', date: '2025-11-15', location: 'Mumbai', type: 'Conference' },
  { id: 2, title: 'Carbon Markets Workshop', date: '2025-11-22', location: 'Virtual', type: 'Workshop' },
  { id: 3, title: 'ESG Investing Masterclass', date: '2025-12-05', location: 'Dubai', type: 'Masterclass' },
];

export default function ClimateFinanceDashboard() {
  const [activeTab, setActiveTab] = useState<'opportunities' | 'portfolio' | 'events'>('opportunities');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const filtered = mockOpportunities.filter((o) => {
    if (filterRegion !== 'all' && o.region !== filterRegion) return false;
    if (filterType !== 'all' && o.type !== filterType) return false;
    return true;
  });

  const riskColor: Record<string, string> = { Low: 'bg-green-100 text-green-700', Medium: 'bg-yellow-100 text-yellow-700', High: 'bg-red-100 text-red-700' };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <SubpageHeader subtitle="Investor Dashboard" backHref="/demo/climate-finance" backLabel="← Climate Finance Home" variant="dark" />

      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-80 bg-gradient-to-br from-emerald-900/30 via-gray-950 to-teal-900/20" />
        {/* Portfolio Stats */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Invested', value: `₹${(mockPortfolio.totalInvested / 100000).toFixed(0)}L`, icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10', change: '+12%' },
            { label: 'Returns', value: `₹${(mockPortfolio.totalReturns / 100000).toFixed(0)}L`, icon: TrendingUp, color: 'text-teal-400', bg: 'bg-teal-500/10', change: '+15%' },
            { label: 'Carbon Offset', value: `${mockPortfolio.carbonOffset.toLocaleString()} tCO₂e`, icon: Leaf, color: 'text-green-400', bg: 'bg-green-500/10', change: '+8%' },
            { label: 'Active Projects', value: mockPortfolio.activeProjects, icon: BarChart3, color: 'text-cyan-400', bg: 'bg-cyan-500/10', change: '+2' },
          ].map((s, i) => { const Icon = s.icon; return (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}><Icon className={`w-5 h-5 ${s.color}`} /></div>
                <span className="text-emerald-400 text-sm font-medium flex items-center"><ArrowUpRight className="w-3 h-3 mr-0.5" />{s.change}</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">{s.label}</p>
              <p className="text-2xl font-bold">{s.value}</p>
            </div>
          ); })}
        </div>

        {/* Tabs */}
        <div className="relative z-10 flex space-x-1 bg-gray-900 rounded-xl p-1 mb-8 max-w-md border border-gray-800">
          {(['opportunities', 'portfolio', 'events'] as const).map((t) => (
            <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all capitalize ${activeTab === t ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Opportunities */}
        {activeTab === 'opportunities' && (
          <div className="relative z-10">
            <div className="flex flex-wrap gap-3 mb-6">
              <select value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)} className="bg-gray-900 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 text-sm">
                <option value="all">All Regions</option><option value="India">India</option><option value="EU">EU</option><option value="US">US</option><option value="UAE">UAE</option>
              </select>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="bg-gray-900 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 text-sm">
                <option value="all">All Types</option><option value="Renewable Energy">Renewable Energy</option><option value="Real Estate">Real Estate</option><option value="Carbon Markets">Carbon Markets</option><option value="Transport">Transport</option><option value="Waste Management">Waste Management</option>
              </select>
              <span className="text-gray-500 text-sm self-center">{filtered.length} opportunities</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((o) => (
                <div key={o.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{o.name}</h3>
                      <p className="text-sm text-gray-400">{o.type} • {o.region}</p>
                    </div>
                    {o.verified && <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">Verified</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div><span className="text-gray-500">Min Investment</span><div className="font-semibold text-emerald-400">₹{(o.minInvestment / 100000).toFixed(1)}L</div></div>
                    <div><span className="text-gray-500">Expected Return</span><div className="font-semibold">{o.expectedReturn}</div></div>
                    <div><span className="text-gray-500">Carbon Impact</span><div className="font-semibold text-green-400">{o.carbonImpact}</div></div>
                    <div><span className="text-gray-500">Timeline</span><div className="font-semibold">{o.timeline}</div></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${riskColor[o.risk]}`}>{o.risk} Risk</span>
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium ${o.status === 'Open' ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-gray-800 text-gray-400 cursor-not-allowed'}`} disabled={o.status !== 'Open'}>
                      {o.status === 'Open' ? 'Invest Now' : 'Coming Soon'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Portfolio */}
        {activeTab === 'portfolio' && (
          <div className="relative z-10 space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">Portfolio Allocation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  {[
                    { name: 'Renewable Energy', pct: 45, color: 'bg-emerald-500' },
                    { name: 'Carbon Markets', pct: 20, color: 'bg-teal-500' },
                    { name: 'Green Real Estate', pct: 20, color: 'bg-cyan-500' },
                    { name: 'Waste Management', pct: 15, color: 'bg-green-500' },
                  ].map((a) => (
                    <div key={a.name}>
                      <div className="flex justify-between text-sm mb-1"><span className="text-gray-300">{a.name}</span><span className="font-medium">{a.pct}%</span></div>
                      <div className="w-full bg-gray-800 rounded-full h-2.5"><div className={`${a.color} h-2.5 rounded-full`} style={{ width: `${a.pct}%` }} /></div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
                  <h4 className="font-semibold">Performance Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-500">IRR</span><div className="text-lg font-bold text-emerald-400">15.2%</div></div>
                    <div><span className="text-gray-500">MOIC</span><div className="text-lg font-bold">1.15x</div></div>
                    <div><span className="text-gray-500">Total Carbon Impact</span><div className="text-lg font-bold text-green-400">4,200 tCO₂e</div></div>
                    <div><span className="text-gray-500">SDG Alignment</span><div className="text-lg font-bold">7, 11, 13</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events */}
        {activeTab === 'events' && (
          <div className="relative z-10 space-y-4">
            {mockEvents.map((ev) => (
              <div key={ev.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center justify-between hover:border-emerald-500/30 transition-all">
                <div className="flex items-center space-x-5">
                  <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center"><Calendar className="w-6 h-6 text-emerald-400" /></div>
                  <div>
                    <h3 className="font-semibold text-lg">{ev.title}</h3>
                    <p className="text-sm text-gray-400">{ev.date} • {ev.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">{ev.type}</span>
                  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium">Register</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
