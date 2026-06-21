import { Mail } from 'lucide-react';
import ToolPageLayout from './ToolPageLayout';

export default function EmailPromptGenerator() {
  return (
    <ToolPageLayout
      slug="email-prompt-generator"
      h1="Email Prompt Generator"
      subtitle="Write better emails faster with AI-optimized prompts for sales, marketing, outreach, and customer communication."
      category="Email Writing"
      defaultOutputType="Email"
      seoTitle="Email Prompt Generator — AI Email Writing Tool | Verbito.ai"
      seoDescription="Generate AI prompts for writing sales emails, marketing campaigns, cold outreach, and customer support responses. Free tool — no signup required."
      ogImage="/og-default.jpg"
      icon={Mail}
      iconColor="text-sky-600"
      gradientFrom="from-sky-100"
      gradientTo="to-blue-100"
      educationContent={{
        whatIs: "an Email Writing Prompt",
        whyUse: "Email writing prompts are AI instructions designed to craft effective emails — from cold outreach to nurturing sequences to customer support responses. A well-structured email prompt considers the recipient's perspective, the desired action, and the relationship context to produce messages that get opened, read, and acted upon.",
        bestPractices: [
          "Define the email's single primary goal (click, reply, purchase, inform).",
          "Specify the recipient persona and their relationship to you.",
          "Include your unique value proposition or key message.",
          "Set tone constraints (professional, casual, urgent, friendly).",
          "Specify desired length (short, medium, detailed).",
          "Request subject line variations with the email body.",
          "Ask for a clear, singular call-to-action.",
        ],
        tips: [
          "Use the AIDA framework (Attention, Interest, Desire, Action) for sales emails.",
          "Request personalization fields to be marked with brackets [Name].",
          "Ask for follow-up email sequences, not just single emails.",
          "Specify if the email should include social proof or testimonials.",
          "Request both HTML and plain text versions for marketing emails.",
          "Include urgency triggers or scarcity elements where appropriate.",
        ],
        examples: [
          { title: "Cold Sales Email", description: "Write a cold sales email to a VP of Engineering at a tech startup offering DevOps consulting services. Keep it under 150 words, use a professional but conversational tone, include a specific result we achieved for a similar client (40% faster deployments), and end with a soft CTA asking for a 15-minute call." },
          { title: "Welcome Sequence", description: "Create a 3-email welcome sequence for new subscribers to a personal finance newsletter. Email 1: introduce the newsletter and set expectations. Email 2: share a valuable budgeting tip. Email 3: recommend a premium course with a limited-time discount. Tone: friendly and empowering." },
          { title: "Abandoned Cart", description: "Write an abandoned cart email for an online fashion retailer. The customer left a pair of running shoes in their cart. Use urgency (limited stock), social proof ( bestselling item), and offer a 10% discount code. Keep it under 120 words." },
          { title: "Meeting Request", description: "Write a professional meeting request email to a potential business partner. Propose 3 specific time slots next week, briefly mention the collaboration opportunity (co-marketing partnership), and keep the tone respectful of their time. Under 100 words." },
        ],
      }}
      faqs={[
        { question: "Can AI write emails that sound human?", answer: "Yes — with proper prompting that includes tone guidance, audience context, and specific constraints, AI can write emails that are indistinguishable from human-written ones. Always review before sending." },
        { question: "How do I make AI emails feel personalized?", answer: "Include recipient details in your prompt, request dynamic placeholder fields like [Name] and [Company], and ask the AI to reference specific shared contexts or recent events." },
        { question: "What's the best email length for AI-generated emails?", answer: "It depends on the purpose. Cold outreach: 50-125 words. Newsletters: 200-500 words. Sales sequences: 100-200 words per email. Always specify your desired length in the prompt." },
      ]}
    />
  );
}
