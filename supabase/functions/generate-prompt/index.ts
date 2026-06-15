import { handleOptions,jsonResponse } from '../_shared/cors.ts';
import { adminClient,requireEnv } from '../_shared/supabase.ts';
import type { PlanType,PromptGenerationInput,PromptGenerationResult,QualityBreakdown } from '../_shared/types.ts';

const DAILY_LIMITS: Record<PlanType, number> = {
  free: 2,
  starter: 10,
  pro: 67,
  unlimited: 99999,
};

function cleanString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function validateInput(body: unknown): PromptGenerationInput {
  const source = body as Record<string, unknown>;
  const goal = cleanString(source.goal);
  const category = cleanString(source.category) || 'Custom';
  const outputType = cleanString(source.outputType) || 'prompt';
  const targetModel = cleanString(source.targetModel) || 'general-ai';
  const language = cleanString(source.language) || 'English';

  if (!goal || goal.length < 3) throw new Error('Please provide a goal for your prompt.');
  if (goal.length > 4000) throw new Error('Goal is too long.');

  return {
    goal,
    category,
    outputType,
    targetModel: targetModel as PromptGenerationInput['targetModel'],
    language,
    context: cleanString(source.context),
    audience: cleanString(source.audience),
    tone: cleanString(source.tone),
    complexity: cleanString(source.complexity) as PromptGenerationInput['complexity'],
    industry: cleanString(source.industry),
    constraints: cleanString(source.constraints),
    avoid: cleanString(source.avoid),
    exampleInput: cleanString(source.exampleInput),
    exampleOutput: cleanString(source.exampleOutput),
    desiredLength: cleanString(source.desiredLength),
    brandVoice: cleanString(source.brandVoice),
    additionalInstructions: cleanString(source.additionalInstructions),
  };
}

function systemPrompt(): string {
  return [
    'You generate production-quality AI prompts for Verbito.',
    'Return only valid JSON matching the requested shape.',
    'Do not include markdown fences.',
    'Make the prompt specific, reusable, and safe for professional use.',
  ].join(' ');
}

function userPrompt(input: PromptGenerationInput): string {
  return JSON.stringify({
    task: 'Generate a complete prompt optimization result.',
    requiredShape: {
      finalPrompt: 'string',
      shortVersion: 'string',
      advancedVersion: 'string',
      whyItWorks: 'string',
      variables: ['string'],
      followUpPrompts: ['string'],
      bestModel: 'string',
      commonMistakes: ['string'],
      promptScore: 'number 0-100',
      qualityBreakdown: {
        clarity: 'number 0-100',
        context: 'number 0-100',
        specificity: 'number 0-100',
        constraints: 'number 0-100',
        outputFormat: 'number 0-100',
        reusability: 'number 0-100',
      },
    },
    input,
  });
}

function fallbackBreakdown(score: number): QualityBreakdown {
  return {
    clarity: score,
    context: Math.max(0, score - 8),
    specificity: Math.max(0, score - 5),
    constraints: Math.max(0, score - 12),
    outputFormat: Math.min(100, score + 3),
    reusability: Math.max(0, score - 7),
  };
}

