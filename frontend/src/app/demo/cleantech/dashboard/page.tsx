'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  LayoutDashboard, User, Edit, Handshake, FileText, TrendingUp,
  ShoppingCart, Eye, MessageSquare, Send, LogOut, Menu, Download,
  DollarSign, Package, CheckCircle, ArrowRight, Plus
} from 'lucide-react';

const mockVendor = {
  companyName: 'Clean Tech Solutions', serviceName: 'Advanced Solar Panel Systems',
  category: 'Renewable Energy', shortDescription: 'Leading provider of efficient solar energy solutions',
  detailedDescription: 'We provide cutting-edge solar panel systems with 22% efficiency and 25-year warranty for commercial and industrial applications.',
  contactEmail: 'contact@cleantech.com', location: 'Bangalore, India',
  yearFounded: '2020', teamSize: '11-50 employees',
};

const mockEnquiries = [
  { id: 1, company: 'Tech Industries Ltd', contactPerson: 'John Smith', email: 'john@tech.com', message: 'Interested in solar panel installation.', date: '2025-10-10', status: 'new', priority: 'high' },
  { id: 2, company: 'Green Corp', contactPerson: 'Sarah Johnson', email: 'sarah@green.com', message: 'Looking for a quote on renewables.', date: '2025-10-08', status: 'responded', priority: 'medium' },
];

const mockDeals = [
  { id: 1, title: 'Solar Installation - Tech Industries', company: 'Tech Industries', value: 250000, status: 'in-progress', progress: 60, startDate: '2025-09-15', expectedCompletion: '2025-11-30' },
  { id: 2, title: 'Energy Audit - Green Corp', company: 'Green Corp', value: 180000, status: 'negotiation', progress: 30, startDate: '2025-10-01', expectedCompletion: '2025-12-15' },
];

const navItems = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'about', label: 'About', icon: User },
  { id: 'deals', label: 'Deals', icon: Handshake },
  { id: 'enquiries', label: 'Enquiries', icon: MessageSquare },
  { id: 'views', label: 'Views', icon: Eye },
  { id: 'sell', label: 'Sell', icon: ShoppingCart },
];

