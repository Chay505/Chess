'use client';

import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-12 px-6 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8 text-center">
          {t('heading')}
        </h2>

        <div className="space-y-6 max-w-none">
          <p className="text-base leading-relaxed text-gray-600">
            {t('paragraph1')}
          </p>
          <p className="text-base leading-relaxed text-gray-600">
            {t('paragraph2')}
          </p>
          <p className="text-base leading-relaxed text-gray-600">
            {t('paragraph3')}
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {t('credentials.rating.title')}
            </h3>
            <p className="text-gray-600">{t('credentials.rating.value')}</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {t('credentials.experience.title')}
            </h3>
            <p className="text-gray-600">{t('credentials.experience.value')}</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {t('credentials.students.title')}
            </h3>
            <p className="text-gray-600">{t('credentials.students.value')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
