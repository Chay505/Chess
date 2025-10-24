import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET as listResources } from '@/app/api/resources/route';
import { GET as downloadResource } from '@/app/api/resources/[id]/route';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/app/lib/db';

// Mock Clerk auth
vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn()
}));

// Mock Prisma
vi.mock('@/app/lib/db', () => ({
  prisma: {
    student: {
      findUnique: vi.fn()
    },
    resource: {
      findMany: vi.fn(),
      findUnique: vi.fn()
    }
  }
}));

describe('Resources API Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/resources', () => {
    it('should return 401 if user is not authenticated', async () => {
      (auth as any).mockResolvedValue({ userId: null });

      const response = await listResources();
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });

    it('should return 404 if student not found', async () => {
      (auth as any).mockResolvedValue({ userId: 'clerk-user-1' });
      (prisma.student.findUnique as any).mockResolvedValue(null);

      const response = await listResources();
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Student not found');
    });

    it('should return student resources successfully', async () => {
      (auth as any).mockResolvedValue({ userId: 'clerk-user-1' });
      (prisma.student.findUnique as any).mockResolvedValue({
        id: 'student-1',
        clerkUserId: 'clerk-user-1'
      });

      const mockResources = [
        {
          id: 'res-1',
          filename: 'lesson-1.pgn',
          mimeType: 'application/x-chess-pgn',
          fileSize: 1024,
          createdAt: new Date('2025-10-24T10:00:00Z')
        }
      ];

      (prisma.resource.findMany as any).mockResolvedValue(mockResources);

      const response = await listResources();
      const data = await response.json();

      expect(response.status).toBe(200);
      // Compare with serialized dates (JSON converts Date objects to strings)
      expect(data.resources).toEqual([
        {
          id: 'res-1',
          filename: 'lesson-1.pgn',
          mimeType: 'application/x-chess-pgn',
          fileSize: 1024,
          createdAt: '2025-10-24T10:00:00.000Z'
        }
      ]);
      expect(prisma.resource.findMany).toHaveBeenCalledWith({
        where: { studentId: 'student-1' },
        select: {
          id: true,
          filename: true,
          mimeType: true,
          fileSize: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' }
      });
    });

    it('should return empty array if no resources', async () => {
      (auth as any).mockResolvedValue({ userId: 'clerk-user-1' });
      (prisma.student.findUnique as any).mockResolvedValue({
        id: 'student-1',
        clerkUserId: 'clerk-user-1'
      });
      (prisma.resource.findMany as any).mockResolvedValue([]);

      const response = await listResources();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.resources).toEqual([]);
    });
  });

  describe('GET /api/resources/[id]', () => {
    it('should return 401 if user is not authenticated', async () => {
      (auth as any).mockResolvedValue({ userId: null });

      const mockRequest = new Request('http://localhost/api/resources/res-1');
      const mockParams = Promise.resolve({ id: 'res-1' });

      const response = await downloadResource(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });

    it('should return 404 if student not found', async () => {
      (auth as any).mockResolvedValue({ userId: 'clerk-user-1' });
      (prisma.student.findUnique as any).mockResolvedValue(null);

      const mockRequest = new Request('http://localhost/api/resources/res-1');
      const mockParams = Promise.resolve({ id: 'res-1' });

      const response = await downloadResource(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Student not found');
    });

    it('should return 404 if resource not found', async () => {
      (auth as any).mockResolvedValue({ userId: 'clerk-user-1' });
      (prisma.student.findUnique as any).mockResolvedValue({
        id: 'student-1',
        clerkUserId: 'clerk-user-1'
      });
      (prisma.resource.findUnique as any).mockResolvedValue(null);

      const mockRequest = new Request('http://localhost/api/resources/res-1');
      const mockParams = Promise.resolve({ id: 'res-1' });

      const response = await downloadResource(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Resource not found');
    });

    it('should return 403 if resource belongs to another student', async () => {
      (auth as any).mockResolvedValue({ userId: 'clerk-user-1' });
      (prisma.student.findUnique as any).mockResolvedValue({
        id: 'student-1',
        clerkUserId: 'clerk-user-1'
      });
      (prisma.resource.findUnique as any).mockResolvedValue({
        id: 'res-1',
        studentId: 'student-2', // Different student
        filename: 'lesson-1.pgn',
        mimeType: 'application/x-chess-pgn',
        fileSize: 1024,
        fileData: Buffer.from('test data')
      });

      const mockRequest = new Request('http://localhost/api/resources/res-1');
      const mockParams = Promise.resolve({ id: 'res-1' });

      const response = await downloadResource(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.error).toBe('Forbidden');
    });

    it('should return file data with correct headers if authorized', async () => {
      (auth as any).mockResolvedValue({ userId: 'clerk-user-1' });
      (prisma.student.findUnique as any).mockResolvedValue({
        id: 'student-1',
        clerkUserId: 'clerk-user-1'
      });

      const mockFileData = Buffer.from('PGN file content');
      (prisma.resource.findUnique as any).mockResolvedValue({
        id: 'res-1',
        studentId: 'student-1',
        filename: 'lesson-1.pgn',
        mimeType: 'application/x-chess-pgn',
        fileSize: mockFileData.length,
        fileData: mockFileData
      });

      const mockRequest = new Request('http://localhost/api/resources/res-1');
      const mockParams = Promise.resolve({ id: 'res-1' });

      const response = await downloadResource(mockRequest, { params: mockParams });

      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toBe('application/x-chess-pgn');
      expect(response.headers.get('Content-Disposition')).toBe('attachment; filename="lesson-1.pgn"');
      expect(response.headers.get('Content-Length')).toBe(mockFileData.length.toString());
    });
  });
});
