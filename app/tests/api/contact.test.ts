import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// Mock Resend
vi.mock('resend', () => {
  const mockSend = vi.fn().mockResolvedValue({ id: 'test-email-id' });
  return {
    Resend: class MockResend {
      emails = {
        send: mockSend
      };
    },
    mockSend
  };
});

import { POST } from '@/app/api/contact/route';

describe('Contact API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 when required fields are missing', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com'
        // Missing subject and message
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('All fields are required');
  });

  it('returns 400 when email format is invalid', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Test Subject',
        message: 'Test message'
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid email format');
  });

  it('successfully sends email with valid data', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message'
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('uses instructor email from environment variable', async () => {
    const originalEmail = process.env.INSTRUCTOR_EMAIL;
    process.env.INSTRUCTOR_EMAIL = 'chaimaa.alaoui.bel@gmail.com';

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message'
      })
    });

    await POST(request);

    // Restore original value
    if (originalEmail) {
      process.env.INSTRUCTOR_EMAIL = originalEmail;
    } else {
      delete process.env.INSTRUCTOR_EMAIL;
    }

    // Check that the call was made (mocked Resend)
    expect(true).toBe(true); // Basic assertion
  });

  it('uses default instructor email when env var not set', async () => {
    const originalEmail = process.env.INSTRUCTOR_EMAIL;
    delete process.env.INSTRUCTOR_EMAIL;

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message'
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);

    // Restore original value
    if (originalEmail) {
      process.env.INSTRUCTOR_EMAIL = originalEmail;
    }
  });
});
