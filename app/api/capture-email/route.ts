import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    let db;
    try {
      db = createServerClient({ allowAnonFallback: true });
    } catch (err) {
      console.warn('Skipping email capture due to Supabase config:', err);
      return NextResponse.json({ success: true, stored: false });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (db as any)
      .from('email_captures')
      .upsert(
        {
          email: email.toLowerCase().trim(),
          source: source || 'hook-generator',
          captured_at: new Date().toISOString(),
        },
        { onConflict: 'email' }
      );

    if (error) {
      console.error('Supabase email capture failed:', error);
      return NextResponse.json({ success: true, stored: false });
    }

    return NextResponse.json({ success: true, stored: true });
  } catch (err) {
    console.error('Capture email error:', err);
    return NextResponse.json({ success: true, stored: false });
  }
}