export default function CleanTechDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const stats = { views: 1247, enquiries: 23, activeDeals: 5, revenue: 450000 };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b-2 border-gray-200 sticky top-[36px] z-50 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"><Menu className="w-6 h-6 text-gray-600" /></button>
              <div className="flex items-center space-x-3">
                <Image src="/images/logo.jpeg" alt="Ploxi" width={40} height={40} className="h-10 w-10 object-contain rounded-lg" />
                <div><h1 className="text-xl font-bold text-gray-900">Ploxi</h1><p className="text-xs text-gray-600">{mockVendor.companyName}</p></div>
              </div>
            </div>
            <Link href="/demo/cleantech" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"><LogOut className="w-4 h-4" /><span className="hidden sm:inline">Exit</span></Link>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed lg:sticky lg:translate-x-0 top-[100px] left-0 z-40 h-[calc(100vh-100px)] w-64 bg-white border-r-2 border-gray-200 transition-transform overflow-y-auto flex flex-col`}>
          <nav className="p-4 space-y-1 flex-grow">
            {navItems.map((item) => { const Icon = item.icon; const isActive = activeTab === item.id; return (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-50 text-blue-600 font-semibold border-2 border-blue-200' : 'text-gray-700 hover:bg-gray-100'}`}>
                <Icon className="w-5 h-5" /><span>{item.label}</span>
              </button>
            ); })}
          </nav>

          {/* User Section */}
          <div className="border-t border-gray-200 p-4 space-y-3">
            <div className="flex items-center space-x-3 px-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">CT</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">Clean Tech Solutions</p>
                <p className="text-xs text-gray-500">Vendor Account</p>
              </div>
            </div>
            <Link href="/demo/cleantech" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Sign Out</span>
            </Link>
          </div>
        </aside>

        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        <main className="flex-1 p-6 lg:p-8 bg-gray-50 min-h-[calc(100vh-100px)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div><h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2><p className="text-gray-600 mt-1">Welcome back! Here&apos;s your performance summary</p></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[{ label: 'Total Views', value: stats.views.toLocaleString(), icon: Eye, color: 'bg-blue-100 text-blue-600', change: '+12%' },
                  { label: 'Enquiries', value: stats.enquiries, icon: MessageSquare, color: 'bg-green-100 text-green-600', change: '+5' },
                  { label: 'Active Deals', value: stats.activeDeals, icon: Handshake, color: 'bg-purple-100 text-purple-600', change: '+2' },
                  { label: 'Revenue', value: `₹${(stats.revenue / 1000).toFixed(0)}K`, icon: DollarSign, color: 'bg-orange-100 text-orange-600', change: '+18%' }
                ].map((s, i) => { const Icon = s.icon; return (
                  <div key={i} className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4"><div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center`}><Icon className="w-6 h-6" /></div><span className="text-green-600 text-sm font-semibold">{s.change}</span></div>
                    <h3 className="text-gray-600 text-sm mb-1">{s.label}</h3><p className="text-3xl font-bold text-gray-900">{s.value}</p>
                  </div>); })}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
                  <div className="flex items-center justify-between mb-6"><h3 className="text-xl font-bold text-gray-900">Recent Enquiries</h3><button onClick={() => setActiveTab('enquiries')} className="text-blue-600 text-sm font-medium">View All →</button></div>
                  <div className="space-y-4">{mockEnquiries.map((e) => (
                    <div key={e.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-start justify-between mb-2"><div><p className="font-semibold text-gray-900">{e.company}</p><p className="text-sm text-gray-600">{e.contactPerson}</p></div>
                        <span className={`px-2 py-1 text-xs rounded-full ${e.status === 'new' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{e.status}</span></div>
                      <p className="text-sm text-gray-700 line-clamp-2">{e.message}</p>
                    </div>))}</div>
                </div>
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
                  <div className="flex items-center justify-between mb-6"><h3 className="text-xl font-bold text-gray-900">Active Deals</h3><button onClick={() => setActiveTab('deals')} className="text-blue-600 text-sm font-medium">View All →</button></div>
                  <div className="space-y-4">{mockDeals.map((d) => (
                    <div key={d.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-start justify-between mb-3"><div><p className="font-semibold text-gray-900">{d.title}</p><p className="text-sm text-gray-600">₹{d.value.toLocaleString()}</p></div>
                        <span className={`px-2 py-1 text-xs rounded-full ${d.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{d.status}</span></div>
                      <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full" style={{ width: `${d.progress}%` }} /></div>
                      <p className="text-xs text-gray-600 mt-1">Progress: {d.progress}%</p>
                    </div>))}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">About Your Listing</h2>
              <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">{mockVendor.serviceName}</h3>
                  <p className="text-blue-100 text-lg">{mockVendor.companyName}</p>
                  <span className="mt-3 inline-block px-3 py-1 bg-white/20 rounded-full text-sm">{mockVendor.category}</span>
                </div>
                <div className="p-8 space-y-4">
                  <div><h4 className="text-xl font-bold text-gray-900 mb-2">Description</h4><p className="text-gray-700">{mockVendor.detailedDescription}</p></div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Contact</h4>
                      <p className="text-gray-700">{mockVendor.contactEmail}</p><p className="text-gray-700">{mockVendor.location}</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Company</h4>
                      <p className="text-gray-700">Founded: {mockVendor.yearFounded}</p><p className="text-gray-700">Team: {mockVendor.teamSize}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'deals' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Your Deals</h2>
              {mockDeals.map((d) => (
                <div key={d.id} className="bg-white rounded-2xl p-6 border-2 border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div><h3 className="text-xl font-bold text-gray-900">{d.title}</h3><p className="text-2xl font-bold text-green-600 mt-1">₹{d.value.toLocaleString()}</p></div>
                    <span className={`px-4 py-2 rounded-xl font-semibold ${d.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{d.status.toUpperCase()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2"><div className="bg-blue-600 h-3 rounded-full" style={{ width: `${d.progress}%` }} /></div>
                  <p className="text-sm text-gray-600">Progress: {d.progress}% • {d.startDate} → {d.expectedCompletion}</p>
                </div>))}
            </div>
          )}

          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Enquiries</h2>
              {mockEnquiries.map((e) => (
                <div key={e.id} className="bg-white rounded-2xl p-6 border-2 border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div><h3 className="text-lg font-bold text-gray-900">{e.company}</h3><p className="text-gray-600">{e.contactPerson} • {e.email}</p></div>
                    <span className={`px-3 py-1 text-xs rounded-full font-semibold ${e.status === 'new' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{e.status}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{e.message}</p>
                  <p className="text-xs text-gray-500">{e.date}</p>
                </div>))}
            </div>
          )}

          {activeTab === 'views' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Analytics & Views</h2>
              <div className="grid grid-cols-3 gap-6">
                {[{ label: 'Total Views', value: '1,247', change: '+12%' }, { label: 'Unique Visitors', value: '892', change: '+8%' }, { label: 'Avg. Time', value: '2m 34s', change: '+15%' }].map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border-2 border-gray-100">
                    <p className="text-gray-600 mb-2">{s.label}</p><p className="text-3xl font-bold text-gray-900 mb-2">{s.value}</p>
                    <span className="text-green-600 font-semibold text-sm">{s.change}</span>
                  </div>))}
              </div>
              <div className="bg-white rounded-2xl p-8 border-2 border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Views Over Time</h3>
                <div className="h-48 flex items-end justify-between space-x-2">
                  {[45,52,48,65,72,68,85,92,88,95,105,120].map((h, i) => (
                    <div key={i} className="flex-1 bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-colors" style={{ height: `${h}%` }} />))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m) => <span key={m}>{m}</span>)}</div>
              </div>
            </div>
          )}

          {activeTab === 'sell' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Marketplace Listings</h2>
              <div className="bg-white rounded-2xl p-8 border-2 border-gray-100">
                <div className="flex items-center justify-between mb-6"><div><h3 className="text-xl font-bold text-gray-900">Your Active Listings</h3></div>
                  <Link href="/demo/cleantech/add-listing" className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center"><Plus className="w-5 h-5 mr-2" />Add New Listing</Link></div>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
                  <div className="flex items-start space-x-4">
                    <Package className="w-12 h-12 text-gray-400" />
                    <div><h4 className="font-semibold text-gray-900 mb-1">{mockVendor.serviceName}</h4><p className="text-sm text-gray-600 mb-3">{mockVendor.shortDescription}</p>
                      <div className="flex items-center space-x-4 text-sm"><span className="text-green-600 font-medium flex items-center"><CheckCircle className="w-4 h-4 mr-1" />Active</span><span className="text-gray-600">{stats.views} views</span></div></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
