import { GraduationCap } from 'lucide-react';
import ToolPageLayout from './ToolPageLayout';

export default function StudentPromptGenerator() {
  return (
    <ToolPageLayout
      slug="student-prompt-generator"
      h1="Student Prompt Generator"
      subtitle="Generate AI prompts for studying, essay writing, exam prep, note-taking, and learning any subject faster."
      category="Education"
      defaultOutputType="Lesson Plan"
      seoTitle="Student Prompt Generator — AI Study Helper | Verbito.ai"
      seoDescription="Generate AI prompts for studying, essay writing, exam preparation, and learning. Perfect tool for students of all levels. Free — no signup required."
      ogImage="/og-student-prompts.jpg"
      icon={GraduationCap}
      iconColor="text-green-600"
      gradientFrom="from-green-100"
      gradientTo="to-emerald-100"
      educationContent={{
        whatIs: "a Student Study Prompt",
        whyUse: "Student prompts are AI instructions designed to enhance learning, improve study efficiency, and help with academic tasks. They can help explain complex concepts, create study guides, generate practice questions, improve essays, and organize learning materials. When used responsibly, AI study prompts can be a powerful educational tool.",
        bestPractices: [
          "Specify your grade level and subject clearly.",
          "Mention your learning objectives and what you're struggling with.",
          "Request explanations at your level (simplify or go deep).",
          "Ask for multiple explanation approaches (visual, analogy, formal).",
          "Request practice problems with step-by-step solutions.",
          "Use AI to create study schedules and learning plans.",
          "Ask for memory aids like mnemonics and acronyms.",
        ],
        tips: [
          "Use the Feynman Technique: ask AI to explain as if teaching a beginner.",
          "Request concept maps and visual organization of topics.",
          "Generate flashcard content for spaced repetition studying.",
          "Ask for real-world applications of theoretical concepts.",
          "Use AI to check your understanding by explaining it back.",
          "Request essay outlines before writing full drafts.",
        ],
        examples: [
          { title: "Concept Explanation", description: "Explain photosynthesis to me as if I'm a 10th grader who loves video games. Use an analogy comparing it to a crafting system. Include the light-dependent reactions and Calvin cycle, but keep it engaging and easy to remember." },
          { title: "Essay Improvement", description: "Review my introduction paragraph for an essay on climate change. Suggest improvements for thesis clarity, hook strength, and flow. Keep my original ideas but make the writing more compelling and academic." },
          { title: "Exam Preparation", description: "Create a comprehensive study guide for my AP Biology exam on cellular respiration. Include key terms with definitions, important pathways (glycolysis, Krebs, ETC), comparison tables, 10 practice questions with answers, and common misconceptions to avoid." },
          { title: "Math Problem Solving", description: "Walk me through solving this calculus problem step by step: Find the derivative of f(x) = x^3 * ln(x). Explain each step of the product rule application and verify the final answer. Point out common mistakes students make on this type of problem." },
        ],
      }}
      faqs={[
        { question: "Is using AI for studying considered cheating?", answer: "Using AI as a learning tool (explaining concepts, creating study guides, checking your work) is generally acceptable. However, submitting AI-generated work as your own without permission may violate academic integrity policies. Always check with your instructor." },
        { question: "Can AI help me prepare for standardized tests?", answer: "Yes! AI can generate practice questions, explain difficult concepts, create study schedules, and help you identify weak areas. However, make sure to use official practice materials as well." },
        { question: "How do I use AI responsibly as a student?", answer: "Use AI to support your learning, not replace it. Always try solving problems yourself first, use AI for explanations when stuck, verify AI-generated facts, and disclose AI usage when required by your institution." },
      ]}
    />
  );
}
