export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  videoUrl?: string;
  content?: string;
}

export interface CourseModule {
  id: number;
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
}

export const courseModules: CourseModule[] = [
  {
    id: 1,
    title: 'Fundamentals of Prompt Engineering',
    description: 'Build a solid foundation in prompt engineering principles and learn how AI models process your instructions.',
    duration: '45 min',
    lessons: [
      { id: '1-1', title: 'What is Prompt Engineering?', duration: '8 min', completed: false, locked: false, content: 'Prompt engineering is the practice of designing inputs that guide AI models to produce desired outputs. In this lesson, we explore the fundamentals of how AI understands language and why the way you phrase your prompt matters dramatically.' },
      { id: '1-2', title: 'How AI Models Understand Language', duration: '10 min', completed: false, locked: true, content: 'Learn the mechanics of transformer-based language models, tokenization, and how patterns in your training data influence outputs.' },
      { id: '1-3', title: 'The Anatomy of a Great Prompt', duration: '9 min', completed: false, locked: true, content: 'Every great prompt contains role, context, task, format, and constraints. We break down each element with real examples.' },
      { id: '1-4', title: 'Common Mistakes Beginners Make', duration: '8 min', completed: false, locked: true, content: 'Avoid the 10 most common mistakes that lead to mediocre AI outputs. Learn to spot and fix them instantly.' },
      { id: '1-5', title: 'Setting Up Your AI Toolkit', duration: '10 min', completed: false, locked: true, content: 'Configure ChatGPT, Claude, Gemini, and other tools for maximum productivity. Learn about temperature, max tokens, and system prompts.' },
    ],
  },
  {
    id: 2,
    title: 'Core Techniques',
    description: 'Master the essential prompting techniques that form the foundation of all advanced strategies.',
    duration: '55 min',
    lessons: [
      { id: '2-1', title: 'Role Assignment & Personas', duration: '11 min', completed: false, locked: true, content: 'Learn how assigning a specific role or persona to the AI dramatically improves output quality and relevance.' },
      { id: '2-2', title: 'Chain-of-Thought Prompting', duration: '12 min', completed: false, locked: true, content: 'The single most powerful technique: getting the AI to think step by step. Improve complex reasoning by 40%+' },
      { id: '2-3', title: 'Few-Shot Learning', duration: '10 min', completed: false, locked: true, content: 'Provide examples in your prompt to teach the AI the exact pattern you want it to follow.' },
      { id: '2-4', title: 'Output Formatting & Structure', duration: '12 min', completed: false, locked: true, content: 'Get AI to output in JSON, markdown tables, CSV, or any custom format you need.' },
      { id: '2-5', title: 'Constraint Setting', duration: '10 min', completed: false, locked: true, content: 'Use positive and negative constraints to steer AI outputs precisely where you want them.' },
    ],
  },
  {
    id: 3,
    title: 'Advanced Strategies',
    description: 'Take your prompting skills to the next level with expert-level techniques and workflows.',
    duration: '60 min',
    lessons: [
      { id: '3-1', title: 'Meta-Prompting & Self-Correction', duration: '12 min', completed: false, locked: true, content: 'Teach AI to evaluate and improve its own outputs automatically.' },
      { id: '3-2', title: 'Recursive Refinement', duration: '12 min', completed: false, locked: true, content: 'Iterative prompting strategies that get better results with each pass.' },
      { id: '3-3', title: 'Prompt Chaining & Workflows', duration: '14 min', completed: false, locked: true, content: 'Build multi-step workflows where the output of one prompt feeds into the next.' },
      { id: '3-4', title: 'Multi-Model Strategies', duration: '12 min', completed: false, locked: true, content: 'Use different AI models for different steps in your workflow to leverage each model\'s strengths.' },
      { id: '3-5', title: 'Temperature & Parameter Tuning', duration: '10 min', completed: false, locked: true, content: 'Master the technical parameters that control creativity, randomness, and output length.' },
    ],
  },
  {
    id: 4,
    title: 'Business Applications',
    description: 'Apply prompt engineering to real business scenarios: marketing, sales, strategy, and operations.',
    duration: '50 min',
    lessons: [
      { id: '4-1', title: 'Marketing & Copywriting', duration: '10 min', completed: false, locked: true, content: 'Write high-converting ads, landing pages, and email campaigns with AI assistance.' },
      { id: '4-2', title: 'Sales & Outreach', duration: '10 min', completed: false, locked: true, content: 'Craft personalized sales emails, cold outreach sequences, and follow-up strategies.' },
      { id: '4-3', title: 'Customer Support Automation', duration: '10 min', completed: false, locked: true, content: 'Build AI-powered support systems that handle common inquiries with empathy and accuracy.' },
      { id: '4-4', title: 'Data Analysis & Reporting', duration: '10 min', completed: false, locked: true, content: 'Turn raw data into actionable insights and beautiful reports using AI.' },
      { id: '4-5', title: 'Strategic Planning', duration: '10 min', completed: false, locked: true, content: 'Use AI for SWOT analysis, competitive research, and long-term business planning.' },
    ],
  },
  {
    id: 5,
    title: 'Creative Applications',
    description: 'Unlock AI\'s creative potential for writing, art direction, video, and game design.',
    duration: '48 min',
    lessons: [
      { id: '5-1', title: 'Creative Writing & Storytelling', duration: '10 min', completed: false, locked: true, content: 'Generate compelling narratives, character development, and dialogue with AI co-writing.' },
      { id: '5-2', title: 'Midjourney & Image Generation', duration: '10 min', completed: false, locked: true, content: 'Master Midjourney, DALL-E, and Stable Diffusion with expert prompt techniques.' },
      { id: '5-3', title: 'Video Script Writing', duration: '9 min', completed: false, locked: true, content: 'Write engaging scripts for YouTube, TikTok, and professional video productions.' },
      { id: '5-4', title: 'Music & Audio Prompts', duration: '9 min', completed: false, locked: true, content: 'Generate music descriptions, podcast scripts, and audio content with AI.' },
      { id: '5-5', title: 'Worldbuilding & Game Design', duration: '10 min', completed: false, locked: true, content: 'Create rich game worlds, quest lines, and character backstories using AI.' },
    ],
  },
  {
    id: 6,
    title: 'Technical Applications',
    description: 'Supercharge your development workflow with AI-assisted coding, debugging, and documentation.',
    duration: '62 min',
    lessons: [
      { id: '6-1', title: 'Code Generation & Review', duration: '13 min', completed: false, locked: true, content: 'Generate production-ready code and conduct thorough code reviews with AI.' },
      { id: '6-2', title: 'Debugging & Troubleshooting', duration: '12 min', completed: false, locked: true, content: 'Use AI to identify bugs, analyze error logs, and propose fixes.' },
      { id: '6-3', title: 'Documentation Writing', duration: '12 min', completed: false, locked: true, content: 'Generate API docs, README files, and technical documentation automatically.' },
      { id: '6-4', title: 'API Integration Patterns', duration: '13 min', completed: false, locked: true, content: 'Learn how to integrate OpenAI, Anthropic, and other APIs into your applications.' },
      { id: '6-5', title: 'Testing & QA Automation', duration: '12 min', completed: false, locked: true, content: 'Generate test cases, unit tests, and QA checklists with AI assistance.' },
    ],
  },
  {
    id: 7,
    title: 'Productivity Systems',
    description: 'Build personal AI workflows that save hours every day across email, meetings, research, and learning.',
    duration: '45 min',
    lessons: [
      { id: '7-1', title: 'Building Personal AI Workflows', duration: '9 min', completed: false, locked: true, content: 'Design end-to-end workflows that automate your most repetitive tasks.' },
      { id: '7-2', title: 'Email & Communication', duration: '9 min', completed: false, locked: true, content: 'Draft, edit, and manage email communication 10x faster with AI.' },
      { id: '7-3', title: 'Meeting Summaries & Notes', duration: '9 min', completed: false, locked: true, content: 'Transform transcripts into actionable summaries and follow-up items.' },
      { id: '7-4', title: 'Research & Synthesis', duration: '9 min', completed: false, locked: true, content: 'Accelerate research by synthesizing multiple sources into digestible briefs.' },
      { id: '7-5', title: 'Learning & Skill Development', duration: '9 min', completed: false, locked: true, content: 'Use AI as a personalized tutor to learn any topic faster.' },
    ],
  },
  {
    id: 8,
    title: 'Industry-Specific Prompts',
    description: 'Tailored prompt strategies for healthcare, legal, education, finance, and real estate.',
    duration: '52 min',
    lessons: [
      { id: '8-1', title: 'Healthcare & Medical', duration: '11 min', completed: false, locked: true, content: 'Medical documentation, patient communication, and clinical research prompts.' },
      { id: '8-2', title: 'Legal & Compliance', duration: '10 min', completed: false, locked: true, content: 'Contract review, legal research, and compliance documentation prompts.' },
      { id: '8-3', title: 'Education & Training', duration: '10 min', completed: false, locked: true, content: 'Lesson planning, assessment creation, and personalized learning prompts.' },
      { id: '8-4', title: 'Finance & Accounting', duration: '11 min', completed: false, locked: true, content: 'Financial analysis, reporting, and forecasting prompts for accountants and analysts.' },
      { id: '8-5', title: 'Real Estate & Property', duration: '10 min', completed: false, locked: true, content: 'Property descriptions, market analysis, and client communication prompts.' },
    ],
  },
  {
    id: 9,
    title: 'Building Your Prompt Library',
    description: 'Learn how to organize, version, test, and share prompts at scale.',
    duration: '40 min',
    lessons: [
      { id: '9-1', title: 'Organization & Tagging', duration: '8 min', completed: false, locked: true, content: 'Create a taxonomy for organizing hundreds of prompts for instant retrieval.' },
      { id: '9-2', title: 'Version Control for Prompts', duration: '8 min', completed: false, locked: true, content: 'Track prompt changes over time and A/B test different versions.' },
      { id: '9-3', title: 'Team Sharing & Collaboration', duration: '8 min', completed: false, locked: true, content: 'Share prompts across your organization with proper access controls.' },
      { id: '9-4', title: 'Testing & Benchmarking', duration: '8 min', completed: false, locked: true, content: 'Build evaluation frameworks to measure prompt effectiveness objectively.' },
      { id: '9-5', title: 'Documentation Standards', duration: '8 min', completed: false, locked: true, content: 'Document your prompts so anyone on your team can use them effectively.' },
    ],
  },
  {
    id: 10,
    title: 'Future of AI & Prompt Engineering',
    description: 'Prepare for what\'s next: AI agents, autonomous systems, and the evolving role of prompt engineers.',
    duration: '38 min',
    lessons: [
      { id: '10-1', title: 'Emerging Models & Capabilities', duration: '8 min', completed: false, locked: true, content: 'Preview upcoming AI models and their new capabilities.' },
      { id: '10-2', title: 'AI Agents & Autonomous Systems', duration: '8 min', completed: false, locked: true, content: 'Understand how AI agents work and how to build agent-based workflows.' },
      { id: '10-3', title: 'Ethics & Responsible AI', duration: '8 min', completed: false, locked: true, content: 'Navigate ethical considerations and responsible AI usage guidelines.' },
      { id: '10-4', title: 'Career Opportunities', duration: '7 min', completed: false, locked: true, content: 'Explore career paths in prompt engineering and AI consulting.' },
      { id: '10-5', title: 'Your 90-Day Action Plan', duration: '7 min', completed: false, locked: true, content: 'A structured plan to apply everything you\'ve learned over the next 90 days.' },
    ],
  },
];

