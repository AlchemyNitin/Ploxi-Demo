'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, CheckCircle } from 'lucide-react';
import SubpageHeader from '@/components/SubpageHeader';

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', company: '', investmentRange: '', interest: '', message: '', preferredDate: '',
  });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 max-w-md text-center">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-8 h-8 text-emerald-400" /></div>
          <h2 className="text-2xl font-bold text-white mb-3">Consultation Booked!</h2>
          <p className="text-gray-400 mb-6">Our climate finance advisor will reach out within 24 hours. (Demo mode)</p>
          <Link href="/demo/climate-finance/dashboard" className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-500 transition">Go to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SubpageHeader subtitle="Book a Consultation" backHref="/demo/climate-finance" backLabel="← Climate Finance Home" />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center"><Calendar className="w-6 h-6 text-emerald-400" /></div>
            <div><h2 className="text-xl font-bold">Schedule Your Session</h2><p className="text-sm text-gray-400">30-minute complimentary consultation</p></div>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm text-gray-400 mb-1.5">Full Name *</label><input className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" /></div>
              <div><label className="block text-sm text-gray-400 mb-1.5">Email *</label><input type="email" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@company.com" /></div>
            </div>
            <div><label className="block text-sm text-gray-400 mb-1.5">Company</label><input className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition" value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Company name" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm text-gray-400 mb-1.5">Investment Range</label>
                <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition" value={form.investmentRange} onChange={(e) => update('investmentRange', e.target.value)}>
                  <option value="">Select</option><option>₹5L – ₹25L</option><option>₹25L – ₹1Cr</option><option>₹1Cr – ₹5Cr</option><option>₹5Cr+</option>
                </select>
              </div>
              <div><label className="block text-sm text-gray-400 mb-1.5">Area of Interest</label>
                <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition" value={form.interest} onChange={(e) => update('interest', e.target.value)}>
                  <option value="">Select</option><option>Renewable Energy</option><option>Carbon Credits</option><option>Green Real Estate</option><option>Impact Funds</option><option>ESG Advisory</option>
                </select>
              </div>
            </div>
            <div><label className="block text-sm text-gray-400 mb-1.5">Preferred Date</label><input type="date" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition" value={form.preferredDate} onChange={(e) => update('preferredDate', e.target.value)} /></div>
            <div><label className="block text-sm text-gray-400 mb-1.5">Message</label><textarea rows={3} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition" value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Tell us about your investment goals..." /></div>
            <button onClick={() => setSubmitted(true)} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-emerald-600/20">
              Book Consultation
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
