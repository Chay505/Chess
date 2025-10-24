import { useTranslations } from 'next-intl';
import Header from '@/app/components/Header';
import Hero from '@/app/components/Hero';
import About from '@/app/components/About';
import Pricing from '@/app/components/Pricing';
import Testimonials from '@/app/components/Testimonials';
import Booking from '@/app/components/Booking';
import FAQ from '@/app/components/FAQ';
import ContactForm from '@/app/components/ContactForm';

export default function HomePage() {
  const t = useTranslations('homepage');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <About />
      <Pricing />
      <Testimonials />
      <Booking />
      <FAQ />
      <ContactForm />
      <main className="container mx-auto px-4 py-12">

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
      </main>
    </div>
  );
}
