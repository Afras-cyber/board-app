import { NextResponse } from 'next/server';
import tasksData from '@/lib/data/task.json';

export async function GET() {
  try {
    return NextResponse.json(tasksData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}