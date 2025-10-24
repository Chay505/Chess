import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import ContactForm from '@/app/components/ContactForm';

const messages = {
  contact: {
    heading: 'Get in Touch',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    submit: 'Send Message',
    sending: 'Sending...',
    success: "Thank you! We'll respond within 24 hours.",
    error: 'Failed to send message. Please try again.'
  }
};

describe('ContactForm', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('renders all form fields', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContactForm />
      </NextIntlClientProvider>
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('displays heading from translations', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContactForm />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('requires all fields to be filled', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContactForm />
      </NextIntlClientProvider>
    );

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    expect(nameInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('required');
    expect(subjectInput).toHaveAttribute('required');
    expect(messageInput).toHaveAttribute('required');
  });

  it('validates email format', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContactForm />
      </NextIntlClientProvider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('submits form with valid data', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContactForm />
      </NextIntlClientProvider>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/subject/i), {
      target: { value: 'Test Subject' }
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Test message' }
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          subject: 'Test Subject',
          message: 'Test message'
        })
      });
    });
  });

  it('displays success message after successful submission', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContactForm />
      </NextIntlClientProvider>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/subject/i), {
      target: { value: 'Test Subject' }
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Test message' }
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText("Thank you! We'll respond within 24 hours.")).toBeInTheDocument();
    });
  });

  it('displays error message on failed submission', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContactForm />
      </NextIntlClientProvider>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/subject/i), {
      target: { value: 'Test Subject' }
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Test message' }
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText('Failed to send message. Please try again.')).toBeInTheDocument();
    });
  });

  it('displays loading state during submission', async () => {
    (global.fetch as any).mockImplementationOnce(
      () =>
        new Promise(resolve =>
          setTimeout(() => resolve({ ok: true, json: async () => ({ success: true }) }), 100)
        )
    );

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContactForm />
      </NextIntlClientProvider>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/subject/i), {
      target: { value: 'Test Subject' }
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Test message' }
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText("Thank you! We'll respond within 24 hours.")).toBeInTheDocument();
    });
  });

  it('clears form after successful submission', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContactForm />
      </NextIntlClientProvider>
    );

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const subjectInput = screen.getByLabelText(/subject/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(subjectInput.value).toBe('');
      expect(messageInput.value).toBe('');
    });
  });
});
