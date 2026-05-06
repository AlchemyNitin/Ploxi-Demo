'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SubpageHeader from '@/components/SubpageHeader';
import DashboardNavbar from '@/components/DashboardNavbar';

import { ShieldCheck, FileText, Clock, Download, ChevronDown, ChevronRight } from 'lucide-react';
import { complianceData } from '@/lib/demo-data';

export default function CompliancePage() {
  const [selectedRegion, setSelectedRegion] = useState('IN');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('environmental');
  const [activeTab, setActiveTab] = useState<'tasks' | 'documents' | 'regulations'>('tasks');

  const region = complianceData.regions[selectedRegion];
  if (!region) return null;

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };
  const priorityColors: Record<string, string> = {
    critical: 'bg-red-100 text-red-700',
    high: 'bg-orange-100 text-orange-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-gray-100 text-gray-600',
  };

  const allTasks = Object.values(region.categories).flatMap((c) => c.tasks);
  const taskStats = {
    total: allTasks.length,
    completed: allTasks.filter((t) => t.status === 'completed').length,
    pending: allTasks.filter((t) => t.status === 'pending').length,
    inProgress: allTasks.filter((t) => t.status === 'in-progress').length,
    critical: allTasks.filter((t) => t.priority === 'critical').length,
  };

  return (
    <div className="page-shell min-h-screen bg-white">
      <SubpageHeader subtitle="Compliance Tracker" backHref="/demo/corporate" backLabel="← Corporate Home" />
      <DashboardNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Tracker</h1>
          <p className="text-gray-600">ESG regulatory compliance management across regions</p>
        </div>

        {/* Region Selector */}
        <div className="flex flex-wrap gap-3 mb-8">
          {Object.entries(complianceData.regions).map(([code, r]) => (
            <button key={code} onClick={() => setSelectedRegion(code)} className={`px-4 py-2.5 rounded-xl border-2 font-medium text-sm transition-all ${selectedRegion === code ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-700 hover:border-primary-300'}`}>
              {r.flag} {r.name}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {[
            { label: 'Total Tasks', value: taskStats.total, color: 'text-gray-900', bg: 'bg-gray-50' },
            { label: 'Completed', value: taskStats.completed, color: 'text-green-700', bg: 'bg-green-50' },
            { label: 'In Progress', value: taskStats.inProgress, color: 'text-blue-700', bg: 'bg-blue-50' },
            { label: 'Pending', value: taskStats.pending, color: 'text-yellow-700', bg: 'bg-yellow-50' },
            { label: 'Critical', value: taskStats.critical, color: 'text-red-700', bg: 'bg-red-50' },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-xl p-4 text-center`}>
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-8 max-w-md">
          {(['tasks', 'documents', 'regulations'] as const).map((t) => (
            <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all capitalize ${activeTab === t ? 'bg-white shadow-sm text-primary-700' : 'text-gray-600'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Tasks */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {Object.entries(region.categories).map(([key, cat]) => (
              <div key={key} className="surface-card overflow-hidden">
                <button onClick={() => setExpandedCategory(expandedCategory === key ? null : key)} className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${cat.bgColor}`} />
                    <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                    <span className="text-sm text-gray-500">({cat.tasks.length} tasks)</span>
                  </div>
                  {expandedCategory === key ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
                </button>
                {expandedCategory === key && (
                  <div className="border-t border-gray-100 divide-y divide-gray-100">
                    {cat.tasks.map((task) => (
                      <div key={task.id} className="p-5 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{task.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${priorityColors[task.priority]}`}>{task.priority}</span>
                            <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${statusColors[task.status] || statusColors.pending}`}>{task.status}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                          <span><Clock className="w-3 h-3 inline mr-1" />Due: {task.deadline}</span>
                          <span>Authority: {task.authority}</span>
                          {task.tags && task.tags.map((t) => <span key={t} className="px-1.5 py-0.5 bg-gray-100 rounded">{t}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Documents */}
        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {region.documents.map((doc) => (
              <div key={doc.id} className="surface-card p-5">
                <div className="flex items-start space-x-3">
                  <FileText className="w-8 h-8 text-primary-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">{doc.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                    <div className="flex items-center space-x-3 mt-3 text-xs text-gray-500">
                      <span>{doc.type}</span><span>{doc.size}</span><span>Updated: {doc.lastUpdated}</span>
                    </div>
                    <button className="mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center">
                      <Download className="w-4 h-4 mr-1" /> Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Regulations */}
        {activeTab === 'regulations' && (
          <div className="space-y-4">
            {region.regulations.map((reg) => (
              <div key={reg.id} className="surface-card p-5">
                <h4 className="font-semibold text-gray-900 mb-1">{reg.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{reg.description}</p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div><span className="text-gray-500">Authority:</span> <span className="font-medium">{reg.authority}</span></div>
                  <div><span className="text-gray-500">Last Amended:</span> <span className="font-medium">{reg.lastAmendment}</span></div>
                  <div><span className="text-gray-500">Applies To:</span> <span className="font-medium">{reg.applicability}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
