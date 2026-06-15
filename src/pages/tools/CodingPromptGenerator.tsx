import { Code2 } from 'lucide-react';
import ToolPageLayout from './ToolPageLayout';

export default function CodingPromptGenerator() {
  return (
    <ToolPageLayout
      slug="coding-prompt-generator"
      h1="Coding Prompt Generator"
      subtitle="Generate AI prompts for code generation, debugging, refactoring, code review, and technical documentation."
      category="Coding"
      defaultOutputType="Code"
      seoTitle="Coding Prompt Generator — AI Code Assistant | Verbito.ai"
      seoDescription="Generate AI prompts for writing code, debugging, refactoring, code review, and technical documentation. Supports all major programming languages. Free tool."
      ogImage="/og-coding-prompts.jpg"
      icon={Code2}
      iconColor="text-purple-600"
      gradientFrom="from-purple-100"
      gradientTo="to-violet-100"
      educationContent={{
        whatIs: "a Coding Prompt",
        whyUse: "Coding prompts are AI instructions that help you write, debug, refactor, and document code more efficiently. Whether you're working with Python, JavaScript, React, SQL, or any other language, well-structured coding prompts can dramatically speed up development and improve code quality.",
        bestPractices: [
          "Specify the programming language and version clearly.",
          "Describe the problem or feature, not just the desired code.",
          "Include input/output examples with expected results.",
          "Mention performance constraints (time/space complexity requirements).",
          "Request error handling and edge case coverage.",
          "Ask for comments explaining complex logic.",
          "Specify coding standards or style guides to follow.",
        ],
        tips: [
          "Provide a code skeleton or template for the AI to fill in.",
          "Ask the AI to explain its solution before writing code.",
          "Request unit tests alongside the implementation.",
          "Use chain-of-thought prompting for complex algorithms.",
          "Ask for Big O complexity analysis.",
          "Request multiple implementation approaches with trade-offs.",
        ],
        examples: [
          { title: "API Endpoint", description: "Write a RESTful API endpoint in Node.js/Express for user authentication with JWT tokens. Include registration, login, and password reset. Use bcrypt for password hashing, include input validation with Joi, and handle all error cases. Return proper HTTP status codes and JSON responses." },
          { title: "React Component", description: "Create a React component for a responsive data table with sorting, filtering, and pagination. Use TypeScript, include proper prop types, handle loading and empty states, and make it accessible with ARIA labels. Use Tailwind CSS for styling." },
          { title: "SQL Query", description: "Write an optimized SQL query to find the top 10 customers by total purchase amount in the last 90 days. Include customer name, email, total orders, total spent, and last purchase date. The query should handle the case where a customer has no email gracefully." },
          { title: "Code Review", description: "Review the following Python function for potential bugs, security issues, and performance problems. Suggest improvements and explain the reasoning for each suggestion. Rate the code quality on a scale of 1-10." },
        ],
      }}
      faqs={[
        { question: "Can AI write production-ready code?", answer: "AI can write solid, well-structured code, but it should always be reviewed, tested, and validated before production use. AI is excellent for scaffolding, boilerplate, and solving common patterns." },
        { question: "Which AI model is best for coding?", answer: "Claude, GPT-4o, and GitHub Copilot (powered by OpenAI Codex) are all excellent for coding tasks. Our generator optimizes prompts for the best results." },
        { question: "Can I use generated code commercially?", answer: "Yes, all generated code is yours to use. However, be aware that AI may occasionally produce code similar to training data, so review for any licensing concerns when using specific libraries or algorithms." },
      ]}
    />
  );
}
