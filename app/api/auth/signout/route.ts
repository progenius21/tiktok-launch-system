import { NextResponse } from 'next/server';
import { createAuthServerClient } from '@/lib/supabase-server';

export async function POST() {
  const supabase = await createAuthServerClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'), {
    status: 302,
  });
}
