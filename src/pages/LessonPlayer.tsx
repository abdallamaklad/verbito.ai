import { motion } from 'framer-motion';
import {
ArrowLeft,
BookOpen,
Check,
CheckCircle,
ChevronLeft,
ChevronRight,
Circle,
Clock,
Copy,
Dumbbell,
FileText,
Lightbulb,
} from 'lucide-react';
import { useCallback,useEffect,useState } from 'react';
import { Link,useNavigate,useParams } from 'react-router-dom';
import SEOHead from '../components/shared/SEOHead';
import {
getAdjacentLessons,
getLessonById,
getModuleForLesson
} from '../data/courseContent';
import { useCourseProgress } from '../hooks/useCourseProgress';

/* ── Prompt Template (code block with copy) ── */
function PromptTemplate({ title, prompt }: { title: string; prompt: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = prompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 p-4 my-4 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-violet-800 dark:text-violet-300">{title}</h4>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 border border-violet-200 dark:border-violet-700 rounded-lg text-xs font-medium text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/40 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm overflow-x-auto whitespace-pre-wrap leading-relaxed">
        {prompt}
      </pre>
    </div>
  );
}

/* ── Key Takeaways ── */
function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 border-l-4 border-violet-500 p-5 my-6 rounded-r-xl">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-5 h-5 text-violet-600 dark:text-violet-400" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Key Takeaways</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
            <CheckCircle className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Practice Exercise ── */
