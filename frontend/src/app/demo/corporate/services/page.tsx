'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, Calendar, CheckCircle, Clock, AlertCircle, Pause } from 'lucide-react';
import { demoProjects } from '@/lib/demo-data';
import SubpageHeader from '@/components/SubpageHeader';
import DashboardNavbar from '@/components/DashboardNavbar';


export default function ServicesPage() {
  const [view, setView] = useState<'card' | 'gantt'>('card');
  const [filter, setFilter] = useState('all');

  const statusIcon: Record<string, React.ReactNode> = {
    completed: <CheckCircle className="w-4 h-4 text-green-600" />,
    'in-progress': <Clock className="w-4 h-4 text-blue-600" />,
    planning: <Calendar className="w-4 h-4 text-yellow-600" />,
    'on-hold': <Pause className="w-4 h-4 text-gray-500" />,
  };
  const statusColor: Record<string, string> = {
    completed: 'bg-green-100 text-green-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    planning: 'bg-yellow-100 text-yellow-700',
    'on-hold': 'bg-gray-100 text-gray-600',
  };
  const priorityColor: Record<string, string> = {
    critical: 'bg-red-100 text-red-700', high: 'bg-orange-100 text-orange-700',
    medium: 'bg-yellow-100 text-yellow-700', low: 'bg-gray-100 text-gray-600',
  };

  const filtered = filter === 'all' ? demoProjects : demoProjects.filter((p) => p.status === filter);

  return (
    <div className="page-shell min-h-screen bg-white">
      <SubpageHeader subtitle="Services & Projects" backHref="/demo/corporate" backLabel="← Corporate Home" />
      <DashboardNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
            <button onClick={() => setView('card')} className={`py-2 px-4 rounded-lg text-sm font-medium ${view === 'card' ? 'bg-white shadow text-primary-700' : 'text-gray-600'}`}>Card View</button>
            <button onClick={() => setView('gantt')} className={`py-2 px-4 rounded-lg text-sm font-medium ${view === 'gantt' ? 'bg-white shadow text-primary-700' : 'text-gray-600'}`}>Timeline</button>
          </div>
          <div className="flex gap-2">
            {['all', 'in-progress', 'completed', 'planning', 'on-hold'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize ${filter === f ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{f.replace('-', ' ')}</button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center"><div className="text-2xl font-bold text-gray-900">{demoProjects.length}</div><div className="text-xs text-gray-500">Total Projects</div></div>
          <div className="bg-green-50 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-green-700">{demoProjects.filter((p) => p.status === 'completed').length}</div><div className="text-xs text-gray-500">Completed</div></div>
          <div className="bg-blue-50 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-blue-700">₹{(demoProjects.reduce((s, p) => s + p.budget, 0) / 100000).toFixed(0)}L</div><div className="text-xs text-gray-500">Total Budget</div></div>
          <div className="bg-primary-50 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-primary-700">{Math.round(demoProjects.reduce((s, p) => s + p.progress, 0) / demoProjects.length)}%</div><div className="text-xs text-gray-500">Avg Progress</div></div>
        </div>

        {/* Card View */}
        {view === 'card' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div><h3 className="font-semibold text-gray-900">{p.name}</h3><p className="text-sm text-gray-500">{p.category} • {p.vendor}</p></div>
                  <div className="flex gap-1.5">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${priorityColor[p.priority]}`}>{p.priority}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${statusColor[p.status]}`}>{p.status}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm mb-4">
                  <div><span className="text-gray-500">Budget:</span><div className="font-medium">₹{(p.budget / 100000).toFixed(1)}L</div></div>
                  <div><span className="text-gray-500">Spent:</span><div className="font-medium">₹{(p.spent / 100000).toFixed(1)}L</div></div>
                  <div><span className="text-gray-500">GHG Impact:</span><div className="font-medium text-green-700">{p.ghgReduction}</div></div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1"><span>Progress</span><span>{p.progress}%</span></div>
                  <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-primary-500 h-2 rounded-full" style={{ width: `${p.progress}%` }} /></div>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span>Lead: {p.lead}</span><span>{p.startDate} → {p.endDate}</span>
                </div>
                {/* Milestones */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="text-xs font-medium text-gray-600 mb-2">Milestones</div>
                  <div className="space-y-1">
                    {p.milestones.map((m, i) => (
                      <div key={i} className="flex items-center text-xs">
                        {m.done ? <CheckCircle className="w-3.5 h-3.5 text-green-500 mr-2" /> : <Clock className="w-3.5 h-3.5 text-gray-400 mr-2" />}
                        <span className={m.done ? 'text-gray-500 line-through' : 'text-gray-700'}>{m.name}</span>
                        <span className="ml-auto text-gray-400">{m.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gantt/Timeline View */}
        {view === 'gantt' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 overflow-x-auto">
            <h3 className="font-semibold text-gray-900 mb-4">Project Timeline</h3>
            <div className="space-y-4 min-w-[600px]">
              {filtered.map((p) => {
                const start = new Date(p.startDate).getTime();
                const end = new Date(p.endDate).getTime();
                const now = Date.now();
                const total = end - start;
                const elapsed = Math.min(Math.max(now - start, 0), total);
                const pct = (elapsed / total) * 100;
                return (
                  <div key={p.id} className="flex items-center gap-4">
                    <div className="w-48 flex-shrink-0"><div className="font-medium text-sm text-gray-900 truncate">{p.name}</div><div className="text-xs text-gray-500">{p.startDate} → {p.endDate}</div></div>
                    <div className="flex-1 bg-gray-100 rounded-full h-6 relative">
                      <div className={`h-6 rounded-full flex items-center justify-end pr-2 text-xs font-medium text-white ${p.status === 'completed' ? 'bg-green-500' : p.status === 'on-hold' ? 'bg-gray-400' : 'bg-primary-500'}`} style={{ width: `${p.progress}%` }}>
                        {p.progress}%
                      </div>
                    </div>
                    <div className="w-20 flex-shrink-0">{statusIcon[p.status]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
