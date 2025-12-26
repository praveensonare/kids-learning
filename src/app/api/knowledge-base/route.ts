import { NextRequest, NextResponse } from 'next/server';
import { loadKnowledgeBase } from '@/lib/loadKnowledgeBase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const classId = searchParams.get('class');
  const subjectId = searchParams.get('subject');

  if (!classId || !subjectId) {
    return NextResponse.json(
      { error: 'Missing class or subject parameter' },
      { status: 400 }
    );
  }

  try {
    const content = await loadKnowledgeBase(classId, subjectId);

    if (!content) {
      return NextResponse.json(
        { error: 'Knowledge base content not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    return NextResponse.json(
      { error: 'Failed to load knowledge base content' },
      { status: 500 }
    );
  }
}