function PracticeExercise({ description }: { description: string }) {
  return (
    <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-5 my-6 rounded-xl">
      <div className="flex items-center gap-2 mb-3">
        <Dumbbell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Practice Exercise</h3>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
}

/* ── Main Lesson Player ── */
export default function LessonPlayer() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const {
    markComplete,
    markIncomplete,
    isComplete,
    setLastAccessed,
  } = useCourseProgress();

  const lesson = lessonId ? getLessonById(lessonId) : undefined;
  const module = lessonId ? getModuleForLesson(lessonId) : undefined;
  const { prev, next } = lessonId ? getAdjacentLessons(lessonId) : { prev: null, next: null };

  const completed = lessonId ? isComplete(lessonId) : false;

  useEffect(() => {
    if (lessonId) {
      setLastAccessed(lessonId);
    }
  }, [lessonId, setLastAccessed]);

  // Generate takeaway items from lesson content
  const generateTakeaways = useCallback((content: string): string[] => {
    // Split content into sentences and pick key ones as takeaways
    const sentences = content
      .replace(/<[^>]*>/g, '')
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 20 && s.length < 150);
    
    if (sentences.length >= 3) {
      return sentences.slice(0, 4);
    }
    // Fallback takeaways
    return [
      'Understand the core principles behind effective prompting',
      'Apply these techniques to your specific use cases',
      'Build reusable templates from what you learn',
    ];
  }, []);

  // Generate practice exercise from lesson
  const generateExercise = useCallback((lessonTitle: string): string => {
    return `Take the concepts from "${lessonTitle}" and apply them to a real-world scenario. Write out 3 different prompts that use the techniques covered, then compare the outputs. Notice how small changes in phrasing, structure, or context lead to dramatically different results. Document your findings in a note-taking app for future reference.`;
  }, []);

  // Generate prompt templates from lesson
  const generateTemplates = useCallback((lessonTitle: string, content: string) => {
    const templates: { title: string; prompt: string }[] = [];
    
    if (lessonTitle.toLowerCase().includes('role') || content.toLowerCase().includes('role')) {
      templates.push({
        title: 'Role Assignment Template',
        prompt: `Act as an expert [ROLE] with 20 years of experience in [FIELD]. I need you to [TASK]. Please approach this with the depth and insight that only a seasoned professional would have, considering edge cases and industry best practices.`,
      });
    }
    
    if (lessonTitle.toLowerCase().includes('chain') || content.toLowerCase().includes('step')) {
      templates.push({
        title: 'Chain-of-Thought Template',
        prompt: `I need you to solve [COMPLEX PROBLEM]. Let's work through this step by step:

Step 1: First, identify the key variables and constraints
Step 2: Analyze the relationships between each element
Step 3: Apply the appropriate framework or methodology
Step 4: Evaluate the results and check for errors
Step 5: Present the final answer with clear reasoning

Take your time with each step.`,
      });
    }
    
    if (lessonTitle.toLowerCase().includes('few-shot') || content.toLowerCase().includes('example')) {
      templates.push({
        title: 'Few-Shot Learning Template',
        prompt: `Here are some examples of the style/format I want:

Example 1:
Input: [INPUT_1]
Output: [DESIRED_OUTPUT_1]

Example 2:
Input: [INPUT_2]
Output: [DESIRED_OUTPUT_2]

Now, please apply this same pattern to:
Input: [YOUR_INPUT]
Output:`,
      });
    }

    // Default template if none matched
    if (templates.length === 0) {
      templates.push({
        title: 'Universal Prompt Template',
        prompt: `Role: You are an expert [ROLE] specializing in [FIELD].

Context: [Provide relevant background information]

Task: [Clearly state what you need]

Format: [Describe how you want the output structured]

Constraints: [List any limitations or requirements]

Tone: [Specify the desired tone and style]`,
      });
    }

    return templates;
  }, []);

  if (!lesson || !module) {
    return (
      <div className="min-h-[100dvh] pt-20 pb-16 bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Lesson Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">The lesson you are looking for does not exist.</p>
          <Link
            to="/course/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const lessonIndex = module.lessons.findIndex(l => l.id === lesson.id);
  const takeaways = generateTakeaways(lesson.content || '');
  const exercise = generateExercise(lesson.title);
  const templates = generateTemplates(lesson.title, lesson.content || '');

  return (
    <>
      <SEOHead title={`${lesson.title} — Verbito.ai`} />
      <div className="min-h-[100dvh] pt-16 bg-gray-50 dark:bg-gray-950">
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 min-w-0">
                <Link
                  to="/course/dashboard"
                  className="flex items-center gap-1 hover:text-violet-600 dark:hover:text-violet-400 transition-colors shrink-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <ChevronRight className="w-3 h-3 shrink-0" />
                <span className="text-violet-600 dark:text-violet-400 font-medium truncate">
                  Module {module.id}
                </span>
                <ChevronRight className="w-3 h-3 shrink-0 hidden sm:block" />
                <span className="truncate hidden sm:inline">
                  Lesson {lessonIndex + 1}.{module.lessons.length}
                </span>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                  <Clock className="w-3 h-3" />
                  {lesson.duration}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          {/* Lesson Title */}
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {lesson.title}
          </h1>

          {/* Mark Complete Toggle */}
          <button
            onClick={() => {
              if (completed) {
                markIncomplete(lesson.id);
              } else {
                markComplete(lesson.id);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all mb-8 ${
              completed
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'
                : 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-900/50'
            }`}
          >
            {completed ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Completed
              </>
            ) : (
              <>
                <Circle className="w-5 h-5" />
                Mark as Complete
              </>
            )}
          </button>

          {/* Lesson Content */}
          <div
            className="lesson-content"
            dangerouslySetInnerHTML={{
              __html: lesson.content || '<p>No content available for this lesson.</p>',
            }}
          />

          {/* Key Takeaways */}
          <KeyTakeaways items={takeaways} />

          {/* Practice Exercise */}
          <PracticeExercise description={exercise} />

          {/* Prompt Templates */}
          <div className="my-8">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Prompt Templates</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Copy and customize these templates for your own use:
            </p>
            {templates.map((template, i) => (
              <PromptTemplate key={i} title={template.title} prompt={template.prompt} />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800 mt-10">
            <button
              onClick={() => prev && navigate(`/course/lesson/${prev.id}`)}
              disabled={!prev}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <Link
              to="/course/dashboard"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              Dashboard
            </Link>

            <button
              onClick={() => next && navigate(`/course/lesson/${next.id}`)}
              disabled={!next}
              className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Lesson Content Styles */}
      <style>{`
        .lesson-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: inherit;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }
        .lesson-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: inherit;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }
        .lesson-content h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: inherit;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .lesson-content p {
          color: rgb(55 65 81);
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        .dark .lesson-content p {
          color: rgb(209 213 219);
        }
        .lesson-content ul, .lesson-content ol {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        .lesson-content ul {
          list-style-type: disc;
        }
        .lesson-content ol {
          list-style-type: decimal;
        }
        .lesson-content li {
          color: rgb(55 65 81);
          line-height: 1.7;
          margin-bottom: 0.375rem;
        }
        .dark .lesson-content li {
          color: rgb(209 213 219);
        }
        .lesson-content strong {
          font-weight: 600;
          color: rgb(17 24 39);
        }
        .dark .lesson-content strong {
          color: rgb(243 244 246);
        }
        .lesson-content blockquote {
          border-left: 4px solid rgb(139 92 246);
          background: rgb(249 250 251);
          padding: 1rem 1.25rem;
          margin: 1rem 0;
          border-radius: 0 0.5rem 0.5rem 0;
          font-style: italic;
        }
        .dark .lesson-content blockquote {
          background: rgb(31 41 55);
        }
        .lesson-content code {
          background: rgb(243 244 246);
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-family: ui-monospace, monospace;
          font-size: 0.875rem;
        }
        .dark .lesson-content code {
          background: rgb(55 65 81);
        }
        .lesson-content pre {
          background: rgb(17 24 39);
          color: rgb(243 244 246);
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          font-family: ui-monospace, monospace;
          font-size: 0.875rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        .lesson-content a {
          color: rgb(124 58 237);
          text-decoration: underline;
        }
        .dark .lesson-content a {
          color: rgb(167 139 250);
        }
        .lesson-content img {
          border-radius: 0.75rem;
          margin: 1rem 0;
          max-width: 100%;
        }
      `}</style>
    </>
  );
}
