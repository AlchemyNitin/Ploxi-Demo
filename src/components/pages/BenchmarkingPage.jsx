// src/components/pages/BenchmarkingPage.jsx
'use client'

import React, { useState } from 'react';
import {
  TrendingUp,
  Download,
  BarChart3,
  Target,
  Users,
  Building2,
  DollarSign,
  Leaf,
  Zap,
  ArrowUpDown,
  CheckCircle,
  X,
  Info
} from 'lucide-react';

// ─── VENDOR BENCHMARKING DATA ─────────────────────────────────────────────────
// Compares sustainability solution providers (vendors) across GHG reduction, cost, ROI, financing

const vendorBenchmarkData = [
  {
    id: 'quark_solar',
    name: 'Quark Solar',
    category: 'Solar Energy',
    region: 'Bangalore, IN',
    ghgReduction: 42,          // % GHG reduction achieved for clients
    avgCost: 3200000,          // INR per project
    roi: 28,                   // % ROI over 5 years
    paybackPeriod: 6.5,        // years
    financingAvailable: true,
    financingOptions: ['Green Bond', 'SIDBI Loan', 'Capex/Opex model'],
    certifications: ['IEC 61215', 'MNRE Empanelled', 'BIS'],
    clientSatisfaction: 91,
    projectsDelivered: 87,
    sustainability: { carbonNeutral: false, renewableEnergy: 100, localSourcing: 72 }
  },
  {
    id: 'furaat',
    name: 'Furaat',
    category: 'Water Management',
    region: 'Hyderabad, IN',
    ghgReduction: 18,
    avgCost: 2500000,
    roi: 22,
    paybackPeriod: 5.2,
    financingAvailable: true,
    financingOptions: ['NaBFID Green Finance', 'IREDA Loan'],
    certifications: ['ISO 14001', 'BRSR', 'CPCB Approved'],
    clientSatisfaction: 89,
    projectsDelivered: 54,
    sustainability: { carbonNeutral: false, renewableEnergy: 45, localSourcing: 78 }
  },
  {
    id: 'plastic_fischer',
    name: 'Plastic Fischer',
    category: 'Waste Management',
    region: 'Mumbai, IN',
    ghgReduction: 31,
    avgCost: 1800000,
    roi: 19,
    paybackPeriod: 7.1,
    financingAvailable: true,
    financingOptions: ['SEBI ESG Fund', 'CSR Funding', 'Impact Investment'],
    certifications: ['B-Corp', 'ISO 14001', 'GRI Certified'],
    clientSatisfaction: 92,
    projectsDelivered: 43,
    sustainability: { carbonNeutral: true, renewableEnergy: 67, localSourcing: 89 }
  },
  {
    id: 'enphase_india',
    name: 'Enphase India',
    category: 'Energy Efficiency',
    region: 'Pune, IN',
    ghgReduction: 35,
    avgCost: 4100000,
    roi: 33,
    paybackPeriod: 5.8,
    financingAvailable: true,
    financingOptions: ['Green Lease', 'EESL RESCO Model', 'IREDA'],
    certifications: ['ECBC Compliant', 'BEE Star Rated', 'ISO 50001'],
    clientSatisfaction: 88,
    projectsDelivered: 121,
    sustainability: { carbonNeutral: false, renewableEnergy: 88, localSourcing: 61 }
  },
  {
    id: 'eco_restore',
    name: 'EcoRestore',
    category: 'Nature-Based Solutions',
    region: 'Chennai, IN',
    ghgReduction: 24,
    avgCost: 900000,
    roi: 14,
    paybackPeriod: 9.3,
    financingAvailable: true,
    financingOptions: ['Carbon Credit Revenue', 'NABARD Fund', 'Blended Finance'],
    certifications: ['VCS Verified', 'Gold Standard', 'IUCN NbS Standard'],
    clientSatisfaction: 85,
    projectsDelivered: 29,
    sustainability: { carbonNeutral: true, renewableEnergy: 40, localSourcing: 95 }
  }
];

