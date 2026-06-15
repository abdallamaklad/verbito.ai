import { TrendingUp } from 'lucide-react';
import ToolPageLayout from './ToolPageLayout';

export default function MarketingPromptGenerator() {
  return (
    <ToolPageLayout
      slug="marketing-prompt-generator"
      h1="Marketing Prompt Generator"
      subtitle="Create AI prompts for marketing campaigns, content strategy, copywriting, and audience research."
      category="Marketing"
      defaultOutputType="Advertisement"
      seoTitle="Marketing Prompt Generator — AI for Marketing & Copywriting | Verbito.ai"
      seoDescription="Generate AI prompts for marketing campaigns, content strategy, copywriting, and audience research. Free tool — no signup required."
      ogImage="/og-marketing-prompts.jpg"
      icon={TrendingUp}
      iconColor="text-rose-600"
      gradientFrom="from-rose-100"
      gradientTo="to-pink-100"
      educationContent={{
        whatIs: "a Marketing Prompt",
        whyUse: "Marketing prompts are AI instructions that help you create compelling copy, develop campaign strategies, analyze target audiences, and generate creative marketing ideas. A well-crafted marketing prompt leverages AI's ability to process vast amounts of marketing knowledge and apply proven frameworks to your specific needs.",
        bestPractices: [
          "Define your target audience with demographics, psychographics, and pain points.",
          "Specify the marketing channel (email, social, ads, landing pages, etc.).",
          "Include your brand voice and tone guidelines.",
          "Set clear goals (conversions, engagement, brand awareness, etc.).",
          "Provide examples of your best-performing content for style matching.",
          "Ask for multiple variants to A/B test.",
          "Request specific copywriting frameworks (AIDA, PAS, FAB, etc.).",
        ],
        tips: [
          "Use persona-based prompts — describe your ideal customer in detail.",
          "Ask for headline variations using different psychological triggers.",
          "Request empathy maps or customer journey outlines.",
          "Specify character limits for ads and social posts.",
          "Include your unique value proposition in the prompt.",
          "Ask for content calendars and editorial plans.",
        ],
        examples: [
          { title: "Facebook Ad Campaign", description: "Write 5 Facebook ad variations for a new meal prep delivery service targeting busy professionals aged 25-40. Use the PAS framework. Each ad should be under 125 characters for the primary text. Include compelling headlines and clear CTAs." },
          { title: "Content Strategy", description: "Create a 30-day content marketing strategy for a B2B SaaS company selling project management software. Include blog topics, LinkedIn post ideas, email newsletter themes, and lead magnet suggestions. Target audience: operations managers at mid-size companies." },
          { title: "Email Subject Lines", description: "Generate 10 email subject lines for a flash sale announcement for an online fitness equipment store. Use urgency, curiosity, and social proof angles. Keep subject lines under 50 characters. Include predicted open rate for each." },
          { title: "Landing Page Copy", description: "Write conversion-optimized landing page copy for a free trial signup of a CRM software. Include hero section, 3 benefit sections with icons, social proof section, FAQ, and CTA sections. Target audience: small business owners." },
        ],
      }}
      faqs={[
        { question: "Can AI-generated marketing copy really convert?", answer: "Yes — when properly prompted, AI can produce highly effective marketing copy. The key is providing detailed context about your audience, product, and goals. Always review and refine AI-generated copy before publishing." },
        { question: "What marketing tasks work best with AI prompts?", answer: "AI excels at: brainstorming campaign ideas, writing first drafts, creating variations for A/B testing, analyzing competitor messaging, generating content calendars, and personalizing copy for different segments." },
        { question: "How do I maintain brand voice in AI-generated content?", answer: "Include detailed brand voice guidelines in your prompt — describe your tone (professional, playful, authoritative), provide examples of existing copy you like, and specify words or phrases to avoid." },
      ]}
    />
  );
}
