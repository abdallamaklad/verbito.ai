import { FolderOpen,Github,Lightbulb,Linkedin,Sparkles,Twitter,Youtube,Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageTranslations } from '@/hooks/useTranslation';
import { footer as footerTranslations } from '@/lib/translations/footer';
import NewsletterSignup from '../shared/NewsletterSignup';
import { LanguageSelector } from '../shared/LanguageSelector';

const productLinks = [
  { labelKey: 'promptGenerator', href: '/prompt-generator', icon: Zap },
  { labelKey: 'pricing', href: '/pricing', icon: null },
  { labelKey: 'course', href: '/course/master-prompt-engineering', icon: null },
  { labelKey: 'features', href: '/#examples', icon: null },
];

const resourceLinks = [
  { labelKey: 'knowledgeHub', href: '/knowledge', icon: Lightbulb },
  { labelKey: 'promptLibrary', href: '/prompts', icon: FolderOpen },
  { labelKey: 'freeTools', href: '/tools/free-ai-prompt-generator', icon: Sparkles },
  { labelKey: 'blog', href: '/knowledge', icon: null },
];

const companyLinks = [
  { labelKey: 'about', href: '/about', icon: null },
  { labelKey: 'contact', href: '/contact', icon: null },
  { labelKey: 'enterprise', href: '/enterprise', icon: null },
  { labelKey: 'consulting', href: '/consulting', icon: null },
];

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/verbito_ai', label: 'Verbito on Twitter' },
  { icon: Github, href: 'https://github.com/verbito-ai', label: 'Verbito on GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/company/verbito-ai', label: 'Verbito on LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@verbito_ai', label: 'Verbito on YouTube' },
];

export default function Footer() {
  const ft = usePageTranslations(footerTranslations);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-0.5 mb-4">
              <span className="font-heading font-bold text-xl text-white">verbito</span>
              <span className="font-heading font-bold text-xl text-violet-400">.ai</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Verbito.ai helps you create expert-level prompts for ChatGPT, Claude, Gemini, and more.
              Turn any idea into a powerful AI prompt — even if you are not a prompt engineer.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-violet-600 hover:text-white transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{ft.product}</p>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {ft[link.labelKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{ft.resources}</p>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {ft[link.labelKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{ft.company}</p>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {ft[link.labelKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-10 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-white mb-1">{ft.stayUpdated}</p>
              <p className="text-sm text-gray-400">{ft.stayUpdatedDesc}</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto">
              <LanguageSelector variant="footer" />
              <NewsletterSignup variant="footer" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; 2026 Verbito.ai. {ft.rights}
          </p>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="text-xs text-gray-400 hover:text-white transition-colors">{ft.terms}</Link>
            <Link to="/privacy" className="text-xs text-gray-400 hover:text-white transition-colors">{ft.privacy}</Link>
            <Link to="/cookies" className="text-xs text-gray-400 hover:text-white transition-colors">{ft.cookies}</Link>
            <Link to="/affiliate-disclosure" className="text-xs text-gray-400 hover:text-white transition-colors">{ft.affiliate}</Link>
          </div>
        </div>

        {/* Built by Quantara */}
        <div className="mt-6 pt-6 border-t border-gray-800/50 flex items-center justify-center">
          <a
            href="https://www.wearequantara.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-violet-300 transition-colors group"
          >
            <span>{ft.builtBy}</span>
            <img
              src="/quantara-logo.png"
              alt="Quantara"
              width="16"
              height="16"
              className="h-4 w-4 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <span className="font-medium">Quantara</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
