import { createClient } from '@supabase/supabase-js';
import { createBrowserClient as createSSRBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

function readEnv(name: string) {
  return process.env[name]?.trim() ?? '';
}

// Server client with service role (for webhooks, admin operations)
export function createServerClient(options?: { allowAnonFallback?: boolean }) {
  const url = readEnv('NEXT_PUBLIC_SUPABASE_URL');
  const serviceRoleKey = readEnv('SUPABASE_SERVICE_ROLE_KEY');
  const anonKey = readEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  const key = serviceRoleKey || (options?.allowAnonFallback ? anonKey : '');

  if (!url) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is required.');
  }

  if (!key) {
    throw new Error(
      options?.allowAnonFallback
        ? 'SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY is required.'
        : 'SUPABASE_SERVICE_ROLE_KEY is required.'
    );
  }

  return createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Browser client (for client components)
export function createBrowserClient() {
  return createSSRBrowserClient<Database>(
    readEnv('NEXT_PUBLIC_SUPABASE_URL'),
    readEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
  );
}
