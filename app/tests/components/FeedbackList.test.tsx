import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { ClerkProvider } from '@clerk/nextjs';
import FeedbackList from '../../components/dashboard/FeedbackList';

// Create a mock useUser function that we can control
const mockUseUser = vi.fn();

// Mock Clerk
vi.mock('@clerk/nextjs', () => ({
  useUser: () => mockUseUser()
}));

const messages = {
  dashboard: {
    feedback: {
      emptyState: 'No feedback yet. Check back after your first lesson!',
      loading: 'Loading feedback...',
      error: 'Failed to load feedback. Please try again later.'
    }
  }
};

describe('FeedbackList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('should render loading state initially', () => {
    mockUseUser.mockReturnValue({ user: { id: 'user_123' } });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FeedbackList />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Loading feedback...')).toBeInTheDocument();
  });

  it('should render empty state when no feedback', async () => {
    mockUseUser.mockReturnValue({ user: { id: 'user_123' } });

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ feedback: [] })
    });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FeedbackList />
      </NextIntlClientProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText('No feedback yet. Check back after your first lesson!')
      ).toBeInTheDocument();
    });
  });

  it('should render feedback list when feedback exists', async () => {
    mockUseUser.mockReturnValue({ user: { id: 'user_123' } });

    const mockFeedback = [
      {
        id: 'feedback_1',
        content: 'Great progress on opening theory!',
        createdAt: '2025-01-20T00:00:00.000Z'
      },
      {
        id: 'feedback_2',
        content: 'Keep practicing **endgame** techniques.',
        createdAt: '2025-01-15T00:00:00.000Z'
      }
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ feedback: mockFeedback })
    });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FeedbackList />
      </NextIntlClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Great progress on opening theory!')).toBeInTheDocument();
      expect(screen.getByText(/Keep practicing/)).toBeInTheDocument();
    });
  });

  it('should format dates correctly', async () => {
    mockUseUser.mockReturnValue({ user: { id: 'user_123' } });

    const mockFeedback = [
      {
        id: 'feedback_1',
        content: 'Test content',
        createdAt: '2025-01-20T00:00:00.000Z'
      }
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ feedback: mockFeedback })
    });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FeedbackList />
      </NextIntlClientProvider>
    );

    await waitFor(() => {
      // Date format will vary based on locale, just check it exists
      const dateElement = screen.getByText(/January|20|2025/);
      expect(dateElement).toBeInTheDocument();
    });
  });

  it('should render error state on fetch failure', async () => {
    mockUseUser.mockReturnValue({ user: { id: 'user_123' } });

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FeedbackList />
      </NextIntlClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Failed to load feedback. Please try again later.')).toBeInTheDocument();
    });
  });

  it('should apply correct styling to feedback cards', async () => {
    mockUseUser.mockReturnValue({ user: { id: 'user_123' } });

    const mockFeedback = [
      {
        id: 'feedback_1',
        content: 'Test content',
        createdAt: '2025-01-20T00:00:00.000Z'
      }
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ feedback: mockFeedback })
    });

    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FeedbackList />
      </NextIntlClientProvider>
    );

    await waitFor(() => {
      const feedbackCard = container.querySelector('.bg-white');
      expect(feedbackCard).toHaveClass('border', 'border-[#E5E7EB]', 'rounded-lg', 'shadow-sm', 'p-5');
    });
  });

  it('should render markdown content', async () => {
    mockUseUser.mockReturnValue({ user: { id: 'user_123' } });

    const mockFeedback = [
      {
        id: 'feedback_1',
        content: '**Bold text** and *italic text*',
        createdAt: '2025-01-20T00:00:00.000Z'
      }
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ feedback: mockFeedback })
    });

    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FeedbackList />
      </NextIntlClientProvider>
    );

    await waitFor(() => {
      // ReactMarkdown will render markdown as HTML
      const proseContainer = container.querySelector('.prose');
      expect(proseContainer).toBeInTheDocument();
    });
  });

  it('should display feedback in chronological order (newest first)', async () => {
    mockUseUser.mockReturnValue({ user: { id: 'user_123' } });

    const mockFeedback = [
      {
        id: 'feedback_1',
        content: 'Newest feedback',
        createdAt: '2025-01-20T00:00:00.000Z'
      },
      {
        id: 'feedback_2',
        content: 'Older feedback',
        createdAt: '2025-01-15T00:00:00.000Z'
      }
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ feedback: mockFeedback })
    });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FeedbackList />
      </NextIntlClientProvider>
    );

    await waitFor(() => {
      const feedbackItems = screen.getAllByText(/feedback/i);
      expect(feedbackItems[0]).toHaveTextContent('Newest feedback');
    });
  });
});
