import { getDailyUsage,incrementUsage } from '@/services/supabase';
import type { DailyUsage,PlanType } from '@/types';
import { useCallback,useEffect,useState } from 'react';

function getAnonymousId() {
  const stored = localStorage.getItem('verbito_anon_id');
  if (stored) return stored;
  const id = crypto.randomUUID();
  localStorage.setItem('verbito_anon_id', id);
  return id;
}

function emptyUsage(userId: string | undefined, anonymousId: string, dailyLimit: number): DailyUsage {
  return {
    userId,
    anonymousId,
    date: new Date().toISOString().split('T')[0],
    generationsUsed: 0,
    dailyLimit,
  };
}

export function useUsage(userId?: string, planType: PlanType = 'free') {
  const [usage, setUsage] = useState<DailyUsage | null>(null);
  const [loading, setLoading] = useState(true);
  const [anonId] = useState(getAnonymousId);

  const dailyLimit = planType === 'free' ? 2 : planType === 'starter' ? 10 : planType === 'pro' ? 20 : 999;

  const refresh = useCallback(async () => {
    try {
      const u = await getDailyUsage(userId, anonId);
      u.dailyLimit = dailyLimit;
      setUsage(u);
    } catch (error) {
      console.warn('Unable to load usage', error);
      setUsage(emptyUsage(userId, anonId, dailyLimit));
    } finally {
      setLoading(false);
    }
  }, [userId, anonId, dailyLimit]);

  useEffect(() => {
    let active = true;
    getDailyUsage(userId, anonId)
      .then((u) => {
        if (!active) return;
        u.dailyLimit = dailyLimit;
        setUsage(u);
      })
      .catch((error) => {
        if (!active) return;
        console.warn('Unable to load usage', error);
        setUsage(emptyUsage(userId, anonId, dailyLimit));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [userId, anonId, dailyLimit]);

  const useGeneration = useCallback(async () => {
    const current = await getDailyUsage(userId, anonId).catch(() => emptyUsage(userId, anonId, dailyLimit));
    if (current.generationsUsed >= dailyLimit) return { allowed: false, remaining: 0 };
    const updated = await incrementUsage(userId, anonId).catch(() => ({
      ...current,
      generationsUsed: current.generationsUsed + 1,
    }));
    updated.dailyLimit = dailyLimit;
    setUsage(updated);
    return { allowed: true, remaining: dailyLimit - updated.generationsUsed };
  }, [userId, anonId, dailyLimit]);

  return {
    usage,
    loading,
    remaining: usage ? Math.max(0, dailyLimit - usage.generationsUsed) : dailyLimit,
    dailyLimit,
    hasReachedLimit: (usage?.generationsUsed || 0) >= dailyLimit,
    useGeneration,
    refresh,
  };
}
