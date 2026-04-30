'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, CheckCircle, Upload, Plus, X } from 'lucide-react';

const categories = ['Renewable Energy', 'Waste Management', 'Water Treatment', 'ESG Analytics', 'Building Automation', 'EV & Transport', 'Carbon Credits', 'Circular Economy'];

export default function AddListingPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    companyName: '', serviceName: '', category: '', shortDesc: '', detailedDesc: '',
    email: '', phone: '', website: '', location: '',
    yearFounded: '', teamSize: '', certifications: [] as string[], newCert: '',
    pricing: '', deploymentTime: '', targetIndustries: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string | string[]) => setForm((p) => ({ ...p, [field]: value }));
  const addCert = () => { if (form.newCert.trim()) { update('certifications', [...form.certifications, form.newCert.trim()]); update('newCert', ''); } };
  const removeCert = (i: number) => update('certifications', form.certifications.filter((_, idx) => idx !== i));

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-10 max-w-md text-center shadow-lg border border-gray-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-8 h-8 text-green-600" /></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Listing Created!</h2>
          <p className="text-gray-600 mb-6">Your clean tech solution has been listed on the Ploxi marketplace. (Demo mode)</p>
          <div className="space-y-3">
            <Link href="/demo/cleantech/dashboard" className="btn-primary w-full block text-center">Go to Dashboard</Link>
            <Link href="/demo/cleantech" className="text-primary-600 font-medium text-sm">← Back to Cleantech</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <header className="bg-white shadow-sm border-b sticky top-[36px] z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image src="/images/logo.jpeg" alt="Ploxi" width={40} height={40} className="h-10 w-10 object-contain rounded-md" />
            <div><h1 className="text-xl font-bold text-gray-900">Add Your Listing</h1><p className="text-sm text-gray-600">List your clean tech solution on Ploxi</p></div>
          </div>
          <Link href="/demo/cleantech" className="text-sm text-primary-600 font-medium">← Cleantech</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Progress */}
        <div className="flex items-center justify-between mb-10">
          {['Company Info', 'Solution Details', 'Contact & Pricing', 'Review'].map((label, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step > i + 1 ? <CheckCircle className="w-5 h-5" /> : i + 1}
              </div>
              <span className={`ml-2 text-sm hidden sm:inline ${step === i + 1 ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>{label}</span>
              {i < 3 && <div className={`w-8 sm:w-16 h-0.5 mx-2 ${step > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-gray-900">Company Information</h3>
              <div><label className="label">Company Name *</label><input className="input-field" value={form.companyName} onChange={(e) => update('companyName', e.target.value)} placeholder="Your company name" /></div>
              <div><label className="label">Location</label><input className="input-field" value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="e.g., Bangalore, India" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label">Year Founded</label><input className="input-field" value={form.yearFounded} onChange={(e) => update('yearFounded', e.target.value)} placeholder="2020" /></div>
                <div><label className="label">Team Size</label><select className="input-field" value={form.teamSize} onChange={(e) => update('teamSize', e.target.value)}>
                  <option value="">Select</option><option>1-10</option><option>11-50</option><option>51-200</option><option>200+</option>
                </select></div>
              </div>
              <div>
                <label className="label">Certifications</label>
                <div className="flex gap-2 mb-2"><input className="input-field flex-1" value={form.newCert} onChange={(e) => update('newCert', e.target.value)} placeholder="e.g., ISO 14001" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCert())} />
                  <button onClick={addCert} className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"><Plus className="w-4 h-4" /></button></div>
                <div className="flex flex-wrap gap-2">{form.certifications.map((c, i) => (
                  <span key={i} className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">{c}<button onClick={() => removeCert(i)} className="ml-1.5"><X className="w-3 h-3" /></button></span>
                ))}</div>
              </div>
              <button onClick={() => setStep(2)} className="btn-primary">Next <ArrowRight className="w-4 h-4 ml-1" /></button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-gray-900">Solution Details</h3>
              <div><label className="label">Solution Name *</label><input className="input-field" value={form.serviceName} onChange={(e) => update('serviceName', e.target.value)} placeholder="Name of your product/service" /></div>
              <div><label className="label">Category *</label><select className="input-field" value={form.category} onChange={(e) => update('category', e.target.value)}>
                <option value="">Select a category</option>{categories.map((c) => <option key={c}>{c}</option>)}
              </select></div>
              <div><label className="label">Short Description</label><input className="input-field" value={form.shortDesc} onChange={(e) => update('shortDesc', e.target.value)} placeholder="One-line summary" /></div>
              <div><label className="label">Detailed Description</label><textarea className="input-field" rows={4} value={form.detailedDesc} onChange={(e) => update('detailedDesc', e.target.value)} placeholder="Describe your solution in detail..." /></div>
              <div className="flex gap-3"><button onClick={() => setStep(1)} className="btn-outline"><ArrowLeft className="w-4 h-4 mr-1" />Back</button><button onClick={() => setStep(3)} className="btn-primary">Next <ArrowRight className="w-4 h-4 ml-1" /></button></div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-gray-900">Contact & Pricing</h3>
              <div><label className="label">Contact Email *</label><input type="email" className="input-field" value={form.email} onChange={(e) => update('email', e.target.value)} /></div>
              <div><label className="label">Phone</label><input className="input-field" value={form.phone} onChange={(e) => update('phone', e.target.value)} /></div>
              <div><label className="label">Website</label><input className="input-field" value={form.website} onChange={(e) => update('website', e.target.value)} /></div>
              <div><label className="label">Pricing Model</label><input className="input-field" value={form.pricing} onChange={(e) => update('pricing', e.target.value)} placeholder="e.g., ₹5L-₹15L per project" /></div>
              <div><label className="label">Deployment Time</label><input className="input-field" value={form.deploymentTime} onChange={(e) => update('deploymentTime', e.target.value)} placeholder="e.g., 4-6 weeks" /></div>
              <div className="flex gap-3"><button onClick={() => setStep(2)} className="btn-outline"><ArrowLeft className="w-4 h-4 mr-1" />Back</button><button onClick={() => setStep(4)} className="btn-primary">Review <ArrowRight className="w-4 h-4 ml-1" /></button></div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-gray-900">Review & Submit</h3>
              <div className="bg-gray-50 rounded-xl p-6 space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="text-gray-500">Company:</span> <strong>{form.companyName || '—'}</strong></div>
                  <div><span className="text-gray-500">Solution:</span> <strong>{form.serviceName || '—'}</strong></div>
                  <div><span className="text-gray-500">Category:</span> <strong>{form.category || '—'}</strong></div>
                  <div><span className="text-gray-500">Location:</span> <strong>{form.location || '—'}</strong></div>
                  <div><span className="text-gray-500">Email:</span> <strong>{form.email || '—'}</strong></div>
                  <div><span className="text-gray-500">Pricing:</span> <strong>{form.pricing || '—'}</strong></div>
                </div>
                {form.shortDesc && <div><span className="text-gray-500">Summary:</span> {form.shortDesc}</div>}
                {form.certifications.length > 0 && <div><span className="text-gray-500">Certifications:</span> {form.certifications.join(', ')}</div>}
              </div>
              <div className="flex gap-3"><button onClick={() => setStep(3)} className="btn-outline"><ArrowLeft className="w-4 h-4 mr-1" />Back</button><button onClick={() => setSubmitted(true)} className="btn-primary">Submit Listing <CheckCircle className="w-4 h-4 ml-1" /></button></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
