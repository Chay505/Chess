'use client';

import { useTranslations } from 'next-intl';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function Pricing() {
  const t = useTranslations('pricing');

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const included = [
    t('included.lesson'),
    t('included.instruction'),
    t('included.feedback'),
    t('included.resources')
  ];

  return (
    <section className="py-16 px-6 md:py-24 bg-gray-50" id="pricing">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8 text-center">
          {t('heading')}
        </h2>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Price Display */}
          <div className="text-center mb-8">
            <div className="text-5xl md:text-6xl font-bold text-chesslab-forest mb-2">
              {t('price')}
            </div>
            <div className="text-lg text-gray-600">{t('perLesson')}</div>
          </div>

          {/* What's Included */}
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              {t('whatsIncluded')}
            </h3>
            <ul className="space-y-3">
              {included.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-base md:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target Audience */}
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              {t('audience.heading')}
            </h3>
            <p className="text-gray-600 text-base md:text-lg">
              {t('audience.description')}
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              {t('howItWorks.heading')}
            </h3>
            <ol className="space-y-3">
              <li className="flex">
                <span className="text-chesslab-forest font-semibold text-lg mr-3">1.</span>
                <span className="text-gray-600 text-base md:text-lg">{t('howItWorks.step1')}</span>
              </li>
              <li className="flex">
                <span className="text-chesslab-forest font-semibold text-lg mr-3">2.</span>
                <span className="text-gray-600 text-base md:text-lg">{t('howItWorks.step2')}</span>
              </li>
              <li className="flex">
                <span className="text-chesslab-forest font-semibold text-lg mr-3">3.</span>
                <span className="text-gray-600 text-base md:text-lg">{t('howItWorks.step3')}</span>
              </li>
            </ol>
          </div>

          {/* Policies & Transparency */}
          <div className="mb-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              {t('policies.heading')}
            </h3>
            <ul className="space-y-2 text-gray-600 text-base md:text-lg">
              <li>✓ {t('policies.cancellation')}</li>
              <li>✓ {t('policies.rescheduling')}</li>
              <li>✓ {t('policies.noHiddenFees')}</li>
            </ul>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={scrollToBooking}
              className="bg-chesslab-forest text-white px-8 py-4 min-h-[48px] rounded-lg font-semibold text-lg hover:bg-chesslab-sage transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              {t('cta')}
            </button>
          </div>

          {/* Trust Message */}
          <div className="mt-8 text-sm text-gray-500 text-center italic">
            {t('trustMessage')}
          </div>
        </div>
      </div>
    </section>
  );
}
