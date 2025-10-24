import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import DashboardHeader from '../../components/DashboardHeader';

// Mock Clerk
vi.mock('@clerk/nextjs', () => ({
  useUser: vi.fn(),
  SignOutButton: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sign-out-button">{children}</div>
  ),
}));

// Mock LanguageSwitcher (named export)
vi.mock('../../components/LanguageSwitcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher">Language Switcher</div>,
}));

const messages = {
  dashboard: {
    logout: 'Logout',
  },
};

describe('DashboardHeader', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    const { useUser } = await import('@clerk/nextjs');
    (useUser as any).mockReturnValue({ user: { firstName: 'John' }, isLoaded: true, isSignedIn: true });
  });

  it('should render the Chess Coach logo', async () => {
    const { useUser } = await import('@clerk/nextjs');
    (useUser as any).mockReturnValue({ user: { firstName: 'John' }, isLoaded: true, isSignedIn: true });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <DashboardHeader />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Chess Coach')).toBeInTheDocument();
  });

  it('should display user first name when available', async () => {
    const { useUser } = await import('@clerk/nextjs');
    (useUser as any).mockReturnValue({ user: { firstName: 'John', fullName: 'John Doe' }, isLoaded: true, isSignedIn: true });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <DashboardHeader />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('John')).toBeInTheDocument();
  });

  it('should display full name when firstName is not available', async () => {
    const { useUser } = await import('@clerk/nextjs');
    (useUser as any).mockReturnValue({ user: { fullName: 'Jane Smith' }, isLoaded: true, isSignedIn: true });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <DashboardHeader />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should render logout button', async () => {
    const { useUser } = await import('@clerk/nextjs');
    (useUser as any).mockReturnValue({ user: { firstName: 'John' }, isLoaded: true, isSignedIn: true });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <DashboardHeader />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('should render language switcher', async () => {
    const { useUser } = await import('@clerk/nextjs');
    (useUser as any).mockReturnValue({ user: { firstName: 'John' }, isLoaded: true, isSignedIn: true });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <DashboardHeader />
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
  });

  it('should have correct styling classes', async () => {
    const { useUser } = await import('@clerk/nextjs');
    (useUser as any).mockReturnValue({ user: { firstName: 'John' }, isLoaded: true, isSignedIn: true });

    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <DashboardHeader />
      </NextIntlClientProvider>
    );

    const header = container.querySelector('header');
    expect(header).toHaveClass('bg-white', 'border-b', 'border-[#E5E7EB]');
  });

  it('should render link to dashboard', async () => {
    const { useUser } = await import('@clerk/nextjs');
    (useUser as any).mockReturnValue({ user: { firstName: 'John' }, isLoaded: true, isSignedIn: true });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <DashboardHeader />
      </NextIntlClientProvider>
    );

    const link = screen.getByRole('link', { name: /chess coach/i });
    expect(link).toHaveAttribute('href', '/dashboard');
  });
});
