import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import DashboardPage from '../../[locale]/dashboard/page';

// Mock Clerk auth
vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn(),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

// Mock next-intl server
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(() => async (key: string) => {
    const translations: Record<string, string> = {
      welcome: 'Welcome to Your Dashboard',
      'resources.heading': 'My Resources',
      'feedback.heading': 'Instructor Feedback',
    };
    return translations[key] || key;
  }),
}));

// Mock child components
vi.mock('../../components/DashboardHeader', () => ({
  default: () => <div data-testid="dashboard-header">Dashboard Header</div>,
}));

vi.mock('../../components/dashboard/ResourcesList', () => ({
  default: () => <div data-testid="resources-list">Resources List</div>,
}));

vi.mock('../../components/dashboard/FeedbackList', () => ({
  default: () => <div data-testid="feedback-list">Feedback List</div>,
}));

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should redirect to sign-in when user is not authenticated', async () => {
    const { auth } = await import('@clerk/nextjs/server');
    const { redirect } = await import('next/navigation');

    vi.mocked(auth).mockResolvedValue({ userId: null } as any);

    await DashboardPage();

    expect(redirect).toHaveBeenCalledWith('/sign-in');
  });

  it('should render dashboard when user is authenticated', async () => {
    const { auth } = await import('@clerk/nextjs/server');

    vi.mocked(auth).mockResolvedValue({ userId: 'user_123' } as any);

    const result = await DashboardPage();

    expect(result).toBeDefined();
    expect(result.type).toBe('div');
  });

  it('should have correct background color', async () => {
    const { auth } = await import('@clerk/nextjs/server');

    vi.mocked(auth).mockResolvedValue({ userId: 'user_123' } as any);

    const result = await DashboardPage();

    expect(result.props.className).toContain('bg-[#F8F9FA]');
  });

  it('should render with responsive container', async () => {
    const { auth } = await import('@clerk/nextjs/server');

    vi.mocked(auth).mockResolvedValue({ userId: 'user_123' } as any);

    const result = await DashboardPage();

    expect(result.props.className).toContain('min-h-screen');
  });
});
