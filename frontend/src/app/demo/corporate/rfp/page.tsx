'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FileSignature, Plus, CheckCircle, Clock, Send, ArrowRight } from 'lucide-react';
import { rfpVendors, submittedRFPs } from '@/lib/demo-data';
import SubpageHeader from '@/components/SubpageHeader';
import DashboardNavbar from '@/components/DashboardNavbar';


export default function RFPPage() {
  const [activeTab, setActiveTab] = useState<'create' | 'submitted'>('submitted');
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ title: '', category: '', deadline: '', description: '', budget: '', vendors: [] as string[], compliance: '' });

  const statusBadge: Record<string, string> = {
    open: 'bg-blue-100 text-blue-700',
    responses_received: 'bg-green-100 text-green-700',
    under_review: 'bg-yellow-100 text-yellow-700',
    awarded: 'bg-purple-100 text-purple-700',
  };

  const handleCreate = () => {
    alert('RFP created! (Demo mode — no backend call)');
    setActiveTab('submitted');
  };

  return (
    <div className="page-shell min-h-screen bg-white">
      <SubpageHeader subtitle="RFP Builder" backHref="/demo/corporate" backLabel="← Corporate Home" />
      <DashboardNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-8 max-w-sm">
          <button onClick={() => setActiveTab('submitted')} className={`flex-1 py-2 rounded-lg text-sm font-medium ${activeTab === 'submitted' ? 'bg-white shadow text-primary-700' : 'text-gray-600'}`}>Submitted RFPs</button>
          <button onClick={() => setActiveTab('create')} className={`flex-1 py-2 rounded-lg text-sm font-medium ${activeTab === 'create' ? 'bg-white shadow text-primary-700' : 'text-gray-600'}`}><Plus className="w-4 h-4 inline mr-1" />Create New</button>
        </div>

        {activeTab === 'submitted' && (
          <div className="space-y-4">
            {submittedRFPs.map((rfp) => (
              <div key={rfp.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div><h3 className="font-semibold text-gray-900 text-lg">{rfp.title}</h3><p className="text-sm text-gray-500">Created {rfp.createdAt} • Deadline {rfp.deadline}</p></div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge[rfp.status]}`}>{rfp.status.replace(/_/g, ' ')}</span>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                  <div><span className="text-gray-500">Vendors Invited:</span> <strong>{rfp.vendors}</strong></div>
                  <div><span className="text-gray-500">Responses:</span> <strong>{rfp.responses}</strong></div>
                  <div><span className="text-gray-500">Est. Value:</span> <strong>{rfp.estimatedValue}</strong></div>
                  <div><span className="text-gray-500">Compliance:</span> {rfp.complianceReqs.join(', ')}</div>
                </div>
                <button className="text-sm text-primary-600 font-medium hover:text-primary-700">View Details →</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'create' && (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{s}</div>
                  {s < 4 && <div className={`w-16 h-0.5 mx-2 ${step > s ? 'bg-primary-600' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              {step === 1 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-gray-900">RFP Details</h3>
                  <div><label className="label">Title *</label><input className="input-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g., Solar Energy System for HQ" /></div>
                  <div><label className="label">Category</label><select className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option value="">Select</option><option>Energy</option><option>Water</option><option>Waste</option><option>Analytics</option><option>Building</option><option>Transport</option></select></div>
                  <div><label className="label">Deadline</label><input type="date" className="input-field" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} /></div>
                  <button onClick={() => setStep(2)} className="btn-primary">Next <ArrowRight className="w-4 h-4 ml-1" /></button>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-gray-900">Requirements</h3>
                  <div><label className="label">Description *</label><textarea className="input-field" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Detailed requirements..." /></div>
                  <div><label className="label">Budget Range</label><input className="input-field" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="e.g., ₹40L - ₹60L" /></div>
                  <div><label className="label">Compliance Requirements</label><input className="input-field" value={form.compliance} onChange={(e) => setForm({ ...form, compliance: e.target.value })} placeholder="e.g., ISO 14001, BIS" /></div>
                  <div className="flex gap-3"><button onClick={() => setStep(1)} className="btn-outline">Back</button><button onClick={() => setStep(3)} className="btn-primary">Next <ArrowRight className="w-4 h-4 ml-1" /></button></div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-gray-900">Select Vendors</h3>
                  <div className="space-y-3">{rfpVendors.map((v) => (
                    <label key={v.id} className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${form.vendors.includes(v.id) ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}>
                      <input type="checkbox" checked={form.vendors.includes(v.id)} onChange={(e) => setForm({ ...form, vendors: e.target.checked ? [...form.vendors, v.id] : form.vendors.filter((x) => x !== v.id) })} className="mr-3" />
                      <div><div className="font-medium text-gray-900">{v.name}</div><div className="text-sm text-gray-500">{v.type} • {v.description}</div></div>
                    </label>
                  ))}</div>
                  <div className="flex gap-3"><button onClick={() => setStep(2)} className="btn-outline">Back</button><button onClick={() => setStep(4)} className="btn-primary">Review <ArrowRight className="w-4 h-4 ml-1" /></button></div>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-gray-900">Review & Submit</h3>
                  <div className="bg-gray-50 rounded-xl p-5 space-y-2 text-sm">
                    <div><strong>Title:</strong> {form.title || '—'}</div>
                    <div><strong>Category:</strong> {form.category || '—'}</div>
                    <div><strong>Deadline:</strong> {form.deadline || '—'}</div>
                    <div><strong>Budget:</strong> {form.budget || '—'}</div>
                    <div><strong>Vendors:</strong> {form.vendors.length} selected</div>
                  </div>
                  <div className="flex gap-3"><button onClick={() => setStep(3)} className="btn-outline">Back</button><button onClick={handleCreate} className="btn-primary"><Send className="w-4 h-4 mr-1" /> Submit RFP</button></div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
