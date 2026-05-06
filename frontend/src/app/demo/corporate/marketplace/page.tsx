'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, Store, ShoppingCart, Star, ExternalLink, MapPin } from 'lucide-react';
import { vendors, solutions, industries, procurementItems } from '@/lib/demo-data';
import SubpageHeader from '@/components/SubpageHeader';
import DashboardNavbar from '@/components/DashboardNavbar';


export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<'vendors' | 'procurement'>('vendors');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSolution, setSelectedSolution] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredVendors = useMemo(() => {
    let result = vendors;
    if (searchTerm) result = result.filter((v) => v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.description.toLowerCase().includes(searchTerm.toLowerCase()));
    if (selectedSolution !== 'all') result = result.filter((v) => v.solutions.includes(selectedSolution));
    if (selectedType !== 'all') result = result.filter((v) => v.type === selectedType);
    return result;
  }, [searchTerm, selectedSolution, selectedType]);

  const filteredProcurement = useMemo(() => {
    if (!searchTerm) return procurementItems;
    return procurementItems.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  return (
    <div className="page-shell min-h-screen bg-white">
      <SubpageHeader subtitle="Sustainability Marketplace" backHref="/demo/corporate" backLabel="← Corporate Home" />
      <DashboardNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-8 max-w-sm">
          <button onClick={() => setActiveTab('vendors')} className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'vendors' ? 'bg-white shadow-sm text-primary-700' : 'text-gray-600 hover:text-gray-900'}`}>
            <Store className="w-4 h-4 inline mr-1.5" /> Vendors
          </button>
          <button onClick={() => setActiveTab('procurement')} className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'procurement' ? 'bg-white shadow-sm text-primary-700' : 'text-gray-600 hover:text-gray-900'}`}>
            <ShoppingCart className="w-4 h-4 inline mr-1.5" /> Procurement
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="input-field pl-10" />
          </div>
          {activeTab === 'vendors' && (
            <>
              <select value={selectedSolution} onChange={(e) => setSelectedSolution(e.target.value)} className="input-field w-auto">
                <option value="all">All Solutions</option>
                {solutions.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="input-field w-auto">
                <option value="all">All Types</option>
                <option value="Product">Product</option>
                <option value="Service">Service</option>
              </select>
            </>
          )}
          <span className="text-sm text-gray-500">{activeTab === 'vendors' ? filteredVendors.length : filteredProcurement.length} results</span>
        </div>

        {/* Vendor Grid */}
        {activeTab === 'vendors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredVendors.map((v) => (
              <div key={v.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg">{v.name}</h3>
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${v.type === 'Product' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{v.type}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{v.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {v.solutions.map((s) => <span key={s} className="px-2 py-0.5 text-xs bg-primary-50 text-primary-700 rounded-full">{s.replace(/_/g, ' ')}</span>)}
                </div>
                <div className="flex items-center justify-between text-sm">
                  {v.rating && <span className="flex items-center text-gray-600"><Star className="w-4 h-4 text-yellow-500 mr-1" />{v.rating}</span>}
                  <div className="flex items-center text-gray-500"><MapPin className="w-3 h-3 mr-1" />{v.targetRegions.join(', ')}</div>
                </div>
                {v.certifications && v.certifications.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-1">
                    {v.certifications.map((c) => <span key={c} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">{c}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Procurement Grid */}
        {activeTab === 'procurement' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProcurement.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">{p.name}</h3>
                    <span className="text-xs text-gray-500">{p.category} • {p.type}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary-700">₹{(p.price.min / 100000).toFixed(1)}L – ₹{(p.price.max / 100000).toFixed(1)}L</div>
                    <span className="text-xs text-gray-500">{p.price.unit}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{p.description}</p>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  {Object.entries(p.specifications).slice(0, 4).map(([k, v]) => (
                    <div key={k}><span className="text-gray-500">{k}:</span> <span className="font-medium text-gray-700">{v}</span></div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-600">by <strong>{p.supplier}</strong></span>
                  <button className="btn-primary text-xs py-1.5 px-4">Request Quote</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
