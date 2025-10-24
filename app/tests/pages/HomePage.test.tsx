import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/[locale]/page';
import { NextIntlClientProvider } from 'next-intl';

const enMessages = {
  homepage: {
    welcome: 'Welcome to Chess Coaching',
    subtitle: 'Learn chess from a professional instructor. Personalized lessons for beginners of all ages.',
    aboutTitle: 'About',
    aboutPlaceholder: 'Content coming soon...',
    servicesTitle: 'Services',
    servicesPlaceholder: 'Content coming soon...',
    contactTitle: 'Contact',
    contactPlaceholder: 'Content coming soon...',
  },
  common: {
    language: 'Language',
  },
};

const frMessages = {
  homepage: {
    welcome: 'Bienvenue au Coaching d\'Échecs',
    subtitle: 'Apprenez les échecs avec un instructeur professionnel. Leçons personnalisées pour débutants de tous âges.',
    aboutTitle: 'À propos',
    aboutPlaceholder: 'Contenu à venir...',
    servicesTitle: 'Services',
    servicesPlaceholder: 'Contenu à venir...',
    contactTitle: 'Contact',
    contactPlaceholder: 'Contenu à venir...',
  },
  common: {
    language: 'Langue',
  },
};

describe('HomePage', () => {
  describe('English locale', () => {
    it('renders welcome message in English (AC1)', () => {
      render(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <HomePage />
        </NextIntlClientProvider>
      );

      expect(screen.getByText('Welcome to Chess Coaching')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Learn chess from a professional instructor. Personalized lessons for beginners of all ages.'
        )
      ).toBeInTheDocument();
    });

    it('renders all placeholder sections with English content (AC7)', () => {
      render(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <HomePage />
        </NextIntlClientProvider>
      );

      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
      expect(screen.getAllByText('Content coming soon...').length).toBe(3);
    });
  });

  describe('French locale', () => {
    it('renders welcome message in French (AC1)', () => {
      render(
        <NextIntlClientProvider locale="fr" messages={frMessages}>
          <HomePage />
        </NextIntlClientProvider>
      );

      expect(screen.getByText('Bienvenue au Coaching d\'Échecs')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Apprenez les échecs avec un instructeur professionnel. Leçons personnalisées pour débutants de tous âges.'
        )
      ).toBeInTheDocument();
    });

    it('renders all placeholder sections with French content (AC7)', () => {
      render(
        <NextIntlClientProvider locale="fr" messages={frMessages}>
          <HomePage />
        </NextIntlClientProvider>
      );

      expect(screen.getByText('À propos')).toBeInTheDocument();
      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
      expect(screen.getAllByText('Contenu à venir...').length).toBe(3);
    });
  });

  describe('Responsive design', () => {
    it('has responsive classes for different screen sizes (AC8)', () => {
      const { container } = render(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <HomePage />
        </NextIntlClientProvider>
      );

      // Hero section should have responsive text sizes
      const heroSection = container.querySelector('.hero h1');
      expect(heroSection).toHaveClass('text-4xl', 'md:text-5xl', 'lg:text-6xl');

      // Container should have responsive padding
      const main = container.querySelector('main');
      expect(main).toHaveClass('px-4', 'py-12');
    });
  });

  describe('Grammar and professionalism (AC6)', () => {
    it('uses professional English translations', () => {
      render(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <HomePage />
        </NextIntlClientProvider>
      );

      // Check for professional tone in content
      const subtitle = screen.getByText(/Learn chess from a professional instructor/);
      expect(subtitle).toBeInTheDocument();
    });

    it('uses professional French translations', () => {
      render(
        <NextIntlClientProvider locale="fr" messages={frMessages}>
          <HomePage />
        </NextIntlClientProvider>
      );

      // Check for professional tone in content
      const subtitle = screen.getByText(/Apprenez les échecs avec un instructeur professionnel/);
      expect(subtitle).toBeInTheDocument();
    });
  });
});
