import { modulesA } from './courseContentPartA';
import { modulesB } from './courseContentPartB';

export const courseModules = [...modulesA, ...modulesB];
export const totalLessons = courseModules.reduce((sum, m) => sum + m.lessons.length, 0);

// Flatten all lessons for easy lookup
export const allLessons = courseModules.flatMap(m => m.lessons);

// Get lesson by ID
export function getLessonById(lessonId) {
  return allLessons.find(l => l.id === lessonId);
}

// Get module for a lesson
export function getModuleForLesson(lessonId) {
  return courseModules.find(m => m.lessons.some(l => l.id === lessonId));
}

// Get prev/next lesson
export function getAdjacentLessons(lessonId) {
  const idx = allLessons.findIndex(l => l.id === lessonId);
  return {
    prev: idx > 0 ? allLessons[idx - 1] : null,
    next: idx < allLessons.length - 1 ? allLessons[idx + 1] : null,
  };
}