export const painPoints = [
  {
    title: 'Generic AI Outputs',
    description: 'You get vague, repetitive responses that sound robotic and need heavy editing before they\'re usable.',
    icon: 'frown',
  },
  {
    title: 'Inconsistent Results',
    description: 'The same prompt gives wildly different outputs each time. You can\'t rely on AI for professional work.',
    icon: 'shuffle',
  },
  {
    title: 'Wasted Time',
    description: 'You spend more time fixing AI output than doing the work yourself. Prompting feels like a chore.',
    icon: 'clock',
  },
  {
    title: 'Hit-or-Miss Quality',
    description: 'Sometimes you get gold, sometimes garbage. There\'s no system — just luck and endless trial and error.',
    icon: 'alert',
  },
];

export const transformations = [
  'Write prompts that get expert-level results on the first try — no more endless tweaking',
  'Build reusable prompt templates for every recurring task in your workflow',
  'Use chain-of-thought and few-shot techniques to 3x the quality of AI outputs',
  'Create automated AI workflows that handle multi-step tasks without manual intervention',
  'Apply industry-specific prompting strategies tailored to your exact field',
  'Stay ahead of the curve as AI evolves with lifetime updates and new techniques',
];

export const audienceCards = [
  {
    title: 'Knowledge Workers',
    description: 'Writers, marketers, analysts, and consultants who use AI daily and want dramatically better output.',
    icon: 'briefcase',
  },
  {
    title: 'Developers & Engineers',
    description: 'Software engineers who want to supercharge coding, debugging, and documentation with AI.',
    icon: 'code',
  },
  {
    title: 'Business Leaders',
    description: 'Founders, managers, and executives who want to leverage AI for strategic advantage.',
    icon: 'trending',
  },
  {
    title: 'Creators & Educators',
    description: 'Content creators, teachers, and trainers who use AI for creative and educational projects.',
    icon: 'palette',
  },
];

