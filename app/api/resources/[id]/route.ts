import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Await params to get the id
    const { id } = await params;

    // Find student by clerkUserId
    const student = await prisma.student.findUnique({
      where: { clerkUserId: userId }
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Fetch resource and verify ownership
    const resource = await prisma.resource.findUnique({
      where: { id }
    });

    if (!resource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    if (resource.studentId !== student.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Serve file with correct headers
    return new NextResponse(resource.fileData, {
      headers: {
        'Content-Type': resource.mimeType,
        'Content-Disposition': `attachment; filename="${resource.filename}"`,
        'Content-Length': resource.fileSize.toString()
      }
    });
  } catch (error) {
    console.error('Error downloading resource:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
