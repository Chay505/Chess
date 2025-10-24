import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find student by clerkUserId
    const student = await prisma.student.findUnique({
      where: { clerkUserId: userId }
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Fetch resources for this student
    const resources = await prisma.resource.findMany({
      where: { studentId: student.id },
      select: {
        id: true,
        filename: true,
        mimeType: true,
        fileSize: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ resources });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
