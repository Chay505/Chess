import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Pricing from '@/app/components/Pricing';
import { describe, it, expect, vi } from 'vitest';

const messages = {
  pricing: {
    heading: 'Simple, Transparent Pricing',
    price: '$40',
    perLesson: 'per 60-minute lesson',
    whatsIncluded: "What's Included",
    included: {
      lesson: '60 minutes of personalized 1-on-1 instruction',
      instruction: 'Bilingual coaching (English or French)',
      feedback: 'Post-lesson analysis and feedback',
      resources: 'Access to your student portal with PGN files and materials'
    },
    audience: {
      heading: 'Who This Is For',
      description: 'Perfect for complete beginners to early intermediate players (ages 5-55, rating 0-1200). Whether you\'re learning your first moves or working to break 1000, these lessons are designed for you.'
    },
    howItWorks: {
      heading: 'How It Works',
      step1: 'Book a time using the calendar below',
      step2: 'Receive payment instructions via email',
      step3: 'Join your lesson at the scheduled time via Zoom or Google Meet'
    },
    policies: {
      heading: 'Policies & Flexibility',
      cancellation: 'Cancel up to 24 hours before your lesson with full refund',
      rescheduling: 'Reschedule anytime up to 24 hours before your lesson',
      noHiddenFees: 'No hidden fees, no surprises—just straightforward pricing'
    },
    cta: 'Book Now',
    trustMessage: 'Transparent pricing. No contracts. Cancel or reschedule anytime.'
  }
};

describe('Pricing Component', () => {
  const renderComponent = () => {
    return render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Pricing />
      </NextIntlClientProvider>
    );
  };

  it('renders pricing section with correct heading', () => {
    renderComponent();
    expect(screen.getByText('Simple, Transparent Pricing')).toBeInTheDocument();
  });

  it('displays prominent price of $40', () => {
    renderComponent();
    expect(screen.getByText('$40')).toBeInTheDocument();
    expect(screen.getByText('per 60-minute lesson')).toBeInTheDocument();
  });

  it('displays all included items', () => {
    renderComponent();
    expect(screen.getByText(/60 minutes of personalized 1-on-1 instruction/)).toBeInTheDocument();
    expect(screen.getByText(/Bilingual coaching \(English or French\)/)).toBeInTheDocument();
    expect(screen.getByText(/Post-lesson analysis and feedback/)).toBeInTheDocument();
    expect(screen.getByText(/Access to your student portal/)).toBeInTheDocument();
  });

  it('displays target audience information', () => {
    renderComponent();
    expect(screen.getByText('Who This Is For')).toBeInTheDocument();
    expect(screen.getByText(/Perfect for complete beginners/)).toBeInTheDocument();
  });

  it('displays booking process steps', () => {
    renderComponent();
    expect(screen.getByText('How It Works')).toBeInTheDocument();
    expect(screen.getByText(/Book a time using the calendar below/)).toBeInTheDocument();
    expect(screen.getByText(/Receive payment instructions via email/)).toBeInTheDocument();
    expect(screen.getByText(/Join your lesson at the scheduled time/)).toBeInTheDocument();
  });

  it('displays cancellation and rescheduling policies', () => {
    renderComponent();
    expect(screen.getByText('Policies & Flexibility')).toBeInTheDocument();
    expect(screen.getByText(/Cancel up to 24 hours before/)).toBeInTheDocument();
    expect(screen.getByText(/Reschedule anytime up to 24 hours/)).toBeInTheDocument();
  });

  it('emphasizes no hidden fees', () => {
    renderComponent();
    expect(screen.getByText(/No hidden fees, no surprises/)).toBeInTheDocument();
  });

  it('displays CTA button "Book Now"', () => {
    renderComponent();
    const ctaButton = screen.getByRole('button', { name: /Book Now/i });
    expect(ctaButton).toBeInTheDocument();
  });

  it('CTA button has correct styling classes', () => {
    renderComponent();
    const ctaButton = screen.getByRole('button', { name: /Book Now/i });
    expect(ctaButton).toHaveClass('bg-teal-600', 'text-white', 'hover:bg-teal-700');
  });

  it('displays trust message', () => {
    renderComponent();
    expect(screen.getByText(/Transparent pricing. No contracts./)).toBeInTheDocument();
  });

  it('has correct section id for smooth scrolling', () => {
    const { container } = renderComponent();
    const section = container.querySelector('section#pricing');
    expect(section).toBeInTheDocument();
  });

  it('CTA button triggers scroll to booking section', () => {
    // Mock scrollIntoView
    const mockScrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;

    // Mock getElementById to return a mock element
    const mockElement = document.createElement('div');
    mockElement.id = 'booking';
    document.getElementById = vi.fn().mockReturnValue(mockElement);

    renderComponent();
    const ctaButton = screen.getByRole('button', { name: /Book Now/i });
    ctaButton.click();

    expect(document.getElementById).toHaveBeenCalledWith('booking');
  });
});

describe('Pricing Component - French Translations', () => {
  const frenchMessages = {
    pricing: {
      heading: 'Tarification simple et transparente',
      price: '40$',
      perLesson: 'par leçon de 60 minutes',
      whatsIncluded: 'Ce qui est inclus',
      included: {
        lesson: '60 minutes d\'instruction personnalisée 1-on-1',
        instruction: 'Coaching bilingue (anglais ou français)',
        feedback: 'Analyse et rétroaction après la leçon',
        resources: 'Accès à votre portail étudiant avec fichiers PGN et matériaux'
      },
      audience: {
        heading: 'Pour qui c\'est',
        description: 'Parfait pour les débutants complets'
      },
      howItWorks: {
        heading: 'Comment ça marche',
        step1: 'Réservez une heure',
        step2: 'Recevez les instructions',
        step3: 'Rejoignez votre leçon'
      },
      policies: {
        heading: 'Politiques et flexibilité',
        cancellation: 'Annulez jusqu\'à 24 heures',
        rescheduling: 'Reprogrammez à tout moment',
        noHiddenFees: 'Pas de frais cachés'
      },
      cta: 'Réserver maintenant',
      trustMessage: 'Tarification transparente.'
    }
  };

  it('displays French price format (40$)', () => {
    render(
      <NextIntlClientProvider locale="fr" messages={frenchMessages}>
        <Pricing />
      </NextIntlClientProvider>
    );
    expect(screen.getByText('40$')).toBeInTheDocument();
  });

  it('displays French heading', () => {
    render(
      <NextIntlClientProvider locale="fr" messages={frenchMessages}>
        <Pricing />
      </NextIntlClientProvider>
    );
    expect(screen.getByText('Tarification simple et transparente')).toBeInTheDocument();
  });

  it('displays French CTA button text', () => {
    render(
      <NextIntlClientProvider locale="fr" messages={frenchMessages}>
        <Pricing />
      </NextIntlClientProvider>
    );
    expect(screen.getByRole('button', { name: /Réserver maintenant/i })).toBeInTheDocument();
  });
});
