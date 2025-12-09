'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('hero');

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-chesslab-cream py-16 px-6 md:py-24 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Column: Text Content */}
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-chesslab-forest mb-4 leading-tight">
            {t('headline')}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
            {t('subheadline')}
          </p>
          <button
            onClick={scrollToBooking}
            className="bg-chesslab-forest text-white px-8 py-4 rounded-lg font-medium text-base hover:bg-chesslab-sage transition-colors duration-200 min-w-[44px] min-h-[44px]"
            aria-label={t('cta')}
          >
            {t('cta')}
          </button>
        </div>

        {/* Right Column: Instructor Image */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <Image
              src="/images/Final.jpg"
              alt={t('imageAlt')}
              width={400}
              height={400}
              className="rounded-full object-cover shadow-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
