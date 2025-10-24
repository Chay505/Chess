import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { useUser } from '@clerk/nextjs';
import ResourcesList from '../../components/dashboard/ResourcesList';

// Mock Clerk
vi.mock('@clerk/nextjs', () => ({
  useUser: vi.fn()
}));

// Mock Heroicons
vi.mock('@heroicons/react/24/outline', () => ({
  ArrowDownTrayIcon: () => <div data-testid="download-icon">Download Icon</div>,
  DocumentIcon: () => <div data-testid="document-icon">Document Icon</div>
}));

const messages = {
  dashboard: {
    resources: {
      loading: 'Loading resources...',
      emptyState: 'No resources yet. Your instructor will upload materials here.',
      download: 'Download',
      downloading: 'Downloading...',
      downloadError: 'Failed to download file. Please try again.'
    }
  }
};

describe('ResourcesList Component', () => {
  it('should display loading state when user is logged in', () => {
    (useUser as any).mockReturnValue({ user: { id: 'user-1' } });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ResourcesList />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Loading resources...')).toBeInTheDocument();
  });

  it('should not crash when user is not logged in', () => {
    (useUser as any).mockReturnValue({ user: null });

    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ResourcesList />
      </NextIntlClientProvider>
    );

    // Component renders without crashing
    expect(container.querySelector('.text-center')).toBeInTheDocument();
  });
});
