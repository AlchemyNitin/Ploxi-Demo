// src/components/pages/ServicesProjectsPage.jsx
'use client'

import React, { useState } from 'react';
import {
  ShoppingCart,
  Trash2,
  Edit3,
  Plus,
  Minus,
  FileText,
  Shield,
  Briefcase,
  Package,
  Calculator,
  Send,
  X,
  Check,
  BarChart2,
  Calendar,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { useCart, CART_ITEM_TYPES } from '@/contexts/CartContext';

// ─── DUMMY PROJECT DATA ────────────────────────────────────────────────────────
const dummyProjects = [
  {
    id: 'proj_solar',
    name: 'Rooftop Solar Installation — HQ Campus',
    category: 'Energy',
    status: 'in-progress',
    priority: 'high',
    lead: 'Ananya Sharma',
    team: ['Ananya Sharma', 'Ravi Kumar', 'Priya Nair'],
    budget: 4200000,
    spent: 2900000,
    startDate: '2025-09-01',
    endDate: '2026-03-31',
    progress: 68,
    milestones: [
      { name: 'Site Survey', date: '2025-09-15', done: true },
      { name: 'DISCOM Approval', date: '2025-10-30', done: true },
      { name: 'Panel Installation', date: '2026-01-15', done: true },
      { name: 'Grid Commissioning', date: '2026-02-28', done: false },
      { name: 'BSNL Meter Setup', date: '2026-03-31', done: false },
    ],
    ghgReduction: '420 tCO₂e/yr',
    vendor: 'Quark Solar'
  },
  {
    id: 'proj_water',
    name: 'STP Upgrade — Whitefield Facility',
    category: 'Water',
    status: 'completed',
    priority: 'medium',
    lead: 'Karan Mehta',
    team: ['Karan Mehta', 'Deepika Rao'],
    budget: 2500000,
    spent: 2480000,
    startDate: '2025-06-01',
    endDate: '2025-12-31',
    progress: 100,
    milestones: [
      { name: 'Feasibility Study', date: '2025-06-15', done: true },
      { name: 'CPCB NOC', date: '2025-07-30', done: true },
      { name: 'Civil Works', date: '2025-10-15', done: true },
      { name: 'Commissioning', date: '2025-12-01', done: true },
      { name: 'Compliance Certificate', date: '2025-12-31', done: true },
    ],
    ghgReduction: '90 tCO₂e/yr',
    vendor: 'Furaat'
  },
  {
    id: 'proj_brsr',
    name: 'BRSR Core Reporting — FY 2025-26',
    category: 'ESG Reporting',
    status: 'in-progress',
    priority: 'critical',
    lead: 'Meghna Das',
    team: ['Meghna Das', 'Sahil Verma', 'Lina Thomas', 'Akshay Joshi'],
    budget: 800000,
    spent: 310000,
    startDate: '2025-10-01',
    endDate: '2026-05-31',
    progress: 38,
    milestones: [
      { name: 'Data Collection Framework', date: '2025-10-31', done: true },
      { name: 'Scope 1 & 2 Data Lock', date: '2025-12-31', done: true },
      { name: 'Scope 3 Screening', date: '2026-02-28', done: false },
      { name: 'Draft Report Review', date: '2026-04-15', done: false },
      { name: 'Board Approval & Filing', date: '2026-05-31', done: false },
    ],
    ghgReduction: 'N/A',
    vendor: 'Breathe ESG'
  },
  {
    id: 'proj_waste',
    name: 'Zero Waste to Landfill Programme',
    category: 'Waste',
    status: 'planning',
    priority: 'medium',
    lead: 'Nisha Pillai',
    team: ['Nisha Pillai', 'Sreekant V.'],
    budget: 1800000,
    spent: 120000,
    startDate: '2026-03-01',
    endDate: '2026-12-31',
    progress: 8,
    milestones: [
      { name: 'Waste Audit', date: '2026-03-15', done: false },
      { name: 'Vendor Shortlisting', date: '2026-04-30', done: false },
      { name: 'Segregation Setup', date: '2026-07-31', done: false },
      { name: 'Composting Unit', date: '2026-09-30', done: false },
      { name: 'Certification', date: '2026-12-31', done: false },
    ],
    ghgReduction: '210 tCO₂e/yr (est.)',
    vendor: 'Plastic Fischer'
  },
  {
    id: 'proj_leed',
    name: 'LEED Gold Certification — Tower B',
    category: 'Green Building',
    status: 'in-progress',
    priority: 'high',
    lead: 'Ravi Kumar',
    team: ['Ravi Kumar', 'Ananya Sharma', 'Priya Nair', 'Rohit Sood'],
    budget: 3500000,
    spent: 1750000,
    startDate: '2025-07-01',
    endDate: '2026-06-30',
    progress: 50,
    milestones: [
      { name: 'Pre-certification Registration', date: '2025-07-15', done: true },
      { name: 'Energy Model Submitted', date: '2025-09-30', done: true },
      { name: 'Materials Documentation', date: '2026-01-31', done: false },
      { name: 'LEED Audit', date: '2026-04-15', done: false },
      { name: 'Certificate Awarded', date: '2026-06-30', done: false },
    ],
    ghgReduction: '280 tCO₂e/yr',
    vendor: 'ESG Certification Hub'
  }
];

// Calculate timeline bar position (0–100) between a reference start and end date
const getBarStyle = (start, end, minDate, maxDate) => {
  const total = new Date(maxDate) - new Date(minDate);
  const left = ((new Date(start) - new Date(minDate)) / total) * 100;
  const width = ((new Date(end) - new Date(start)) / total) * 100;
  return { left: `${Math.max(0, left)}%`, width: `${Math.min(100 - Math.max(0, left), width)}%` };
};

// ─── GANTT CHART ──────────────────────────────────────────────────────────────
const GanttChart = ({ projects }) => {
  const minDate = '2025-06-01';
  const maxDate = '2026-12-31';

  const months = [];
  let d = new Date(minDate);
  const end = new Date(maxDate);
  while (d <= end) {
    months.push(d.toLocaleString('default', { month: 'short', year: '2-digit' }));
    d = new Date(d.getFullYear(), d.getMonth() + 1, 1);
  }

  const statusColors = {
    completed: 'bg-green-500',
    'in-progress': 'bg-blue-500',
    planning: 'bg-amber-400',
    'on-hold': 'bg-gray-400'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-green-600" />
          Project Timeline (Gantt)
        </h3>
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500 inline-block"></span>Completed</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500 inline-block"></span>In Progress</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-400 inline-block"></span>Planning</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Month headers */}
          <div className="flex" style={{ marginLeft: '200px' }}>
            {months.map(m => (
              <div key={m} className="flex-1 text-center text-xs text-gray-500 py-2 border-l border-gray-100 font-medium">
                {m}
              </div>
            ))}
          </div>

          {/* Today line */}
          <div className="relative" style={{ marginLeft: '200px' }}>
            {(() => {
              const total = new Date(maxDate) - new Date(minDate);
              const todayPct = ((new Date() - new Date(minDate)) / total) * 100;
              return todayPct >= 0 && todayPct <= 100 ? (
                <div className="absolute top-0 bottom-0 w-px bg-red-400 z-10" style={{ left: `${todayPct}%` }}>
                  <div className="absolute -top-1 -left-3 text-red-400 text-xs font-bold">▼</div>
                </div>
              ) : null;
            })()}
          </div>

          {/* Project rows */}
          {projects.map(proj => {
            const barStyle = getBarStyle(proj.startDate, proj.endDate, minDate, maxDate);
            return (
              <div key={proj.id} className="flex items-center border-t border-gray-100 hover:bg-gray-50">
                {/* Row label */}
                <div className="w-[200px] flex-shrink-0 px-4 py-3">
                  <div className="text-sm font-medium text-gray-900 truncate">{proj.name.split('—')[0].trim()}</div>
                  <div className="text-xs text-gray-500">{proj.lead}</div>
                </div>

                {/* Bar area */}
                <div className="flex-1 relative h-12 py-3">
                  <div
                    className={`absolute h-6 rounded-full ${statusColors[proj.status]} opacity-90 flex items-center px-2`}
                    style={barStyle}
                  >
                    <span className="text-white text-xs font-medium truncate">{proj.progress}%</span>
                  </div>

                  {/* Milestone diamonds */}
                  {proj.milestones.map((ms, idx) => {
                    const total = new Date(maxDate) - new Date(minDate);
                    const pct = ((new Date(ms.date) - new Date(minDate)) / total) * 100;
                    if (pct < 0 || pct > 100) return null;
                    return (
                      <div key={idx} title={`${ms.name}: ${ms.date}`}
                        className={`absolute top-2 w-3 h-3 rotate-45 border-2 ${ms.done ? 'bg-green-500 border-green-600' : 'bg-white border-gray-400'}`}
                        style={{ left: `${pct}%`, transform: 'translateX(-50%) rotate(45deg)' }}
                      />
                    );
                  })}
                </div>

                {/* Dates */}
                <div className="w-[140px] flex-shrink-0 px-3 text-xs text-gray-500">
                  {new Date(proj.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} –{' '}
                  {new Date(proj.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project }) => {
  const [showMilestones, setShowMilestones] = useState(false);
  const statusStyles = {
    completed: 'bg-green-100 text-green-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    planning: 'bg-amber-100 text-amber-700',
    'on-hold': 'bg-gray-100 text-gray-700'
  };
  const priorityStyles = {
    critical: 'bg-red-100 text-red-700',
    high: 'bg-orange-100 text-orange-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-gray-100 text-gray-600'
  };

  const budgetPct = Math.round((project.spent / project.budget) * 100);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-1">{project.name}</h3>
          <div className="flex flex-wrap gap-2">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[project.status]}`}>
              {project.status.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityStyles[project.priority]}`}>
              {project.priority} priority
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{project.category}</span>
          </div>
        </div>
        <div className="text-right ml-4">
          <div className="text-2xl font-bold text-green-600">{project.progress}%</div>
          <div className="text-xs text-gray-500">complete</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-100 rounded-full mb-4">
        <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${project.progress}%` }} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <DollarSign className="w-4 h-4 text-gray-500 mx-auto mb-0.5" />
          <div className="text-sm font-bold text-gray-900">₹{(project.budget / 100000).toFixed(1)}L</div>
          <div className="text-xs text-gray-500">Budget</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <TrendingUp className="w-4 h-4 text-gray-500 mx-auto mb-0.5" />
          <div className={`text-sm font-bold ${budgetPct > 90 ? 'text-red-600' : 'text-gray-900'}`}>{budgetPct}%</div>
          <div className="text-xs text-gray-500">Budget Used</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <Users className="w-4 h-4 text-gray-500 mx-auto mb-0.5" />
          <div className="text-sm font-bold text-gray-900">{project.team.length}</div>
          <div className="text-xs text-gray-500">Team Size</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <Calendar className="w-4 h-4 text-gray-500 mx-auto mb-0.5" />
          <div className="text-sm font-bold text-gray-900">{new Date(project.endDate).toLocaleDateString('en-IN', { month: 'short', year: '2-digit' })}</div>
          <div className="text-xs text-gray-500">Due Date</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="text-gray-600">
          <span className="font-medium">Vendor:</span> {project.vendor}
        </div>
        <button onClick={() => setShowMilestones(!showMilestones)}
          className="text-green-700 text-xs font-medium hover:underline flex items-center gap-1">
          {showMilestones ? 'Hide' : 'Show'} Milestones ({project.milestones.filter(m => m.done).length}/{project.milestones.length})
        </button>
      </div>

      {showMilestones && (
        <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
          {project.milestones.map((ms, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              {ms.done
                ? <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                : <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />}
              <span className={ms.done ? 'text-gray-700 line-through' : 'text-gray-700'}>{ms.name}</span>
              <span className="ml-auto text-xs text-gray-500">{new Date(ms.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── PROJECTS TAB ─────────────────────────────────────────────────────────────
const ProjectsView = () => {
  const [view, setView] = useState('gantt'); // gantt | cards

  const stats = [
    { icon: Briefcase, label: 'Total Projects', value: dummyProjects.length, color: 'text-blue-600' },
    { icon: CheckCircle, label: 'Completed', value: dummyProjects.filter(p => p.status === 'completed').length, color: 'text-green-600' },
    { icon: Clock, label: 'In Progress', value: dummyProjects.filter(p => p.status === 'in-progress').length, color: 'text-orange-600' },
    { icon: AlertCircle, label: 'Planning', value: dummyProjects.filter(p => p.status === 'planning').length, color: 'text-amber-600' },
    { icon: DollarSign, label: 'Total Budget', value: `₹${(dummyProjects.reduce((s, p) => s + p.budget, 0) / 10000000).toFixed(1)}Cr`, color: 'text-purple-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white rounded-xl p-4 text-center border border-gray-200 shadow-sm">
              <Icon className={`w-6 h-6 ${s.color} mx-auto mb-1`} />
              <div className="text-xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-600">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <button onClick={() => setView('gantt')}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${view === 'gantt' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          <BarChart2 className="w-4 h-4" /> Gantt View
        </button>
        <button onClick={() => setView('cards')}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${view === 'cards' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          <Briefcase className="w-4 h-4" /> Card View
        </button>
      </div>

      {view === 'gantt' && <GanttChart projects={dummyProjects} />}

      {view === 'cards' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {dummyProjects.map(proj => <ProjectCard key={proj.id} project={proj} />)}
        </div>
      )}
    </div>
  );
};

// ─── CART VIEW (original) ─────────────────────────────────────────────────────
const CartView = () => {
  const {
    items,
    totalItems,
    totalCost,
    removeItem,
    updateItem,
    clearCart,
    getItemsByType,
    getTotalByType
  } = useCart();

  const [activeTab, setActiveTab] = useState('all');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const categories = {
    all: { name: 'All Items', icon: ShoppingCart, color: 'text-gray-700' },
    [CART_ITEM_TYPES.REPORTING]: { name: 'Reporting Services', icon: FileText, color: 'text-blue-700' },
    [CART_ITEM_TYPES.COMPLIANCE]: { name: 'Compliance Actions', icon: Shield, color: 'text-green-700' },
    [CART_ITEM_TYPES.PROJECT]: { name: 'Projects', icon: Briefcase, color: 'text-purple-700' },
    [CART_ITEM_TYPES.PRODUCT]: { name: 'Products', icon: Package, color: 'text-orange-700' },
    [CART_ITEM_TYPES.SERVICE]: { name: 'Services', icon: Calculator, color: 'text-indigo-700' }
  };

  const filteredItems = activeTab === 'all' ? items : getItemsByType(activeTab);

  const handleQuantityUpdate = (itemId, newQuantity) => {
    if (newQuantity <= 0) removeItem(itemId);
    else updateItem(itemId, { quantity: newQuantity });
  };

  const cartSummary = Object.keys(CART_ITEM_TYPES).map(key => {
    const type = CART_ITEM_TYPES[key];
    const typeItems = getItemsByType(type);
    return {
      type, name: categories[type].name, icon: categories[type].icon,
      color: categories[type].color, count: typeItems.length, total: getTotalByType(type)
    };
  }).filter(s => s.count > 0);

  const QuoteModal = () => {
    const [formData, setFormData] = useState({ companyName: '', contactPerson: '', email: '', phone: '', message: '', urgency: 'standard' });
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Request Quote</h3>
            <button onClick={() => setShowQuoteModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert('Quote request submitted! We will contact you within 24 hours.'); setShowQuoteModal(false); }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[['companyName', 'Company Name'], ['contactPerson', 'Contact Person']].map(([field, label]) => (
                <div key={field}><label className="block text-sm font-medium text-gray-700 mb-1">{label} *</label>
                  <input type="text" required value={formData[field]} onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" /></div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input type="email" required value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="tel" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" /></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
              <select value={formData.urgency} onChange={e => setFormData(p => ({ ...p, urgency: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                <option value="standard">Standard (2–4 weeks)</option><option value="urgent">Urgent (1–2 weeks)</option><option value="critical">Critical (Within 1 week)</option>
              </select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
              <textarea value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Describe any specific requirements..." /></div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowQuoteModal(false)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"><Send className="w-4 h-4" /> Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Cart Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{totalItems} Items in Cart</h2>
              <p className="text-gray-600">Total Value: ₹{totalCost.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={clearCart} className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50">Clear Cart</button>
            <button onClick={() => setShowQuoteModal(true)} disabled={items.length === 0}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2">
              <Send className="w-4 h-4" /> Request Quote
            </button>
          </div>
        </div>
        {cartSummary.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-gray-200">
            {cartSummary.map(s => {
              const Icon = s.icon; return (
                <div key={s.type} className="text-center">
                  <Icon className={`w-6 h-6 ${s.color} mx-auto mb-2`} />
                  <div className="text-lg font-bold text-gray-900">{s.count}</div>
                  <div className="text-sm text-gray-600">{s.name}</div>
                  <div className="text-sm font-medium text-green-600">₹{s.total.toLocaleString()}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Category Tabs + Items */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {Object.entries(categories).map(([key, cat]) => {
            const Icon = cat.icon;
            const isAct = activeTab === key;
            const cnt = key === 'all' ? totalItems : getItemsByType(key).length;
            return (
              <button key={key} onClick={() => setActiveTab(key)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all whitespace-nowrap ${isAct ? 'bg-[#e9f1ea] text-green-700 border-b-2 border-green-600' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'}`}>
                <Icon className="w-4 h-4" /><span>{cat.name}</span>
                {cnt > 0 && <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${isAct ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700'}`}>{cnt}</span>}
              </button>
            );
          })}
        </div>
        <div className="p-6">
          {filteredItems.length > 0 ? (
            <div className="space-y-4">
              {filteredItems.map(item => {
                const TypeIcon = categories[item.type]?.icon || Package;
                return (
                  <div key={item.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100">
                          <TypeIcon className={`w-6 h-6 ${categories[item.type]?.color || 'text-gray-700'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                            <span className="text-lg font-bold text-green-600">₹{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                          <div className="text-sm text-gray-600">Unit Price: ₹{item.price.toLocaleString()} • Added: {new Date(item.addedAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2 ml-4">
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg">
                          <button onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-200 rounded-l-lg"><Minus className="w-4 h-4" /></button>
                          <span className="px-3 py-1 font-medium">{item.quantity}</span>
                          <button onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-200 rounded-r-lg"><Plus className="w-4 h-4" /></button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {activeTab === 'all' ? 'Your Cart is Empty' : `No ${categories[activeTab].name} in Cart`}
              </h3>
              <p className="text-gray-600 mb-6">Browse the platform to add items to your cart.</p>
              <button onClick={() => window.history.back()} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Continue Browsing
              </button>
            </div>
          )}
        </div>
      </div>

      {showQuoteModal && <QuoteModal />}
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const ProjectManagementPage = () => {
  const [activeMain, setActiveMain] = useState('projects');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center p-10">
          <h1 className="text-3xl font-bold text-white mb-4">Project Management</h1>
          <p className="text-gray-200 max-w-3xl mx-auto">
            Track your sustainability projects from planning to completion. Visualise timelines,
            manage milestones, and coordinate with vendors across your ESG programme.
          </p>
        </div>

        {/* Main Tabs */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-200 flex gap-2">
          {[
            { id: 'projects', label: 'Projects', icon: Briefcase, desc: 'Timelines, Gantt, milestones' },
            { id: 'cart', label: 'Cart', icon: ShoppingCart, desc: 'Selected services & products' }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveMain(tab.id)}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-medium transition-all ${activeMain === tab.id ? 'bg-green-50 text-green-700 border border-green-200' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold text-sm">{tab.label}</div>
                  <div className="text-xs opacity-70">{tab.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {activeMain === 'projects' && <ProjectsView />}
        {activeMain === 'cart' && <CartView />}
      </div>
    </div>
  );
};

export default ProjectManagementPage;
