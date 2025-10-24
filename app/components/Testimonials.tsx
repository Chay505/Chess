import { useTranslations } from 'next-intl';
import { StarIcon } from '@heroicons/react/24/solid';

interface Testimonial {
  quote: string;
  name: string;
  ageGroup: string;
  rating: number;
}

export default function Testimonials() {
  const t = useTranslations('testimonials');

  const testimonials: Testimonial[] = [
    {
      quote: t('testimonial1.quote'),
      name: t('testimonial1.name'),
      ageGroup: t('testimonial1.ageGroup'),
      rating: 5
    },
    {
      quote: t('testimonial2.quote'),
      name: t('testimonial2.name'),
      ageGroup: t('testimonial2.ageGroup'),
      rating: 5
    },
    {
      quote: t('testimonial3.quote'),
      name: t('testimonial3.name'),
      ageGroup: t('testimonial3.ageGroup'),
      rating: 5
    },
    {
      quote: t('testimonial4.quote'),
      name: t('testimonial4.name'),
      ageGroup: t('testimonial4.ageGroup'),
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-16 px-6 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-12 text-center">
          {t('heading')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-6 transition-transform hover:scale-105"
            >
              {/* Star Rating */}
              <div className="flex mb-3" aria-label={`Rating: ${item.rating} out of 5 stars`}>
                {[...Array(item.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" aria-hidden="true" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-[#2C3E50] italic mb-4 leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              {/* Student Info */}
              <div>
                <div className="font-medium text-[#4A9B8E]">{item.name}</div>
                <div className="text-sm text-[#7F8C8D]">{item.ageGroup}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
