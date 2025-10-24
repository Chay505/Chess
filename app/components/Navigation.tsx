'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';

export default function Navigation() {
  const t = useTranslations('navigation');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: t('about') },
    { href: '#pricing', label: t('pricing') },
    { href: '#testimonials', label: t('testimonials') },
    { href: '#faq', label: t('faq') },
    { href: '#contact', label: t('contact') }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl font-bold text-teal-600 hover:text-teal-700 transition-colors">
            Chess Coaching
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-teal-600 transition-colors text-base font-medium"
              >
                {link.label}
              </a>
            ))}
            <LanguageSwitcher />
            <a
              href="#booking"
              className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-700 transition-colors min-h-[44px] inline-flex items-center"
            >
              {t('bookLesson')}
            </a>
          </div>

          {/* Mobile Hamburger + Language Switcher */}
          <div className="flex md:hidden items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-gray-700 hover:text-teal-600 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-7 h-7" />
              ) : (
                <Bars3Icon className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="py-3 px-4 text-gray-700 hover:text-teal-600 hover:bg-gray-50 transition-colors rounded-lg text-base font-medium min-h-[44px] flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#booking"
                className="w-full mt-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors text-center min-h-[48px] flex items-center justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('bookLesson')}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
