import { Briefcase } from 'lucide-react';
import ToolPageLayout from './ToolPageLayout';

export default function BusinessPromptGenerator() {
  return (
    <ToolPageLayout
      slug="business-prompt-generator"
      h1="Business Prompt Generator"
      subtitle="Generate AI prompts for business strategy, planning, analysis, and decision-making. Perfect for entrepreneurs and executives."
      category="Business"
      defaultOutputType="Strategy"
      seoTitle="Business Prompt Generator — AI for Strategy & Planning | Verbito.ai"
      seoDescription="Generate AI prompts for business strategy, SWOT analysis, business plans, and more. Free tool — no signup required."
      ogImage="/og-default.jpg"
      icon={Briefcase}
      iconColor="text-blue-600"
      gradientFrom="from-blue-100"
      gradientTo="to-indigo-100"
      educationContent={{
        whatIs: "a Business Prompt",
        whyUse: "Business prompts are AI instructions designed to help with strategic planning, market analysis, competitive research, financial modeling, and operational efficiency. Using well-structured business prompts with AI tools like ChatGPT and Claude can save hours of research and analysis while providing fresh perspectives on complex business challenges.",
        bestPractices: [
          "Define your business objective clearly before writing the prompt.",
          "Include relevant market context, industry trends, and competitive landscape.",
          "Specify the business framework you want used (SWOT, Porter's Five Forces, etc.).",
          "Set constraints around budget, timeline, and resource availability.",
          "Request actionable recommendations with implementation steps.",
          "Ask for data-backed insights and cite sources where possible.",
          "Use follow-up prompts to drill deeper into specific recommendations.",
        ],
        tips: [
          "Assign a business consultant or analyst role for more professional output.",
          "Include your company size, industry, and target market for tailored advice.",
          "Ask for both short-term wins and long-term strategic recommendations.",
          "Request risk assessment alongside opportunities.",
          "Specify if you need the output in a specific format (slide deck outline, memo, etc.).",
          "Use iterative prompting to refine and expand on initial recommendations.",
        ],
        examples: [
          { title: "Market Entry Strategy", description: "Create a market entry strategy for launching a sustainable skincare brand in Southeast Asia. Include target demographics, pricing strategy, distribution channels, and a 12-month launch timeline. Consider regulatory requirements and local competition." },
          { title: "Competitive Analysis", description: "Perform a competitive analysis of the top 5 project management SaaS tools. Compare features, pricing, target audiences, strengths, and weaknesses. Present findings in a structured table with strategic recommendations." },
          { title: "Business Plan Outline", description: "Create a comprehensive business plan outline for a B2B AI-powered customer support platform. Include executive summary, market opportunity, product description, go-to-market strategy, financial projections, and team structure." },
          { title: "Operational Efficiency Audit", description: "Analyze our e-commerce fulfillment process and identify 5 areas where AI automation could reduce costs and improve delivery times. Include estimated savings, implementation complexity, and priority ranking." },
        ],
      }}
      faqs={[
        { question: "Can AI really help with business strategy?", answer: "AI excels at analyzing large amounts of information, generating creative ideas, and structuring strategic frameworks. While it shouldn't replace human judgment, it's a powerful tool for research, analysis, and brainstorming." },
        { question: "Is my business information secure?", answer: "We don't store your prompts or the information you provide. However, we recommend avoiding highly sensitive proprietary data when using any AI tool." },
        { question: "What AI model is best for business prompts?", answer: "Claude and GPT-4o are excellent for business analysis due to their strong reasoning capabilities. Our generator optimizes prompts for the best available models." },
      ]}
    />
  );
}
