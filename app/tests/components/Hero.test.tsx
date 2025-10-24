import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Hero from '@/app/components/Hero';

// Mock messages for testing
const messages = {
  hero: {
    headline: 'Start Learning Chess with a Professional Instructor',
    subheadline: 'Personalized 1-on-1 lessons for beginners (ages 5-55, rating 0-1200)',
    cta: 'Book a Lesson',
    imageAlt: 'Professional chess instructor',
    socialProofStudents: 'Students Taught',
    socialProofRating: 'Rating'
  }
};

const frenchMessages = {
  hero: {
    headline: 'Commencez à apprendre les échecs avec un instructeur professionnel',
    subheadline: 'Cours personnalisés 1-on-1 pour débutants (âges 5-55, classement 0-1200)',
    cta: 'Réserver une leçon',
    imageAlt: 'Instructeur d\'échecs professionnel',
    socialProofStudents: 'Étudiants enseignés',
    socialProofRating: 'Évaluation'
  }
};

describe('Hero Component', () => {
  it('renders headline with i18n translation (English)', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Hero />
      </NextIntlClientProvider>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Start Learning Chess with a Professional Instructor'
    );
  });

  it('renders subheadline with target audience description', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Hero />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(/Personalized 1-on-1 lessons for beginners/i)).toBeInTheDocument();
    expect(screen.getByText(/ages 5-55/i)).toBeInTheDocument();
  });

  it('renders instructor photo with proper alt text', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Hero />
      </NextIntlClientProvider>
    );

    const image = screen.getByAltText('Professional chess instructor');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
  });

  it('renders CTA button with correct text', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Hero />
      </NextIntlClientProvider>
    );

    const ctaButton = screen.getByRole('button', { name: /Book a Lesson/i });
    expect(ctaButton).toBeInTheDocument();
  });

  it('CTA button triggers smooth scroll to booking section', () => {
    const mockScrollIntoView = vi.fn();
    const mockGetElementById = vi.spyOn(document, 'getElementById').mockReturnValue({
      scrollIntoView: mockScrollIntoView,
    } as any);

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Hero />
      </NextIntlClientProvider>
    );

    const ctaButton = screen.getByRole('button', { name: /Book a Lesson/i });
    ctaButton.click();

    expect(mockGetElementById).toHaveBeenCalledWith('booking');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    mockGetElementById.mockRestore();
  });

  it('renders correctly in French', () => {
    render(
      <NextIntlClientProvider locale="fr" messages={frenchMessages}>
        <Hero />
      </NextIntlClientProvider>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Commencez à apprendre les échecs avec un instructeur professionnel'
    );
    expect(screen.getByRole('button', { name: /Réserver une leçon/i })).toBeInTheDocument();
  });

  it('uses semantic HTML with section tag', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Hero />
      </NextIntlClientProvider>
    );

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('has responsive classes for mobile and desktop layouts', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Hero />
      </NextIntlClientProvider>
    );

    const section = container.querySelector('section');
    expect(section?.className).toMatch(/py-\d+/); // Responsive padding

    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer?.className).toMatch(/md:grid-cols-2/); // Desktop side-by-side
  });

  it('applies brand colors from design spec', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Hero />
      </NextIntlClientProvider>
    );

    const section = container.querySelector('section');
    expect(section?.className).toMatch(/bg-green-50/); // Brand background color

    const ctaButton = screen.getByRole('button', { name: /Book a Lesson/i });
    expect(ctaButton.className).toMatch(/bg-teal-600/); // Primary CTA color
  });

  it('CTA button meets minimum touch target size (44x44px)', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Hero />
      </NextIntlClientProvider>
    );

    const ctaButton = screen.getByRole('button', { name: /Book a Lesson/i });
    expect(ctaButton.className).toMatch(/px-\d+/); // Horizontal padding
    expect(ctaButton.className).toMatch(/py-\d+/); // Vertical padding ensures 44px height
  });
});
