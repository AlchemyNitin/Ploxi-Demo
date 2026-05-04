'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp, ArrowRight, Shield, BarChart3, Globe, CheckCircle } from 'lucide-react';

export default function ClimateFinancePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <header className="border-b border-gray-800 bg-gray-950/90 backdrop-blur sticky top-[36px] z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-emerald-400 hover:text-emerald-300 font-medium text-sm">← Back to Ploxi</Link>
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-700">
              <Image src="/images/logo.jpeg" alt="Ploxi" width={40} height={40} className="h-10 w-10 object-contain rounded-md" />
              <div><h1 className="text-lg font-bold">Ploxi Climate Finance</h1><p className="text-xs text-gray-400">Sustainable Investment Platform</p></div>
            </div>
          </div>
          <Link href="/demo/climate-finance/dashboard" className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition shadow-md text-sm font-medium">
            Investor Dashboard
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden flex-grow">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-gray-950 to-teal-900/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full mb-8">
              <TrendingUp className="w-4 h-4" /><span className="text-sm font-semibold">Climate Finance Hub</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Invest in a<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Sustainable Future</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Connect with verified green investment opportunities, carbon credit markets, and climate impact funds on Ploxi&apos;s trusted platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo/climate-finance/dashboard" className="group inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold text-lg hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/30">
                Explore Opportunities<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/demo/climate-finance/consultation" className="inline-flex items-center justify-center px-8 py-4 bg-gray-800 text-gray-200 border border-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-700 transition-all">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Why Climate Finance on Ploxi?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Verified Opportunities', desc: 'Every project undergoes rigorous ESG screening and third-party verification.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
              { icon: BarChart3, title: 'Impact Analytics', desc: 'Real-time dashboards tracking environmental and financial returns on investment.', color: 'text-teal-400', bg: 'bg-teal-500/10' },
              { icon: Globe, title: 'Global Access', desc: 'Connect with climate projects across India, EU, US, and UAE markets.', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
            ].map((f, i) => { const Icon = f.icon; return (
              <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 hover:border-emerald-500/30 transition-all">
                <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4`}><Icon className={`w-6 h-6 ${f.color}`} /></div>
                <h4 className="font-semibold text-lg mb-2">{f.title}</h4>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ); })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Make an Impact?</h3>
          <p className="text-lg text-gray-400 mb-10">Join investors who are driving the transition to a net-zero economy.</p>
          <Link href="/climate-finance/investor-registration" className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-lg hover:from-emerald-500 hover:to-teal-500 transition-all shadow-2xl shadow-emerald-600/20">
            Start Investing <ArrowRight className="ml-3 w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <Image src="/images/logo.jpeg" alt="Ploxi" width={32} height={32} className="h-8 w-8 object-contain rounded" />
            <div><p className="font-semibold">Ploxi</p><p className="text-xs text-gray-500">Empowering Sustainable Finance</p></div>
          </div>
          <p className="text-gray-500 text-sm">© 2025 Ploxi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
