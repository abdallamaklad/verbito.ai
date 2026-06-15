export interface Prompt {
  id: number;
  slug: string;
  title: string;
  category: string;
  content: string;
  description: string;
  color: string;
}

export const promptCategories = [
  'Business', 'Marketing', 'Sales', 'Content Creation', 'Social Media', 'SEO',
  'Email Writing', 'Coding', 'Data Analysis', 'Education', 'Research',
  'Productivity', 'Automation', 'ChatGPT Prompts', 'Midjourney Prompts'
];

export const prompts: Prompt[] = [
  {
    id: 1,
    slug: 'business-plan-generator',
    title: 'Business Plan Generator',
    category: 'Business',
    color: 'bg-violet-500',
    description: 'Generate a comprehensive business plan for any industry.',
    content: `You are an experienced business strategist and venture capital consultant with 15+ years helping startups secure funding. Create a comprehensive business plan for a [INSERT BUSINESS TYPE] targeting [INSERT TARGET MARKET]. Include the following sections:

1. Executive Summary (250 words max) — compelling overview that hooks investors
2. Problem Statement — clearly define the pain point being solved
3. Solution Description — your product/service and how it solves the problem
4. Market Analysis — TAM/SAM/SOM breakdown with growth trends
5. Business Model — revenue streams, pricing strategy, unit economics
6. Competitive Analysis — key competitors and your differentiation
7. Go-to-Market Strategy — customer acquisition channels and CAC estimates
8. Financial Projections — 3-year revenue forecast with key assumptions
9. Team Requirements — critical hires and organizational structure
10. Funding Requirements — amount needed and use of funds breakdown

Tone: Professional, data-driven, persuasive. Use specific numbers and metrics wherever possible. Format with clear headers and bullet points for readability.`
  },
  {
    id: 2,
    slug: 'high-converting-ad-copy',
    title: 'High-Converting Ad Copy',
    category: 'Marketing',
    color: 'bg-rose-500',
    description: 'Create compelling ad copy for any platform.',
    content: `You are a senior copywriter at a top-performing digital marketing agency specializing in conversion optimization. Write high-converting ad copy for [INSERT PRODUCT/SERVICE] to run on [INSERT PLATFORM: Facebook/Google/TikTok/LinkedIn].

Create the following ad elements:

1. HEADLINE OPTIONS (5 variations):
   - Each under 10 words
   - Use power words that trigger emotional response
   - Include numbers or specific benefits where possible

2. PRIMARY TEXT (3 variations):
   - 125 characters (short), 250 characters (medium), 400 characters (long)
   - Hook the reader in the first line
   - Address the target audience's biggest pain point
   - Include social proof element
   - End with a clear call-to-action

3. CALL-TO-ACTION BUTTONS (5 options):
   - Action-oriented, specific, and urgent

4. DESCRIPTION TEXT (2 variations):
   - Under 40 characters each
   - Reinforce the main value proposition

Target audience: [DESCRIBE TARGET AUDIENCE]
Key benefit: [INSERT MAIN BENEFIT]
Tone: [INSERT TONE: Urgent/Exciting/Authoritative/Friendly]`
  },
  {
    id: 3,
    slug: 'sales-outreach-email-sequence',
    title: 'Sales Outreach Email Sequence',
    category: 'Sales',
    color: 'bg-emerald-500',
    description: 'A 5-email cold outreach sequence that gets replies.',
    content: `You are a sales development expert who has booked thousands of meetings through cold email. Write a 5-email outbound sequence for [INSERT PRODUCT/SERVICE] targeting [INSERT TARGET PERSONA] at [INSERT COMPANY TYPE/INDUSTRY].

EMAIL 1 (Day 1) — The Value-First Opener:
- Subject line under 45 characters, curiosity-driven
- No pitching in this email
- Lead with a relevant insight, statistic, or observation about their industry
- End with a soft question that invites response
- Keep under 120 words

EMAIL 2 (Day 3) — The Pattern Interrupt:
- Different subject line approach (direct/question format)
- Reference the first email briefly
- Share a 2-3 sentence case study or result
- One-line pitch of your solution
- Clear but low-friction CTA

EMAIL 3 (Day 6) — The Social Proof:
- Subject line mentioning a specific result
- Share a detailed customer success story relevant to their industry
- Specific metrics and outcomes
- CTA: 10-minute conversation

EMAIL 4 (Day 10) — The Breakup:
- Subject: "Should I close your file?" or similar
- Acknowledge they might be busy
- Briefly restate the value proposition
- Let them know this is your last email
- Make responding feel easy and low-pressure

EMAIL 5 (Day 14) — The Final Attempt:
- Shortest email in the sequence (under 60 words)
- Subject: "Quick question"
- One simple question that gets a yes/no response`
  },
  {
    id: 4,
    slug: 'blog-post-writer',
    title: 'SEO Blog Post Writer',
    category: 'Content Creation',
    color: 'bg-sky-500',
    description: 'Generate a complete SEO-optimized blog post.',
    content: `You are an expert SEO content writer with deep knowledge of search engine optimization and reader engagement. Write a comprehensive, SEO-optimized blog post on the topic: [INSERT TOPIC].

Requirements:
- Target keyword: [INSERT PRIMARY KEYWORD]
- Word count: 1,500-2,000 words
- Secondary keywords to include naturally: [LIST 3-5 RELATED KEYWORDS]
- Reading level: 8th grade (accessible but authoritative)

Structure:
1. TITLE: Compelling, under 60 characters, includes target keyword
2. META DESCRIPTION: Under 160 characters, compelling click-through
3. INTRODUCTION (150 words): Hook with a surprising statistic or question, preview what the reader will learn, promise a specific outcome
4. TABLE OF CONTENTS: H2 headings for easy navigation
5. BODY SECTIONS (4-6 H2 sections):
   - Each section 250-400 words
   - Include H3 subsections where appropriate
   - Use bullet points and numbered lists for scannability
   - Include one relevant statistic per section (cite format: "According to [Source]...")
   - Practical, actionable advice (not generic)
6. CONCLUSION: Summarize key takeaways, include a CTA
7. FAQ SECTION: 5 frequently asked questions with concise answers

Formatting: Use markdown headers, bold key phrases, include placeholder for an image every 400 words.`
  },
  {
    id: 5,
    slug: 'social-media-content-calendar',
    title: '30-Day Social Media Calendar',
    category: 'Social Media',
    color: 'bg-amber-500',
    description: 'A full month of social media posts for any brand.',
    content: `You are a social media strategist for a leading digital agency. Create a 30-day content calendar for [INSERT BRAND/INDUSTRY] targeting [INSERT TARGET AUDIENCE] on [INSERT PLATFORM: Instagram/LinkedIn/Twitter/TikTok].

For each day, provide:
- Day number and date
- Content pillar (Education/Entertainment/Engagement/Promotion)
- Post type (Carousel/Single Image/Reel/Story/Poll/Text)
- Caption (complete, ready-to-post)
- Hashtag set (5-8 relevant hashtags)
- CTA direction

Content distribution:
- 40% Educational (tips, how-tos, industry insights)
- 25% Engagement (questions, polls, interactive)
- 20% Entertainment (behind-the-scenes, trends, relatable content)
- 15% Promotional (product features, offers, testimonials)

Week 1 theme: Introduction and value establishment
Week 2 theme: Social proof and community building
Week 3 theme: Deep-dive educational content
Week 4 theme: Engagement and conversion focus

Brand voice: [DESCRIBE TONE: Playful/Professional/Inspirational/Casual]
Include 5 post ideas specifically designed to drive comments and shares.`
  },
  {
    id: 6,
    slug: 'seo-keyword-strategy',
    title: 'SEO Keyword Strategy',
    category: 'SEO',
    color: 'bg-indigo-500',
    description: 'Build a complete keyword strategy for any niche.',
    content: `You are an SEO specialist who has ranked hundreds of websites on page one of Google. Develop a comprehensive keyword strategy for a website in the [INSERT NICHE/INDUSTRY] targeting [INSERT GEOGRAPHIC LOCATION if relevant].

Deliverables:

1. PRIMARY KEYWORD (1 keyword):
   - High search volume (10K+ monthly)
   - Commercial or informational intent based on business goals
   - Difficulty score estimate and reasoning

2. SECONDARY KEYWORDS (10 keywords):
   - Medium search volume (1K-10K monthly)
   - Support the primary keyword topic cluster
   - Mix of informational and transactional intent

3. LONG-TAIL KEYWORDS (20 keywords):
   - Low competition, specific intent
   - Question-based phrases included
   - Voice search optimized where relevant

4. CONTENT CALENDAR (6 months):
   - Monthly topic themes
   - Specific article titles targeting keyword clusters
   - Recommended word counts
   - Internal linking structure

5. ON-PAGE SEO CHECKLIST:
   - Title tag formulas
   - Meta description templates
   - Header tag structure
   - Image alt text strategy
   - URL slug best practices

6. COMPETITOR ANALYSIS:
   - Top 3 ranking competitors for primary keyword
   - Their content gaps you can exploit
   - Backlink opportunity suggestions`
  },
  {
    id: 7,
    slug: 'newsletter-sequence',
    title: 'Email Newsletter Sequence',
    category: 'Email Writing',
    color: 'bg-violet-600',
    description: 'A 7-email welcome sequence that builds trust.',
    content: `You are an email marketing expert with a track record of 40%+ open rates. Write a 7-email welcome sequence for new subscribers to [INSERT BRAND/BUSINESS TYPE].

EMAIL 1 — The Welcome (send immediately):
- Subject: Welcome + deliver lead magnet
- Set expectations for email frequency
- Share the brand origin story briefly
- PS with a question to encourage reply

EMAIL 2 — The Value Bomb (Day 2):
- Subject line: "Your [result] in [timeframe]"
- Deliver massive value: a framework, template, or deep insight
- No selling, pure value
- Soft mention of your product/service at the end

EMAIL 3 — The Story (Day 4):
- Share a transformation story (customer or personal)
- Before/after format with specific details
- Connect the story to your methodology
- Subtle product mention

EMAIL 4 — The Education (Day 6):
- Address a common misconception in your industry
- Debunk myths with data and examples
- Position your approach as the better alternative
- Include a mini-case study

EMAIL 5 — The Social Proof (Day 8):
- Customer testimonial email
- 2-3 detailed testimonials with specific results
- "Join them" CTA to try your product/service

EMAIL 6 — The Offer (Day 10):
- Present your main offer
- Stack the value (bonuses, guarantees)
- Create gentle urgency
- Clear, single CTA

EMAIL 7 — The Final Call (Day 12):
- Address objections directly
- FAQ format
- Final opportunity framing
- Last-chance CTA`
  },
  {
    id: 8,
    slug: 'code-review-prompt',
    title: 'Code Review Assistant',
    category: 'Coding',
    color: 'bg-gray-700',
    description: 'Get expert code reviews for any programming language.',
    content: `You are a senior software engineer with 10+ years of experience in code review at top tech companies. Review the following [INSERT LANGUAGE] code as if this were a production pull request.

[PASTE CODE HERE]

Provide your review in the following structure:

1. OVERALL ASSESSMENT (2-3 sentences):
   - Code quality rating (1-10)
   - Is this production-ready?
   - Biggest strength and biggest concern

2. CRITICAL ISSUES (must fix before merge):
   - Security vulnerabilities
   - Performance bottlenecks
   - Logic errors or edge cases
   - Error handling gaps
   - For each: line reference, explanation, suggested fix

3. CODE QUALITY IMPROVEMENTS:
   - Naming conventions
   - Code organization and modularity
   - Documentation needs
   - Testing coverage assessment
   - DRY principle violations

4. PERFORMANCE OPTIMIZATION:
   - Time complexity analysis
   - Memory usage assessment
   - Database query optimization if applicable
   - Caching opportunities

5. BEST PRACTICES:
   - Language-specific idioms
   - Framework conventions
   - Industry standards compliance

6. POSITIVE FEEDBACK:
   - What was done well
   - Specific patterns or techniques to encourage

Format the review professionally as if providing feedback to a peer.`
  },
  {
    id: 9,
    slug: 'data-analysis-report',
    title: 'Data Analysis Report',
    category: 'Data Analysis',
    color: 'bg-sky-600',
    description: 'Turn raw data into actionable insights.',
    content: `You are a senior data analyst specializing in business intelligence. Analyze the following dataset and generate a comprehensive report.

Dataset: [DESCRIBE YOUR DATA OR PASTE SUMMARY STATISTICS]
Context: [WHAT BUSINESS QUESTION ARE YOU TRYING TO ANSWER?]

Please provide:

1. EXECUTIVE SUMMARY (1 paragraph):
   - Key findings in plain language
   - Top 3 actionable recommendations
   - Business impact estimate

2. DESCRIPTIVE ANALYSIS:
   - Dataset overview (size, time period, variables)
   - Key metrics and KPIs
   - Distribution analysis of primary variables
   - Notable patterns or anomalies

3. DIAGNOSTIC ANALYSIS:
   - Root cause analysis for key trends
   - Correlation between variables
   - Segment comparison (if applicable)
   - Statistical significance of findings

4. PREDICTIVE INSIGHTS:
   - Trend projections based on current data
   - Seasonal patterns identified
   - Risk factors and early warning indicators

5. PRESCRIPTIVE RECOMMENDATIONS:
   - Specific, numbered recommendations
   - Expected impact of each recommendation
   - Implementation priority (High/Medium/Low)
   - Resources required

6. DATA QUALITY ASSESSMENT:
   - Missing data analysis
   - Outlier identification
   - Recommendations for data collection improvements

Format with clear headers, bullet points, and include placeholder suggestions for charts and visualizations.`
  },
  {
    id: 10,
    slug: 'lesson-plan-generator',
    title: 'Lesson Plan Generator',
    category: 'Education',
    color: 'bg-emerald-600',
    description: 'Create detailed lesson plans for any subject.',
    content: `You are an experienced instructional designer and educator. Create a detailed lesson plan for [INSERT SUBJECT/TOPIC] for [INSERT GRADE LEVEL: Elementary/Middle/High School/University/Professional].

LESSON PLAN STRUCTURE:

1. LESSON OVERVIEW:
   - Title
   - Duration: [INSERT TIME]
   - Learning objectives (3-5 SMART objectives)
   - Prerequisites

2. STANDARDS ALIGNMENT:
   - Relevant educational standards
   - Skills students will develop

3. MATERIALS NEEDED:
   - Required materials list
   - Technology requirements
   - Preparation checklist

4. LESSON SEQUENCE:

   OPENING (10-15% of time):
   - Hook/attention grabber
   - Connection to prior knowledge
   - Learning objective preview

   DIRECT INSTRUCTION (15-20%):
   - Key concepts to explain
   - Visual aid suggestions
   - Check-for-understanding questions

   GUIDED PRACTICE (20-25%):
   - Activity description
   - Grouping strategy
   - Teacher facilitation notes
   - Common misconceptions to address

   INDEPENDENT PRACTICE (25-30%):
   - Individual activity details
   - Differentiation for struggling learners
   - Extension for advanced learners

   CLOSURE (10-15%):
   - Exit ticket question
   - Summary strategy
   - Preview of next lesson

5. ASSESSMENT:
   - Formative assessment strategies
   - Success criteria
   - Rubric for any assignments

6. DIFFERENTIATION:
   - Modifications for IEP/504 students
   - ELL support strategies
   - Enrichment opportunities`
  },
  {
    id: 11,
    slug: 'research-synthesis',
    title: 'Research Synthesis',
    category: 'Research',
    color: 'bg-indigo-600',
    description: 'Synthesize multiple research sources into a coherent summary.',
    content: `You are a research analyst with expertise in synthesizing complex information. Synthesize the following research sources on the topic: [INSERT TOPIC].

SOURCES TO SYNTHESIZE:
[PASTE SOURCE SUMMARIES, ABSTRACTS, OR KEY FINDINGS HERE — UP TO 5 SOURCES]

Please provide:

1. SYNTHESIS SUMMARY (300 words):
   - Integrate findings across all sources
   - Identify areas of agreement and consensus
   - Note contradictions or conflicting findings
   - Highlight gaps in the current research

2. KEY THEMES (3-5 themes):
   - Each theme with supporting evidence from multiple sources
   - Direct quote integration (simulated if needed)
   - Strength of evidence assessment

3. METHODOLOGY COMPARISON:
   - Research approaches used across sources
   - Sample sizes and demographics
   - Limitations of each study
   - Overall quality assessment

4. IMPLICATIONS:
   - Theoretical implications
   - Practical applications
   - Policy recommendations if applicable
   - Future research directions

5. CRITICAL ANALYSIS:
   - Biases to consider
   - Limitations of the current body of research
   - What questions remain unanswered

6. BIBLIOGRAPHY FORMAT:
   - Properly formatted references in [INSERT CITATION STYLE: APA/MLA/Chicago]
   - Ready for inclusion in a research paper`
  },
  {
    id: 12,
    slug: 'productivity-system',
    title: 'Personal Productivity System',
    category: 'Productivity',
    color: 'bg-amber-600',
    description: 'Design a custom productivity system for any role.',
    content: `You are a productivity coach who has helped executives, entrepreneurs, and creatives optimize their workflows. Design a complete productivity system for a [INSERT ROLE/PROFESSION] who struggles with [INSERT MAIN CHALLENGE: focus/time management/prioritization/overwhelm].

SYSTEM COMPONENTS:

1. DAILY STRUCTURE:
   - Ideal morning routine (first 2 hours)
   - Work block scheduling
   - Break intervals and micro-recoveries
   - End-of-day shutdown ritual
   - Evening routine for next-day preparation

2. TASK MANAGEMENT FRAMEWORK:
   - Prioritization method (Eisenhower Matrix / ABCDE / MoSCoW)
   - Daily planning template
   - Weekly review process
   - Monthly goal-setting ritual
   - Quarterly strategic review

3. FOCUS SYSTEM:
   - Deep work block scheduling
   - Environment design recommendations
   - Digital distraction management
   - Attention restoration strategies
   - Focus metrics to track

4. ENERGY MANAGEMENT:
   - Ultradian rhythm optimization
   - Task-energy matching framework
   - Recovery protocol for high-intensity days
   - Sleep and nutrition recommendations
   - Exercise integration

5. TOOL STACK:
   - Recommended apps and their specific uses
   - Automation opportunities
   - Integration workflow between tools
   - Free alternatives for each recommendation

6. IMPLEMENTATION ROADMAP:
   - Week 1: Foundation habits
   - Weeks 2-3: System building
   - Week 4: Optimization
   - Ongoing: Maintenance and iteration

Include specific time blocks, exact templates, and actionable steps. No generic advice — everything should be tailored to the specific role and challenge.`
  },
  {
    id: 13,
    slug: 'automation-workflow',
    title: 'Business Automation Workflow',
    category: 'Automation',
    color: 'bg-rose-600',
    description: 'Design automation workflows for repetitive business tasks.',
    content: `You are a business automation specialist. Design a complete automation workflow for [INSERT BUSINESS PROCESS] at a [INSERT COMPANY TYPE/SIZE].

WORKFLOW DESIGN:

1. PROCESS MAP:
   - Current state flowchart (step-by-step)
   - Identify all manual touchpoints
   - Time spent on each step
   - Error-prone areas
   - Bottleneck identification

2. AUTOMATION OPPORTUNITIES:
   - Tasks that can be fully automated
   - Tasks that can be partially automated
   - Tasks that should remain manual
   - ROI calculation for each automation

3. RECOMMENDED TECHNOLOGY STACK:
   - Primary automation platform (Zapier/Make/n8n)
   - Integration requirements
   - AI tools that can enhance the workflow
   - Cost estimates for the tech stack

4. STEP-BY-STEP AUTOMATION BUILD:
   - Trigger events
   - Data transformation steps
   - Conditional logic branches
   - Error handling and fallbacks
   - Notification and alerting setup

5. IMPLEMENTATION PLAN:
   - Phase 1: Quick wins (Week 1-2)
   - Phase 2: Core automation (Week 3-4)
   - Phase 3: Optimization (Week 5-6)
   - Testing protocol
   - Rollout strategy

6. SUCCESS METRICS:
   - Time saved per week/month
   - Error reduction percentage
   - Cost savings calculation
   - Employee satisfaction impact
   - Customer experience improvement

7. MAINTENANCE SCHEDULE:
   - Monthly review checklist
   - Quarterly optimization process
   - Annual audit recommendations`
  },
  {
    id: 14,
    slug: 'chatgpt-prompt-optimizer',
    title: 'Prompt Optimization Engine',
    category: 'ChatGPT Prompts',
    color: 'bg-gray-600',
    description: 'Transform any rough idea into an expert-level prompt.',
    content: `You are a prompt engineering expert. Take the following rough idea and transform it into a highly optimized prompt that will produce exceptional results from ChatGPT.

ROUGH IDEA: [INSERT YOUR IDEA]

Optimize this into a prompt that includes:

1. ROLE ASSIGNMENT:
   - Assign a specific expert persona
   - Include years of experience
   - Specify domain expertise

2. CONTEXT SETTING:
   - Relevant background information
   - Current situation or problem
   - Desired outcome

3. TASK SPECIFICATION:
   - Clear, unambiguous instructions
   - Step-by-step breakdown
   - Specific deliverables

4. FORMAT REQUIREMENTS:
   - Desired structure (bullet points/paragraphs/table)
   - Length constraints
   - Tone and style guidelines

5. CONSTRAINTS:
   - What to avoid
   - What to prioritize
   - Any limitations or boundaries

6. EXAMPLES (if applicable):
   - Provide 1-2 examples of desired output
   - Show both good and bad examples if helpful

Output the optimized prompt first, then briefly explain WHY each element was added and how it improves the output quality.`
  },
  {
    id: 15,
    slug: 'midjourney-photorealistic',
    title: 'Midjourney Photorealistic Prompt',
    category: 'Midjourney Prompts',
    color: 'bg-violet-700',
    description: 'Create stunning photorealistic images with Midjourney.',
    content: `Create a detailed Midjourney prompt for a photorealistic image of [INSERT SUBJECT].

Follow this structure for the prompt:

SUBJECT DESCRIPTION:
[Main subject] + [Action/Pose] + [Location/Environment]
Be extremely specific about physical features, clothing, expression, and posture.

LIGHTING:
Specify: time of day, light direction, light quality (soft/harsh/diffused), color temperature (warm/cool/neutral), and any special lighting effects.

CAMERA SETTINGS:
- Lens: (e.g., 85mm f/1.4, 35mm f/2.8, macro lens)
- Camera: (e.g., Canon EOS R5, Sony A7IV, medium format)
- Film stock: (e.g., Kodak Portra 400, Fujifilm Velvia)
- Depth of field: (shallow/deep)

COMPOSITION:
- Framing: (close-up/medium shot/wide shot/environmental)
- Angle: (eye-level/low angle/bird's eye)
- Rule of thirds or centered

ATMOSPHERE AND MOOD:
Describe the emotional tone: serene, dramatic, nostalgic, futuristic, etc.

STYLE REFERENCES:
Reference specific photographers, art movements, or visual styles if applicable.

TECHNICAL PARAMETERS:
Add at the end: --ar [aspect ratio] --s [stylize 50-750] --q [quality 1-2]

EXAMPLE OUTPUT FORMAT:
"[Detailed description], shot on [camera] with [lens], [lighting description], [composition details], [atmosphere], photorealistic, 8k, highly detailed --ar 16:9 --s 250"

Also provide 3 variation options with different moods/styles.`
  },
  {
    id: 16,
    slug: 'executive-summary',
    title: 'Executive Summary Writer',
    category: 'Business',
    color: 'bg-violet-500',
    description: 'Turn detailed reports into concise executive summaries.',
    content: `You are a management consultant who specializes in communicating complex information to busy executives. Transform the following information into a compelling executive summary.

SOURCE MATERIAL: [PASTE REPORT/ANALYSIS/DATA]

AUDIENCE: [INSERT: C-Suite/Board/Investors/Department Heads]

Create an executive summary with the following structure:

1. THE BOTTOM LINE (1-2 sentences):
   - The single most important takeaway
   - Stated in the very first line

2. CONTEXT (2-3 sentences):
   - Why this matters now
   - Background necessary for understanding

3. KEY FINDINGS (3-5 bullet points):
   - Most important data points
   - Each with supporting metric
   - Ordered by importance

4. IMPLICATIONS (2-3 sentences):
   - What these findings mean for the business
   - Risk and opportunity assessment

5. RECOMMENDATIONS (3 prioritized actions):
   - Specific, actionable recommendations
   - Each with expected impact
   - Implementation complexity (High/Medium/Low)

6. NEXT STEPS:
   - Immediate actions needed (this week)
   - Short-term follow-ups (this month)
   - Decision points requiring executive input

CONSTRAINTS:
- Total length: 400-600 words
- Use plain language, no jargon
- Every sentence must add value
- Include specific numbers, not vague generalizations
- Format for easy scanning (headers, bullets, bold key numbers)`
  },
  {
    id: 17,
    slug: 'competitor-analysis',
    title: 'Competitor Analysis Framework',
    category: 'Business',
    color: 'bg-violet-500',
    description: 'Deep-dive competitor analysis for any market.',
    content: `You are a competitive intelligence analyst at a top-tier strategy consulting firm. Conduct a comprehensive competitor analysis for [INSERT YOUR COMPANY/PRODUCT] against its main competitors in the [INSERT MARKET/INDUSTRY].

COMPETITORS TO ANALYZE: [LIST 3-5 COMPETITORS]

DELIVERABLES:

1. COMPETITOR PROFILES:
   For each competitor:
   - Company overview (founded, size, funding)
   - Target market and positioning
   - Key products/services
   - Pricing strategy
   - Distribution channels
   - Recent strategic moves

2. FEATURE COMPARISON MATRIX:
   - Side-by-side comparison of key features/capabilities
   - Your product vs. each competitor
   - Strengths and weaknesses highlighted
   - Gaps in the market identified

3. PRICING ANALYSIS:
   - Price positioning map
   - Value proposition comparison
   - Pricing model differences
   - Discount and promotion strategies

4. MARKETING STRATEGY ANALYSIS:
   - Messaging and positioning
   - Content strategy assessment
   - Channel mix
   - SEO and digital presence
   - Social media strategy

5. SWOT ANALYSIS:
   - Each competitor's strengths and weaknesses
   - Market opportunities they might be missing
   - Threats they pose to your business

6. STRATEGIC RECOMMENDATIONS:
   - 3 opportunities to differentiate
   - 2 defensive moves to consider
   - 1 potential partnership or acquisition target
   - Timeline for competitive response`
  },
  {
    id: 18,
    slug: 'landing-page-copy',
    title: 'Landing Page Copy Generator',
    category: 'Marketing',
    color: 'bg-rose-500',
    description: 'Complete landing page copy that converts visitors.',
    content: `You are a conversion copywriter who has generated over $50M in revenue through landing pages. Write complete landing page copy for [INSERT PRODUCT/SERVICE].

TARGET AUDIENCE: [DESCRIBE IDEAL CUSTOMER]
MAIN VALUE PROPOSITION: [INSERT CORE BENEFIT]
PRICE POINT: [INSERT PRICE OR RANGE]

SECTIONS TO WRITE:

1. ABOVE-THE-FOLD HERO:
   - Headline (under 10 words, includes primary benefit)
   - Subheadline (1-2 sentences expanding on the promise)
   - Primary CTA button text
   - Secondary CTA (if applicable)
   - Trust indicator below CTA (e.g., "Join 10,000+ users")

2. PROBLEM AGITATION:
   - The pain point your audience faces
   - Agitate the problem (why it's worse than they think)
   - Hint at the solution

3. SOLUTION INTRODUCTION:
   - Product/service introduction
   - How it solves the problem
   - Key differentiator

4. FEATURES AND BENEFITS (3-4 sections):
   - Each with: feature name, benefit-focused description, and supporting copy
   - Lead with benefits, support with features

5. SOCIAL PROOF:
   - 2-3 testimonial placeholders with specific results
   - Client logos section
   - Usage statistics

6. HOW IT WORKS:
   - 3-step process explanation
   - Simple and clear
   - Visual-friendly descriptions

7. PRICING SECTION:
   - Price anchoring
   - Value stacking
   - Guarantee mention

8. FAQ (5 questions):
   - Address common objections
   - Include pricing, support, and implementation questions

9. FINAL CTA SECTION:
   - Urgency element
   - Risk reversal (guarantee)
   - Strong CTA button

TONE: [INSERT: Professional/Conversational/Aggressive/Inspirational]`
  },
  {
    id: 19,
    slug: 'interview-questions',
    title: 'Interview Question Generator',
    category: 'Business',
    color: 'bg-violet-500',
    description: 'Role-specific interview questions for any position.',
    content: `You are an HR consultant specializing in talent acquisition. Create a comprehensive interview guide for the position of [INSERT JOB TITLE] at a [INSERT COMPANY TYPE/STAGE].

INTERVIEW STRUCTURE:

1. OPENING QUESTIONS (Rapport Building):
   - 3 warm-up questions
   - Questions about their journey and motivation
   - Ice-breakers relevant to the role

2. BEHAVIORAL QUESTIONS (6-8 questions):
   Using the STAR method format, create questions that assess:
   - Leadership experience
   - Conflict resolution
   - Adaptability to change
   - Collaboration and teamwork
   - Problem-solving under pressure
   - Failure and learning from mistakes
   - Customer/client orientation
   - Innovation and creativity

3. TECHNICAL/CASE QUESTIONS (4-5 questions):
   Role-specific scenarios:
   - [Create situational questions relevant to the specific role]
   - Include a mini case study or practical exercise
   - Questions that test depth of knowledge
   - Problem-solving methodology assessment

4. CULTURE FIT QUESTIONS (3-4 questions):
   - Alignment with company values
   - Work style preferences
   - Ideal work environment
   - Motivation and career goals

5. RED FLAGS TO WATCH FOR:
   - List 5 warning signs in candidate responses
   - Follow-up questions to probe concerns

6. SCORING RUBRIC:
   - Rating scale for each competency
   - Minimum threshold for advancement
   - Calibration guidelines

INTERVIEW LOGISTICS:
   - Recommended interview duration: [INSERT TIME]
   - Suggested panel composition
   - Take-home assignment (if applicable)`
  },
  {
    id: 20,
    slug: 'python-data-script',
    title: 'Python Data Processing Script',
    category: 'Coding',
    color: 'bg-gray-700',
    description: 'Generate Python scripts for data processing tasks.',
    content: `You are a Python expert specializing in data processing and automation. Write a complete, production-ready Python script for the following task:

TASK: [DESCRIBE WHAT THE SCRIPT SHOULD DO]

REQUIREMENTS:
- Python 3.10+
- Input: [DESCRIBE INPUT DATA FORMAT]
- Output: [DESCRIBE DESIRED OUTPUT]
- Error handling for edge cases
- Logging for debugging

CODE STRUCTURE:

1. IMPORTS AND SETUP:
   - Standard library imports
   - Third-party libraries (with pip install commands as comments)
   - Logging configuration
   - Type hints throughout

2. CONFIGURATION:
   - Constants at the top
   - Configurable parameters
   - Input/output path handling

3. CORE FUNCTIONS:
   - main() function as entry point
   - Modular, single-responsibility functions
   - Docstrings for each function
   - Input validation
   - Error handling with try/except

4. DATA PROCESSING LOGIC:
   - Step-by-step implementation
   - Comments explaining complex logic
   - Performance considerations
   - Memory-efficient processing for large datasets

5. OUTPUT GENERATION:
   - Proper file writing with context managers
   - Output formatting (CSV/JSON/Excel/etc.)
   - Success/failure reporting

6. ERROR HANDLING:
   - Graceful error messages
   - Partial failure handling (continue on non-critical errors)
   - Exit codes

7. TESTING NOTES:
   - Example input/output in comments
   - Edge cases to consider
   - Performance benchmarks

Include comments explaining WHY certain approaches were chosen, not just WHAT the code does.`
  },
  {
    id: 21,
    slug: 'investor-pitch-deck',
    title: 'Investor Pitch Deck Script',
    category: 'Business',
    color: 'bg-violet-500',
    description: 'Script for each slide of your investor pitch deck.',
    content: `You are a venture capital advisor who has helped startups raise over $500M. Write the narrative script for a 12-slide investor pitch deck for [INSERT COMPANY NAME], a [INSERT INDUSTRY] startup.

FOR EACH SLIDE, PROVIDE:
- Slide title
- Key message (1 sentence)
- Detailed talking points (what the founder should say)
- Visual recommendations (what should be on the slide)
- Common investor questions this slide might trigger

SLIDE-BY-SLIDE STRUCTURE:

SLIDE 1 — TITLE SLIDE:
- Company name, one-line description, contact info
- The 10-second hook

SLIDE 2 — THE PROBLEM:
- The pain point you're solving
- Make it visceral and relatable
- Market validation that this is a real problem

SLIDE 3 — YOUR SOLUTION:
- Product/service demonstration
- How it solves the problem uniquely
- The "aha" moment

SLIDE 4 — MARKET OPPORTUNITY:
- TAM/SAM/SOM with sources
- Market growth trajectory
- Why now is the right time

SLIDE 5 — BUSINESS MODEL:
- How you make money
- Unit economics overview
- Revenue projections (conservative and optimistic)

SLIDE 6 — TRACTION:
- Key metrics and milestones
- Growth rate
- Customer validation

SLIDE 7 — PRODUCT DEMO:
- Key features walkthrough
- Technology differentiation
- Roadmap highlights

SLIDE 8 — COMPETITIVE LANDSCAPE:
- Positioning map
- Sustainable competitive advantages
- Moat description

SLIDE 9 — GO-TO-MARKET:
- Customer acquisition strategy
- Channel mix
- Unit economics and payback period

SLIDE 10 — TEAM:
- Key team members and backgrounds
- Why this team wins
- Critical hires

SLIDE 11 — FINANCIALS:
- 3-5 year projections
- Key assumptions
- Path to profitability

SLIDE 12 — THE ASK:
- Amount raising
- Use of funds
- Milestones this round achieves
- Contact information

TONE: Confident, data-driven, visionary but grounded`
  },
  {
    id: 22,
    slug: 'customer-feedback-analysis',
    title: 'Customer Feedback Analysis',
    category: 'Data Analysis',
    color: 'bg-sky-600',
    description: 'Analyze customer feedback and extract actionable insights.',
    content: `You are a customer insights analyst specializing in turning feedback into actionable business strategies. Analyze the following customer feedback for [INSERT COMPANY/PRODUCT].

FEEDBACK TO ANALYZE:
[PASTE CUSTOMER REVIEWS, SUPPORT TICKETS, SURVEY RESPONSES]

ANALYSIS DELIVERABLES:

1. SENTIMENT OVERVIEW:
   - Overall sentiment breakdown (Positive/Neutral/Negative percentages)
   - Sentiment trend if data is time-series
   - Sentiment by category or source

2. THEME EXTRACTION:
   - Top 10 recurring themes
   - Frequency of each theme
   - Sentiment associated with each theme
   - Emerging themes (new in recent data)

3. PRAISE ANALYSIS:
   - What customers love most
   - Specific quotes representing each praise theme
   - Competitive advantages mentioned
   - Emotional language patterns

4. PAIN POINTS:
   - Top 10 complaints or issues
   - Severity rating (Critical/High/Medium/Low)
   - Frequency of each complaint
   - Impact on satisfaction/churn
   - Verbatim customer quotes

5. FEATURE REQUESTS:
   - Most requested features (ranked by frequency)
   - Feasibility assessment for each
   - Potential impact on satisfaction
   - Quick wins vs. strategic investments

6. COMPETITIVE MENTIONS:
   - Competitors mentioned
   - Comparison context (favorable/unfavorable)
   - Switching signals

7. ACTIONABLE RECOMMENDATIONS:
   - Immediate fixes (this sprint)
   - Short-term improvements (this quarter)
   - Strategic initiatives (this year)
   - Expected impact of each recommendation

8. VOICE OF CUSTOMER SUMMARY:
   - A narrative synthesis in the customer's voice
   - Key persona insights
   - Brand perception assessment`
  },
  {
    id: 23,
    slug: 'linkedin-personal-brand',
    title: 'LinkedIn Personal Brand Content',
    category: 'Social Media',
    color: 'bg-amber-500',
    description: 'Create a LinkedIn content strategy and ready-to-post content.',
    content: `You are a LinkedIn personal branding expert who has helped executives grow their following to 100K+. Create a personal branding content strategy for [INSERT NAME], a [INSERT TITLE/ROLE] in the [INSERT INDUSTRY].

CONTENT STRATEGY:

1. BRAND POSITIONING:
   - Core message and unique perspective
   - Target audience definition
   - Content pillars (3-4 main themes)
   - Voice and tone guidelines
   - Posting frequency recommendation

2. CONTENT CALENDAR (20 posts):
   Mix of formats:
   - 40% Thought Leadership (industry insights, contrarian takes)
   - 25% Storytelling (personal experiences, lessons learned)
   - 20% Educational (how-to's, frameworks, tips)
   - 15% Engagement (questions, polls, community building)

   For each post provide:
   - Post type
   - Complete ready-to-publish text
   - Hook (first line designed to stop the scroll)
   - 3 relevant hashtags
   - Best posting time
   - Engagement strategy (comments to seed)

3. HOOK TEMPLATES (10 formulas):
   - Copy-paste templates adapted for their industry
   - Proven high-engagement formats
   - Examples filled in for their niche

4. NETWORKING STRATEGY:
   - Who to connect with daily
   - Comment strategy for visibility
   - DM templates for warm outreach
   - Collaboration opportunities

5. PROFILE OPTIMIZATION:
   - Headline formula
   - About section template
   - Featured section recommendations
   - Background photo concept

6. GROWTH TACTICS:
   - Newsletter strategy
   - LinkedIn Live topic ideas
   - Document post templates
   - Carousel post outlines`
  },
  {
    id: 24,
    slug: 'grant-proposal-writer',
    title: 'Grant Proposal Writer',
    category: 'Business',
    color: 'bg-violet-500',
    description: 'Write compelling grant proposals for any funding opportunity.',
    content: `You are a professional grant writer with a 70%+ success rate securing funding. Write a compelling grant proposal for the following opportunity.

GRANT: [INSERT GRANT NAME/FUNDER]
PROJECT: [DESCRIBE YOUR PROJECT]
AMOUNT REQUESTED: [INSERT AMOUNT]

PROPOSAL SECTIONS:

1. EXECUTIVE SUMMARY (1 page):
   - Organization overview
   - Problem statement
   - Proposed solution
   - Expected outcomes
   - Amount requested
   - Why your team is uniquely qualified

2. STATEMENT OF NEED (2 pages):
   - Detailed problem description with data
   - Gap analysis (what's missing currently)
   - Target beneficiary demographics
   - Geographic scope
   - Evidence of community need
   - Why existing solutions are insufficient

3. PROJECT DESCRIPTION (3-4 pages):
   - Goals and objectives (SMART format)
   - Methodology and approach
   - Timeline with milestones
   - Key activities and deliverables
   - Innovation factor
   - Sustainability plan

4. ORGANIZATIONAL CAPACITY (1-2 pages):
   - Mission and history
   - Relevant past achievements
   - Team qualifications
   - Partnerships and collaborations
   - Financial stability evidence

5. BUDGET NARRATIVE:
   - Detailed budget breakdown
   - Justification for each line item
   - Matching funds or in-kind contributions
   - Cost-effectiveness argument
   - Multi-year budget if applicable

6. EVALUATION PLAN:
   - Success metrics and KPIs
   - Data collection methodology
   - Reporting schedule
   - Third-party evaluation if applicable

7. APPENDICES CHECKLIST:
   - Letters of support
   - Financial statements
   - 501(c)(3) documentation
   - Board of directors list
   - Relevant publications or media coverage

TONE: Professional, passionate, data-driven, and specific. Avoid generic statements. Every claim should be backed by evidence.`
  }
];
