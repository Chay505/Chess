import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import FAQ from '@/app/components/FAQ';
import { NextIntlClientProvider } from 'next-intl';

const mockMessages = {
  faq: {
    heading: 'Frequently Asked Questions',
    q1: {
      question: 'How do I book a lesson?',
      answer: "Simply scroll to the booking section on this page, select a convenient time from the calendar, and complete the form. You'll receive payment instructions via email.",
    },
    q2: {
      question: 'Do I need any prior chess experience?',
      answer: "Not at all! I specialize in teaching complete beginners. Whether you're 5 or 55, I'll meet you where you are and build from there.",
    },
    q3: {
      question: 'How do I pay for lessons?',
      answer: "After booking, you'll receive a secure payment link via email (powered by Stripe). Simply click the link and complete payment online.",
    },
    q4: {
      question: 'What if I need to cancel or reschedule?',
      answer: "You can cancel or reschedule up to 24 hours before your lesson without penalty. Just use the link in your booking confirmation email.",
    },
    q5: {
      question: 'What platform do you use for lessons?',
      answer: "Lessons are conducted online via Zoom or Google Meet. You'll receive the meeting link in your confirmation email.",
    },
    q6: {
      question: 'Do I need a chessboard or special software?',
      answer: "A physical chessboard is helpful but not required. We'll use online chess tools during lessons. I'll guide you through setup on our first call.",
    },
    q7: {
      question: 'Do you teach in French and English?',
      answer: 'Yes! I offer fully bilingual instruction. Let me know your preference when booking.',
    },
    q8: {
      question: 'What age groups do you teach?',
      answer: 'I teach students ages 5-55, from complete beginners to early intermediate players (rating 0-1200).',
    },
  },
};

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={mockMessages}>
      {component}
    </NextIntlClientProvider>
  );
};

describe('FAQ Component', () => {
  it('renders the FAQ section with heading', () => {
    renderWithIntl(<FAQ />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
  });

  it('renders 8 FAQ items', () => {
    renderWithIntl(<FAQ />);
    expect(screen.getByText('How do I book a lesson?')).toBeInTheDocument();
    expect(screen.getByText('Do I need any prior chess experience?')).toBeInTheDocument();
    expect(screen.getByText('How do I pay for lessons?')).toBeInTheDocument();
    expect(screen.getByText('What if I need to cancel or reschedule?')).toBeInTheDocument();
    expect(screen.getByText('What platform do you use for lessons?')).toBeInTheDocument();
    expect(screen.getByText('Do I need a chessboard or special software?')).toBeInTheDocument();
    expect(screen.getByText('Do you teach in French and English?')).toBeInTheDocument();
    expect(screen.getByText('What age groups do you teach?')).toBeInTheDocument();
  });

  it('initially hides all answers', () => {
    renderWithIntl(<FAQ />);
    // Answers should not be in the document initially (not rendered)
    expect(screen.queryByText(/Simply scroll to the booking section/)).not.toBeInTheDocument();
    expect(screen.queryByText(/I specialize in teaching complete beginners/)).not.toBeInTheDocument();
  });

  it('expands and shows answer when question is clicked', async () => {
    const user = userEvent.setup();
    renderWithIntl(<FAQ />);

    const questionButton = screen.getByText('How do I book a lesson?');
    await user.click(questionButton);

    await waitFor(() => {
      expect(screen.getByText(/Simply scroll to the booking section/)).toBeVisible();
    });
  });

  it('collapses answer when question is clicked again', async () => {
    const user = userEvent.setup();
    renderWithIntl(<FAQ />);

    const questionButton = screen.getByText('How do I book a lesson?');

    // Expand
    await user.click(questionButton);
    await waitFor(() => {
      expect(screen.getByText(/Simply scroll to the booking section/)).toBeVisible();
    });

    // Collapse
    await user.click(questionButton);
    await waitFor(() => {
      expect(screen.queryByText(/Simply scroll to the booking section/)).not.toBeInTheDocument();
    });
  });

  it('allows multiple items to be open simultaneously', async () => {
    const user = userEvent.setup();
    renderWithIntl(<FAQ />);

    const question1 = screen.getByText('How do I book a lesson?');
    const question2 = screen.getByText('Do I need any prior chess experience?');

    await user.click(question1);
    await user.click(question2);

    await waitFor(() => {
      expect(screen.getByText(/Simply scroll to the booking section/)).toBeVisible();
      expect(screen.getByText(/I specialize in teaching complete beginners/)).toBeVisible();
    });
  });

  it('renders with responsive classes', () => {
    const { container } = renderWithIntl(<FAQ />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('py-16', 'px-6', 'md:py-24');
  });

  it('renders chevron icons for each FAQ item', () => {
    const { container } = renderWithIntl(<FAQ />);
    const chevrons = container.querySelectorAll('svg');
    // 8 FAQ items = 8 chevron icons
    expect(chevrons.length).toBeGreaterThanOrEqual(8);
  });

  it('includes booking link reference in "How do I book?" answer', () => {
    const user = userEvent.setup();
    renderWithIntl(<FAQ />);

    const questionButton = screen.getByText('How do I book a lesson?');
    user.click(questionButton);

    waitFor(() => {
      expect(screen.getByText(/scroll to the booking section/)).toBeInTheDocument();
    });
  });

  it('covers all required topics in FAQ content', () => {
    renderWithIntl(<FAQ />);

    // Booking process
    expect(screen.getByText(/How do I book a lesson/)).toBeInTheDocument();

    // Payment
    expect(screen.getByText(/How do I pay for lessons/)).toBeInTheDocument();

    // Cancellation policy
    expect(screen.getByText(/cancel or reschedule/)).toBeInTheDocument();

    // Lesson platform
    expect(screen.getByText(/What platform do you use/)).toBeInTheDocument();

    // Tech requirements
    expect(screen.getByText(/chessboard or special software/)).toBeInTheDocument();

    // Age appropriateness
    expect(screen.getByText(/What age groups/)).toBeInTheDocument();

    // Bilingual instruction
    expect(screen.getByText(/French and English/)).toBeInTheDocument();

    // Experience level
    expect(screen.getByText(/prior chess experience/)).toBeInTheDocument();
  });

  it('uses friendly, approachable tone in answers', async () => {
    const user = userEvent.setup();
    renderWithIntl(<FAQ />);

    const questionButton = screen.getByText('Do I need any prior chess experience?');
    await user.click(questionButton);

    await waitFor(() => {
      // Check for friendly language markers
      const answer = screen.getByText(/Not at all!/);
      expect(answer).toBeInTheDocument();
      expect(screen.getByText(/I'll meet you where you are/)).toBeInTheDocument();
    });
  });
});
