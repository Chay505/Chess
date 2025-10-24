import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Footer from '@/app/components/Footer';

const messages = {
  footer: {
    tagline: 'Chess coaching for beginners of all ages',
    quickLinks: 'Quick Links',
    about: 'About',
    pricing: 'Pricing',
    faq: 'FAQ',
    contact: 'Contact',
    followUs: 'Follow Us',
    privacyPolicy: 'Privacy Policy',
    copyright: '© {year} Chess Coaching. All rights reserved.',
    phone: 'Phone',
    email: 'Email'
  }
};

describe('Footer', () => {
  it('renders logo and tagline', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Chess Coaching')).toBeInTheDocument();
    expect(screen.getByText('Chess coaching for beginners of all ages')).toBeInTheDocument();
  });

  it('displays contact information', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('438-722-2812')).toBeInTheDocument();
    expect(screen.getByText('chaimaa.alaoui.bel@gmail.com')).toBeInTheDocument();
  });

  it('renders quick links section', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /pricing/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /faq/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Follow Us')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
  });

  it('displays copyright notice with current year', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>
    );

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear}.*All rights reserved`, 'i'))).toBeInTheDocument();
  });

  it('renders privacy policy link', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>
    );

    const privacyLink = screen.getByRole('link', { name: /privacy policy/i });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', '/privacy');
  });

  it('has correct href attributes for quick links', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>
    );

    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: /pricing/i })).toHaveAttribute('href', '#pricing');
    expect(screen.getByRole('link', { name: /faq/i })).toHaveAttribute('href', '#faq');
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '#contact');
  });

  it('has correct styling classes', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>
    );

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-[#2C3E50]', 'text-white');
  });

  it('social media links open in new tab', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>
    );

    const linkedinLink = screen.getByLabelText('LinkedIn');
    const twitterLink = screen.getByLabelText('Twitter');
    const facebookLink = screen.getByLabelText('Facebook');

    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(twitterLink).toHaveAttribute('target', '_blank');
    expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(facebookLink).toHaveAttribute('target', '_blank');
    expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('phone link has correct href', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>
    );

    const phoneLink = screen.getByRole('link', { name: /438-722-2812/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:+14387222812');
  });

  it('email link has correct href', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>
    );

    const emailLink = screen.getByRole('link', { name: /chaimaa.alaoui.bel@gmail.com/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:chaimaa.alaoui.bel@gmail.com');
  });
});
