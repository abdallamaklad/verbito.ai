import { Suspense,lazy,useEffect } from 'react';
import { Link,Navigate,Route,Routes,useLocation } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';
import { Spinner } from './components/ui/spinner';
import Home from './pages/Home';
import { analytics } from './services/analytics';

const About = lazy(() => import('./pages/About'));
const Account = lazy(() => import('./pages/Account'));
const Admin = lazy(() => import('./pages/Admin'));
const Affiliate = lazy(() => import('./pages/Affiliate'));
const Article = lazy(() => import('./pages/Article'));
const Billing = lazy(() => import('./pages/Billing'));
const Collections = lazy(() => import('./pages/Collections'));
const Consulting = lazy(() => import('./pages/Consulting'));
const Contact = lazy(() => import('./pages/Contact'));
const Cookies = lazy(() => import('./pages/Cookies'));
const Course = lazy(() => import('./pages/Course'));
const CourseCertificate = lazy(() => import('./pages/CourseCertificate'));
const CourseDashboard = lazy(() => import('./pages/CourseDashboard'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const Enterprise = lazy(() => import('./pages/Enterprise'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const FreeTool = lazy(() => import('./pages/FreeTool'));
const Knowledge = lazy(() => import('./pages/Knowledge'));
const LessonPlayer = lazy(() => import('./pages/LessonPlayer'));
const Login = lazy(() => import('./pages/Login'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Privacy = lazy(() => import('./pages/Privacy'));
const PromptCategory = lazy(() => import('./pages/PromptCategory'));
const PromptDetail = lazy(() => import('./pages/PromptDetail'));
const PromptGenerator = lazy(() => import('./pages/PromptGenerator'));
const Prompts = lazy(() => import('./pages/Prompts'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const SavedPrompts = lazy(() => import('./pages/SavedPrompts'));
const Signup = lazy(() => import('./pages/Signup'));
const Terms = lazy(() => import('./pages/Terms'));

const BusinessPromptGenerator = lazy(() => import('./pages/tools/BusinessPromptGenerator'));
const ChatGPTPromptGenerator = lazy(() => import('./pages/tools/ChatGPTPromptGenerator'));
const CodingPromptGenerator = lazy(() => import('./pages/tools/CodingPromptGenerator'));
const EmailPromptGenerator = lazy(() => import('./pages/tools/EmailPromptGenerator'));
const ImagePromptGenerator = lazy(() => import('./pages/tools/ImagePromptGenerator'));
const MarketingPromptGenerator = lazy(() => import('./pages/tools/MarketingPromptGenerator'));
const MidjourneyPromptGenerator = lazy(() => import('./pages/tools/MidjourneyPromptGenerator'));
const PromptDoctor = lazy(() => import('./pages/tools/PromptDoctor'));
const ResearchPromptGenerator = lazy(() => import('./pages/tools/ResearchPromptGenerator'));
const SEOPromptGenerator = lazy(() => import('./pages/tools/SEOPromptGenerator'));
const StudentPromptGenerator = lazy(() => import('./pages/tools/StudentPromptGenerator'));
const VideoPromptGenerator = lazy(() => import('./pages/tools/VideoPromptGenerator'));

function RouteLoader() {
  return (
    <div className="flex min-h-[60dvh] items-center justify-center">
      <Spinner className="h-8 w-8 text-violet-600" aria-label="Loading page" />
    </div>
  );
}

function NotFound() {
  useEffect(() => {
    analytics.track('404_viewed');
  }, []);

  return (
    <section className="min-h-[70dvh] bg-white px-4 pt-32 pb-16 text-center dark:bg-gray-950">
      <p className="mb-3 text-sm font-semibold uppercase text-violet-600">404</p>
      <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Page not found</h1>
      <p className="mx-auto mb-8 max-w-md text-gray-600 dark:text-gray-400">
        The page you are looking for may have moved or is no longer available.
      </p>
      <Link
        to="/"
        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-violet-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
      >
        Go home
      </Link>
    </section>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    analytics.pageView(location.pathname, { search: location.search });
  }, [location.pathname, location.search]);

  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="account" element={<Account />} />
          <Route path="admin" element={<Admin />} />
          <Route path="affiliate-disclosure" element={<Affiliate />} />
          <Route path="billing" element={<Billing />} />
          <Route path="collections" element={<Collections />} />
          <Route path="consulting" element={<Consulting />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cookies" element={<Cookies />} />
          <Route path="disclaimer" element={<Disclaimer />} />
          <Route path="enterprise" element={<Enterprise />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="knowledge/:slug" element={<Article />} />
          <Route path="login" element={<Login />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="prompt-generator" element={<PromptGenerator />} />
          <Route path="prompt/:slug" element={<PromptDetail />} />
          <Route path="prompts" element={<Prompts />} />
          <Route path="prompts/:category" element={<PromptCategory />} />
          <Route path="refund" element={<Navigate to="/refund-policy" replace />} />
          <Route path="refund-policy" element={<RefundPolicy />} />
          <Route path="saved-prompts" element={<SavedPrompts />} />
          <Route path="signup" element={<Signup />} />
          <Route path="terms" element={<Terms />} />

          <Route path="course" element={<Navigate to="/course/master-prompt-engineering" replace />} />
          <Route path="course/master-prompt-engineering" element={<Course />} />
          <Route path="course/dashboard" element={<CourseDashboard />} />
          <Route path="course/lesson/:lessonId" element={<LessonPlayer />} />
          <Route path="course/certificate" element={<CourseCertificate />} />

          <Route path="tools/free-ai-prompt-generator" element={<FreeTool />} />
          <Route path="tools/business-prompt-generator" element={<BusinessPromptGenerator />} />
          <Route path="tools/chatgpt-prompt-generator" element={<ChatGPTPromptGenerator />} />
          <Route path="tools/coding-prompt-generator" element={<CodingPromptGenerator />} />
          <Route path="tools/email-prompt-generator" element={<EmailPromptGenerator />} />
          <Route path="tools/image-prompt-generator" element={<ImagePromptGenerator />} />
          <Route path="tools/marketing-prompt-generator" element={<MarketingPromptGenerator />} />
          <Route path="tools/midjourney-prompt-generator" element={<MidjourneyPromptGenerator />} />
          <Route path="tools/prompt-doctor" element={<PromptDoctor />} />
          <Route path="tools/research-prompt-generator" element={<ResearchPromptGenerator />} />
          <Route path="tools/seo-prompt-generator" element={<SEOPromptGenerator />} />
          <Route path="tools/student-prompt-generator" element={<StudentPromptGenerator />} />
          <Route path="tools/video-prompt-generator" element={<VideoPromptGenerator />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