// ─── PEER BENCHMARKING DATA ────────────────────────────────────────────────────
// Compares similar companies (real estate sector) on overall emissions & activities
// sourced from publicly available Sustainability Reports

const peerBenchmarkData = [
  {
    id: 'godrej_properties',
    name: 'Godrej Properties',
    ticker: 'GPL',
    region: 'Pan-India',
    totalEmissions: 124500,    // tCO2e Scope 1+2
    scope1: 18200,
    scope2: 106300,
    scope3Reported: true,
    energyIntensity: 82,       // kWh per sqft
    waterIntensity: 1.4,       // KL per sqft
    wasteRecycled: 71,         // %
    greenBuildingCoverage: 89, // % portfolio LEED/GRIHA certified
    esgScore: 78,
    reportingFramework: ['GRI', 'BRSR', 'TCFD'],
    netZeroTarget: 2035,
    renewableEnergyShare: 34,
    revenueSize: '₹4,200 Cr',
    sustainabilityReport: '2023-24'
  },
  {
    id: 'prestige_estates',
    name: 'Prestige Estates',
    ticker: 'PRESTIGE',
    region: 'South India',
    totalEmissions: 198700,
    scope1: 31400,
    scope2: 167300,
    scope3Reported: false,
    energyIntensity: 97,
    waterIntensity: 1.8,
    wasteRecycled: 58,
    greenBuildingCoverage: 62,
    esgScore: 64,
    reportingFramework: ['GRI', 'BRSR'],
    netZeroTarget: 2045,
    renewableEnergyShare: 18,
    revenueSize: '₹6,900 Cr',
    sustainabilityReport: '2023-24'
  },
  {
    id: 'dlf',
    name: 'DLF Limited',
    ticker: 'DLF',
    region: 'North India / NCR',
    totalEmissions: 312000,
    scope1: 52000,
    scope2: 260000,
    scope3Reported: true,
    energyIntensity: 104,
    waterIntensity: 2.1,
    wasteRecycled: 68,
    greenBuildingCoverage: 75,
    esgScore: 71,
    reportingFramework: ['GRI', 'BRSR', 'CDP'],
    netZeroTarget: 2040,
    renewableEnergyShare: 27,
    revenueSize: '₹14,500 Cr',
    sustainabilityReport: '2023-24'
  },
  {
    id: 'brigade_group',
    name: 'Brigade Group',
    ticker: 'BRIGADE',
    region: 'South India',
    totalEmissions: 89200,
    scope1: 14100,
    scope2: 75100,
    scope3Reported: false,
    energyIntensity: 79,
    waterIntensity: 1.3,
    wasteRecycled: 74,
    greenBuildingCoverage: 81,
    esgScore: 73,
    reportingFramework: ['GRI', 'BRSR'],
    netZeroTarget: 2038,
    renewableEnergyShare: 31,
    revenueSize: '₹3,700 Cr',
    sustainabilityReport: '2023-24'
  },
  {
    id: 'sobha_ltd',
    name: 'Sobha Ltd',
    ticker: 'SOBHA',
    region: 'South India / Bangalore',
    totalEmissions: 76400,
    scope1: 12800,
    scope2: 63600,
    scope3Reported: false,
    energyIntensity: 74,
    waterIntensity: 1.2,
    wasteRecycled: 66,
    greenBuildingCoverage: 68,
    esgScore: 69,
    reportingFramework: ['BRSR'],
    netZeroTarget: 2042,
    renewableEnergyShare: 22,
    revenueSize: '₹3,100 Cr',
    sustainabilityReport: '2023-24'
  }
];

