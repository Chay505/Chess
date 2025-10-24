import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '@/app/components/Header';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  common: {
    language: 'Language',
  },
};

describe('Header', () => {
  it('renders the header with Chess Coaching title', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Header />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Chess Coaching')).toBeInTheDocument();
  });

  it('includes LanguageSwitcher component', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Header />
      </NextIntlClientProvider>
    );

    // Language switcher should be present
    expect(screen.getByText('Language:')).toBeInTheDocument();
  });

  it('has sticky positioning', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Header />
      </NextIntlClientProvider>
    );

    const header = container.querySelector('header');
    expect(header).toHaveClass('sticky');
  });
});
