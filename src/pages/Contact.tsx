import { motion } from 'framer-motion';
import {
AlertTriangle,
CheckCircle,
Clock,
Globe,HelpCircle,
Mail,MessageSquare,
Send
} from 'lucide-react';
import { useState } from 'react';
import SEOHead from '../components/shared/SEOHead';
import { supabase } from '../services/supabase';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [supabaseError, setSupabaseError] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    if (form.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      if (supabase) {
        const { error } = await supabase.from('contact_messages').insert([
          {
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
          },
        ]);
        if (error) throw error;
      } else {
        throw new Error('Supabase is not configured.');
      }

      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSupabaseError(true);
      setSubmitted(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Us — Verbito.ai"
        description="Get in touch with the Verbito.ai team. We are here to help with questions, feedback, and support."
      />
      <section className="pt-28 pb-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <MessageSquare className="w-4 h-4" />
              Get in Touch
            </div>
            <h1 className="font-heading font-bold text-4xl text-gray-900 dark:text-white mb-4">
              Contact Us
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Have a question, feedback, or just want to say hello? We would love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-violet-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                      <a href="mailto:verbito.ai@wearequantara.com" className="text-sm text-gray-500 hover:text-violet-600 transition-colors">
                        verbito.ai@wearequantara.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-violet-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Response Time</p>
                      <p className="text-sm text-gray-500">Within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-violet-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Location</p>
                      <p className="text-sm text-gray-500">Sharjah Media City, Sharjah, UAE</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-50 dark:bg-violet-950/20 rounded-xl border border-violet-200 dark:border-violet-800 p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-violet-600" />
                  Quick Answers
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Check our Knowledge Hub for instant answers to common questions.
                </p>
                <a href="#/knowledge" className="text-sm text-violet-600 hover:text-violet-700 font-medium">
                  Visit Knowledge Hub →
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              {submitted ? (
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 text-center">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-2">
                    Message Sent!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Thank you for reaching out. We will get back to you within 24 hours.
                  </p>
                  {supabaseError && (
                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-4 text-left">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                        <p className="text-xs text-amber-800 dark:text-amber-300">
                          Note: Your message was received but could not be stored in our database. 
                          Our team has been notified and will respond via email.
                        </p>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => { setSubmitted(false); setSupabaseError(false); }}
                    className="text-violet-600 hover:text-violet-700 font-medium text-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-5">
                  {supabaseError && (
                    <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800 rounded-lg p-3 text-left">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5" />
                        <p className="text-xs text-rose-800 dark:text-rose-300">
                          We could not send your message right now. Please try again in a moment.
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg border text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                          errors.name ? 'border-rose-500' : 'border-gray-200 dark:border-gray-700'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg border text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                          errors.email ? 'border-rose-500' : 'border-gray-200 dark:border-gray-700'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Subject <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                        errors.subject ? 'border-rose-500' : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <option value="">Select a subject...</option>
                      <option value="General Question">General Question</option>
                      <option value="Billing Support">Billing Support</option>
                      <option value="Technical Issue">Technical Issue</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && <p className="text-rose-500 text-xs mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-2.5 rounded-lg border text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none ${
                        errors.message ? 'border-rose-500' : 'border-gray-200 dark:border-gray-700'
                      }`}
                      placeholder="Tell us how we can help..."
                    />
                    {errors.message && <p className="text-rose-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <Clock className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
