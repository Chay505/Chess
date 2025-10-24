'use client';
import { useUser, SignOutButton } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';

export default function DashboardHeader() {
  const { user } = useUser();
  const t = useTranslations('dashboard');

  return (
    <header className="bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/dashboard" className="text-xl sm:text-2xl font-bold text-[#4A9B8E] hover:opacity-80 transition">
            Chay Chess
          </Link>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <span className="hidden sm:inline text-[#2C3E50] text-sm sm:text-base">
              {user?.firstName || user?.fullName}
            </span>
            <LanguageSwitcher />
            <SignOutButton>
              <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-white bg-[#4A9B8E] hover:bg-[#3D8A7D] rounded transition">
                {t('logout')}
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </header>
  );
}
