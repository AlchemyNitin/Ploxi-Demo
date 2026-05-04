'use client';
import Image from 'next/image';
import Link from 'next/link';
import { HeroFadeDown } from '@/components/ui/Motion';

interface SubpageHeaderProps {
  subtitle: string;
  backHref?: string;
  backLabel?: string;
  variant?: 'light' | 'dark';
}

export default function SubpageHeader({
  subtitle,
  backHref = '/',
  backLabel = '← Back to Ploxi',
  variant = 'light',
}: SubpageHeaderProps) {
  const isDark = variant === 'dark';

  return (
    <HeroFadeDown>
      <header className={`${isDark ? 'border-gray-800 bg-gray-950/90' : 'border-gray-100 bg-white/90'} border-b backdrop-blur`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 lg:min-w-[11rem]">
            <Link
              href={backHref}
              className={`${isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-gray-500 hover:text-gray-700'} text-sm transition-colors`}
            >
              {backLabel}
            </Link>
            <a
              href="https://www.ploxiconsult.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${isDark ? 'border-gray-700 text-emerald-400 hover:bg-gray-800' : 'border-gray-200 text-primary-600 hover:bg-primary-50'} inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition-colors lg:hidden`}
            >
              Website
            </a>
          </div>
          <div className="flex min-w-0 items-center gap-3 lg:flex-1 lg:justify-center">
            <Image
              src="/images/logo.jpeg"
              alt="Ploxi Earth"
              width={38}
              height={38}
              className={`${isDark ? 'ring-emerald-500/20' : 'ring-primary-500/10'} rounded-full ring-2`}
            />
            <div className="min-w-0">
              <p className={`${isDark ? 'text-white' : 'text-gray-900'} truncate text-sm font-bold leading-none`}>Ploxi Earth</p>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} truncate text-xs`}>{subtitle}</p>
            </div>
          </div>
          <a
            href="https://www.ploxiconsult.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-primary-600 hover:text-primary-700'} hidden text-sm font-medium transition-colors lg:inline-flex`}
          >
            Go to Website
          </a>
        </div>
      </header>
    </HeroFadeDown>
  );
}
