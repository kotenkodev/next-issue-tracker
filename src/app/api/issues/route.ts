import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/../prisma/client';
import { issueSchema } from '@/app/validationSchemas';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/authOptions';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.format() },
      {
        status: 400,
      }
    );
  }
  const issue = await prisma.issue.create({
    data: {
      title: validation.data.title,
      description: validation.data.description,
      status: validation.data.status || 'OPEN',
    },
  });
  return NextResponse.json({ issue }, { status: 201 });
}
