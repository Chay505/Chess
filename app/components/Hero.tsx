'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  const t = useTranslations('hero');

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-chesslab-cream py-16 px-6 md:py-24 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative">
        {/* Left Column: Text Content */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            <span className="text-gray-900">Start </span>
            <span className="text-chesslab-sage">learning</span>
            <br />
            <span className="text-gray-900">from the world's</span>
            <br />
            <span className="text-gray-900">pro instructor</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-md">
            {t('subheadline')}
          </p>
          <button
            onClick={scrollToBooking}
            className="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium text-base hover:bg-gray-800 transition-colors duration-200 min-w-[44px] min-h-[44px] inline-flex items-center gap-2 group"
            aria-label={t('cta')}
          >
            {t('cta')}
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Social Proof */}
          <div className="mt-12 flex items-center gap-8 flex-wrap">
            {/* Happy Customers */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-chesslab-sage border-2 border-white flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div className="w-10 h-10 rounded-full bg-chesslab-forest border-2 border-white flex items-center justify-center text-white font-semibold">
                  B
                </div>
                <div className="w-10 h-10 rounded-full bg-chesslab-gray border-2 border-white flex items-center justify-center text-gray-700 font-semibold">
                  C
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{t('studentsCount')}</div>
                <div className="text-sm text-gray-600">{t('happyStudents')}</div>
              </div>
            </div>

            {/* Rating */}
            <div className="border-l-2 border-chesslab-gray pl-8">
              <div className="text-2xl font-bold text-gray-900">{t('rating')}</div>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4].map((star) => (
                  <StarIcon key={star} className="w-5 h-5 text-yellow-400" />
                ))}
                <StarIcon className="w-5 h-5 text-gray-300" />
                <span className="ml-2 text-sm text-gray-600">{t('ratingLabel')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Arrow */}
        <svg
          className="hidden lg:block absolute left-1/2 top-1/2 -translate-y-12 w-32 h-32 text-gray-900"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M 10 40 Q 30 10, 60 30"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
          <path d="M 55 25 L 65 32 L 58 38" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Right Column: Instructor Image */}
        <div className="flex justify-center md:justify-end relative">
          {/* Decorative Circle Background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] rounded-full bg-chesslab-sage opacity-40"></div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-8 right-8 w-6 h-6 rounded-full bg-chesslab-sage opacity-60 animate-pulse"></div>
          <div className="absolute bottom-16 left-8 w-16 h-16 rounded-full border-4 border-chesslab-forest opacity-30"></div>
          <div className="absolute top-1/4 right-0 w-3 h-3 rounded-full bg-chesslab-forest"></div>

          {/* Main Image */}
          <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] z-10">
            <Image
              src="/images/Final.jpg"
              alt={t('imageAlt')}
              width={450}
              height={450}
              className="rounded-full object-cover shadow-2xl border-8 border-white"
              priority
            />
          </div>

          {/* Decorative Squiggle */}
          <svg
            className="absolute -top-4 -right-4 w-24 h-24 text-gray-900 opacity-50"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M 20 50 Q 40 20, 60 50 T 100 50" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
