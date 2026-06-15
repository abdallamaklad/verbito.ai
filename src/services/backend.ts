import { supabase } from './supabase';

export function isBackendConfigured(): boolean {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY && supabase);
}

export function requireBackendConfigured() {
  if (!isBackendConfigured()) {
    throw new Error('Production backend is not configured. Please set Supabase environment variables.');
  }
}

export async function invokeEdgeFunction<TResponse>(
  name: string,
  body?: unknown,
  extraHeaders?: Record<string, string>
): Promise<TResponse> {
  requireBackendConfigured();

  const { data: sessionData } = await supabase!.auth.getSession();
  const accessToken = sessionData.session?.access_token;
  const { data, error } = await supabase!.functions.invoke<TResponse>(name, {
    body,
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...extraHeaders,
    },
  });

  if (error) throw new Error(error.message);
  if (!data) throw new Error('Backend returned an empty response.');
  return data;
}
