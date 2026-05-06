'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin, Building2, FileText, ArrowRight, CheckCircle, BarChart3,
} from 'lucide-react';
import { locations, industries, frameworks, type Location, type Industry, type Framework } from '@/lib/demo-data';

export default function CorporateDemoPage() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null);
  const [step, setStep] = useState(1);

  // Auto-filter frameworks by region
  const filteredFrameworks = selectedLocation
    ? frameworks.filter((f) => f.applicability.includes(selectedLocation.code))
    : frameworks;

  const handleSubmit = () => {
    if (!selectedLocation || !selectedIndustry || !selectedFramework) return;
    localStorage.setItem(
      'dashboardConfig',
      JSON.stringify({ location: selectedLocation, industry: selectedIndustry, framework: selectedFramework }),
    );
    router.push(
      `/demo/corporate/dashboard/${selectedLocation.code.toLowerCase()}/${selectedIndustry.id}/${selectedFramework.id}`,
    );
  };

  // Load saved config
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dashboardConfig');
      if (saved) {
        const c = JSON.parse(saved);
        if (c.location) setSelectedLocation(c.location);
        if (c.industry) setSelectedIndustry(c.industry);
        if (c.framework) setSelectedFramework(c.framework);
      }
    } catch { /* ignore */ }
  }, []);



  return (
    <div>
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-[36px] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/images/logo.jpeg" alt="Ploxi Earth" width={40} height={40} className="h-10 w-10 object-contain rounded-md" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Ploxi Earth — Corporate</h1>
                <p className="text-sm text-gray-600">Sustainability Dashboard & Services</p>
              </div>
            </div>
            <Link href="/" className="text-sm text-primary-600 hover:text-primary-700 font-medium">← Back to Home</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Assessment */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full mb-4">
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm font-semibold">Quick ESG Assessment</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Configure Your Sustainability Dashboard</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Select your location, industry, and reporting framework to get a personalized ESG dashboard with relevant metrics and vendors.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            {/* Step 1: Location */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Step 1: Select Location</h3>
                {selectedLocation && <CheckCircle className="w-5 h-5 text-green-500" />}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {locations.map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => { setSelectedLocation(loc); setStep(2); setSelectedFramework(null); }}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedLocation?.code === loc.code
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{loc.flag}</div>
                    <div className="font-medium text-gray-900">{loc.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{loc.primaryFrameworks.join(', ')}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Industry */}
            <div className={`mb-8 transition-opacity ${step >= 2 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Step 2: Select Industry</h3>
                {selectedIndustry && <CheckCircle className="w-5 h-5 text-green-500" />}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {industries.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => { setSelectedIndustry(ind); setStep(3); }}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      selectedIndustry?.id === ind.id
                        ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-xl mb-1">{ind.icon}</div>
                    <div className="text-sm font-medium text-gray-900">{ind.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Framework */}
            <div className={`mb-8 transition-opacity ${step >= 3 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-900">Step 3: Select Framework</h3>
                {selectedFramework && <CheckCircle className="w-5 h-5 text-green-500" />}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {filteredFrameworks.map((fw) => (
                  <button
                    key={fw.id}
                    onClick={() => setSelectedFramework(fw)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedFramework?.id === fw.id
                        ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{fw.name}</div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">{fw.fullName}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!selectedLocation || !selectedIndustry || !selectedFramework}
              className="w-full btn-primary text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Launch Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </section>


      </main>
    </div>
  );
}
