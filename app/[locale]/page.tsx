import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher';

export default function Home() {
  const t = useTranslations('home');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <div className="absolute top-8 right-8">
          <LanguageSwitcher />
        </div>
        <h1 className="text-4xl font-bold text-center mb-4">
          {t('title')}
        </h1>
        <p className="text-center text-lg">
          {t('subtitle')}
        </p>
      </div>
    </main>
  );
}
