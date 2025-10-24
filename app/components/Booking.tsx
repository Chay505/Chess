'use client';

import { useTranslations } from 'next-intl';
import { InlineWidget } from 'react-calendly';

export default function Booking() {
  const t = useTranslations('booking');

  return (
    <section id="booking" className="py-16 px-6 md:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4 text-center">
          {t('heading')}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {t('instructions')}
        </p>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <InlineWidget
            url="https://calendly.com/chaimaa-alaoui-bel/1-on-1-chess-meeting"
            styles={{
              height: '700px'
            }}
            pageSettings={{
              backgroundColor: 'ffffff',
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: '4A9B8E',
              textColor: '2C3E50'
            }}
          />
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          {t('note')}
        </div>
      </div>
    </section>
  );
}
