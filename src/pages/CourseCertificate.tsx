import { motion } from 'framer-motion';
import {
ArrowLeft,
Award,
CheckCircle,
Copy,
Download,
Edit2,
Lock,
Save,
Share2,
} from 'lucide-react';
import { useMemo,useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/shared/SEOHead';
import { courseModules } from '../data/courseContent';
import { useCourseProgress } from '../hooks/useCourseProgress';

const allModules = courseModules;
const totalLessons = allModules.reduce((sum, m) => sum + m.lessons.length, 0);

const CERTIFICATE_ID_KEY = 'verbito_certificate_id';
const STUDENT_NAME_KEY = 'verbito_student_name';

function generateCertificateId(): string {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let random = '';
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `QENG-${year}-${random}`;
}

function getStoredCertificateId(): string {
  let id = localStorage.getItem(CERTIFICATE_ID_KEY);
  if (!id) {
    id = generateCertificateId();
    localStorage.setItem(CERTIFICATE_ID_KEY, id);
  }
  return id;
}

function getStoredStudentName(): string {
  return localStorage.getItem(STUDENT_NAME_KEY) || 'Your Name';
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function CourseCertificate() {
  const { overallPercentage } = useCourseProgress();
  const pct = overallPercentage(totalLessons);
  const isFullyComplete = pct === 100;

  const [studentName, setStudentName] = useState(getStoredStudentName());
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(getStoredStudentName());
  const [showCopied, setShowCopied] = useState(false);

  const certificateId = useMemo(() => getStoredCertificateId(), []);
  const completionDate = useMemo(() => formatDate(new Date()), []);

  // Save student name to localStorage
  const handleSaveName = () => {
    const trimmed = editValue.trim();
    if (trimmed) {
      setStudentName(trimmed);
      localStorage.setItem(STUDENT_NAME_KEY, trimmed);
    }
    setIsEditing(false);
  };

  // Share on LinkedIn
  const shareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=I+earned+my+Master+Prompt+Engineering+certificate!`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  // Copy certificate link
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = window.location.href;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  // ── Not Complete View ──
  if (!isFullyComplete) {
    return (
      <>
        <SEOHead title="Certificate — Verbito.ai" />
        <div className="min-h-[100dvh] pt-20 pb-16 bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 max-w-md w-full text-center shadow-sm"
          >
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-2">
              Certificate Locked
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              Complete all {totalLessons} lessons to claim your certificate.
            </p>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-32 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-600 rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {pct}%
              </span>
            </div>
            <Link
              to="/course/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go to Dashboard
            </Link>
          </motion.div>
        </div>
      </>
    );
  }

  // ── Certificate View ──
  return (
    <>
      <SEOHead title="Your Certificate — Verbito.ai" />
      <div className="min-h-[100dvh] bg-gray-100 dark:bg-gray-950 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Back Link */}
          <div className="no-print mb-6">
            <Link
              to="/course/dashboard"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>

          {/* Certificate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div
              className="bg-white w-full max-w-4xl p-8 sm:p-12 shadow-2xl relative"
              style={{
                border: '12px solid transparent',
                borderImage: 'linear-gradient(135deg, #2d1b69, #4a2f9c, #6b4cbe) 1',
                background: 'linear-gradient(white, white) padding-box',
              }}
            >
              {/* Inner decorative border */}
              <div
                className="absolute inset-3 border-2 pointer-events-none"
                style={{ borderColor: '#e9d5ff' }}
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2
                    className="text-2xl font-bold tracking-widest"
                    style={{ color: '#2d1b69' }}
                  >
                    VERBITO.AI
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Powered by Quantara Engineers
                  </p>
                </div>

                {/* Certificate Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 tracking-wider uppercase mb-4">
                  Certificate of Completion
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 mx-auto mb-8" />

                {/* Student */}
                <p className="text-center text-gray-600 text-base sm:text-lg mb-3">
                  This certifies that
                </p>
                <div className="text-center mb-3 min-h-[3.5rem] flex items-center justify-center">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveName();
                          if (e.key === 'Escape') {
                            setEditValue(studentName);
                            setIsEditing(false);
                          }
                        }}
                        autoFocus
                        className="text-2xl sm:text-4xl font-bold text-gray-900 text-center border-b-2 border-violet-500 bg-transparent focus:outline-none px-2 py-1 max-w-md"
                        placeholder="Enter your name"
                      />
                      <button
                        onClick={handleSaveName}
                        className="p-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                        title="Save"
                      >
                        <Save className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 group">
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        {studentName}
                      </h2>
                      <button
                        onClick={() => {
                          setEditValue(studentName);
                          setIsEditing(true);
                        }}
                        className="p-1.5 text-gray-400 hover:text-violet-600 opacity-0 group-hover:opacity-100 transition-all no-print"
                        title="Edit name"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-center text-gray-600 text-base sm:text-lg mb-4">
                  has successfully completed
                </p>
                <h3
                  className="text-center text-xl sm:text-2xl font-bold mb-4"
                  style={{ color: '#2d1b69' }}
                >
                  Master Prompt Engineering
                </h3>
                <p className="text-center text-gray-500 mb-8 max-w-lg mx-auto">
                  A comprehensive {allModules.length}-module course in AI prompt engineering covering core techniques, advanced strategies, business applications, and industry-specific workflows.
                </p>

                {/* Meta */}
                <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-6 gap-4 sm:gap-0">
                  <div className="text-center sm:text-left">
                    <p className="text-sm text-gray-500">Completion Date</p>
                    <p className="font-semibold text-gray-800">{completionDate}</p>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {totalLessons}/{totalLessons} Lessons
                    </span>
                  </div>
                  <div className="text-center sm:text-right">
                    <p className="text-sm text-gray-500">Certificate ID</p>
                    <p className="font-mono font-semibold text-gray-800 text-sm">
                      {certificateId}
                    </p>
                  </div>
                </div>

                {/* Signatures */}
                <div className="flex flex-col sm:flex-row justify-between mt-12 gap-8 sm:gap-0">
                  <div className="text-center">
                    <div className="w-48 border-b border-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Course Director, Verbito.ai</p>
                  </div>
                  <div className="text-center">
                    <div className="w-48 border-b border-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Certified by Quantara Engineers</p>
                    <p className="text-xs text-gray-400">wearequantara.com</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between mt-10 text-xs text-gray-400">
                  <span>verbito.ai</span>
                  <span>wearequantara.com</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="no-print mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/25"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={shareLinkedIn}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0077b5] text-white rounded-xl text-sm font-semibold hover:bg-[#005885] transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share on LinkedIn
              </button>
              <button
                onClick={copyLink}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {showCopied ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </>
  );
}