// ─── VENDOR BENCHMARKING VIEW ─────────────────────────────────────────────────
const VendorBenchmarking = () => {
  const [selected, setSelected] = useState([]);
  const [sortKey, setSortKey] = useState('ghgReduction');
  const [showFinancing, setShowFinancing] = useState(null);

  const sorted = [...vendorBenchmarkData].sort((a, b) => b[sortKey] - a[sortKey]);

  const toggle = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const selectedVendors = vendorBenchmarkData.filter(v => selected.includes(v.id));

  const sortOptions = [
    { key: 'ghgReduction', label: 'GHG Reduction %' },
    { key: 'roi', label: 'ROI %' },
    { key: 'clientSatisfaction', label: 'Client Satisfaction' },
    { key: 'projectsDelivered', label: 'Projects Delivered' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-gray-600 font-medium">Sort by:</span>
        {sortOptions.map(opt => (
          <button key={opt.key} onClick={() => setSortKey(opt.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${sortKey === opt.key ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {opt.label}
          </button>
        ))}
        <span className="ml-auto text-sm text-gray-500">Select up to 4 vendors to compare</span>
      </div>

      {/* Vendor cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sorted.map(vendor => {
          const isSelected = selected.includes(vendor.id);
          return (
            <div key={vendor.id} onClick={() => toggle(vendor.id)}
              className={`cursor-pointer rounded-xl border-2 p-5 transition-all duration-200 ${isSelected ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-sm'}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">{vendor.name}</h3>
                  <span className="text-xs text-gray-500">{vendor.category} • {vendor.region}</span>
                </div>
                {isSelected && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-green-50 rounded-lg p-2 text-center">
                  <div className="text-xl font-bold text-green-700">{vendor.ghgReduction}%</div>
                  <div className="text-xs text-gray-600">GHG Reduction</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-2 text-center">
                  <div className="text-xl font-bold text-blue-700">{vendor.roi}%</div>
                  <div className="text-xs text-gray-600">5-yr ROI</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-2 text-center">
                  <div className="text-xl font-bold text-purple-700">{vendor.paybackPeriod}y</div>
                  <div className="text-xs text-gray-600">Payback Period</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-2 text-center">
                  <div className="text-xl font-bold text-orange-700">₹{(vendor.avgCost / 100000).toFixed(1)}L</div>
                  <div className="text-xs text-gray-600">Avg. Cost</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {vendor.certifications.map(c => (
                  <span key={c} className="text-xs bg-gray-100 text-gray-700 rounded px-1.5 py-0.5">{c}</span>
                ))}
              </div>

              {vendor.financingAvailable && (
                <button onClick={(e) => { e.stopPropagation(); setShowFinancing(showFinancing === vendor.id ? null : vendor.id); }}
                  className="w-full text-left text-xs text-green-700 font-medium flex items-center gap-1 hover:underline">
                  <DollarSign className="w-3 h-3" /> Financing available — {vendor.financingOptions.length} options
                </button>
              )}
              {showFinancing === vendor.id && (
                <div className="mt-2 p-2 bg-green-50 rounded-lg border border-green-200">
                  {vendor.financingOptions.map(f => (
                    <div key={f} className="text-xs text-green-800 flex items-center gap-1.5 py-0.5">
                      <CheckCircle className="w-3 h-3" /> {f}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Comparison Table */}
      {selectedVendors.length >= 2 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-900">Side-by-Side Comparison ({selectedVendors.length} vendors)</h3>
            <button onClick={() => setSelected([])} className="text-sm text-red-600 hover:underline flex items-center gap-1">
              <X className="w-3 h-3" /> Clear selection
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 font-semibold text-gray-700 w-40">Metric</th>
                {selectedVendors.map(v => (
                  <th key={v.id} className="p-3 font-semibold text-gray-700 text-center">{v.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Category', key: null, render: v => v.category },
                { label: 'GHG Reduction', key: 'ghgReduction', render: v => `${v.ghgReduction}%`, highlightMax: true },
                { label: 'Avg. Project Cost', key: 'avgCost', render: v => `₹${(v.avgCost / 100000).toFixed(1)}L`, highlightMin: true },
                { label: '5-yr ROI', key: 'roi', render: v => `${v.roi}%`, highlightMax: true },
                { label: 'Payback Period', key: 'paybackPeriod', render: v => `${v.paybackPeriod} yrs`, highlightMin: true },
                { label: 'Client Satisfaction', key: 'clientSatisfaction', render: v => `${v.clientSatisfaction}%`, highlightMax: true },
                { label: 'Projects Delivered', key: 'projectsDelivered', render: v => v.projectsDelivered, highlightMax: true },
                { label: 'Financing Options', key: null, render: v => v.financingOptions.length > 0 ? v.financingOptions.join(', ') : 'None' },
              ].map(row => {
                const vals = selectedVendors.map(v => row.key ? v[row.key] : null);
                const best = row.highlightMax ? Math.max(...vals) : row.highlightMin ? Math.min(...vals) : null;
                return (
                  <tr key={row.label} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-700">{row.label}</td>
                    {selectedVendors.map(v => {
                      const val = row.key ? v[row.key] : null;
                      const isBest = best !== null && val === best;
                      return (
                        <td key={v.id} className={`p-3 text-center ${isBest ? 'text-green-700 font-bold bg-green-50' : 'text-gray-700'}`}>
                          {row.render(v)}
                          {isBest && <span className="ml-1 text-xs">★</span>}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selectedVendors.length === 0 && (
        <div className="text-center py-10 bg-white rounded-xl border border-gray-200 text-gray-500">
          Click any vendor cards above to compare them side-by-side (select 2–4)
        </div>
      )}
    </div>
  );
};

// ─── PEER BENCHMARKING VIEW ───────────────────────────────────────────────────
const PeerBenchmarking = () => {
  const [selected, setSelected] = useState([]);
  const [sortKey, setSortKey] = useState('totalEmissions');
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key) => {
    if (sortKey === key) setSortAsc(a => !a);
    else { setSortKey(key); setSortAsc(true); }
  };

  const sorted = [...peerBenchmarkData].sort((a, b) =>
    sortAsc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]
  );

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const selectedPeers = peerBenchmarkData.filter(p => selected.includes(p.id));

  const metrics = [
    { key: 'totalEmissions', label: 'Total Emissions (tCO₂e)', format: v => v.totalEmissions.toLocaleString(), lowerBetter: true },
    { key: 'energyIntensity', label: 'Energy Intensity (kWh/sqft)', format: v => v.energyIntensity, lowerBetter: true },
    { key: 'waterIntensity', label: 'Water Intensity (KL/sqft)', format: v => v.waterIntensity, lowerBetter: true },
    { key: 'wasteRecycled', label: 'Waste Recycled %', format: v => `${v.wasteRecycled}%`, lowerBetter: false },
    { key: 'renewableEnergyShare', label: 'Renewable Energy %', format: v => `${v.renewableEnergyShare}%`, lowerBetter: false },
    { key: 'greenBuildingCoverage', label: 'Green Building Coverage %', format: v => `${v.greenBuildingCoverage}%`, lowerBetter: false },
    { key: 'esgScore', label: 'ESG Score', format: v => v.esgScore, lowerBetter: false },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          Data sourced from publicly available Sustainability Reports (FY 2023-24) of major Indian real-estate companies listed on BSE/NSE. Scope 1 & 2 emissions shown. Scope 3 where reported.
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-700 w-8"></th>
              <th className="text-left p-3 font-semibold text-gray-700">Company</th>
              {metrics.map(m => (
                <th key={m.key} onClick={() => handleSort(m.key)}
                  className="p-3 text-center font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 whitespace-nowrap select-none">
                  <span className="flex items-center justify-center gap-1">
                    {m.label.split('(')[0].trim()}
                    <ArrowUpDown className="w-3 h-3 opacity-60" />
                  </span>
                  {m.label.includes('(') && <div className="text-xs font-normal text-gray-400">({m.label.split('(')[1].replace(')', '')})</div>}
                </th>
              ))}
              <th className="p-3 text-center font-semibold text-gray-700">Net-Zero Target</th>
              <th className="p-3 text-center font-semibold text-gray-700">Frameworks</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(peer => {
              const isSelected = selected.includes(peer.id);
              return (
                <tr key={peer.id} onClick={() => toggle(peer.id)}
                  className={`border-t border-gray-100 cursor-pointer transition-colors ${isSelected ? 'bg-green-50' : 'hover:bg-gray-50'}`}>
                  <td className="p-3">
                    {isSelected ? <CheckCircle className="w-4 h-4 text-green-600" /> : <div className="w-4 h-4 border border-gray-300 rounded" />}
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-gray-900">{peer.name}</div>
                    <div className="text-xs text-gray-500">{peer.ticker} • {peer.region}</div>
                    <div className="text-xs text-gray-400">{peer.revenueSize} revenue</div>
                  </td>
                  {metrics.map(m => {
                    const allVals = peerBenchmarkData.map(p => p[m.key]);
                    const best = m.lowerBetter ? Math.min(...allVals) : Math.max(...allVals);
                    const isBest = peer[m.key] === best;
                    return (
                      <td key={m.key} className={`p-3 text-center ${isBest ? 'text-green-700 font-bold' : 'text-gray-700'}`}>
                        {m.format(peer)}
                        {isBest && <span className="ml-0.5 text-xs">★</span>}
                      </td>
                    );
                  })}
                  <td className="p-3 text-center text-gray-700">{peer.netZeroTarget}</td>
                  <td className="p-3 text-center">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {peer.reportingFramework.map(f => (
                        <span key={f} className="text-xs bg-indigo-100 text-indigo-700 rounded px-1.5 py-0.5">{f}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mini comparison for selected peers */}
      {selectedPeers.length >= 2 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Emissions Breakdown — Selected Peers</h3>
            <button onClick={() => setSelected([])} className="text-sm text-red-600 hover:underline">Clear</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedPeers.map(peer => (
              <div key={peer.id} className="border border-gray-200 rounded-lg p-4">
                <div className="font-semibold text-gray-900 mb-3">{peer.name}</div>
                <div className="space-y-2">
                  {[
                    { label: 'Scope 1', value: peer.scope1, color: 'bg-red-400' },
                    { label: 'Scope 2', value: peer.scope2, color: 'bg-orange-400' },
                  ].map(scope => {
                    const pct = Math.round((scope.value / peer.totalEmissions) * 100);
                    return (
                      <div key={scope.label}>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>{scope.label}</span>
                          <span>{scope.value.toLocaleString()} tCO₂e ({pct}%)</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${scope.color} rounded-full`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                  <div className="text-xs text-gray-500 mt-2">
                    Scope 3: {peer.scope3Reported ? 'Reported' : 'Not yet reported'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const BenchmarkingPage = () => {
  const [activeTab, setActiveTab] = useState('vendor');

  const tabs = [
    {
      id: 'vendor',
      name: 'Vendor Benchmarking',
      icon: Users,
      description: 'Compare solutions on GHG, cost, ROI & financing'
    },
    {
      id: 'peer',
      name: 'Peer Benchmarking',
      icon: Building2,
      description: 'Compare industry peers on overall emissions & activities'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center p-10">
          <h1 className="text-3xl font-bold text-white mb-4">ESG Benchmarking & Analysis</h1>
          <p className="text-gray-200 max-w-3xl mx-auto">
            Benchmark sustainability solution providers on performance and cost, or compare your organisation against sector peers using publicly available sustainability data.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex flex-wrap gap-4 mb-6">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-lg font-medium transition-all duration-200
                  ${activeTab === tab.id
                      ? 'bg-[#e9f1ea] text-green-700 border-2 border-green-200'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'}`}>
                  <Icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">{tab.name}</div>
                    <div className="text-xs opacity-75">{tab.description}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {activeTab === 'vendor' && <VendorBenchmarking />}
          {activeTab === 'peer' && <PeerBenchmarking />}
        </div>
      </div>
    </div >
  );
};

export default BenchmarkingPage;
