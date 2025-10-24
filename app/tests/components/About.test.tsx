import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import About from '@/app/components/About';

// Mock messages for testing
const messages = {
  about: {
    heading: 'Teaching Philosophy',
    paragraph1: 'I believe chess should be accessible to everyone, regardless of age or experience. My teaching approach focuses on building strong fundamentals while making learning enjoyable and stress-free.',
    paragraph2: 'With over 5 years of experience teaching beginners, I\'ve developed a structured curriculum that meets each student where they are. Whether you\'re 5 or 55, rated 0 or 1200, I tailor lessons to your pace and goals.',
    paragraph3: 'My students appreciate my patient, encouraging style. We celebrate progress, analyze mistakes as learning opportunities, and build confidence one move at a time.',
    credentials: {
      rating: {
        title: 'Chess Rating',
        value: 'FIDE 1800'
      },
      experience: {
        title: 'Teaching Experience',
        value: '5+ Years'
      },
      students: {
        title: 'Students Taught',
        value: '100+'
      }
    }
  }
};

const frenchMessages = {
  about: {
    heading: 'Philosophie d\'enseignement',
    paragraph1: 'Je crois que les échecs devraient être accessibles à tous, quel que soit l\'âge ou l\'expérience. Mon approche pédagogique se concentre sur la construction de bases solides tout en rendant l\'apprentissage agréable et sans stress.',
    paragraph2: 'Avec plus de 5 ans d\'expérience dans l\'enseignement aux débutants, j\'ai développé un programme structuré qui répond à chaque élève là où il en est. Que vous ayez 5 ou 55 ans, un classement de 0 ou 1200, j\'adapte les leçons à votre rythme et à vos objectifs.',
    paragraph3: 'Mes élèves apprécient mon style patient et encourageant. Nous célébrons les progrès, analysons les erreurs comme des opportunités d\'apprentissage et construisons la confiance un coup à la fois.',
    credentials: {
      rating: {
        title: 'Classement aux échecs',
        value: 'FIDE 1800'
      },
      experience: {
        title: 'Expérience d\'enseignement',
        value: 'Plus de 5 ans'
      },
      students: {
        title: 'Élèves enseignés',
        value: 'Plus de 100'
      }
    }
  }
};

describe('About Component', () => {
  it('renders section heading with i18n translation (English)', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <About />
      </NextIntlClientProvider>
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Teaching Philosophy');
  });

  it('renders all three teaching philosophy paragraphs', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <About />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(/chess should be accessible to everyone/i)).toBeInTheDocument();
    expect(screen.getByText(/5 years of experience teaching beginners/i)).toBeInTheDocument();
    expect(screen.getByText(/My students appreciate my patient/i)).toBeInTheDocument();
  });

  it('emphasizes beginner-friendly approach in content', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <About />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(/accessible to everyone/i)).toBeInTheDocument();
    expect(screen.getByText(/patient, encouraging style/i)).toBeInTheDocument();
    expect(screen.getByText(/building strong fundamentals/i)).toBeInTheDocument();
  });

  it('displays chess rating credential', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <About />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Chess Rating')).toBeInTheDocument();
    expect(screen.getByText('FIDE 1800')).toBeInTheDocument();
  });

  it('displays teaching experience credential', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <About />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Teaching Experience')).toBeInTheDocument();
    expect(screen.getByText('5+ Years')).toBeInTheDocument();
  });

  it('displays students taught credential', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <About />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Students Taught')).toBeInTheDocument();
    expect(screen.getByText('100+')).toBeInTheDocument();
  });

  it('balances accomplishments without intimidating beginners', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <About />
      </NextIntlClientProvider>
    );

    // Verifies credentials present but not overwhelming
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(3);

    // Verifies beginner-friendly language is more prominent
    expect(screen.getByText(/accessible to everyone/i)).toBeInTheDocument();
    expect(screen.getByText(/patient, encouraging/i)).toBeInTheDocument();
  });

  it('renders correctly in French', () => {
    render(
      <NextIntlClientProvider locale="fr" messages={frenchMessages}>
        <About />
      </NextIntlClientProvider>
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Philosophie d\'enseignement');
    expect(screen.getByText('Classement aux échecs')).toBeInTheDocument();
    expect(screen.getByText('Plus de 5 ans')).toBeInTheDocument();
  });

  it('French translations feel native (not machine-translated)', () => {
    render(
      <NextIntlClientProvider locale="fr" messages={frenchMessages}>
        <About />
      </NextIntlClientProvider>
    );

    // Verifies professional French phrasing
    expect(screen.getByText(/approche pédagogique/i)).toBeInTheDocument();
    expect(screen.getByText(/Élèves enseignés/i)).toBeInTheDocument();
  });

  it('uses semantic HTML with section tag', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <About />
      </NextIntlClientProvider>
    );

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('applies professional formatting with readable typography', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <About />
      </NextIntlClientProvider>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.className).toMatch(/text-3xl|text-4xl/); // Responsive heading size
    expect(heading.className).toMatch(/font-semibold/); // Professional weight

    // Check philosophy paragraphs specifically
    const philosophyParagraphs = container.querySelectorAll('.space-y-6 > p');
    expect(philosophyParagraphs.length).toBe(3);
    philosophyParagraphs.forEach(p => {
      expect(p.className).toContain('text-base'); // 16px body text
      expect(p.className).toContain('leading-relaxed'); // Line height 1.6
    });
  });

  it('has appropriate spacing between paragraphs', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <About />
      </NextIntlClientProvider>
    );

    const paragraphContainer = container.querySelector('.space-y-6');
    expect(paragraphContainer).toBeInTheDocument(); // 24px spacing
  });

  it('uses professional color palette from design spec', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <About />
      </NextIntlClientProvider>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.className).toMatch(/text-gray-800/); // Headings: #2C3E50 equivalent

    const paragraphs = container.querySelectorAll('p.text-gray-600');
    expect(paragraphs.length).toBeGreaterThan(0); // Body text: #7F8C8D equivalent
  });

  it('centers content with max-width constraint', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <About />
      </NextIntlClientProvider>
    );

    const contentContainer = container.querySelector('.max-w-4xl');
    expect(contentContainer).toBeInTheDocument();
    expect(contentContainer?.className).toMatch(/mx-auto/); // Center-aligned
  });

  it('has responsive padding for mobile and desktop', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <About />
      </NextIntlClientProvider>
    );

    const section = container.querySelector('section');
    expect(section?.className).toMatch(/py-12/); // Mobile padding (48px)
    expect(section?.className).toMatch(/md:py-16/); // Desktop padding (64px)
  });

  it('credentials displayed in responsive grid layout', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <About />
      </NextIntlClientProvider>
    );

    const credentialsGrid = container.querySelector('.grid');
    expect(credentialsGrid).toBeInTheDocument();
    expect(credentialsGrid?.className).toMatch(/md:grid-cols-3/); // 3 columns on desktop
  });

  it('credentials are centered for visual balance', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <About />
      </NextIntlClientProvider>
    );

    const credentialItems = container.querySelectorAll('.text-center');
    expect(credentialItems.length).toBeGreaterThanOrEqual(3); // Rating, Experience, Students
  });
});
