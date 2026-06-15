/* ================================================================ */
/*  OPENAI SERVICE — Mock with realistic prompt generation          */
/*  Replace with real API call to /api/generate-prompt backend      */
/* ================================================================ */

import type { PromptGenerationInput,PromptGenerationResult,QualityBreakdown } from '@/types';
import { analytics } from './analytics';
import { invokeEdgeFunction,isBackendConfigured } from './backend';

function getAnonymousId() {
  const stored = localStorage.getItem('verbito_anon_id');
  if (stored) return stored;
  const id = crypto.randomUUID();
  localStorage.setItem('verbito_anon_id', id);
  return id;
}

function scorePrompt(input: PromptGenerationInput): { score: number; breakdown: QualityBreakdown } {
  let score = 70;
  const b: QualityBreakdown = { clarity: 70, context: 65, specificity: 65, constraints: 60, outputFormat: 75, reusability: 60 };
  if (input.context && input.context.length > 20) { b.context = 85; b.specificity = 80; score += 5; }
  if (input.audience && input.audience.length > 5) { b.clarity = 85; score += 3; }
  if (input.constraints && input.constraints.length > 10) { b.constraints = 85; score += 4; }
  if (input.tone && input.tone !== 'professional') b.outputFormat = 85;
  if (input.complexity === 'expert') { b.reusability = 90; score += 5; }
  if (input.exampleInput) { b.specificity = 90; score += 3; }
  b.clarity = Math.min(98, b.clarity + Math.floor(input.goal.length / 50));
  score = Math.min(98, score + Math.floor(input.goal.length / 30));
  return { score, breakdown: b };
}

function buildPrompt(input: PromptGenerationInput): string {
  const parts: string[] = [];
  const roleMap: Record<string, string> = {
    'Business': 'senior business consultant', 'Marketing': 'seasoned marketing strategist',
    'Sales': 'top-performing sales coach', 'SEO': 'SEO specialist with 10+ years experience',
    'Content creation': 'award-winning content creator', 'Email writing': 'email marketing expert',
    'Social media': 'social media strategist', 'Coding': 'senior software engineer',
    'Data analysis': 'data scientist', 'Education': 'experienced educator and curriculum designer',
    'Research': 'research analyst', 'Productivity': 'productivity consultant',
    'Automation': 'automation specialist', 'ChatGPT': 'AI prompt optimization expert',
    'Claude': 'AI assistant specialist', 'Gemini': 'Google AI specialist',
    'Midjourney': 'AI art director and prompt engineer', 'Image generation': 'visual AI specialist',
    'Video generation': 'AI video production specialist', 'Career': 'career coach',
    'Personal development': 'personal development coach', 'Custom': 'domain expert',
  };
  const role = roleMap[input.category] || 'domain expert';
  parts.push(`You are a ${role}.`);
  parts.push(`\n## Objective\n${input.goal}`);
  if (input.context) parts.push(`\n## Context\n${input.context}`);
  if (input.audience) parts.push(`\n## Target Audience\n${input.audience}`);
  if (input.industry) parts.push(`\n## Industry\n${input.industry}`);
  parts.push(`\n## Task`);
  parts.push(`Create a high-quality ${input.outputType} optimized for ${input.targetModel}.`);
  if (input.tone) parts.push(`Use a ${input.tone} tone throughout.`);
  if (input.complexity) parts.push(`Adapt the complexity level to ${input.complexity}.`);
  if (input.constraints) parts.push(`\n## Constraints\n${input.constraints}`);
  if (input.avoid) parts.push(`\n## Avoid\n${input.avoid}`);
  if (input.exampleInput && input.exampleOutput) {
    parts.push(`\n## Example\nInput: ${input.exampleInput}\nExpected Output: ${input.exampleOutput}`);
  }
  if (input.desiredLength) parts.push(`\n## Length\n${input.desiredLength}`);
  if (input.brandVoice) parts.push(`\n## Brand Voice\n${input.brandVoice}`);
  if (input.additionalInstructions) parts.push(`\n## Additional Instructions\n${input.additionalInstructions}`);
  parts.push(`\n## Output Format\nProvide the response in a clear, well-structured format with appropriate headings and sections. Ensure the output is immediately usable without further editing.`);
  if (input.language && input.language !== 'English') parts.push(`\n## Language\nRespond in ${input.language}.`);
  return parts.join('\n');
}

function buildShortVersion(full: string): string {
  const lines = full.split('\n').filter(l => l.trim());
  const essential = lines.slice(0, 3);
  return essential.join('\n') + '\n\n[Provide a concise, actionable response following the above guidance.]';
}

