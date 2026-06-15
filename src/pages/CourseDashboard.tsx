import {
Accordion,
AccordionContent,
AccordionItem,
AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import {
Award,
BookOpen,
CheckCircle,
ChevronRight,
Circle,
Clock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/shared/SEOHead';
import { courseModules } from '../data/courseContent';
import { useCourseProgress } from '../hooks/useCourseProgress';

const allModules = courseModules;
const totalLessons = allModules.reduce((sum, m) => sum + m.lessons.length, 0);

export default function CourseDashboard() {
  const navigate = useNavigate();
  const {
    progress,
    markComplete,
    markIncomplete,
    isComplete,
    getModuleCompletion,
    overallPercentage,
  } = useCourseProgress();

  const pct = overallPercentage(totalLessons);
  const isFullyComplete = pct === 100;

  const handleLessonClick = (lessonId: string) => {
    navigate(`/course/lesson/${lessonId}`);
  };

  const toggleLesson = (e: React.MouseEvent, lessonId: string) => {
    e.stopPropagation();
    if (isComplete(lessonId)) {
      markIncomplete(lessonId);
    } else {
      markComplete(lessonId);
    }
  };

  return (
    <>
      <SEOHead title="Course Dashboard — Verbito.ai" />
      <div className="min-h-[100dvh] pt-20 pb-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-violet-600" />
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Master Prompt Engineering
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Complete all {totalLessons} lessons across {allModules.length} modules to earn your certificate.
            </p>
          </motion.div>

          {/* Overall Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                  <Award className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    Course Progress
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {progress.completedLessons.length} of {totalLessons} lessons completed
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                {pct}%
              </span>
            </div>
            <Progress
              value={pct}
              className="h-3 bg-gray-200 dark:bg-gray-800"
            />

            {/* Claim Certificate Button */}
            {isFullyComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-800"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold text-sm">
                      Congratulations! You have completed the course.
                    </span>
                  </div>
                  <Button
                    onClick={() => navigate('/course/certificate')}
                    className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-violet-600/25 transition-all hover:shadow-violet-600/40"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Claim Certificate
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Modules Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Accordion type="multiple" className="space-y-3">
              {allModules.map((mod) => {
                const lessonIds = mod.lessons.map(l => l.id);
                const completion = getModuleCompletion(lessonIds);

                return (
                  <AccordionItem
                    key={mod.id}
                    value={`module-${mod.id}`}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors [&[data-state=open]]:bg-gray-50 dark:[&[data-state=open]]:bg-gray-800/50">
                      <div className="flex items-center gap-4 w-full pr-4">
                        {/* Module Number */}
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                            completion.percentage === 100
                              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                              : 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400'
                          }`}
                        >
                          {completion.percentage === 100 ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            mod.id
                          )}
                        </div>

                        {/* Module Info */}
                        <div className="flex-1 text-left min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                            {mod.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {mod.lessons.length} lessons • {mod.duration}
                          </p>
                        </div>

                        {/* Module Progress */}
                        <div className="hidden sm:flex items-center gap-3 shrink-0">
                          <div className="w-24">
                            <Progress
                              value={completion.percentage}
                              className="h-2 bg-gray-200 dark:bg-gray-800"
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-10 text-right">
                            {completion.percentage}%
                          </span>
                        </div>

                        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 rotate-0 transition-transform duration-200 [[data-state=open]>svg]:rotate-90" />
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-5 pb-4">
                      {/* Mobile progress bar */}
                      <div className="sm:hidden mb-3 mt-1">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={completion.percentage}
                            className="h-2 bg-gray-200 dark:bg-gray-800 flex-1"
                          />
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            {completion.percentage}%
                          </span>
                        </div>
                      </div>

                      {/* Lessons List */}
                      <div className="space-y-1 mt-2">
                        {mod.lessons.map((lesson) => {
                          const completed = isComplete(lesson.id);

                          return (
                            <div
                              key={lesson.id}
                              onClick={() => handleLessonClick(lesson.id)}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/50 cursor-pointer transition-colors group"
                            >
                              {/* Checkbox */}
                              <button
                                onClick={(e) => toggleLesson(e, lesson.id)}
                                className="shrink-0 focus:outline-none"
                                aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
                              >
                                {completed ? (
                                  <CheckCircle className="w-5 h-5 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
                                ) : (
                                  <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-violet-400 transition-colors" />
                                )}
                              </button>

                              {/* Lesson Info */}
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-sm truncate transition-colors ${
                                    completed
                                      ? 'text-gray-500 dark:text-gray-400 line-through'
                                      : 'text-gray-800 dark:text-gray-200 group-hover:text-violet-700 dark:group-hover:text-violet-300'
                                  }`}
                                >
                                  {lesson.title}
                                </p>
                              </div>

                              {/* Duration */}
                              <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 shrink-0">
                                <Clock className="w-3 h-3" />
                                <span>{lesson.duration}</span>
                              </div>

                              {/* Arrow */}
                              <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-violet-500 transition-colors shrink-0" />
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </>
  );
}
