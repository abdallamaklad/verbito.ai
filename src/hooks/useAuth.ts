import { getCurrentUser,signOut as supabaseSignOut,supabase } from '@/services/supabase';
import type { UserProfile } from '@/types';
import { useCallback,useEffect,useState } from 'react';

type AuthState = {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
};

let authState: AuthState = { user: null, loading: true, error: null };
let initialized = false;
let authSubscription: { unsubscribe: () => void } | null = null;
const listeners = new Set<(state: AuthState) => void>();

function emitAuthState() {
  for (const listener of listeners) listener(authState);
}

async function refreshAuthState() {
  try {
    const user = await getCurrentUser();
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

function ensureInitialized() {
  if (initialized) return;
  initialized = true;
  void refreshAuthState();

  if (supabase) {
    const { data } = supabase.auth.onAuthStateChange(() => {
      void refreshAuthState();
    });
    authSubscription = data.subscription;
  }
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
    await supabaseSignOut();
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
