'use client';

import { useTranslations } from 'next-intl';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function FAQ() {
  const t = useTranslations('faq');

  const faqs = [
    { question: t('q1.question'), answer: t('q1.answer') },
    { question: t('q2.question'), answer: t('q2.answer') },
    { question: t('q3.question'), answer: t('q3.answer') },
    { question: t('q4.question'), answer: t('q4.answer') },
    { question: t('q5.question'), answer: t('q5.answer') },
    { question: t('q6.question'), answer: t('q6.answer') },
    { question: t('q7.question'), answer: t('q7.answer') },
    { question: t('q8.question'), answer: t('q8.answer') },
  ];

  return (
    <section id="faq" className="py-16 px-6 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-12 text-center">
          {t('heading')}
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Disclosure key={idx}>
              {({ open }) => (
                <div className="border border-gray-200 rounded-lg">
                  <Disclosure.Button className="flex justify-between items-center w-full px-6 py-4 text-left hover:bg-gray-50 transition min-h-[44px]">
                    <span className="font-semibold text-[#2C3E50]">
                      {faq.question}
                    </span>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-gray-600 transition-transform flex-shrink-0 ml-4 ${
                        open ? 'transform rotate-180' : ''
                      }`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-6 pb-4 text-[#7F8C8D] leading-relaxed">
                    {faq.answer}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
