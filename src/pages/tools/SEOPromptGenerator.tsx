import { Search } from 'lucide-react';
import ToolPageLayout from './ToolPageLayout';

export default function SEOPromptGenerator() {
  return (
    <ToolPageLayout
      slug="seo-prompt-generator"
      h1="SEO Prompt Generator"
      subtitle="Generate AI prompts for keyword research, content optimization, meta descriptions, and SEO strategy."
      category="SEO"
      defaultOutputType="Blog Post"
      seoTitle="SEO Prompt Generator — AI for SEO & Content Optimization | Verbito.ai"
      seoDescription="Generate AI prompts for SEO keyword research, content optimization, technical SEO, and link building strategies. Free tool — no signup required."
      ogImage="/og-default.jpg"
      icon={Search}
      iconColor="text-orange-600"
      gradientFrom="from-orange-100"
      gradientTo="to-amber-100"
      educationContent={{
        whatIs: "an SEO Prompt",
        whyUse: "SEO prompts are AI instructions designed to help with search engine optimization tasks including keyword research, content planning, on-page optimization, technical SEO audits, and link building strategies. Using AI for SEO can dramatically speed up research and provide data-driven recommendations.",
        bestPractices: [
          "Specify your target keywords and search intent (informational, transactional, navigational).",
          "Include your domain authority and competitor benchmarks.",
          "Mention your content management system and technical constraints.",
          "Set goals (rankings, traffic, conversions) for the SEO strategy.",
          "Request structured output (outlines, tables, checklists).",
          "Ask for both quick wins and long-term strategic recommendations.",
          "Include target geographic regions for local SEO considerations.",
        ],
        tips: [
          "Ask for semantic keyword clusters, not just individual keywords.",
          "Request content gap analysis between you and competitors.",
          "Use prompts to generate schema markup recommendations.",
          "Ask for internal linking strategies and anchor text suggestions.",
          "Request page speed optimization recommendations.",
          "Get help creating content briefs with SEO requirements included.",
        ],
        examples: [
          { title: "Keyword Research", description: "Conduct keyword research for a fitness blog targeting beginners. Find 20 low-competition, high-intent keywords with monthly search volume estimates. Group them into content clusters and suggest blog post titles for each cluster." },
          { title: "Content Optimization", description: "Optimize this blog post for the keyword 'best running shoes for flat feet'. Rewrite the title, meta description, H2s, and intro paragraph. Include keyword placement recommendations and suggest 3 internal linking opportunities." },
          { title: "Technical SEO Audit", description: "Create a technical SEO audit checklist for an e-commerce website with 500+ product pages. Prioritize issues by impact and difficulty. Include recommendations for site speed, mobile optimization, crawlability, and index management." },
          { title: "Link Building Strategy", description: "Develop a 3-month link building strategy for a B2B SaaS company. Include outreach templates, target website categories, guest posting opportunities, and broken link building tactics. Set realistic monthly link acquisition goals." },
        ],
      }}
      faqs={[
        { question: "Can AI help improve my search rankings?", answer: "AI can significantly speed up SEO tasks like keyword research, content optimization, and technical audits. However, actual ranking improvements depend on many factors including domain authority, competition, and content quality." },
        { question: "Is AI-generated content safe for SEO?", answer: "Google doesn't penalize AI-generated content as long as it's high-quality, original, and provides value to users. Always review, fact-check, and add human expertise to AI-generated content." },
        { question: "What AI model is best for SEO prompts?", answer: "Claude and GPT-4o work well for SEO due to their strong analytical capabilities. Our generator optimizes prompts for the best results across models." },
      ]}
    />
  );
}
