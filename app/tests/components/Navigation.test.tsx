import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Navigation from '@/app/components/Navigation';

const messages = {
  navigation: {
    home: 'Home',
    about: 'About',
    pricing: 'Pricing',
    testimonials: 'Testimonials',
    faq: 'FAQ',
    contact: 'Contact',
    bookLesson: 'Book a Lesson'
  }
};

describe('Navigation', () => {
  const renderNavigation = () => {
    return render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Navigation />
      </NextIntlClientProvider>
    );
  };

  it('renders logo and navigation links', () => {
    renderNavigation();

    expect(screen.getByText('Chess Coaching')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders Book a Lesson button', () => {
    renderNavigation();

    const bookButtons = screen.getAllByText('Book a Lesson');
    expect(bookButtons.length).toBeGreaterThan(0);
  });

  it('shows hamburger menu button on mobile', () => {
    renderNavigation();

    const hamburgerButton = screen.getByLabelText('Toggle mobile menu');
    expect(hamburgerButton).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger is clicked', () => {
    renderNavigation();

    const hamburgerButton = screen.getByLabelText('Toggle mobile menu');

    // Mobile menu should not be visible initially (getAllByText would fail if not rendered)
    // After clicking, links should appear in the mobile menu
    fireEvent.click(hamburgerButton);

    // Check that mobile menu is now visible
    const mobileAboutLinks = screen.getAllByText('About');
    expect(mobileAboutLinks.length).toBeGreaterThan(1); // Desktop + mobile
  });

  it('closes mobile menu when a link is clicked', () => {
    renderNavigation();

    const hamburgerButton = screen.getByLabelText('Toggle mobile menu');
    fireEvent.click(hamburgerButton);

    // Get one of the mobile links and click it
    const aboutLinks = screen.getAllByText('About');
    const mobileAboutLink = aboutLinks[aboutLinks.length - 1]; // Last one is mobile
    fireEvent.click(mobileAboutLink);

    // Mobile menu should now be closed
    // We can verify by checking that only desktop links remain
    const remainingAboutLinks = screen.getAllByText('About');
    expect(remainingAboutLinks.length).toBe(1); // Only desktop link
  });

  it('has correct navigation anchor links', () => {
    renderNavigation();

    const aboutLink = screen.getAllByText('About')[0];
    expect(aboutLink.closest('a')).toHaveAttribute('href', '#about');

    const pricingLink = screen.getAllByText('Pricing')[0];
    expect(pricingLink.closest('a')).toHaveAttribute('href', '#pricing');

    const testimonialsLink = screen.getAllByText('Testimonials')[0];
    expect(testimonialsLink.closest('a')).toHaveAttribute('href', '#testimonials');

    const faqLink = screen.getAllByText('FAQ')[0];
    expect(faqLink.closest('a')).toHaveAttribute('href', '#faq');

    const contactLink = screen.getAllByText('Contact')[0];
    expect(contactLink.closest('a')).toHaveAttribute('href', '#contact');
  });

  it('book lesson button has correct href', () => {
    renderNavigation();

    const bookButtons = screen.getAllByText('Book a Lesson');
    const desktopButton = bookButtons[0];
    expect(desktopButton.closest('a')).toHaveAttribute('href', '#booking');
  });

  it('meets touch target size requirements (44x44px minimum)', () => {
    renderNavigation();

    const hamburgerButton = screen.getByLabelText('Toggle mobile menu');
    expect(hamburgerButton).toHaveClass('min-w-[44px]');
    expect(hamburgerButton).toHaveClass('min-h-[44px]');

    const bookButtons = screen.getAllByText('Book a Lesson');
    const desktopBookButton = bookButtons[0].closest('a');
    expect(desktopBookButton).toHaveClass('min-h-[44px]');
  });

  it('renders with sticky positioning', () => {
    renderNavigation();

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('sticky');
    expect(header).toHaveClass('top-0');
    expect(header).toHaveClass('z-50');
  });
});
