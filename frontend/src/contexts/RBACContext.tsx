'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  type ReactNode,
} from 'react';
import { demoRoles, roleMap, DEFAULT_ROLE_ID, type DemoRole } from '@/lib/demo-data/roles';
import { sites, siteMap, type SiteData, type SiteId } from '@/lib/demo-data/sites';

// ─── Context Shape ─────────────────────────────────────────────────────────────

interface RBACContextValue {
  /** Currently active role object */
  activeRole: DemoRole;
  /** Currently active site object */
  activeSite: SiteData;
  /** All roles available for the role switcher */
  allRoles: DemoRole[];
  /** Sites this role is allowed to access */
  accessibleSites: SiteData[];
  /** Switch to a different role by id */
  setRole: (roleId: string) => void;
  /** Switch to a different site by id (no-op if role has no access) */
  setSite: (siteId: SiteId) => void;
  /** Whether the current role can access a given site */
  canAccessSite: (siteId: SiteId) => boolean;
  /** Whether a nav item label is visible for the current role */
  canSeeNav: (label: string) => boolean;
}

// ─── Context + Hook ────────────────────────────────────────────────────────────

const RBACContext = createContext<RBACContextValue | null>(null);

export function useRBAC(): RBACContextValue {
  const ctx = useContext(RBACContext);
  if (!ctx) throw new Error('useRBAC must be used within RBACProvider');
  return ctx;
}

// ─── Storage Keys ─────────────────────────────────────────────────────────────

const ROLE_KEY = 'demo_rbac_role';
const SITE_KEY = 'demo_rbac_site';

function readSession(key: string): string | null {
  try { return sessionStorage.getItem(key); } catch { return null; }
}
function writeSession(key: string, value: string): void {
  try { sessionStorage.setItem(key, value); } catch { /* ignore */ }
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function RBACProvider({ children }: { children: ReactNode }) {
  const [roleId, setRoleId] = useState<string>(DEFAULT_ROLE_ID);
  const [siteId, setSiteId] = useState<SiteId>('bangalore');

  // Rehydrate from sessionStorage on mount
  useEffect(() => {
    const savedRole = readSession(ROLE_KEY);
    const savedSite = readSession(SITE_KEY);
    if (savedRole && roleMap[savedRole]) setRoleId(savedRole);
    if (savedSite && siteMap[savedSite as SiteId]) setSiteId(savedSite as SiteId);
  }, []);

  const activeRole = roleMap[roleId] ?? roleMap[DEFAULT_ROLE_ID];

  // Derived: which sites this role can access
  const accessibleSites = useMemo<SiteData[]>(() => {
    if (activeRole.allowedSites === 'all') return sites;
    return activeRole.allowedSites.map((id) => siteMap[id]);
  }, [activeRole]);

  // Ensure activeSite is always within the role's accessible sites
  const resolvedSiteId = useMemo<SiteId>(() => {
    const allowed = activeRole.allowedSites;
    if (allowed === 'all') return siteId;
    return (allowed as SiteId[]).includes(siteId)
      ? siteId
      : (allowed as SiteId[])[0];
  }, [activeRole, siteId]);

  const activeSite = siteMap[resolvedSiteId];

  // ── Setters ──────────────────────────────────────────────────────────────────

  const setRole = useCallback((newRoleId: string) => {
    if (!roleMap[newRoleId]) return;
    const newRole = roleMap[newRoleId];
    setRoleId(newRoleId);
    writeSession(ROLE_KEY, newRoleId);

    // Auto-adjust site if current site is not accessible in new role
    if (newRole.allowedSites !== 'all') {
      const allowed = newRole.allowedSites as SiteId[];
      if (!allowed.includes(siteId)) {
        setSiteId(allowed[0]);
        writeSession(SITE_KEY, allowed[0]);
      }
    }
  }, [siteId]);

  const setSite = useCallback((newSiteId: SiteId) => {
    const allowed = activeRole.allowedSites;
    if (allowed !== 'all' && !(allowed as SiteId[]).includes(newSiteId)) return;
    setSiteId(newSiteId);
    writeSession(SITE_KEY, newSiteId);
  }, [activeRole]);

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const canAccessSite = useCallback((id: SiteId): boolean => {
    const allowed = activeRole.allowedSites;
    return allowed === 'all' || (allowed as SiteId[]).includes(id);
  }, [activeRole]);

  const canSeeNav = useCallback((label: string): boolean => {
    return activeRole.visibleNavItems.includes(label as never);
  }, [activeRole]);

  const value: RBACContextValue = {
    activeRole,
    activeSite,
    allRoles: demoRoles,
    accessibleSites,
    setRole,
    setSite,
    canAccessSite,
    canSeeNav,
  };

  return <RBACContext.Provider value={value}>{children}</RBACContext.Provider>;
}
