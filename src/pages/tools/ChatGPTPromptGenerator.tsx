import { MessageSquare } from 'lucide-react';
import ToolPageLayout from './ToolPageLayout';

export default function ChatGPTPromptGenerator() {
  return (
    <ToolPageLayout
      slug="chatgpt-prompt-generator"
      h1="ChatGPT Prompt Generator"
      subtitle="Create perfectly optimized prompts for ChatGPT, GPT-4, and GPT-4o. Get better responses with structured, context-rich prompts."
      category="ChatGPT"
      defaultOutputType="Blog Post"
      seoTitle="ChatGPT Prompt Generator — Free AI Prompt Tool | Verbito.ai"
      seoDescription="Generate optimized ChatGPT prompts for free. Get better AI responses with structured prompts tailored for GPT-4 and GPT-4o."
      ogImage="/og-chatgpt-prompts.jpg"
      icon={MessageSquare}
      iconColor="text-emerald-600"
      gradientFrom="from-emerald-100"
      gradientTo="to-teal-100"
      educationContent={{
        whatIs: "a ChatGPT Prompt",
        whyUse: "A ChatGPT prompt is the instruction you give to OpenAI's ChatGPT model. Well-crafted prompts dramatically improve the quality, relevance, and accuracy of AI responses. Whether you're using GPT-3.5, GPT-4, or GPT-4o, the way you structure your prompt matters. A good prompt provides context, specifies the desired format, sets constraints, and guides the AI toward the exact output you need. Our generator helps you create expert-level prompts that unlock the full potential of ChatGPT.",
        bestPractices: [
          "Be specific and clear about what you want — vague prompts lead to generic responses.",
          "Assign a role to ChatGPT (e.g., 'You are an expert copywriter') for more focused answers.",
          "Provide context about your audience, industry, and goals.",
          "Use delimiters like triple quotes or XML tags to separate instructions from content.",
          "Specify the desired output format (bullet points, tables, JSON, etc.).",
          "Set constraints like word count, tone, and what to avoid.",
          "Iterate and refine — use follow-up prompts to improve the output.",
        ],
        tips: [
          "Use chain-of-thought prompting for complex reasoning tasks.",
          "Include examples (few-shot prompting) to guide the style and format.",
          "Ask ChatGPT to think step-by-step for better logical reasoning.",
          "Use system messages to set persistent behavior instructions.",
          "Break complex tasks into multiple simpler prompts.",
          "Request self-correction by asking the model to review its own answer.",
        ],
        examples: [
          { title: "Blog Post Writer", description: "Write a 1,500-word blog post about the benefits of remote work for software teams. Target audience: CTOs and engineering managers. Include statistics, real-world examples, and actionable tips. Use a professional yet conversational tone." },
          { title: "Code Explainer", description: "Explain the following Python code to me as if I'm a beginner programmer. Break down each function, explain the logic step by step, and suggest any improvements for readability and performance." },
          { title: "Email Sequence", description: "Create a 5-email welcome sequence for new subscribers to a fitness coaching program. Each email should be 200-300 words, build on the previous one, and include a clear call-to-action. Tone: encouraging and motivational." },
          { title: "Data Analysis", description: "Analyze this sales data and identify the top 3 trends, 2 areas of concern, and 3 actionable recommendations. Present your findings in a structured table with clear headings." },
        ],
      }}
      faqs={[
        { question: "What is the best way to write ChatGPT prompts?", answer: "The best ChatGPT prompts are specific, provide context, assign a clear role, and specify the desired output format. Use our generator to create structured prompts that follow these best practices automatically." },
        { question: "Does this work with GPT-4 and GPT-4o?", answer: "Yes! Our prompts are optimized for all ChatGPT models including GPT-3.5, GPT-4, GPT-4 Turbo, and GPT-4o." },
        { question: "Can I use these prompts for commercial purposes?", answer: "Absolutely. All generated prompts are yours to use for any personal or commercial project." },
        { question: "How is this different from just typing my question into ChatGPT?", answer: "Our generator structures your request with proven prompt engineering techniques — role assignment, context setting, output formatting, and constraints — which typically produce 40-60% better results than simple questions." },
      ]}
    />
  );
}