function buildAdvancedVersion(input: PromptGenerationInput, base: string): string {
  return base + `\n\n## Advanced Requirements\n- Include specific metrics and measurable outcomes where applicable\n- Provide multiple variations or options where relevant\n- Add strategic context explaining why this approach works\n- Include contingency considerations or alternative approaches\n- Format for maximum reusability across similar tasks\n- Optimize token efficiency while maintaining completeness`;
}

export async function generatePrompt(input: PromptGenerationInput): Promise<PromptGenerationResult> {
  if (isBackendConfigured()) {
    const result = await invokeEdgeFunction<PromptGenerationResult>('generate-prompt', input, {
      'x-anonymous-id': getAnonymousId(),
    });
    analytics.track('prompt_generated', { category: result.category, targetModel: result.targetModel, promptScore: result.promptScore });
    return result;
  }

  if (import.meta.env.PROD) {
    throw new Error('Prompt generation is temporarily unavailable because the production backend is not configured.');
  }

  const result = await mockGeneratePrompt(input);
  analytics.track('prompt_generated', { category: result.category, targetModel: result.targetModel, promptScore: result.promptScore, mock: true });
  return result;
}

async function mockGeneratePrompt(input: PromptGenerationInput): Promise<PromptGenerationResult> {
  // Simulate API delay
  await new Promise(r => setTimeout(r, 1500 + Math.random() * 1000));

  if (!input.goal || input.goal.length < 3) {
    throw new Error('Please provide a goal for your prompt.');
  }

  const { score, breakdown } = scorePrompt(input);
  const finalPrompt = buildPrompt(input);
  const shortVersion = buildShortVersion(finalPrompt);
  const advancedVersion = buildAdvancedVersion(input, finalPrompt);

  const variables: string[] = [];
  if (finalPrompt.includes('[COMPANY]')) variables.push('Replace [COMPANY] with your company name');
  if (finalPrompt.includes('[AUDIENCE]')) variables.push('Replace [AUDIENCE] with your target audience');
  if (finalPrompt.includes('[PRODUCT]')) variables.push('Replace [PRODUCT] with your product/service');
  if (variables.length === 0) {
    variables.push('Customize the context section for your specific situation');
    variables.push('Adjust the tone and complexity for your audience');
    variables.push('Replace specific examples with your own data');
  }

  const followUps = [
    `Refine this prompt for a more specific audience within ${input.category || 'your field'}`,
    `Add performance metrics and success criteria to this prompt`,
    `Create a template version of this prompt for repeated use`,
  ];

  return {
    id: `gen-${Date.now()}`,
    finalPrompt,
    shortVersion,
    advancedVersion,
    whyItWorks: `This prompt works because it establishes a clear expert role (${input.category || 'domain'}), provides specific context about your goal, and structures the request with explicit constraints and output requirements. The ${input.complexity || 'intermediate'} complexity level ensures appropriate depth while the ${input.tone || 'professional'} tone matches your intended audience.`,
    variables,
    followUpPrompts: followUps,
    bestModel: input.targetModel === 'general-ai' ? 'GPT-4o or Claude 3 Opus' : input.targetModel,
    commonMistakes: ['Being too vague about the desired outcome', 'Not specifying the target audience', 'Forgetting to set constraints or boundaries', 'Not providing enough context about the topic'],
    promptScore: score,
    qualityBreakdown: breakdown,
    category: input.category,
    targetModel: input.targetModel,
    createdAt: new Date().toISOString(),
  };
}

export async function improvePrompt(currentPrompt: string, instruction: string): Promise<string> {
  await new Promise(r => setTimeout(r, 800));
  if (instruction === 'shorter') return currentPrompt.split('\n').slice(0, 4).join('\n') + '\n\n[Condensed version with key points only]';
  if (instruction === 'more-detailed') return currentPrompt + '\n\n## Additional Detail\nExpand each section with specific examples, case studies, and implementation steps. Include timeline recommendations and resource requirements.';
  if (instruction === 'more-professional') return currentPrompt.replace(/##/g, '###') + '\n\n## Professional Standards\nEnsure all recommendations align with industry best practices. Include citations to authoritative sources where applicable. Format according to professional consulting standards.';
  if (instruction === 'add-examples') return currentPrompt + '\n\n## Examples\nInclude 2-3 concrete examples demonstrating different approaches. Each example should illustrate a unique angle or technique relevant to the prompt objective.';
  if (instruction === 'add-constraints') return currentPrompt + '\n\n## Additional Constraints\n- Keep responses under 500 words unless otherwise specified\n- Avoid hypothetical scenarios; use concrete data\n- Prioritize actionable recommendations over general advice\n- Include specific timelines where applicable';
  return currentPrompt + '\n\n[Improved based on: ' + instruction + ']';
}
