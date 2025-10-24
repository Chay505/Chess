import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Testimonials from '@/app/components/Testimonials';
import { NextIntlClientProvider } from 'next-intl';

// Mock translations
const mockMessages = {
  testimonials: {
    heading: 'What Students Say',
    testimonial1: {
      quote: 'My son loves his chess lessons! The instructor is patient and makes learning fun. We\'ve seen huge improvement in just 3 months.',
      name: 'Sarah M.',
      ageGroup: 'Parent of 8-year-old'
    },
    testimonial2: {
      quote: 'I started with zero chess knowledge. Now I can confidently play with friends and understand strategy. Highly recommend!',
      name: 'Alex T.',
      ageGroup: 'Adult learner, 32'
    },
    testimonial3: {
      quote: 'The feedback after each lesson helps me understand my mistakes. I went from 600 to 1000 rating in 6 months!',
      name: 'Emma L.',
      ageGroup: 'Teen, 15'
    },
    testimonial4: {
      quote: 'As a parent, I appreciate the structured approach and clear progress tracking. My daughter is more confident and excited about chess every week.',
      name: 'Robert D.',
      ageGroup: 'Parent of 10-year-old'
    }
  }
};

describe('Testimonials Component', () => {
  const renderTestimonials = () => {
    return render(
      <NextIntlClientProvider locale="en" messages={mockMessages}>
        <Testimonials />
      </NextIntlClientProvider>
    );
  };

  it('renders the testimonials section heading', () => {
    renderTestimonials();
    expect(screen.getByText('What Students Say')).toBeInTheDocument();
  });

  it('displays 4 testimonial cards', () => {
    const { container } = renderTestimonials();
    const cards = container.querySelectorAll('.bg-white.border.border-gray-200.rounded-lg.shadow-md');
    // We should have 4 testimonial cards based on the component structure
    expect(cards.length).toBe(4);
  });

  it('renders testimonial quotes with proper formatting', () => {
    renderTestimonials();
    expect(screen.getByText(/My son loves his chess lessons/i)).toBeInTheDocument();
    expect(screen.getByText(/I started with zero chess knowledge/i)).toBeInTheDocument();
    expect(screen.getByText(/The feedback after each lesson/i)).toBeInTheDocument();
    expect(screen.getByText(/As a parent, I appreciate/i)).toBeInTheDocument();
  });

  it('displays student names', () => {
    renderTestimonials();
    expect(screen.getByText('Sarah M.')).toBeInTheDocument();
    expect(screen.getByText('Alex T.')).toBeInTheDocument();
    expect(screen.getByText('Emma L.')).toBeInTheDocument();
    expect(screen.getByText('Robert D.')).toBeInTheDocument();
  });

  it('displays age groups for diverse audience', () => {
    renderTestimonials();
    expect(screen.getByText('Parent of 8-year-old')).toBeInTheDocument();
    expect(screen.getByText('Adult learner, 32')).toBeInTheDocument();
    expect(screen.getByText('Teen, 15')).toBeInTheDocument();
    expect(screen.getByText('Parent of 10-year-old')).toBeInTheDocument();
  });

  it('renders star ratings for each testimonial', () => {
    const { container } = renderTestimonials();
    // Check for star icons - should have 5 stars × 4 testimonials = 20 stars
    const starIcons = container.querySelectorAll('svg.w-5.h-5.text-yellow-400');
    expect(starIcons.length).toBe(20);
  });

  it('applies correct styling classes', () => {
    const { container } = renderTestimonials();
    // Check section has correct background
    const section = container.querySelector('section.bg-gray-50');
    expect(section).toBeInTheDocument();

    // Check grid layout classes
    const grid = container.querySelector('.grid.md\\:grid-cols-2.lg\\:grid-cols-3');
    expect(grid).toBeInTheDocument();
  });

  it('applies correct color palette to testimonial elements', () => {
    const { container } = renderTestimonials();

    // Check quote text color
    const quotes = container.querySelectorAll('blockquote');
    expect(quotes[0]).toHaveClass('text-[#2C3E50]');

    // Check name color
    const names = container.querySelectorAll('.text-\\[\\#4A9B8E\\]');
    expect(names.length).toBeGreaterThan(0);

    // Check age group color
    const ageGroups = container.querySelectorAll('.text-\\[\\#7F8C8D\\]');
    expect(ageGroups.length).toBeGreaterThan(0);
  });

  it('has accessible star rating aria-labels', () => {
    renderTestimonials();
    const ratingLabels = screen.getAllByLabelText(/Rating: 5 out of 5 stars/i);
    expect(ratingLabels.length).toBe(4);
  });

  it('displays testimonials in card format with proper styling', () => {
    const { container } = renderTestimonials();
    const cards = container.querySelectorAll('.bg-white.border.border-gray-200.rounded-lg.shadow-md');
    expect(cards.length).toBe(4);
  });

  it('includes hover effects on cards', () => {
    const { container } = renderTestimonials();
    const cards = container.querySelectorAll('.hover\\:scale-105');
    expect(cards.length).toBe(4);
  });

  it('renders testimonials in blockquote elements with proper content', () => {
    const { container } = renderTestimonials();
    const quotes = container.querySelectorAll('blockquote');
    // All testimonials should be wrapped in blockquote tags
    expect(quotes.length).toBe(4);
    // Each blockquote should contain meaningful content
    quotes.forEach((quote) => {
      const text = quote.textContent || '';
      expect(text.length).toBeGreaterThan(20);
    });
  });
});
