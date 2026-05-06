'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp, BarChart3, Search } from 'lucide-react';
import { vendorBenchmarks, peerBenchmarks } from '@/lib/demo-data';
import SubpageHeader from '@/components/SubpageHeader';
import DashboardNavbar from '@/components/DashboardNavbar';


export default function BenchmarkingPage() {
  const [activeTab, setActiveTab] = useState<'vendor' | 'peer'>('vendor');
  const [search, setSearch] = useState('');

  const fVendors = vendorBenchmarks.filter((v) => v.name.toLowerCase().includes(search.toLowerCase()));
  const fPeers = peerBenchmarks.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-shell min-h-screen bg-white">
      <SubpageHeader subtitle="Benchmarking" backHref="/demo/corporate" backLabel="← Corporate Home" />
      <DashboardNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-6 max-w-xs">
          <button onClick={() => setActiveTab('vendor')} className={`flex-1 py-2 rounded-lg text-sm font-medium ${activeTab === 'vendor' ? 'bg-white shadow-sm text-primary-700' : 'text-gray-600'}`}>Vendor</button>
          <button onClick={() => setActiveTab('peer')} className={`flex-1 py-2 rounded-lg text-sm font-medium ${activeTab === 'peer' ? 'bg-white shadow-sm text-primary-700' : 'text-gray-600'}`}>Peer</button>
        </div>
        <div className="relative mb-6 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="input-field pl-10" />
        </div>

        {activeTab === 'vendor' && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
              <thead className="bg-gray-50"><tr>
                {['Vendor','Category','GHG Reduction','Avg Cost','ROI','Payback','Satisfaction','Projects'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">{h}</th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {fVendors.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{v.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{v.category}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-green-700">{v.ghgReduction}%</td>
                    <td className="px-4 py-3 text-sm">₹{(v.avgCost / 100000).toFixed(1)}L</td>
                    <td className="px-4 py-3 text-sm font-semibold text-blue-700">{v.roi}%</td>
                    <td className="px-4 py-3 text-sm">{v.paybackPeriod} yrs</td>
                    <td className="px-4 py-3 text-sm"><span className="text-yellow-500">★</span> {v.clientSatisfaction}</td>
                    <td className="px-4 py-3 text-sm">{v.projectsDelivered}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'peer' && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
              <thead className="bg-gray-50"><tr>
                {['Company','Emissions (tCO₂e)','Scope 1','Scope 2','ESG Score','Renewable %','Net Zero','Frameworks'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">{h}</th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {fPeers.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3"><div className="font-medium text-gray-900">{p.name}</div><div className="text-xs text-gray-500">{p.ticker} • {p.region}</div></td>
                    <td className="px-4 py-3 text-sm font-semibold">{p.totalEmissions.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">{p.scope1.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">{p.scope2.toLocaleString()}</td>
                    <td className="px-4 py-3"><span className={`text-sm font-bold ${p.esgScore >= 80 ? 'text-green-700' : p.esgScore >= 60 ? 'text-yellow-700' : 'text-red-700'}`}>{p.esgScore}/100</span></td>
                    <td className="px-4 py-3 text-sm">{p.renewableEnergyShare}%</td>
                    <td className="px-4 py-3 text-sm font-medium">{p.netZeroTarget}</td>
                    <td className="px-4 py-3"><div className="flex flex-wrap gap-1">{p.reportingFramework.map((f) => <span key={f} className="px-1.5 py-0.5 text-xs bg-gray-100 rounded">{f}</span>)}</div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
