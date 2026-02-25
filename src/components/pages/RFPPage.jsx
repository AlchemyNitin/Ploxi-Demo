// src/components/pages/RFPPage.jsx
'use client'

import React, { useState } from 'react';
import {
    FileText,
    Plus,
    X,
    Send,
    CheckCircle,
    Building2,
    Calendar,
    Shield,
    ShoppingBag,
    ChevronDown,
    ChevronUp,
    Clock,
    AlertCircle,
    Check,
    Search,
    Filter
} from 'lucide-react';

// ─── VENDOR POOL (same as marketplace, simplified) ────────────────────────────
const rfpVendors = [
    { id: 'quark_solar', name: 'Quark Solar', type: 'Energy', description: 'Solar panel systems & EPC services', certifications: ['MNRE', 'BIS', 'IEC'] },
    { id: 'furaat', name: 'Furaat', type: 'Water', description: 'Water treatment & recycling solutions', certifications: ['ISO 14001', 'CPCB'] },
    { id: 'plastic_fischer', name: 'Plastic Fischer', type: 'Waste', description: 'Plastic waste collection & recycling', certifications: ['B-Corp', 'ISO 14001'] },
    { id: 'enphase_india', name: 'Enphase India', type: 'Energy Efficiency', description: 'Building automation & energy monitoring', certifications: ['ECBC', 'BEE', 'ISO 50001'] },
    { id: 'eco_restore', name: 'EcoRestore', type: 'NBS', description: 'Nature-based carbon offset projects', certifications: ['VCS', 'Gold Standard'] },
    { id: 'breathe_esg', name: 'Breathe ESG', type: 'Consulting', description: 'ESG strategy & reporting services', certifications: ['GRI', 'BRSR', 'TCFD'] },
    { id: 'esg_cert_hub', name: 'ESG Certification Hub', type: 'Certificates', description: 'Green building certification support', certifications: ['LEED', 'GRIHA', 'WELL'] },
    { id: 'earth_sync', name: 'Earth Sync', type: 'Carbon', description: 'Carbon audit & CDP reporting support', certifications: ['ISO 14064', 'GHG Protocol'] },
];

// ─── COMPLIANCE REQUIREMENTS ──────────────────────────────────────────────────
const complianceReqs = [
    { id: 'brsr', label: 'BRSR Core Reporting', group: 'ESG Reporting' },
    { id: 'gri', label: 'GRI Standards Disclosure', group: 'ESG Reporting' },
    { id: 'tcfd', label: 'TCFD Climate Disclosures', group: 'ESG Reporting' },
    { id: 'leed', label: 'LEED Certification', group: 'Green Building' },
    { id: 'griha', label: 'GRIHA Certification', group: 'Green Building' },
    { id: 'bee', label: 'BEE Star Rating', group: 'Green Building' },
    { id: 'well', label: 'WELL Accreditation', group: 'Green Building' },
    { id: 'iso14001', label: 'ISO 14001 EMS', group: 'Environmental' },
    { id: 'cpcb', label: 'CPCB Compliance', group: 'Environmental' },
    { id: 'eia', label: 'EIA Clearance', group: 'Environmental' },
];

// ─── DUMMY SUBMITTED RFPs ─────────────────────────────────────────────────────
const submittedRFPs = [
    {
        id: 'rfp_001', title: 'Solar Energy Solutions — HQ Expansion',
        createdAt: '2025-11-15', deadline: '2025-12-10', status: 'responses_received',
        vendors: 3, responses: 2, complianceReqs: ['BRSR Core Reporting', 'BEE Star Rating'],
        estimatedValue: '₹45–60 Lakhs'
    },
    {
        id: 'rfp_002', title: 'Annual Carbon Footprint Audit FY 2025-26',
        createdAt: '2025-12-01', deadline: '2026-01-15', status: 'open',
        vendors: 4, responses: 0, complianceReqs: ['TCFD Climate Disclosures', 'ISO 14001 EMS'],
        estimatedValue: '₹15–25 Lakhs'
    },
    {
        id: 'rfp_003', title: 'LEED Gold Certification Support — Tower C',
        createdAt: '2025-10-20', deadline: '2025-11-30', status: 'awarded',
        vendors: 5, responses: 5, complianceReqs: ['LEED Certification', 'GRIHA Certification'],
        estimatedValue: '₹35 Lakhs'
    },
];

