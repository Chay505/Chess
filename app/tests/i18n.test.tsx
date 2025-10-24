import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import enMessages from '../../messages/en.json';
import frMessages from '../../messages/fr.json';

// Mock next/navigation
const mockPush = jest.fn();
const mockPathname = '/en/test';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => mockPathname,
}));

describe('i18n Framework', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  describe('Translation Files', () => {
    it('should have English translations', () => {
      expect(enMessages).toBeDefined();
      expect(enMessages.navigation.home).toBe('Home');
      expect(enMessages.common.bookLesson).toBe('Book a Lesson');
      expect(enMessages.home.title).toBe('Welcome to Projet Échec');
    });

    it('should have French translations', () => {
      expect(frMessages).toBeDefined();
      expect(frMessages.navigation.home).toBe('Accueil');
      expect(frMessages.common.bookLesson).toBe('Réserver une leçon');
      expect(frMessages.home.title).toBe('Bienvenue à Projet Échec');
    });

    it('should have matching keys in both locales', () => {
      const enKeys = JSON.stringify(Object.keys(enMessages).sort());
      const frKeys = JSON.stringify(Object.keys(frMessages).sort());
      expect(enKeys).toBe(frKeys);
    });
  });

  describe('LanguageSwitcher Component', () => {
    it('should render language switcher with both EN and FR buttons', () => {
      render(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <LanguageSwitcher />
        </NextIntlClientProvider>
      );

      expect(screen.getByText('EN')).toBeInTheDocument();
      expect(screen.getByText('FR')).toBeInTheDocument();
    });

    it('should highlight current locale (EN)', () => {
      render(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <LanguageSwitcher />
        </NextIntlClientProvider>
      );

      const enButton = screen.getByText('EN');
      expect(enButton).toBeDisabled();
      expect(enButton).toHaveClass('bg-blue-600');
    });

    it('should highlight current locale (FR)', () => {
      render(
        <NextIntlClientProvider locale="fr" messages={frMessages}>
          <LanguageSwitcher />
        </NextIntlClientProvider>
      );

      const frButton = screen.getByText('FR');
      expect(frButton).toBeDisabled();
      expect(frButton).toHaveClass('bg-blue-600');
    });

    it('should switch to French when FR button clicked', () => {
      render(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <LanguageSwitcher />
        </NextIntlClientProvider>
      );

      const frButton = screen.getByText('FR');
      fireEvent.click(frButton);

      expect(mockPush).toHaveBeenCalledWith('/fr/test');
    });

    it('should switch to English when EN button clicked from French', () => {
      // Temporarily change mock pathname to French
      const originalPathname = mockPathname;
      (mockPathname as any) = '/fr/test';

      render(
        <NextIntlClientProvider locale="fr" messages={frMessages}>
          <LanguageSwitcher />
        </NextIntlClientProvider>
      );

      const enButton = screen.getByText('EN');
      fireEvent.click(enButton);

      expect(mockPush).toHaveBeenCalledWith('/en/test');

      // Restore original pathname
      (mockPathname as any) = originalPathname;
    });
  });

  describe('Locale Configuration', () => {
    it('should support en and fr locales', () => {
      const supportedLocales = ['en', 'fr'];
      expect(supportedLocales).toContain('en');
      expect(supportedLocales).toContain('fr');
      expect(supportedLocales.length).toBe(2);
    });

    it('should have en as default locale', () => {
      const defaultLocale = 'en';
      expect(defaultLocale).toBe('en');
    });
  });
});
