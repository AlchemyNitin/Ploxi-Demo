'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  ShieldCheck,
  FolderKanban,
  FileSignature,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  /** If true, active when pathname *starts with* this href */
  matchPrefix?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/demo/corporate/dashboard',
    icon: LayoutDashboard,
    matchPrefix: true,
  },
  {
    label: 'Benchmarking',
    href: '/demo/corporate/benchmarking',
    icon: BarChart3,
  },
  {
    label: 'Marketplace',
    href: '/demo/corporate/marketplace',
    icon: ShoppingCart,
  },
  {
    label: 'Compliance',
    href: '/demo/corporate/compliance',
    icon: ShieldCheck,
  },
  {
    label: 'Project Management',
    href: '/demo/corporate/services',
    icon: FolderKanban,
  },
  {
    label: 'RFP',
    href: '/demo/corporate/rfp',
    icon: FileSignature,
  },
];

export default function DashboardNavbar() {
  const pathname = usePathname();

  const isActive = (item: NavItem): boolean => {
    if (item.matchPrefix) {
      return pathname.startsWith(item.href);
    }
    return pathname === item.href || pathname.startsWith(item.href + '/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontally scrollable on mobile */}
        <div className="flex overflow-x-auto scrollbar-hide -mb-px">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={[
                  'group flex items-center gap-2 px-4 py-3.5 text-sm font-medium whitespace-nowrap',
                  'border-b-2 transition-all duration-150',
                  active
                    ? 'border-primary-600 text-primary-700'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300',
                ].join(' ')}
              >
                <Icon
                  className={[
                    'w-4 h-4 flex-shrink-0 transition-colors duration-150',
                    active
                      ? 'text-primary-600'
                      : 'text-gray-400 group-hover:text-gray-600',
                  ].join(' ')}
                  strokeWidth={2}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
