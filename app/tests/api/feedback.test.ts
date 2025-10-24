import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '../../api/feedback/route';
import { auth } from '@clerk/nextjs/server';
import prisma from '../../lib/db';

// Mock Clerk auth
vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn()
}));

// Mock Prisma
vi.mock('../../lib/db', () => ({
  default: {
    student: {
      findUnique: vi.fn()
    },
    feedback: {
      findMany: vi.fn()
    }
  }
}));

describe('GET /api/feedback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 401 if user is not authenticated', async () => {
    vi.mocked(auth).mockResolvedValue({ userId: null });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data).toEqual({ error: 'Unauthorized' });
  });

  it('returns 404 if student is not found', async () => {
    vi.mocked(auth).mockResolvedValue({ userId: 'user_123' });
    vi.mocked(prisma.student.findUnique).mockResolvedValue(null);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toEqual({ error: 'Student not found' });
  });

  it('returns feedback for authenticated student', async () => {
    const mockStudent = {
      id: 'student_123',
      email: 'student@example.com',
      name: 'Test Student',
      preferredLanguage: 'en',
      clerkUserId: 'user_123',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const mockFeedback = [
      {
        id: 'feedback_1',
        content: 'Great progress on opening theory!',
        createdAt: '2025-01-20T00:00:00.000Z'
      },
      {
        id: 'feedback_2',
        content: 'Keep practicing endgame techniques.',
        createdAt: '2025-01-15T00:00:00.000Z'
      }
    ];

    vi.mocked(auth).mockResolvedValue({ userId: 'user_123' });
    vi.mocked(prisma.student.findUnique).mockResolvedValue(mockStudent);
    vi.mocked(prisma.feedback.findMany).mockResolvedValue(mockFeedback);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ feedback: mockFeedback });
    expect(prisma.student.findUnique).toHaveBeenCalledWith({
      where: { clerkUserId: 'user_123' }
    });
    expect(prisma.feedback.findMany).toHaveBeenCalledWith({
      where: { studentId: 'student_123' },
      select: {
        id: true,
        content: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
  });

  it('returns empty array when student has no feedback', async () => {
    const mockStudent = {
      id: 'student_123',
      email: 'student@example.com',
      name: 'Test Student',
      preferredLanguage: 'en',
      clerkUserId: 'user_123',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    vi.mocked(auth).mockResolvedValue({ userId: 'user_123' });
    vi.mocked(prisma.student.findUnique).mockResolvedValue(mockStudent);
    vi.mocked(prisma.feedback.findMany).mockResolvedValue([]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ feedback: [] });
  });

  it('returns 500 on database error', async () => {
    vi.mocked(auth).mockResolvedValue({ userId: 'user_123' });
    vi.mocked(prisma.student.findUnique).mockRejectedValue(new Error('Database error'));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Internal server error' });
  });

  it('orders feedback by createdAt descending (newest first)', async () => {
    const mockStudent = {
      id: 'student_123',
      email: 'student@example.com',
      name: 'Test Student',
      preferredLanguage: 'en',
      clerkUserId: 'user_123',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    vi.mocked(auth).mockResolvedValue({ userId: 'user_123' });
    vi.mocked(prisma.student.findUnique).mockResolvedValue(mockStudent);
    vi.mocked(prisma.feedback.findMany).mockResolvedValue([]);

    await GET();

    expect(prisma.feedback.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: { createdAt: 'desc' }
      })
    );
  });
});
