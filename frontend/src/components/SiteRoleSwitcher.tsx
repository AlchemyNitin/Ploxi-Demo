'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Building2, MapPin, ShieldCheck, Lock, Globe } from 'lucide-react';
import { useRBAC } from '@/contexts/RBACContext';
import { sites, type SiteId } from '@/lib/demo-data/sites';
import type { DemoRole } from '@/lib/demo-data/roles';

// ─── Badge color map ──────────────────────────────────────────────────────────

const badgeStyles: Record<DemoRole['badgeColor'], string> = {
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  blue:    'bg-blue-50 text-blue-700 border-blue-200',
  amber:   'bg-amber-50 text-amber-700 border-amber-200',
  violet:  'bg-violet-50 text-violet-700 border-violet-200',
};

const avatarStyles: Record<DemoRole['badgeColor'], string> = {
  emerald: 'bg-emerald-600 text-white',
  blue:    'bg-blue-600 text-white',
  amber:   'bg-amber-500 text-white',
  violet:  'bg-violet-600 text-white',
};

// ─── Dropdown Component ───────────────────────────────────────────────────────

interface DropdownProps {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
}

function Dropdown({ open, onClose, anchorRef, children }: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (
        ref.current && !ref.current.contains(e.target as Node) &&
        anchorRef.current && !anchorRef.current.contains(e.target as Node)
      ) onClose();
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 mt-1.5 z-50 min-w-[280px] bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-fade-in"
      style={{ animation: 'fadeIn 0.12s ease' }}
    >
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SiteRoleSwitcher() {
  const { activeRole, activeSite, allRoles, accessibleSites, setRole, setSite, canAccessSite } =
    useRBAC();

  const [roleOpen,  setRoleOpen]  = useState(false);
  const [siteOpen,  setSiteOpen]  = useState(false);
  const roleRef = useRef<HTMLButtonElement>(null!);
  const siteRef = useRef<HTMLButtonElement>(null!);

  const badge = badgeStyles[activeRole.badgeColor];
  const avatar = avatarStyles[activeRole.badgeColor];

  return (
    <div className="bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 gap-3">

          {/* Left: Role selector */}
          <div className="flex items-center gap-4 min-w-0">
            <div className="relative">
              <button
                ref={roleRef}
                id="role-switcher-btn"
                onClick={() => { setRoleOpen((v) => !v); setSiteOpen(false); }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                {/* Avatar */}
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold flex-shrink-0 ${avatar}`}>
                  {activeRole.initials}
                </span>
                <span className="hidden sm:inline font-medium text-gray-800 max-w-[180px] truncate">
                  {activeRole.label}
                </span>
                <span className="sm:hidden font-medium text-gray-800">
                  {activeRole.shortLabel}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 flex-shrink-0 transition-transform ${roleOpen ? 'rotate-180' : ''}`} />
              </button>

              <Dropdown open={roleOpen} onClose={() => setRoleOpen(false)} anchorRef={roleRef}>
                <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Switch Role</p>
                </div>
                <div className="p-1.5 space-y-0.5">
                  {allRoles.map((role) => {
                    const isActive = role.id === activeRole.id;
                    const av = avatarStyles[role.badgeColor];
                    return (
                      <button
                        key={role.id}
                        id={`role-option-${role.id}`}
                        onClick={() => { setRole(role.id); setRoleOpen(false); }}
                        className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                          isActive ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold flex-shrink-0 mt-0.5 ${av}`}>
                          {role.initials}
                        </span>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold leading-tight">{role.label}</div>
                          <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{role.description}</div>
                        </div>
                        {isActive && (
                          <span className="ml-auto flex-shrink-0 w-2 h-2 rounded-full bg-primary-500 mt-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </Dropdown>
            </div>

            {/* Access badge */}
            <span
              className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${badge}`}
            >
              {activeRole.allowedSites === 'all' ? (
                <Globe className="w-3 h-3" />
              ) : (
                <Lock className="w-3 h-3" />
              )}
              {activeRole.accessBadge}
            </span>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-5 w-px bg-gray-200 flex-shrink-0" />

          {/* Right: Site selector */}
          <div className="flex items-center gap-2 min-w-0">
            <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <div className="relative">
              <button
                ref={siteRef}
                id="site-switcher-btn"
                onClick={() => { setSiteOpen((v) => !v); setRoleOpen(false); }}
                disabled={accessibleSites.length <= 1}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                  accessibleSites.length <= 1
                    ? 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                    : 'border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-800'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                <span className="font-medium truncate max-w-[160px]">
                  {activeSite.shortName}
                </span>
                {accessibleSites.length > 1 && (
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 flex-shrink-0 transition-transform ${siteOpen ? 'rotate-180' : ''}`} />
                )}
                {accessibleSites.length <= 1 && (
                  <Lock className="w-3 h-3 text-gray-300 flex-shrink-0" />
                )}
              </button>

              <Dropdown open={siteOpen} onClose={() => setSiteOpen(false)} anchorRef={siteRef}>
                <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Select Site</p>
                </div>
                <div className="p-1.5 space-y-0.5">
                  {sites.map((site) => {
                    const isActive  = site.id === activeSite.id;
                    const hasAccess = canAccessSite(site.id as SiteId);
                    const scoreColor =
                      site.compliance.overallScore >= 80 ? 'text-emerald-600' :
                      site.compliance.overallScore >= 65 ? 'text-amber-600' : 'text-red-500';
                    return (
                      <button
                        key={site.id}
                        id={`site-option-${site.id}`}
                        onClick={() => { if (hasAccess) { setSite(site.id as SiteId); setSiteOpen(false); } }}
                        disabled={!hasAccess}
                        className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                          !hasAccess  ? 'opacity-40 cursor-not-allowed' :
                          isActive    ? 'bg-primary-50 text-primary-700' :
                          'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <Building2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-400" />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold leading-tight">{site.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{site.city} · {site.type}</div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className={`text-sm font-bold ${scoreColor}`}>{site.compliance.overallScore}<span className="text-[10px] text-gray-400">/100</span></div>
                          <div className="text-[10px] text-gray-400">ESG Score</div>
                        </div>
                        {isActive && hasAccess && (
                          <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary-500 mt-2" />
                        )}
                        {!hasAccess && (
                          <Lock className="w-3 h-3 text-gray-300 flex-shrink-0 mt-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
                {accessibleSites.length < sites.length && (
                  <div className="px-3 py-2 bg-amber-50 border-t border-amber-100">
                    <p className="text-[11px] text-amber-700 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Some sites are restricted for your role
                    </p>
                  </div>
                )}
              </Dropdown>
            </div>

            {/* Compliance score pill */}
            <span
              className={`hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                activeSite.compliance.reportingStatus === 'On Track'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : activeSite.compliance.reportingStatus === 'At Risk'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              {activeSite.compliance.reportingStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
