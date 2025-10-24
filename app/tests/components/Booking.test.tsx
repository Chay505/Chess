import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Booking from '@/app/components/Booking';

// Mock messages for testing
const messages = {
  booking: {
    heading: 'Book Your First Lesson',
    instructions: 'Select a convenient time below. Payment instructions will be sent to your email after booking.',
    note: 'Having trouble? Contact us directly for assistance.'
  }
};

const frenchMessages = {
  booking: {
    heading: 'Réservez votre première leçon',
    instructions: 'Sélectionnez un horaire pratique ci-dessous. Les instructions de paiement vous seront envoyées par courriel après la réservation.',
    note: 'Vous rencontrez des difficultés? Contactez-nous directement pour obtenir de l\'aide.'
  }
};

describe('Booking Component', () => {
  it('renders section with correct ID for scroll navigation', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Booking />
      </NextIntlClientProvider>
    );

    const section = container.querySelector('section#booking');
    expect(section).toBeInTheDocument();
  });

  it('renders heading with i18n translation (English)', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Booking />
      </NextIntlClientProvider>
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Book Your First Lesson'
    );
  });

  it('renders instructional text with correct content', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Booking />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(/Select a convenient time below/i)).toBeInTheDocument();
    expect(screen.getByText(/Payment instructions will be sent/i)).toBeInTheDocument();
  });

  it('renders note/help text', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Booking />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(/Having trouble\?/i)).toBeInTheDocument();
  });

  it('renders Calendly widget container', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Booking />
      </NextIntlClientProvider>
    );

    // Check that the InlineWidget container exists
    const widgetContainer = container.querySelector('.calendly-inline-widget');
    expect(widgetContainer).toBeInTheDocument();
  });

  it('renders correctly in French', () => {
    render(
      <NextIntlClientProvider locale="fr" messages={frenchMessages}>
        <Booking />
      </NextIntlClientProvider>
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Réservez votre première leçon'
    );
    expect(screen.getByText(/Sélectionnez un horaire pratique/i)).toBeInTheDocument();
  });

  it('uses semantic HTML with section tag', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Booking />
      </NextIntlClientProvider>
    );

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('has responsive classes for mobile and desktop layouts', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Booking />
      </NextIntlClientProvider>
    );

    const section = container.querySelector('section');
    expect(section?.className).toMatch(/py-\d+/); // Responsive padding
    expect(section?.className).toMatch(/md:py-\d+/); // Desktop padding

    const innerContainer = container.querySelector('.max-w-4xl');
    expect(innerContainer).toBeInTheDocument();
  });

  it('applies correct background styling', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Booking />
      </NextIntlClientProvider>
    );

    const section = container.querySelector('section');
    expect(section?.className).toMatch(/bg-gray-50/);
  });

  it('centers content with max-width container', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Booking />
      </NextIntlClientProvider>
    );

    const maxWidthContainer = container.querySelector('.max-w-4xl');
    expect(maxWidthContainer?.className).toMatch(/mx-auto/);
  });

  it('heading is centered', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Booking />
      </NextIntlClientProvider>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.className).toMatch(/text-center/);
  });
});