export const bonuses = [
  { title: '500+ Prompt Templates Library', value: 197, description: 'Ready-to-use prompts for every major use case and industry. Copy, customize, deploy.' },
  { title: 'Private Community Access', value: 297, description: 'Join 3,000+ prompt engineers in our exclusive community. Share, learn, and grow together.' },
  { title: 'Monthly Live Q&A Calls', value: 197, description: 'Get your questions answered by expert instructors every month. Recordings included.' },
  { title: 'Lifetime Course Updates', value: 127, description: 'All future course updates at no extra cost. As AI evolves, so does your knowledge.' },
  { title: 'Prompt Engineering Cheat Sheet', value: 47, description: 'A printable quick-reference guide with all key techniques at your fingertips.' },
  { title: 'AI Toolkit Setup Guide', value: 67, description: 'Step-by-step guides to configure ChatGPT, Claude, Gemini for maximum productivity.' },
  { title: 'Swipe File: 50 Best Prompts', value: 97, description: 'Our curated collection of the highest-performing prompts across all categories.' },
  { title: '1-on-1 Office Hours (Annual)', value: 197, description: 'One private 30-minute session with an instructor to review your specific use cases.' },
];

export const faqs = [
  { q: 'Who is this course for?', a: 'This course is designed for anyone who wants to get dramatically better results from AI tools. Whether you are a complete beginner or have some experience with AI, the course provides actionable techniques that work at any skill level. We cover fundamentals for beginners and advanced strategies for experienced users.' },
  { q: 'How long do I have access?', a: 'You get lifetime access to all course materials, including all future updates. This is a one-time purchase — no subscriptions, no recurring fees. As AI evolves, we update the course and you get everything new at no extra cost.' },
  { q: 'Is there a certificate of completion?', a: 'Yes! Upon completing all modules and passing the final assessment, you will receive a verified certificate of completion that you can share on LinkedIn, add to your resume, or present to your employer.' },
  { q: 'What if I am not satisfied?', a: 'We offer a 30-day money-back guarantee. If you are not completely satisfied for any reason, contact us within 30 days of purchase for a full refund. No questions asked, no hoops to jump through.' },
  { q: 'How is the course delivered?', a: 'The course is delivered through our online learning platform. Each lesson combines video instruction, written materials, downloadable templates, hands-on exercises, and quizzes to reinforce learning.' },
  { q: 'Can my team take this course?', a: 'Absolutely! Contact us for team pricing. We offer discounts for groups of 5+ and can provide progress tracking, admin controls, and private team cohorts.' },
  { q: 'Do I need any prior experience?', a: 'No prior experience with prompt engineering is required. Basic familiarity with AI tools like ChatGPT is helpful but not necessary. We start from the fundamentals and build up progressively.' },
  { q: 'How long does it take to complete?', a: 'The course contains approximately 8.5 hours of video content across 50 lessons. Most students complete it over 2-3 weeks, spending 30-45 minutes per day. You can go at your own pace with lifetime access.' },
];

export const totalBonusValue = bonuses.reduce((acc, b) => acc + b.value, 0);
