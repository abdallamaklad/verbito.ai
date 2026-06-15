import { FlaskConical } from 'lucide-react';
import ToolPageLayout from './ToolPageLayout';

export default function ResearchPromptGenerator() {
  return (
    <ToolPageLayout
      slug="research-prompt-generator"
      h1="Research Prompt Generator"
      subtitle="Generate AI prompts for academic research, literature reviews, data analysis, and hypothesis generation."
      category="Research"
      defaultOutputType="Research Summary"
      seoTitle="Research Prompt Generator — AI for Academic Research | Verbito.ai"
      seoDescription="Generate AI prompts for academic research, literature reviews, data analysis, and hypothesis generation. Free tool for researchers and students."
      ogImage="/og-research-prompts.jpg"
      icon={FlaskConical}
      iconColor="text-indigo-600"
      gradientFrom="from-indigo-100"
      gradientTo="to-blue-100"
      educationContent={{
        whatIs: "a Research Prompt",
        whyUse: "Research prompts are AI instructions designed to assist with academic and professional research tasks. They can help structure literature reviews, analyze research papers, generate hypotheses, summarize findings, and identify gaps in existing knowledge. When properly crafted, research prompts leverage AI's ability to process and synthesize large amounts of information quickly.",
        bestPractices: [
          "Specify the research domain and sub-field clearly.",
          "Mention the academic level (undergraduate, graduate, doctoral).",
          "Include specific research questions or hypotheses.",
          "Request citations and references to real studies where possible.",
          "Ask for critical analysis, not just summaries.",
          "Set constraints around methodology preferences.",
          "Request identification of limitations and future research directions.",
        ],
        tips: [
          "Use AI to brainstorm research questions and identify gaps.",
          "Request structured literature reviews with thematic organization.",
          "Ask for counterarguments and alternative perspectives.",
          "Use AI to simplify complex research for broader audiences.",
          "Request help with research methodology design.",
          "Generate interview questions or survey structures.",
        ],
        examples: [
          { title: "Literature Review", description: "Create a structured literature review outline on the impact of artificial intelligence on personalized medicine. Organize by themes: diagnostic accuracy, treatment optimization, drug discovery, and ethical considerations. Include seminal studies, recent advances (2020-2024), and identify 3 key research gaps." },
          { title: "Hypothesis Generation", description: "Based on current research in environmental psychology, generate 5 testable hypotheses about the relationship between urban green spaces and mental health outcomes. Each hypothesis should include the independent and dependent variables, expected relationship, and theoretical justification." },
          { title: "Research Methodology", description: "Design a mixed-methods research study to investigate remote work productivity in software development teams. Include research questions, sample size recommendations, data collection instruments, analysis plan, and potential confounding variables with mitigation strategies." },
          { title: "Data Interpretation", description: "Interpret the following research findings on consumer behavior shifts during economic downturns. Identify 3 key patterns, 2 surprising insights, and their implications for marketing strategy. Discuss limitations and suggest follow-up research questions." },
        ],
      }}
      faqs={[
        { question: "Can I use AI for academic research?", answer: "Yes, AI can assist with brainstorming, organizing ideas, literature reviews, and editing. However, always verify facts, follow your institution's AI usage policies, and never submit AI-generated content as your original work without proper disclosure." },
        { question: "Will AI-generated research content be accurate?", answer: "AI can make mistakes and sometimes hallucinate sources. Always verify claims, citations, and data against primary sources. Use AI as a starting point, not a final authority." },
        { question: "What's the best AI model for research?", answer: "Claude and GPT-4o are excellent for research tasks due to their strong reasoning and long context windows. Perplexity AI is also great for research with real-time citations." },
      ]}
    />
  );
}
