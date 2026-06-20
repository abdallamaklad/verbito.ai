import type { UserProfile } from '@/types';
import { useCallback,useEffect,useState } from 'react';

type SupabaseService = typeof import('@/services/supabase');

type AuthState = {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
};

let authState: AuthState = { user: null, loading: true, error: null };
let initialized = false;
let authSubscription: { unsubscribe: () => void } | null = null;
let servicePromise: Promise<SupabaseService> | null = null;
const listeners = new Set<(state: AuthState) => void>();

function getSupabaseService() {
  servicePromise ||= import('@/services/supabase');
  return servicePromise;
}

function emitAuthState() {
  for (const listener of listeners) listener(authState);
}

async function refreshAuthState(service?: SupabaseService) {
  try {
    const authService = service || await getSupabaseService();
    const user = await authService.getCurrentUser();
    authState = { user, loading: false, error: null };
  } catch (err) {
    authState = {
      user: null,
      loading: false,
      error: err instanceof Error ? err.message : 'Unable to load account.',
    };
  }
  emitAuthState();
}

async function initializeAuth() {
  const service = await getSupabaseService();
  if (!initialized) return;
  await refreshAuthState(service);
  if (!initialized) return;

  if (service.supabase) {
    const { data } = service.supabase.auth.onAuthStateChange(() => {
      void refreshAuthState(service);
    });
    authSubscription = data.subscription;
  }
}

function ensureInitialized() {
  if (initialized) return;
  initialized = true;
  void initializeAuth();
}

export function useAuth() {
  const [state, setState] = useState<AuthState>(authState);

  useEffect(() => {
    ensureInitialized();
    listeners.add(setState);

    return () => {
      listeners.delete(setState);
      if (listeners.size === 0 && authSubscription) {
        authSubscription.unsubscribe();
        authSubscription = null;
        initialized = false;
      }
    };
  }, []);

  const refresh = useCallback(async () => {
    authState = { ...authState, loading: true };
    emitAuthState();
    await refreshAuthState();
  }, []);

  const logout = useCallback(async () => {
    const service = await getSupabaseService();
    await service.signOut();
    authState = { user: null, loading: false, error: null };
    emitAuthState();
  }, []);

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    isLoggedIn: !!state.user,
    isAdmin: state.user?.role === 'admin',
    refresh,
    logout,
  };
}