function normalizeResult(raw: Record<string, unknown>, input: PromptGenerationInput): PromptGenerationResult {
  const score = typeof raw.promptScore === 'number' ? Math.max(0, Math.min(100, Math.round(raw.promptScore))) : 82;
  const breakdown = typeof raw.qualityBreakdown === 'object' && raw.qualityBreakdown
    ? raw.qualityBreakdown as QualityBreakdown
    : fallbackBreakdown(score);

  return {
    id: crypto.randomUUID(),
    finalPrompt: cleanString(raw.finalPrompt) || `Create a ${input.outputType} for: ${input.goal}`,
    shortVersion: cleanString(raw.shortVersion) || input.goal,
    advancedVersion: cleanString(raw.advancedVersion) || cleanString(raw.finalPrompt) || input.goal,
    whyItWorks: cleanString(raw.whyItWorks) || 'This prompt works because it defines a clear goal, context, constraints, and output expectations.',
    variables: Array.isArray(raw.variables) ? raw.variables.filter((item): item is string => typeof item === 'string') : [],
    followUpPrompts: Array.isArray(raw.followUpPrompts) ? raw.followUpPrompts.filter((item): item is string => typeof item === 'string') : [],
    bestModel: cleanString(raw.bestModel) || input.targetModel,
    commonMistakes: Array.isArray(raw.commonMistakes) ? raw.commonMistakes.filter((item): item is string => typeof item === 'string') : [],
    promptScore: score,
    qualityBreakdown: breakdown,
    category: input.category,
    targetModel: input.targetModel,
    createdAt: new Date().toISOString(),
  };
}

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;

  try {
    if (request.method !== 'POST') return jsonResponse(request, { error: 'Method not allowed' }, 405);

    const input = validateInput(await request.json());
    const supabase = adminClient();
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.replace(/^Bearer\s+/i, '');
    const anonymousId = request.headers.get('x-anonymous-id') || undefined;
    const { data: authData } = token ? await supabase.auth.getUser(token) : { data: { user: null } };
    const userId = authData.user?.id;

    if (!userId && !anonymousId) {
      return jsonResponse(request, { error: 'Anonymous usage id is required.' }, 400);
    }

    const today = new Date().toISOString().slice(0, 10);
    const { data: profile } = userId
      ? await supabase.from('profiles').select('plan_type').eq('id', userId).single()
      : { data: null };
    const planType = (profile?.plan_type || 'free') as PlanType;
    const dailyLimit = DAILY_LIMITS[planType] ?? DAILY_LIMITS.free;

    const usageQuery = supabase.from('prompt_usage_daily').select('*').eq('usage_date', today);
    const { data: usage } = userId
      ? await usageQuery.eq('user_id', userId).maybeSingle()
      : await usageQuery.eq('anonymous_id', anonymousId).maybeSingle();

    const used = usage?.generations_used || 0;
    if (used >= dailyLimit) {
      return jsonResponse(request, { error: 'Prompt generation limit reached for this plan.' }, 429);
    }

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${requireEnv('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: Deno.env.get('OPENAI_PROMPT_MODEL') || 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: systemPrompt() },
          { role: 'user', content: userPrompt(input) },
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
    });

    if (!openaiResponse.ok) {
      const detail = await openaiResponse.text();
      console.error('OpenAI generation failed', detail);
      return jsonResponse(request, { error: 'Prompt generation failed. Please try again.' }, 502);
    }

    const completion = await openaiResponse.json() as { choices?: Array<{ message?: { content?: string } }>; usage?: { total_tokens?: number } };
    const content = completion.choices?.[0]?.message?.content || '{}';
    const result = normalizeResult(JSON.parse(content) as Record<string, unknown>, input);

    if (usage?.id) {
      await supabase.from('prompt_usage_daily').update({
        generations_used: used + 1,
        updated_at: new Date().toISOString(),
      }).eq('id', usage.id);
    } else {
      await supabase.from('prompt_usage_daily').insert({
        user_id: userId,
        anonymous_id: anonymousId,
        usage_date: today,
        generations_used: 1,
      });
    }

    await supabase.from('prompt_generations').insert({
      user_id: userId,
      anonymous_id: anonymousId,
      category: input.category,
      goal: input.goal,
      context: input.context,
      target_model: input.targetModel,
      output_type: input.outputType,
      tone: input.tone,
      language: input.language,
      generated_prompt: result,
      prompt_score: result.promptScore,
      tokens_used: completion.usage?.total_tokens || null,
    });

    return jsonResponse(request, result);
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Prompt generation failed.';
    return jsonResponse(request, { error: message }, 400);
  }
});
