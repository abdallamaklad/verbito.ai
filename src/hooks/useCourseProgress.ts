import { useCallback,useEffect,useState } from 'react';

const STORAGE_KEY = 'verbito_course_progress';
const ACCESS_KEY = 'verbito_course_access';

export interface ProgressState {
  completedLessons: string[]; // array of lesson IDs like "1-1", "2-3"
  lastAccessedLesson: string | null;
}

export function useCourseProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { completedLessons: [], lastAccessedLesson: null };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markComplete = useCallback((lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      completedLessons: prev.completedLessons.includes(lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId],
      lastAccessedLesson: lessonId,
    }));
  }, []);

  const markIncomplete = useCallback((lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      completedLessons: prev.completedLessons.filter(id => id !== lessonId),
    }));
  }, []);

  const isComplete = useCallback((lessonId: string) => {
    return progress.completedLessons.includes(lessonId);
  }, [progress.completedLessons]);

  const getModuleCompletion = useCallback((lessonIds: string[]) => {
    const completed = lessonIds.filter(id => progress.completedLessons.includes(id)).length;
    return { completed, total: lessonIds.length, percentage: Math.round((completed / lessonIds.length) * 100) };
  }, [progress.completedLessons]);

  const overallPercentage = useCallback((totalLessons: number) => {
    return totalLessons > 0 ? Math.round((progress.completedLessons.length / totalLessons) * 100) : 0;
  }, [progress.completedLessons]);

  const setLastAccessed = useCallback((lessonId: string) => {
    setProgress(prev => ({ ...prev, lastAccessedLesson: lessonId }));
  }, []);

  return { progress, markComplete, markIncomplete, isComplete, getModuleCompletion, overallPercentage, setLastAccessed };
}

export function hasCourseAccess(): boolean {
  return localStorage.getItem(ACCESS_KEY) === 'true';
}

export function grantCourseAccess(): void {
  localStorage.setItem(ACCESS_KEY, 'true');
}
