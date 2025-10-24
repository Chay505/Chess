import { useTranslations } from 'next-intl';
import Header from '@/app/components/Header';

export default function HomePage() {
  const t = useTranslations('homepage');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="hero text-center py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t('welcome')}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </section>

        {/* About Placeholder Section */}
        <section className="about-placeholder py-12 md:py-16 bg-white rounded-lg shadow-sm mb-8">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('aboutTitle')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('aboutPlaceholder')}
            </p>
          </div>
        </section>

        {/* Services Placeholder Section */}
        <section className="services-placeholder py-12 md:py-16 mb-8">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('servicesTitle')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('servicesPlaceholder')}
            </p>
          </div>
        </section>

        {/* Contact Placeholder Section */}
        <section className="contact-placeholder py-12 md:py-16 bg-white rounded-lg shadow-sm">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('contactTitle')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('contactPlaceholder')}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