const STATUS_META = {
    open: { label: 'Open', color: 'bg-blue-100 text-blue-700', icon: Clock },
    responses_received: { label: 'Responses Received', color: 'bg-amber-100 text-amber-700', icon: AlertCircle },
    under_review: { label: 'Under Review', color: 'bg-purple-100 text-purple-700', icon: Filter },
    awarded: { label: 'Awarded', color: 'bg-green-100 text-green-700', icon: CheckCircle },
};

// ─── RFP BUILDER ─────────────────────────────────────────────────────────────
const RFPBuilder = ({ onSubmit }) => {
    const [step, setStep] = useState(1);
    const [selectedVendors, setSelectedVendors] = useState([]);
    const [selectedReqs, setSelectedReqs] = useState([]);
    const [vendorSearch, setVendorSearch] = useState('');
    const [vendorTypeFilter, setVendorTypeFilter] = useState('all');
    const [form, setForm] = useState({
        title: '',
        companyName: '',
        contactPerson: '',
        email: '',
        description: '',
        deadline: '',
        budget: '',
        scopeOfWork: '',
    });

    const vendorTypes = ['all', ...Array.from(new Set(rfpVendors.map(v => v.type)))];
    const filteredVendors = rfpVendors.filter(v => {
        const matchSearch = !vendorSearch || v.name.toLowerCase().includes(vendorSearch.toLowerCase()) || v.description.toLowerCase().includes(vendorSearch.toLowerCase());
        const matchType = vendorTypeFilter === 'all' || v.type === vendorTypeFilter;
        return matchSearch && matchType;
    });

    const toggleVendor = (id) => setSelectedVendors(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    const toggleReq = (id) => setSelectedReqs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

    const steps = [
        { num: 1, label: 'RFP Details' },
        { num: 2, label: 'Select Vendors' },
        { num: 3, label: 'Compliance' },
        { num: 4, label: 'Review & Submit' },
    ];

    const reqGroups = Array.from(new Set(complianceReqs.map(r => r.group)));

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            {/* Step Indicator */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-0">
                    {steps.map((s, idx) => (
                        <React.Fragment key={s.num}>
                            <div className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s.num ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                    {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                                </div>
                                <span className={`text-xs mt-1 whitespace-nowrap ${step >= s.num ? 'text-green-700 font-medium' : 'text-gray-500'}`}>{s.label}</span>
                            </div>
                            {idx < steps.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-2 mb-4 ${step > s.num ? 'bg-green-500' : 'bg-gray-200'}`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="p-6">
                {/* Step 1: RFP Details */}
                {step === 1 && (
                    <div className="space-y-4">
                        <h3 className="font-bold text-gray-900 text-lg">RFP Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">RFP Title *</label>
                                <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Solar Energy Provider for HQ Campus" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                                <input type="text" value={form.companyName} onChange={e => setForm(p => ({ ...p, companyName: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person *</label>
                                <input type="text" value={form.contactPerson} onChange={e => setForm(p => ({ ...p, contactPerson: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Submission Deadline *</label>
                                <input type="date" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Budget</label>
                                <input type="text" value={form.budget} onChange={e => setForm(p => ({ ...p, budget: e.target.value }))} placeholder="e.g. ₹20–50 Lakhs" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Project Description *</label>
                                <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} placeholder="Describe the project, objectives, and expected outcomes..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Scope of Work</label>
                                <textarea value={form.scopeOfWork} onChange={e => setForm(p => ({ ...p, scopeOfWork: e.target.value }))} rows={3} placeholder="List specific deliverables, timelines, or technical specifications..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Select Vendors */}
                {step === 2 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-gray-900 text-lg">Select Vendors to Invite</h3>
                            <span className="text-sm text-gray-500">{selectedVendors.length} selected</span>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            <div className="flex-1 relative min-w-[200px]">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="text" placeholder="Search vendors..." value={vendorSearch} onChange={e => setVendorSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500" />
                            </div>
                            <div className="flex gap-1 flex-wrap">
                                {vendorTypes.map(t => (
                                    <button key={t} onClick={() => setVendorTypeFilter(t)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${vendorTypeFilter === t ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                        {t === 'all' ? 'All Types' : t}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {filteredVendors.map(v => {
                                const isSel = selectedVendors.includes(v.id);
                                return (
                                    <div key={v.id} onClick={() => toggleVendor(v.id)}
                                        className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${isSel ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:border-green-300'}`}>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="font-semibold text-gray-900">{v.name}</div>
                                                <div className="text-xs text-gray-500 mb-2">{v.type} · {v.description}</div>
                                                <div className="flex flex-wrap gap-1">
                                                    {v.certifications.map(c => <span key={c} className="text-xs bg-gray-100 text-gray-600 rounded px-1.5 py-0.5">{c}</span>)}
                                                </div>
                                            </div>
                                            {isSel ? <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" /> : <div className="w-5 h-5 border border-gray-300 rounded-full flex-shrink-0" />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Step 3: Compliance Requirements */}
                {step === 3 && (
                    <div className="space-y-5">
                        <h3 className="font-bold text-gray-900 text-lg">Attach Compliance Requirements</h3>
                        <p className="text-sm text-gray-600">Select the certifications or frameworks vendors must address in their proposal.</p>
                        {reqGroups.map(group => (
                            <div key={group}>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{group}</div>
                                <div className="flex flex-wrap gap-2">
                                    {complianceReqs.filter(r => r.group === group).map(req => {
                                        const isSel = selectedReqs.includes(req.id);
                                        return (
                                            <button key={req.id} onClick={() => toggleReq(req.id)}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${isSel ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'}`}>
                                                {isSel && <Check className="w-3 h-3" />}
                                                {req.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Step 4: Review & Submit */}
                {step === 4 && (
                    <div className="space-y-5">
                        <h3 className="font-bold text-gray-900 text-lg">Review Your RFP</h3>
                        <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                            <div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">RFP Title</div>
                                <div className="font-semibold text-gray-900">{form.title || '—'}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><div className="text-xs text-gray-400 mb-0.5">Company</div><div className="text-sm text-gray-800">{form.companyName || '—'}</div></div>
                                <div><div className="text-xs text-gray-400 mb-0.5">Contact</div><div className="text-sm text-gray-800">{form.contactPerson || '—'}</div></div>
                                <div><div className="text-xs text-gray-400 mb-0.5">Email</div><div className="text-sm text-gray-800">{form.email || '—'}</div></div>
                                <div><div className="text-xs text-gray-400 mb-0.5">Deadline</div><div className="text-sm text-gray-800">{form.deadline || '—'}</div></div>
                                {form.budget && <div><div className="text-xs text-gray-400 mb-0.5">Budget</div><div className="text-sm text-gray-800">{form.budget}</div></div>}
                            </div>
                            {form.description && <div><div className="text-xs text-gray-400 mb-0.5">Description</div><div className="text-sm text-gray-800">{form.description}</div></div>}

                            <div><div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Invited Vendors ({selectedVendors.length})</div>
                                {selectedVendors.length === 0 ? <div className="text-sm text-gray-500">None selected</div> :
                                    <div className="flex flex-wrap gap-2">{rfpVendors.filter(v => selectedVendors.includes(v.id)).map(v => (
                                        <span key={v.id} className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-1">{v.name}</span>
                                    ))}</div>}</div>

                            <div><div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Compliance Requirements ({selectedReqs.length})</div>
                                {selectedReqs.length === 0 ? <div className="text-sm text-gray-500">None selected</div> :
                                    <div className="flex flex-wrap gap-2">{complianceReqs.filter(r => selectedReqs.includes(r.id)).map(r => (
                                        <span key={r.id} className="text-xs bg-green-100 text-green-700 rounded px-2 py-1">{r.label}</span>
                                    ))}</div>}</div>
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                    <button onClick={() => setStep(s => s - 1)} disabled={step === 1}
                        className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
                        ← Back
                    </button>
                    {step < 4 ? (
                        <button onClick={() => setStep(s => s + 1)}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                            Next →
                        </button>
                    ) : (
                        <button onClick={() => { onSubmit({ ...form, vendors: selectedVendors, complianceReqs: selectedReqs }); }}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2">
                            <Send className="w-4 h-4" /> Submit RFP
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// ─── SUBMITTED RFPs LIST ──────────────────────────────────────────────────────
const RFPList = () => {
    const [expanded, setExpanded] = useState(null);

    return (
        <div className="space-y-4">
            {submittedRFPs.map(rfp => {
                const meta = STATUS_META[rfp.status];
                const Icon = meta.icon;
                const isExp = expanded === rfp.id;
                return (
                    <div key={rfp.id} className="bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="p-5 flex items-center justify-between cursor-pointer" onClick={() => setExpanded(isExp ? null : rfp.id)}>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-bold text-gray-900">{rfp.title}</h3>
                                    <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${meta.color}`}>
                                        <Icon className="w-3 h-3" /> {meta.label}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> {rfp.vendors} vendors invited</span>
                                    <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> {rfp.responses} responses</span>
                                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Deadline: {new Date(rfp.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                    <span className="font-medium text-green-700">{rfp.estimatedValue}</span>
                                </div>
                            </div>
                            {isExp ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                        </div>
                        {isExp && (
                            <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                                <div className="text-xs font-bold text-gray-400 uppercase mb-2">Compliance Requirements</div>
                                <div className="flex flex-wrap gap-2">
                                    {rfp.complianceReqs.map(r => (
                                        <span key={r} className="text-xs bg-green-100 text-green-700 rounded px-2 py-1">{r}</span>
                                    ))}
                                </div>
                                <div className="mt-4 flex gap-3">
                                    <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">View Responses</button>
                                    <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Download RFP PDF</button>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const RFPPage = () => {
    const [activeTab, setActiveTab] = useState('list');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (data) => {
        console.log('RFP submitted:', data);
        setSubmitted(true);
        setTimeout(() => { setActiveTab('list'); setSubmitted(false); }, 2500);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-8">
                {/* Header */}
                <div className="text-center p-10">
                    <h1 className="text-3xl font-bold text-white mb-4">Request for Proposal (RFP)</h1>
                    <p className="text-gray-200 max-w-3xl mx-auto">
                        Create structured RFPs to invite sustainability solution providers. Attach compliance requirements,
                        specify scope, and manage all vendor responses in one place.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Total RFPs', value: submittedRFPs.length + (submitted ? 1 : 0), icon: FileText, color: 'text-blue-600' },
                        { label: 'Open', value: submittedRFPs.filter(r => r.status === 'open').length, icon: Clock, color: 'text-blue-600' },
                        { label: 'Responses Received', value: submittedRFPs.filter(r => r.status === 'responses_received').length, icon: AlertCircle, color: 'text-amber-600' },
                        { label: 'Awarded', value: submittedRFPs.filter(r => r.status === 'awarded').length, icon: CheckCircle, color: 'text-green-600' },
                    ].map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div key={i} className="bg-white rounded-xl p-4 text-center border border-gray-200 shadow-sm">
                                <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-1`} />
                                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                <div className="text-xs text-gray-600">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-200 flex gap-2">
                    <button onClick={() => setActiveTab('list')}
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'list' ? 'bg-green-50 text-green-700 border border-green-200' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <FileText className="w-5 h-5" /> My RFPs
                    </button>
                    <button onClick={() => setActiveTab('create')}
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'create' ? 'bg-green-50 text-green-700 border border-green-200' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <Plus className="w-5 h-5" /> Create New RFP
                    </button>
                </div>

                {/* Success Banner */}
                {submitted && (
                    <div className="bg-green-50 border border-green-300 rounded-xl p-4 flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <div>
                            <div className="font-bold text-green-800">RFP Submitted Successfully!</div>
                            <div className="text-sm text-green-700">Vendors will be notified and can submit their proposals before your deadline.</div>
                        </div>
                    </div>
                )}

                {activeTab === 'list' && <RFPList />}
                {activeTab === 'create' && <RFPBuilder onSubmit={(data) => { handleSubmit(data); setActiveTab('list'); }} />}
            </div>
        </div>
    );
};

export default RFPPage;
