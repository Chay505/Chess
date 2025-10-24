'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common');

  const switchLocale = (newLocale: string) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1 border border-gray-300 rounded-md overflow-hidden">
        <button
          onClick={() => switchLocale('en')}
          disabled={locale === 'en'}
          className={`px-3 py-1 text-sm font-medium transition-colors ${
            locale === 'en'
              ? 'bg-[#4A9B8E] text-white cursor-default'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
        <button
          onClick={() => switchLocale('fr')}
          disabled={locale === 'fr'}
          className={`px-3 py-1 text-sm font-medium transition-colors ${
            locale === 'fr'
              ? 'bg-[#4A9B8E] text-white cursor-default'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          aria-label="Passer au français"
        >
          FR
        </button>
      </div>
    </div>
  );
}
