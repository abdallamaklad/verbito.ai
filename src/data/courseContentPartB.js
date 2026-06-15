// ============================================================
// MASTER PROMPT ENGINEERING COURSE - PART B (Modules 6-10)
// Verbito.ai - Complete Course Content
// 25 Lessons Total | 5 Modules
// ============================================================

export const modulesB = [

  // ============================================================
  // MODULE 6 — TECHNICAL APPLICATIONS
  // ============================================================
  {
    module: 6,
    title: "Technical Applications",
    description: "Apply prompt engineering to development workflows including code generation, debugging, documentation, API integration, and automated testing. Transform how you write and maintain software.",
    lessons: [

      // ---------- LESSON 6.1 ----------
      {
        id: "6-1",
        title: "Code Generation & Review",
        duration: "13 min",
        content: `
<h3>The Developer Advantage</h3>
<p>AI-powered code generation has fundamentally changed software development. Studies show developers who effectively use AI coding assistants write code up to 55% faster while maintaining or improving quality. But the difference between mediocre and exceptional results comes down to one skill: prompt engineering. In this lesson, you will learn how to craft prompts that produce production-ready code, how to structure code review requests that catch real bugs, and how to use AI as a true senior development partner rather than a basic autocomplete tool.</p>

<h3>Why Code Generation Prompts Are Different</h3>
<p>Code generation prompts differ from general-purpose prompts because they must account for programming languages, frameworks, conventions, and architectural decisions. A well-crafted code prompt does not just ask for "code to do X" — it provides the full context a senior developer would need: the language and version, the framework, coding standards, performance constraints, error handling expectations, and integration points. The underlying mechanism is in-context learning: the model uses your specifications as constraints that narrow the vast space of possible code outputs to a small, high-quality subset.</p>

<p>The key insight is that LLMs trained on code (like GPT-4, Claude, and Gemini) have seen millions of codebases. When you provide specific architectural context, you are essentially pointing the model toward the right "neighborhood" of that training data. The more precise your directions, the closer the generated code aligns to production-quality patterns.</p>

<h3>Structuring Code Generation Prompts</h3>
<p>Follow this structure for consistent, high-quality code generation:</p>
<ul>
  <li><strong>Role Assignment:</strong> Start with a role that matches your need — "You are a senior Python developer specializing in async microservices."</li>
  <li><strong>Context Setting:</strong> Describe the codebase architecture, existing patterns, and relevant files.</li>
  <li><strong>Specific Requirements:</strong> List functional requirements, input/output formats, and edge cases.</li>
  <li><strong>Quality Constraints:</strong> Specify error handling, logging, type hints, documentation, and testing expectations.</li>
  <li><strong>Output Format:</strong> Request specific formatting — complete files, diff patches, or function blocks only.</li>
</ul>

<h3>Code Review Prompts</h3>
<p>For code review, the prompt must shift from generation to analysis. The best code review prompts ask the AI to evaluate specific dimensions: security vulnerabilities, performance bottlenecks, adherence to SOLID principles, test coverage, and potential edge cases. Treat the AI as a senior reviewer who needs both the code and the requirements context to give meaningful feedback.</p>

<div class="example-box">
  <h4>Example 1: Python API Endpoint</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Write a Python API for user registration."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a senior Python developer. Write a FastAPI endpoint for user registration at POST /api/v1/users/register. Requirements: (1) Accept email, password, and full_name fields with Pydantic validation, (2) Hash passwords using bcrypt with salt rounds=12, (3) Check for existing emails and return 409 Conflict if duplicate, (4) Store user in PostgreSQL using SQLAlchemy async session, (5) Return JWT access token on success with 201 status, (6) Include proper error handling, logging, and type hints. Use dependency injection for the database session. Include a docstring following Google style conventions."</div>
  <p><strong>Why this works:</strong> The improved prompt specifies the exact framework (FastAPI), route, HTTP method, validation library, security approach, database, error scenarios, response format, and code quality standards. The AI generates production-ready code that requires minimal modification.</p>
</div>

<div class="example-box">
  <h4>Example 2: React Component Generation</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Make a React form component."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a senior React/TypeScript developer. Create a reusable FormInput component with these specifications: (1) Props interface with label, name, type (text|email|password|number), placeholder, required, error, and onChange handler, (2) Use React Hook Form integration with register method, (3) Accessible ARIA labels and error message display, (4) Tailwind CSS styling with focus states and validation visual feedback (red border on error, green on valid), (5) Unit tests using React Testing Library covering rendering, user input, and error display, (6) Export as default with named prop types. Follow the project's existing pattern of co-locating tests in __tests__ folder."</div>
  <p><strong>Why this works:</strong> The prompt defines the component interface, integration patterns, accessibility requirements, styling approach, testing expectations, and project conventions. The result is a component that fits seamlessly into an existing codebase.</p>
</div>

<div class="example-box">
  <h4>Example 3: Code Review Request</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Review this code: [paste code]"</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a staff engineer conducting a code review. Review the following Node.js authentication middleware with these focus areas: (1) Security vulnerabilities — check for JWT secret handling, token validation, timing attacks, and injection risks, (2) Performance — identify blocking operations, unnecessary database queries, or memory leaks, (3) Error handling — ensure all errors are caught and logged without exposing sensitive information, (4) Edge cases — consider expired tokens, malformed headers, concurrent requests, and rate limiting bypasses, (5) Code quality — check for DRY violations, testability, and adherence to Express.js best practices. Provide specific line-by-line feedback with severity ratings (Critical/Warning/Suggestion) and suggest concrete fixes for each issue."</div>
  <p><strong>Why this works:</strong> Instead of a generic review request, this prompt establishes a senior reviewer persona and defines five specific evaluation dimensions with clear severity ratings. The AI produces actionable, prioritized feedback rather than vague generalizations.</p>
</div>

<h3>When to Use and When to Avoid</h3>
<p>Use AI code generation when: scaffolding new features, writing boilerplate, creating utility functions, generating tests, exploring implementation approaches, or learning unfamiliar patterns. Avoid it when: working with proprietary algorithms, handling sensitive cryptographic implementations, writing safety-critical systems, or when regulatory compliance requires full traceability of every line of code. Always review AI-generated code as you would a junior developer's pull request.</p>

<h3>Iterative Refinement Technique</h3>
<p>The most effective code generation happens through iteration. Start with a detailed initial prompt, review the output, then provide follow-up instructions: "Add input validation for the email field," "Refactor to use the Repository pattern," or "Add retry logic with exponential backoff." Each iteration layer improves the code quality while maintaining your architectural direction.</p>
        `,
        templates: [
          `You are a senior [LANGUAGE] developer specializing in [DOMAIN]. Write [COMPONENT TYPE] that [FUNCTIONAL DESCRIPTION]. Use [FRAMEWORK/LIBRARY] with [SPECIFIC PATTERNS]. Requirements: (1) [REQUIREMENT 1], (2) [REQUIREMENT 2], (3) [REQUIREMENT 3]. Include [ERROR HANDLING/LOGGING/TYPE HINTS/DOCUMENTATION] and follow [CODING STANDARDS].`,
          `You are a staff engineer conducting a code review. Review the following [LANGUAGE] [COMPONENT TYPE] focusing on: (1) Security vulnerabilities, (2) Performance bottlenecks, (3) Error handling completeness, (4) Edge cases, (5) Code quality and maintainability. Provide line-by-line feedback with severity ratings (Critical/Warning/Suggestion).`,
          `Refactor the following code to use [DESIGN PATTERN/ARCHITECTURE]. Maintain all existing functionality while improving: (1) [METRIC 1], (2) [METRIC 2]. Include unit tests to verify behavior is preserved.`
        ],
        keyTakeaways: [
          "Code generation prompts must specify language, framework, patterns, error handling, and quality standards for production-ready output",
          "Treat AI code review prompts like briefing a senior engineer — define evaluation dimensions and severity frameworks",
          "Iterative refinement produces better code than single-shot generation for complex components",
          "Always review AI-generated code for security, performance, and correctness before deploying to production",
          "The more architectural context you provide, the more the generated code fits your existing codebase patterns"
        ],
        practiceExercise: "Choose a recent coding task you completed. Write a detailed prompt that would have generated that code from scratch, including role assignment, context, requirements, and quality constraints. Then use that prompt with ChatGPT or Claude and compare the AI output to your original implementation. Document the gaps and refine your prompt accordingly."
      },

      // ---------- LESSON 6.2 ----------
      {
        id: "6-2",
        title: "Debugging & Troubleshooting",
        duration: "12 min",
        content: `
<h3>AI as Your Debugging Partner</h3>
<p>Debugging consumes up to 50% of development time. AI-assisted debugging can cut this dramatically — but only when you know how to feed the model the right information. This lesson teaches you a systematic approach to using AI for troubleshooting: how to structure error reports, what context to include, how to guide root cause analysis, and how to validate fixes before applying them. You will learn why most developers get poor debugging results (they paste an error message without context) and how to transform those results with structured troubleshooting prompts.</p>

<h3>The Debugging Information Hierarchy</h3>
<p>Effective debugging prompts follow a specific information hierarchy. The model needs: (1) the exact error message or unexpected behavior, (2) the relevant code context, (3) the environment details (language version, OS, dependencies), (4) what you have already tried, and (5) the expected vs actual behavior. Each layer reduces the solution space. The mechanism at work is similar to how a senior developer debugs — they ask clarifying questions until they narrow down the problem domain. By providing all five layers upfront, you eliminate the back-and-forth and get directly to root cause analysis.</p>

<h3>Root Cause Analysis Prompting</h3>
<p>The most powerful debugging technique is asking the AI to perform root cause analysis rather than just "fix the bug." This means prompting the model to: trace the execution flow, identify the assumptions that failed, explain the mechanism behind the error, and propose multiple fix strategies with trade-offs. This approach transforms the AI from a fix-generator into a debugging teacher — you learn the underlying issue while solving it.</p>

<div class="example-box">
  <h4>Example 1: Python Runtime Error</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Why is my Python code giving KeyError?"</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"I'm debugging a Python 3.11 application using pandas 2.0.3. The following code raises 'KeyError: timestamp' on line 47 when processing CSV files larger than 100MB:

[Include relevant code block here]

Error traceback:
[Include full traceback]

What I've tried: (1) Verified the column exists in the CSV header, (2) Checked for leading/trailing whitespace, (3) Tried df.columns = df.columns.str.strip(). The error only occurs intermittently (~30% of files).

Perform root cause analysis: trace the execution flow, identify why the KeyError occurs intermittently, explain the underlying mechanism, and propose 2-3 fix strategies with trade-offs."</div>
  <p><strong>Why this works:</strong> The improved prompt provides the full debugging context: Python version, library version, specific error, relevant code, complete traceback, attempted solutions, and the critical detail that the error is intermittent. It also asks for root cause analysis rather than just a fix, producing a more thorough and educational response.</p>
</div>

<div class="example-box">
  <h4>Example 2: React Performance Issue</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"My React app is slow. How do I fix it?"</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"I'm troubleshooting a React 18.2 application with a performance issue. Symptoms: (1) Initial render takes 4+ seconds on a list of 500 items, (2) Typing in the search filter has 500ms+ lag, (3) Chrome DevTools shows long-running scripting in the ItemCard component. Tech stack: React 18, no state management library (using useState/useContext), no virtualization library yet.

The component tree is: App > Dashboard > ItemList (500 items) > ItemCard (x500) > [Avatar, Badge, ActionMenu].

Analyze this step by step: (1) Identify the likely performance bottlenecks with reasoning, (2) Recommend specific optimizations prioritized by impact, (3) Show before/after code for the top 2 optimizations, (4) Suggest profiling tools to verify improvements."</div>
  <p><strong>Why this works:</strong> The prompt quantifies the performance problem (4 seconds, 500ms lag), provides the component architecture, specifies the tech stack, and asks for a structured analysis with prioritized recommendations and code examples. The step-by-step instruction forces methodical analysis.</p>
</div>

<div class="example-box">
  <h4>Example 3: Database Query Optimization</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"This SQL query is slow, make it faster: SELECT * FROM orders JOIN users..."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"I'm debugging a slow PostgreSQL 15 query in a Django 4.2 application. The query consistently takes 8-12 seconds and is called on every dashboard page load.

Query:
[Full EXPLAIN ANALYZE output]

Table sizes: orders (2.3M rows), users (150K rows), products (50K rows). Current indexes: orders_user_id_idx, orders_created_at_idx.

EXPLAIN ANALYZE shows: (1) Sequential scan on orders table (cost=0.00..45231), (2) Hash join with users taking 6.2s, (3) No index usage on the date range filter.

Analyze step by step: (1) Explain why the query planner chose a sequential scan over index usage, (2) Identify the specific conditions preventing index utilization, (3) Recommend index additions or query rewrites with expected performance impact, (4) Provide the optimized query and explain the changes."</div>
  <p><strong>Why this works:</strong> Database optimization requires specific execution data. This prompt includes the EXPLAIN ANALYZE output (critical for PostgreSQL tuning), table sizes, existing indexes, and specific observations about the query plan. It asks for a teaching-style analysis that explains the optimizer's behavior.</p>
</div>

<h3>Validating AI-Proposed Fixes</h3>
<p>Always validate debugging suggestions before applying them. Ask the AI: "Explain why this fix works," "What are the risks of this change," and "What could break if I apply this fix." For critical systems, request the AI to write a test case that reproduces the bug and verifies the fix. This validation step catches AI hallucinations — suggestions that look plausible but are technically incorrect.</p>

<h3>When NOT to Use AI for Debugging</h3>
<p>Avoid AI debugging for: production incidents requiring immediate hotfixes (use runbooks instead), security vulnerabilities (the context may expose sensitive data), complex distributed system failures (the context is too broad), or when error messages contain PII or credentials that should not leave your environment.</p>
        `,
        templates: [
          `I'm debugging a [LANGUAGE] [VERSION] application using [LIBRARY FRAMEWORK]. The following code raises '[EXACT ERROR]' on line [LINE NUMBER] when [CONDITION]:

[CODE]

Error traceback:
[TRACEBACK]

What I've tried: [LIST ATTEMPTS]

Perform root cause analysis: trace the execution flow, identify why this occurs [INTERMITTENTLY/UNDER CONDITION], explain the mechanism, and propose [N] fix strategies with trade-offs.`,
          `I'm troubleshooting [SYSTEM TYPE] with these symptoms: [LIST SYMPTOMS]. Tech stack: [STACK]. Architecture: [ARCHITECTURE DESCRIPTION].

Analyze step by step: (1) Identify likely bottlenecks with reasoning, (2) Recommend optimizations prioritized by impact, (3) Show before/after code for top [N] fixes, (4) Suggest verification methods.`,
          `Explain why this [LANGUAGE] fix works for [ERROR TYPE]: [PROPOSED FIX]. What are the risks? What could break? Write a test case that reproduces the bug and verifies the fix.`
        ],
        keyTakeaways: [
          "Effective debugging prompts include 5 layers: error message, code context, environment, attempted fixes, and expected vs actual behavior",
          "Ask for root cause analysis rather than just a fix — this produces better solutions and teaches you the underlying mechanism",
          "Always validate AI-proposed fixes by asking for explanations of why they work and what could break",
          "Quantify performance issues with specific numbers (seconds, milliseconds, throughput) for actionable optimization advice",
          "Never share error messages containing PII, credentials, or proprietary code with external AI services"
        ],
        practiceExercise: "Find a recent bug you solved (or an open source issue). Write a comprehensive debugging prompt following the 5-layer information hierarchy. Include the error, code context, environment, attempted solutions, and expected behavior. Ask the AI for root cause analysis and multiple fix strategies. Compare the AI's analysis to your actual solution."
      },

      // ---------- LESSON 6.3 ----------
      {
        id: "6-3",
        title: "Documentation Writing",
        duration: "12 min",
        content: `
<h3>Documentation That Actually Gets Read</h3>
<p>Documentation is the most neglected yet most impactful part of software projects. Poor documentation costs development teams an estimated 20-30% of their productive time. AI can transform this — but generic "write documentation for my code" prompts produce generic, unhelpful docs. In this lesson, you will learn how to generate documentation that is precise, audience-aware, and maintenance-friendly. We will cover API documentation, README files, inline comments, architecture decision records (ADRs), and user guides.</p>

<h3>The Audience-Aware Documentation Framework</h3>
<p>Great documentation starts with audience analysis. The same codebase requires different docs for different readers: API consumers need endpoint specs and authentication flows, new team members need architecture overviews and setup instructions, and maintainers need implementation details and design rationale. AI documentation prompts must specify the audience, their technical level, their goals, and the context in which they will read the docs. This audience-first approach is what separates useful documentation from filler text.</p>

<p>The underlying mechanism is straightforward but powerful: LLMs trained on technical documentation have learned distinct patterns for different doc types. When you specify "API reference documentation," the model activates patterns from OpenAPI specs, Stripe docs, and AWS documentation. When you specify "onboarding guide," it shifts to tutorial-style patterns with sequential instructions and conceptual explanations. Your prompt acts as a type selector.</p>

<h3>Generating API Documentation</h3>
<p>API documentation requires precision. The prompt should include: the code or schema to document, the documentation standard (OpenAPI, JSDoc, docstring conventions), the level of detail (summary vs. comprehensive), authentication details, and example requests/responses. Always request interactive elements: "Include a curl example for each endpoint" or "Provide a Postman collection snippet."</p>

<div class="example-box">
  <h4>Example 1: API Endpoint Documentation</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Document this API endpoint: POST /api/users"</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a technical writer for a developer-facing REST API. Generate comprehensive API documentation for the following endpoint following OpenAPI 3.0 conventions:

Endpoint: POST /api/v2/users/invite
Authentication: Bearer token (JWT), requires 'admin' role
Purpose: Send invitation emails to new team members

Request body schema:
{ email: string (required, valid email), role: enum ['viewer','editor','admin'] (default: 'viewer'), team_id: UUID (required), custom_message: string (optional, max 500 chars) }

Response schemas:
201: { id: UUID, email: string, status: 'pending', expires_at: ISO8601 }
400: { error: string, field: string, details: string[] }
409: { error: 'User already has access to this team' }
429: { error: 'Rate limit exceeded', retry_after: number }

Generate: (1) A concise endpoint description, (2) Request parameters table with types, constraints, and defaults, (3) All response schemas with example JSON payloads, (4) A curl example with realistic data, (5) Common error scenarios and how to handle them. Format as Markdown."</div>
  <p><strong>Why this works:</strong> The improved prompt specifies the documentation standard (OpenAPI 3.0), the audience (developers), authentication requirements, complete schemas for all status codes, and the exact output format desired. The AI produces copy-paste-ready documentation rather than vague descriptions.</p>
</div>

<div class="example-box">
  <h4>Example 2: README Generation</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Write a README for my Python project."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are writing a README.md for a Python data processing library called 'DataFlow' that is published on PyPI. Target audience: Python developers with intermediate experience who need to process large CSV/Parquet files efficiently.

Project details: (1) Python 3.9+ required, (2) Main features: streaming processing, automatic schema inference, parallel chunk processing, progress bars, (3) Install: pip install dataflow-processor, (4) Key classes: DataStream (main API), ChunkProcessor, SchemaValidator, (5) The library uses multiprocessing under the hood, (6) License: MIT, (7) Has 3.2K GitHub stars, actively maintained.

Structure the README with: (1) Project title and badges (PyPI version, Python versions, License, Stars), (2) One-paragraph description highlighting the main value proposition, (3) Installation section with pip and conda commands, (4) Quick Start section with a complete, runnable example that processes a CSV and shows output, (5) Key Features section with bullet points and brief descriptions, (6) Performance comparison table vs. pandas (include realistic numbers), (7) API overview with links to full docs, (8) Contributing guidelines link, (9) License. Use Markdown with proper heading hierarchy."</div>
  <p><strong>Why this works:</strong> This prompt provides the project context, target audience, technical specifications, installation details, and a precise structural outline. The result is a README that follows open-source best practices and includes specific, realistic content rather than placeholder text.</p>
</div>

<div class="example-box">
  <h4>Example 3: Architecture Decision Record (ADR)</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Write documentation about why we chose PostgreSQL."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a staff engineer writing an Architecture Decision Record (ADR) following the Nygard format. Document the decision to migrate from MongoDB to PostgreSQL for our e-commerce platform's order management system.

Context: (1) Current MongoDB deployment has 2.3M orders, (2) Engineering team of 12 backend developers, (3) Complex reporting queries are slow (5-30 seconds), (4) Data consistency issues with multi-document transactions, (5) Team has strong SQL expertise but limited MongoDB optimization experience.

Considered alternatives: (1) Stay with MongoDB and add read replicas, (2) Migrate to PostgreSQL, (3) Adopt a hybrid approach with CQRS, (4) Use Amazon Aurora PostgreSQL.

Decision: Migrate to self-hosted PostgreSQL 15 on AWS RDS.

Consequences: [Let AI fill in based on above].

Format with: Title, Status (Accepted), Context, Decision, Consequences (positive and negative), Compliance notes, and Related Decisions. Write in professional, concise technical prose."</div>
  <p><strong>Why this works:</strong> ADRs require a specific format and deep context. This prompt provides the decision context, alternatives considered, the final decision, and asks for both positive and negative consequences. The AI produces a document that serves as a permanent organizational memory.</p>
</div>

<h3>Inline Documentation and Code Comments</h3>
<p>For inline documentation, the prompt should specify the commenting style (JSDoc, Google docstrings, Rust docs), the level of detail, and what to emphasize. Request that complex algorithms include complexity annotations, that public APIs include usage examples, and that edge cases and invariants be documented. The key principle: comments should explain WHY, not WHAT — the code already shows what it does.</p>

<h3>Documentation Maintenance</h3>
<p>Documentation rots faster than code. Use AI to keep docs current by periodically prompting: "Review this README against the current codebase and identify outdated sections," or "Compare these API docs to the actual route handlers and list discrepancies." This maintenance-focused prompting catches drift before it confuses users.</p>
        `,
        templates: [
          `You are a technical writer for [AUDIENCE]. Generate [DOC TYPE] documentation for [SUBJECT] following [STANDARD] conventions. Include: (1) [SECTION 1], (2) [SECTION 2], (3) [SECTION 3]. Format as [FORMAT]. Target technical level: [BEGINNER/INTERMEDIATE/ADVANCED].`,
          `You are a staff engineer writing an Architecture Decision Record following the [FORMAT] format. Document the decision to [DECISION SUMMARY]. Context: [CONTEXT]. Considered alternatives: [ALTERNATIVES]. Decision: [FINAL DECISION]. Format with: Title, Status, Context, Decision, Consequences (positive and negative).`,
          `Review this [DOCUMENT TYPE] against the following [CODE/IMPLEMENTATION] and identify outdated sections, missing documentation for new features, and inaccuracies. Provide a prioritized list of updates needed with suggested revisions.`
        ],
        keyTakeaways: [
          "Documentation prompts must specify the audience, their technical level, and their goals — audience-aware docs are 10x more useful",
          "Different documentation types activate different learned patterns in the LLM — always specify doc type and format standard",
          "API documentation requires complete schemas, authentication details, and realistic examples for all status codes",
          "ADRs and technical decision docs should include alternatives considered and both positive and negative consequences",
          "Use AI for documentation maintenance by periodically prompting it to compare docs against current implementations"
        ],
        practiceExercise: "Choose a project you have worked on (or an open-source project). Write a comprehensive prompt to generate a complete README.md following the structure taught in this lesson. Include project details, target audience, features, installation, quick-start example, and performance data. Generate the README, then critically evaluate it against README best practices and refine your prompt."
      },

      // ---------- LESSON 6.4 ----------
      {
        id: "6-4",
        title: "API Integration Patterns",
        duration: "13 min",
        content: `
<h3>Connecting Systems with AI Assistance</h3>
<p>API integration is one of the most common — and most error-prone — tasks in modern development. Every integration involves understanding authentication flows, request/response formats, error handling, rate limiting, and data transformation. AI can dramatically accelerate this work, but only when you provide the right integration context. This lesson covers how to prompt AI for API client code, webhook handling, SDK design, error recovery strategies, and multi-API orchestration.</p>

<h3>The Integration Context Pattern</h3>
<p>API integration prompts require a unique context pattern. Unlike general code generation, integration work exists at the boundary between systems. The prompt must describe BOTH systems: the source API (its documentation, authentication, rate limits, quirks) and your application (its architecture, existing HTTP client, error handling patterns). This dual-context approach produces integration code that fits seamlessly into your codebase while correctly handling the external API's requirements.</p>

<p>The mechanism is contextual grounding. APIs have specific conventions — REST uses HTTP verbs and status codes, GraphQL uses a single endpoint with query bodies, SOAP uses XML envelopes. When you specify the API type and provide documentation references, the model grounds its response in the correct protocol patterns from its training data.</p>

<h3>Authentication Handling</h3>
<p>Authentication is where most integrations fail. Your prompts must specify the exact auth mechanism: API keys (header vs. query parameter), OAuth 2.0 flows (client credentials, authorization code, PKCE), JWT tokens (how to acquire, refresh, and cache), or custom schemes. Always ask for credential management — how to store, rotate, and handle expired credentials securely.</p>

<div class="example-box">
  <h4>Example 1: REST API Client Wrapper</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Write code to call the Stripe API to create a payment."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a senior backend developer. Create a Python client wrapper for the Stripe API that will be used in a FastAPI application. Requirements:

(1) Authentication: Use Stripe secret key from environment variable STRIPE_SECRET_KEY, validate key presence on startup
(2) Payment Intent creation: POST /v1/payment_intents with amount (cents, int), currency (str, default 'usd'), customer_id (optional str), metadata (optional dict). Convert amount to cents if passed as dollars
(3) Error handling: Map Stripe error types (card_error, rate_limit_error, api_error) to custom exceptions (StripeCardError, StripeRateLimitError, StripeAPIError) with retry logic for rate limits using exponential backoff (max 3 retries)
(4) Logging: Log all API calls with method, endpoint, status code, and request ID; mask sensitive data in logs
(5) Async support: Use httpx.AsyncClient for all requests
(6) Testing: Include a mock-based unit test using pytest and respx
(7) Type hints: Full typing with dataclasses for request/response models

Provide the complete client class, custom exceptions, Pydantic models, and test file. Follow Google-style docstrings."</div>
  <p><strong>Why this works:</strong> The prompt specifies the exact API (Stripe), the auth mechanism, endpoint details, error mapping with custom exceptions, retry strategy, logging requirements, async patterns, and testing approach. It asks for a complete, production-ready integration rather than a simple API call.</p>
</div>

<div class="example-box">
  <h4>Example 2: GraphQL Integration</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"How do I use GraphQL in my app?"</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are integrating a Shopify GraphQL Admin API into a Node.js/TypeScript inventory management system. Create a complete integration module:

Context:
- Shopify GraphQL Admin API endpoint: https://{shop}.myshopify.com/admin/api/2024-01/graphql.json
- Authentication: Shopify Admin API access token via X-Shopify-Access-Token header
- The application uses a pool of 3 shop connections, each with different shop domains and tokens

Requirements:
(1) Create a ShopifyGraphQLClient class that accepts shopDomain and accessToken, uses fetch with timeout (30s default)
(2) Implement a product query: fetch product by ID with fields: id, title, description, variants (id, price, inventory_quantity), status
(3) Implement inventory update mutation: adjust inventory level by delta at a specific location with idempotency key
(4) Error handling: Handle GraphQL errors (userErrors array), HTTP errors, and network timeouts distinctly
(5) Rate limiting: Shopify allows 2 requests/second for Admin API — implement token bucket rate limiting
(6) Include TypeScript interfaces for all query variables and response shapes
(7) Write a test using nock to mock the GraphQL endpoint

Provide the complete client, types, example queries/mutations as const strings, and tests."</div>
  <p><strong>Why this works:</strong> GraphQL integration prompts need the endpoint, auth method, query/mutation shapes, error handling (which differs from REST), and rate limiting specifics. This prompt provides all of that plus the multi-tenant context (3 shops) that affects connection management.</p>

<div class="example-box">
  <h4>Example 3: Webhook Handler with Signature Verification</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Write a webhook handler for Stripe."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a security-conscious backend developer. Create a production-ready Stripe webhook handler for a Django 4.2 application that processes payment events.

Requirements:
(1) Endpoint: POST /webhooks/stripe/ — receive Stripe webhook events
(2) Signature verification: Verify Stripe-Signature header using webhook signing secret (STRIPE_WEBHOOK_SECRET env var). Use stripe.Webhook.construct_event() with timestamp tolerance of 300 seconds. Reject requests with invalid signatures using 400 response
(3) Event handling: Process these events with idempotency (check event ID in processed_events cache): payment_intent.succeeded → update order status to 'paid', send confirmation email; payment_intent.payment_failed → update order to 'failed', send failure notification; invoice.paid → update subscription next billing date
(4) Idempotency: Store processed event IDs in Redis with 24h TTL, return 200 for duplicate events
(5) Error handling: Return 200 for unhandled event types (don't retry); return 500 for processing errors (Stripe will retry); log all events with event ID, type, and processing result
(6) Async processing: For payment_intent.succeeded, queue email sending via Celery task (mock the task)
(7) Testing: Write tests mocking Stripe signature verification and testing each event type + duplicate handling

Provide the Django view, URL config, event handler functions, and complete test suite."</div>
  <p><strong>Why this works:</strong> Webhook handlers are security-critical. This prompt emphasizes signature verification, idempotency, proper HTTP status codes, async processing, and comprehensive testing. The event-specific handling with clear retry semantics ensures the integration behaves correctly under Stripe's webhook delivery model.</p>
</div>

<h3>Multi-API Orchestration</h3>
<p>When integrating multiple APIs, the prompt must describe the orchestration flow: which calls are sequential vs. parallel, how errors in one service affect the others, and how to maintain consistency across distributed calls. Request circuit breaker patterns, saga patterns for transactions, and clear fallback strategies.</p>

<h3>Testing API Integrations</h3>
<p>Always ask for mock-based tests. Integration tests that call real APIs are slow, flaky, and can hit rate limits. The prompt should specify the mocking library (nock, responses, WireMock) and ask for tests that verify: successful paths, each error type, timeout handling, and retry behavior.</p>
        `,
        templates: [
          `You are a senior backend developer. Create a [LANGUAGE] client wrapper for the [API NAME] [REST/GraphQL/SOAP] API for use in [FRAMEWORK CONTEXT]. Authentication: [AUTH METHOD]. Endpoints needed: [LIST]. Error handling: [ERROR STRATEGY]. Include: [TYPE HINTS/LOGGING/RETRY/TESTS].`,
          `You are a security-conscious developer. Create a production-ready webhook handler for [SERVICE] webhooks in [FRAMEWORK]. Requirements: (1) Signature verification using [METHOD], (2) Event handling for: [EVENT TYPES], (3) Idempotency via [MECHANISM], (4) Error responses: [RETRY SEMANTICS], (5) Async processing for [OPERATIONS]. Include complete tests.`,
          `Design an API integration orchestration for [FLOW DESCRIPTION] involving [API 1], [API 2], and [API 3]. Specify: (1) Sequential vs. parallel call patterns, (2) Error handling and rollback strategy, (3) Circuit breaker configuration, (4) Data transformation between formats, (5) Observability (logging, metrics, tracing).`
        ],
        keyTakeaways: [
          "API integration prompts must describe both the external API (auth, endpoints, quirks) and your application context (framework, patterns)",
          "Authentication handling is where integrations fail — always specify auth mechanism, credential management, and token refresh",
          "Webhook handlers require signature verification, idempotency, and proper HTTP status semantics for retry behavior",
          "Multi-API orchestration prompts should specify sequential vs. parallel flows, error handling, and consistency strategies",
          "Always request mock-based tests with your integration code — they verify behavior without hitting real APIs"
        ],
        practiceExercise: "Choose an API you have integrated with (or pick one from RapidAPI's free tier). Write a comprehensive prompt for a client wrapper following the integration context pattern. Include the API type, authentication, key endpoints, error handling strategy, retry logic, and testing approach. Generate the code and write a brief evaluation of its production readiness."
      },

      // ---------- LESSON 6.5 ----------
      {
        id: "6-5",
        title: "Testing & QA Automation",
        duration: "12 min",
        content: `
<h3>Testing at Machine Speed</h3>
<p>Testing is the safety net of software development — and it is often the most tedious part. AI can generate test cases, property-based tests, edge case scenarios, and even entire test suites. But the quality of AI-generated tests depends entirely on how well you communicate what needs testing, what the boundaries are, and what quality standards to apply. This lesson teaches you how to prompt AI for comprehensive, meaningful test coverage across unit, integration, and end-to-end testing.</p>

<h3>The Testing Prompt Framework</h3>
<p>A well-structured testing prompt includes: (1) the code under test, (2) the testing framework and version, (3) the types of tests needed (unit, integration, property-based, e2e), (4) coverage targets, (5) specific edge cases and boundary conditions, and (6) mocking requirements. This framework ensures the generated tests are not just syntactically correct but actually validate the behavior that matters.</p>

<p>The mechanism is specification-driven generation. When you provide the function signature, input constraints, and expected behavior, the model generates assertions that verify the contract. When you add edge cases (empty inputs, maximum values, nulls), the model creates boundary tests. The quality of your test prompt directly determines the quality of your test coverage.</p>

<h3>Generating Unit Tests</h3>
<p>Unit test prompts should ask for: happy path tests, boundary value tests, error condition tests, and parameterized tests for data-driven scenarios. Always specify the assertion style (assertEqual vs. assert equals) and whether to use fixtures, setup/teardown, or beforeEach/afterEach patterns.</p>

<div class="example-box">
  <h4>Example 1: Comprehensive Unit Test Suite</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Write tests for this function."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a QA engineer writing comprehensive unit tests. Generate a complete pytest test suite for the following Python function:

Function: calculate_discount(price: float, discount_code: str, user_tier: str) -> float

Business logic:
- Valid discount codes: 'SAVE10' (10% off), 'SAVE20' (20% off, requires user_tier='premium'), 'WELCOME' (15% off, max price $100)
- User tiers: 'basic', 'premium', 'enterprise'. Enterprise gets additional 5% off any discount
- Minimum price after discount: $1.00 (never go below)
- Invalid discount_code returns original price with warning log
- Price must be positive float, else raise ValueError

Generate tests covering:
(1) Happy path: each valid discount code with basic tier
(2) Boundary values: price = 0.01, price = 999999.99, price = 1.00, price = 100.00
(3) Premium tier tests: SAVE20 valid for premium, invalid for basic
(4) Enterprise tier: additional 5% off stacked correctly
(5) Invalid inputs: negative price, zero price, empty discount code, None discount code
(6) Edge cases: SAVE20 with enterprise tier, price exactly at minimum threshold, very large prices
(7) Warning log verification for invalid codes (use pytest caplog)

Use pytest fixtures for common setup, parametrize where appropriate, and follow Given-When-Then comments. Target: 12+ test cases with descriptive names."</div>
  <p><strong>Why this works:</strong> The prompt provides the function signature, complete business logic rules, specific discount codes and their conditions, user tier interactions, a minimum price constraint, and a detailed test plan with 7 categories. It specifies pytest features (fixtures, parametrize, caplog) and a target test count. The result is a thorough test suite that covers the specification.</p>
</div>

<div class="example-box">
  <h4>Example 2: Integration Test with Database</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Write integration tests for my API."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a backend QA engineer. Write integration tests for a Node.js/Express user registration API endpoint using Jest and Supertest. The API uses PostgreSQL via Sequelize ORM.

Endpoint: POST /api/v1/auth/register
Database: Test database 'app_test' that is migrated fresh before each test run

Test scenarios:
(1) Successful registration: Valid email, password (8+ chars, 1 uppercase, 1 number), username. Expect 201, user in DB with hashed password, JWT cookie set
(2) Duplicate email: Register with same email twice. Expect 409 on second attempt, only one DB record
(3) Validation errors: Missing email → 400 with {field: 'email', message: 'required'}; weak password → 400 with password requirements; invalid email format → 400
(4) Database transaction: If email sending fails (mocked), user should NOT be committed to DB
(5) Password hashing: Verify stored password is hashed with bcrypt (not plaintext)
(6) Rate limiting: More than 5 requests/minute from same IP → 429

Setup: Use jest --runInBand for sequential tests. Before each: sync database, truncate users table. After all: close DB connection.

Include test database config, helper functions for API calls, and mock for email service. All tests should be independent."</div>
  <p><strong>Why this works:</n> Integration tests need setup/teardown, database state management, and cross-cutting concerns (rate limiting, transactions). This prompt specifies the test database, the exact endpoint, expected status codes, database assertions, error response shapes, transaction behavior, and test isolation requirements.</p>
</div>

<div class="example-box">
  <h4>Example 3: End-to-End Test with Playwright</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Write a test for my login page."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a QA automation engineer. Write a Playwright end-to-end test suite for a React application's authentication flow.

Application: React 18 SPA with React Router, backend API at http://localhost:3001
Test framework: Playwright with @playwright/test

Test scenarios:
(1) Successful login: Navigate to /login, enter valid credentials (test@example.com / TestPass123), click login, expect redirect to /dashboard, verify 'Welcome back' toast notification appears, verify localStorage has auth_token
(2) Failed login: Enter wrong password, expect 'Invalid credentials' error message, verify still on /login, no token in localStorage
(3) Validation: Submit empty form → inline errors for both fields; invalid email format → email field error
(4) Remember me: Check 'Remember me', login, close browser, reopen → still authenticated; uncheck → not remembered
(5) Logout: From /dashboard, click user menu → Logout, expect redirect to /login, token removed
(6) Protected routes: Direct navigation to /dashboard while unauthenticated → redirect to /login with ?redirect=/dashboard

Use page object model: create LoginPage and DashboardPage classes with selectors and actions. Use test fixtures for authenticated state. Run tests in parallel (fullyParallel: true). Include screenshots on failure."</div>
  <p><strong>Why this works:</strong> E2E tests require DOM interaction details, navigation flows, state verification (localStorage, URL), and cross-scenario dependencies (login state for logout). This prompt specifies the app architecture, exact test steps with assertions, the page object model pattern, and Playwright configuration.</p>
</div>

<h3>Property-Based Testing</h3>
<p>Beyond example-based tests, AI can generate property-based tests that verify invariants hold across random inputs. Prompt for Hypothesis (Python) or fast-check (JS) tests that verify properties like "sorting never decreases list length" or "encryption roundtrip preserves data." These tests catch edge cases you would never think to write manually.</p>

<h3>Test Quality Indicators</h3>
<p>Evaluate AI-generated tests against these quality indicators: independence (no test depends on another), determinism (same result every run), coverage of both happy paths and error paths, meaningful assertions (not just checking for 200 OK), and realistic test data (not "foo" and "bar" everywhere). If the generated tests fall short, prompt for specific improvements.</p>
        `,
        templates: [
          `You are a QA engineer. Generate a complete [PYTEST/JEST/VITEST] test suite for [FUNCTION/COMPONENT/ENDPOINT]. Business logic: [RULES]. Cover: (1) Happy paths, (2) Boundary values: [VALUES], (3) Error conditions: [ERRORS], (4) Edge cases: [SCENARIOS]. Use [FIXTURES/PARAMETRIZE/MOCKS]. Target: [N]+ test cases.`,
          `You are a QA automation engineer. Write [PLAYWRIGHT/CYPRESS/SELENIUM] E2E tests for [FEATURE FLOW]. Application: [TECH STACK]. Test scenarios: [LIST WITH EXPECTED RESULTS]. Use [PAGE OBJECT MODEL/GIVEN-WHEN-THEN]. Include setup/teardown and cross-browser configuration.`,
          `Generate property-based tests using [HYPOTHESIS/FAST-CHECK] for [FUNCTION]. Verify these invariants: [LIST PROPERTIES]. Include custom generators for [COMPLEX INPUTS] and shrink demonstrations for failures.`
        ],
        keyTakeaways: [
          "Testing prompts must specify the code under test, framework, test types, coverage targets, and specific edge cases",
          "Unit test prompts should ask for happy paths, boundary values, error conditions, and parameterized data-driven tests",
          "Integration test prompts need database setup/teardown, state management, and cross-cutting concern verification",
          "E2E test prompts require DOM interactions, navigation flows, state verification, and the page object model pattern",
          "Evaluate AI-generated tests for independence, determinism, meaningful assertions, and realistic test data"
        ],
        practiceExercise: "Take a function from a project you're working on (or a standard library function). Write a comprehensive testing prompt that includes the function signature, business logic, boundary values, error conditions, and edge cases. Specify your testing framework and ask for 10+ test cases. Generate the tests and measure the coverage against your manual test suite."
      }
    ]
  },


  // ============================================================
  // MODULE 7 — PRODUCTIVITY SYSTEMS
  // ============================================================
  {
    module: 7,
    title: "Productivity Systems",
    description: "Build AI-powered personal productivity systems for email, communication, meetings, research, and accelerated learning. Turn AI into your daily executive assistant.",
    lessons: [

      // ---------- LESSON 7.1 ----------
      {
        id: "7-1",
        title: "Building Personal AI Workflows",
        duration: "9 min",
        content: `
<h3>Your AI Operating System</h3>
<p>The most productive professionals in 2025 do not use AI as a chatbot — they use it as an operating system for their work. A personal AI workflow is a repeatable, prompt-driven system that handles recurring tasks with minimal human intervention. This lesson teaches you how to design, build, and maintain these workflows across your professional life. You will learn the workflow design framework, how to chain multiple prompts into pipelines, and how to create decision trees that route work to the right AI process.</p>

<h3>The Workflow Design Framework</h3>
<p>Every effective AI workflow follows a four-stage framework: (1) Input Processing — how information enters the system (paste, upload, voice, API), (2) Transformation — the AI operations performed on that input (summarize, rewrite, analyze, generate), (3) Decision Routing — conditional logic that determines what happens next based on AI output, and (4) Output Delivery — where the result goes (clipboard, email, document, database, notification). Mastering this framework means you can automate any recurring knowledge task.</p>

<p>The underlying principle is computational delegation. Tasks that follow a pattern — even complex ones — can be encoded as workflows. The AI handles the variable parts (the specific content), while you define the invariant structure (the process). This is the same principle that made spreadsheets revolutionary: you define the formula once, and it processes infinite inputs.</p>

<h3>Chaining Prompts into Pipelines</h3>
<p>Single prompts solve single tasks. Real workflows require chaining: the output of one prompt becomes the input of the next. For example, a content creation pipeline might be: Research → Outline → Draft → Edit → Format. Each stage has its own prompt template, and the handoff between stages must be carefully designed to preserve context and quality.</p>

<div class="example-box">
  <h4>Example 1: Daily Briefing Workflow</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Summarize my emails and tell me what's important."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are my executive assistant preparing my daily morning briefing. I will paste my calendar events, unread emails, and Slack messages. Process them in this order:

STAGE 1 - Calendar Analysis:
- List today's meetings with start times
- Flag any conflicts or back-to-back meetings without breaks
- For each meeting, suggest one relevant preparation question

STAGE 2 - Communication Prioritization:
- Categorize emails and messages by: [Urgent/Important/ FYI]
- Urgent = requires my action today, Important = requires action this week, FYI = no action needed
- For each Urgent item, draft a 2-sentence response I can send

STAGE 3 - Daily Briefing Document:
Compile everything into a briefing with this structure:
--- TODAY'S PRIORITIES ---
[Ordered list of 3-5 top priorities with rationale]
--- MEETING PREP ---
[Meetings with prep questions]
--- URGENT RESPONSES ---
[Draft replies for urgent items]
--- LOOKING AHEAD ---
[Deadlines or commitments in the next 3 days]

Format: Clean Markdown with emoji indicators (🚨 Urgent, ⭐ Important, 📢 FYI). Keep under 500 words."</div>
  <p><strong>Why this works:</strong> The prompt defines a three-stage pipeline with specific processing rules for each stage, clear categorization criteria (what makes something Urgent vs. Important), a structured output format, and even includes the response drafting as part of the workflow. The explicit structure ensures consistent, actionable briefings every day.</p>
</div>

<div class="example-box">
  <h4>Example 4: Content Repurposing Pipeline</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Turn my blog post into a Twitter thread."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a content marketing automation system. I will paste a long-form article. Execute this 4-stage repurposing pipeline:

STAGE 1 - Extract Key Points:
Identify: (1) The main thesis, (2) 5-7 key supporting points with specific data or quotes, (3) The most surprising or counterintuitive insight, (4) One actionable takeaway readers can implement today

STAGE 2 - Generate Twitter/X Thread:
- Hook tweet: controversial or curiosity-provoking question under 280 chars
- 8-10 tweet thread: each tweet focuses on one key point, include 1-2 relevant statistics
- Final tweet: CTA with link placeholder [LINK]
- Add /n line breaks between tweets for easy copy-paste

STAGE 3 - Generate LinkedIn Post:
- Professional tone with first-person perspective
- 150 words max, 3 paragraphs
- Include one question to drive engagement
- Add 3 relevant hashtags

STAGE 4 - Generate Email Newsletter Blurb:
- Casual, conversational tone
- 100 words max
- Tease the content without giving everything away
- Include a 'Read the full article →' link placeholder

Output: Clearly label each section with === TWITTER THREAD ===, === LINKEDIN ===, === NEWSLETTER === separators."</div>
  <p><strong>Why this works:</strong> This prompt defines a complete content repurposing pipeline with 4 stages, each producing a different output format from the same source. It specifies format constraints (character counts, paragraph counts), tone differences per platform, and clear output separators. The workflow transforms one input into four platform-optimized outputs.</p>
</div>

<div class="example-box">
  <h4>Example 3: Decision Support Workflow</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Should I hire this candidate? Here's their resume."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a structured decision-support system. I need to evaluate a job candidate. Guide me through a systematic evaluation using this workflow:

STEP 1 - Criteria Extraction:
I will paste the job description. Extract: (1) Required technical skills, (2) Preferred/nice-to-have skills, (3) Experience level required, (4) Key responsibilities, (5) Cultural indicators from the JD language

STEP 2 - Resume Mapping:
I will paste the candidate's resume. For each criterion from Step 1, rate: Strong Match / Partial Match / No Match. Include specific evidence from the resume for each rating.

STEP 3 - Gap Analysis:
List: (1) Must-have gaps that are dealbreakers, (2) Nice-to-have gaps that could be addressed with training, (3) Red flags or concerns, (4) Unique strengths this candidate brings beyond the JD requirements

STEP 4 - Structured Recommendation:
Provide: (1) Overall fit score (0-100), (2) Confidence level (High/Medium/Low), (3) Clear Hire / Consider / Pass recommendation with reasoning, (4) Suggested interview focus areas to validate or address concerns, (5) Questions to ask in the interview

Format: Use a decision matrix table for Steps 2-3. Keep reasoning evidence-based, not speculative."</div>
  <p><strong>Why this works:</strong> Decision workflows benefit enormously from structure. This prompt creates a systematic evaluation framework that extracts criteria, maps evidence, identifies gaps, and produces a structured recommendation. The explicit scoring and confidence levels force calibrated thinking rather than gut reactions.</p>
</div>

<h3>Building Reusable Workflow Templates</h3>
<p>The highest-leverage productivity move is creating reusable workflow templates. Save your best workflow prompts as templates with fill-in-the-blank variables. For example, a weekly report workflow template might have [WEEK DATE RANGE], [KEY METRICS], and [PROJECT UPDATES] as variables. Each week, you fill in the variables and run the same workflow. Over time, you build a personal library of automation that handles your recurring work.</p>

<h3>Workflow Maintenance and Evolution</h3>
<p>Workflows degrade over time as your needs change. Every month, review your active workflows: Which ones saved time? Which produced low-quality output? Which were abandoned? Update the prompts for workflows you keep, and archive those that no longer serve you. This maintenance habit ensures your AI productivity system improves continuously.</p>
        `,
        templates: [
          `You are my [ROLE] assistant. I will provide [INPUT TYPE]. Execute this workflow:
STAGE 1 - [PROCESS]: [INSTRUCTIONS]
STAGE 2 - [PROCESS]: [INSTRUCTIONS]  
STAGE 3 - [PROCESS]: [INSTRUCTIONS]
Output format: [FORMAT SPECIFICATION].`,
          `You are a structured decision-support system. I need to evaluate [DECISION]. Guide me through:
STEP 1 - Criteria Extraction from [SOURCE]
STEP 2 - Evidence Mapping and Rating
STEP 3 - Gap Analysis
STEP 4 - Structured Recommendation with score and confidence level`,
          `Execute this content repurposing pipeline on the article I paste:
STAGE 1 - Extract: thesis, key points, surprising insight, actionable takeaway
STAGE 2 - Format for [PLATFORM 1] with [CONSTRAINTS]
STAGE 3 - Format for [PLATFORM 2] with [CONSTRAINTS]
STAGE 4 - Format for [PLATFORM 3] with [CONSTRAINTS]`
        ],
        keyTakeaways: [
          "Effective AI workflows follow a 4-stage framework: Input Processing → Transformation → Decision Routing → Output Delivery",
          "Chain multiple prompts into pipelines where the output of one stage becomes the input of the next",
          "Save your best workflow prompts as reusable templates with fill-in-the-blank variables",
          "Decision workflows benefit from structured criteria extraction, evidence mapping, and gap analysis",
          "Review and update your workflows monthly — they degrade as your needs evolve"
        ],
        practiceExercise: "Identify a recurring task in your work that takes 15+ minutes each time (e.g., weekly status reports, meeting prep, email triage). Design a 3-stage AI workflow prompt to automate it. Test the workflow with real inputs, measure the time saved vs. doing it manually, and refine the prompt based on output quality."
      },

      // ---------- LESSON 7.2 ----------
      {
        id: "7-2",
        title: "Email & Communication",
        duration: "9 min",
        content: `
<h3>The Inbox Zero Revolution</h3>
<p>Email consumes an average of 3.1 hours per day for knowledge workers. AI-assisted communication can cut this by 60-70% while improving quality. This lesson covers how to use prompt engineering for email drafting, response generation, tone adjustment, follow-up sequences, and communication strategy. You will learn how to write prompts that produce emails people actually want to read — clear, appropriate, and effective.</p>

<h3>The Communication Context Framework</h3>
<p>Every communication prompt needs five context layers: (1) Recipient — who they are, your relationship, their communication style, (2) Purpose — what you want the reader to do, know, or feel after reading, (3) Tone — the emotional register appropriate for the context, (4) Constraints — length limits, required elements, things to avoid, and (5) Urgency — how quickly a response is needed and what happens if delayed. This framework ensures AI-generated emails hit the right note every time.</p>

<p>The mechanism is persona-conditioned generation. When you specify the recipient as "a C-suite executive I've never met," the model activates formal, concise, value-first communication patterns. When you specify "my direct report who needs encouragement," it shifts to supportive, detailed, growth-oriented language. The recipient descriptor acts as a personality selector for the output.</p>

<h3>Email Drafting with AI</h3>
<p>For drafting emails, provide the AI with bullet points of what you need to communicate, not a rough draft. The AI excels at converting structured thoughts into polished prose, but struggles to improve rambling drafts. Give it the raw ingredients — key points, desired outcome, recipient context — and let it compose from scratch.</p>

<div class="example-box">
  <h4>Example 1: Cold Outreach Email</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Write an email to a potential client about my marketing services."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a business development professional writing a cold outreach email. Context:

Recipient: VP of Marketing at a B2B SaaS company (50-200 employees). Found their profile on LinkedIn, they posted about struggling with lead quality from paid channels.

Sender: Me — founder of a performance marketing consultancy, 8 years experience, previously scaled a SaaS company's pipeline by 340% in 18 months.

Goal: Get a 15-minute discovery call to discuss their lead quality challenges.

Requirements:
- Subject line: Under 50 characters, create curiosity without being clickbait
- Opening: Reference their specific LinkedIn post about lead quality (show I did my research)
- Value: Share one specific, actionable insight about B2B lead qualification they can implement this week (no charge, no strings attached)
- CTA: Soft ask for a brief call — frame it as 'sharing what worked for similar companies'
- Tone: Professional but conversational, not salesy or desperate
- Length: Under 150 words
- P.S.: Include a relevant statistic about B2B lead quality trends in 2025

Write 3 subject line options and 1 email body."</div>
  <p><strong>Why this works:</strong> The prompt provides recipient research context, sender credibility, a specific goal, and detailed formatting requirements including the strategic P.S. line (which often gets the highest read rate). It asks for multiple subject lines so the user can A/B test.</p>
</div>

<div class="example-box">
  <h4>Example 2: Difficult Conversation — Project Delay</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Write an email telling my boss the project is delayed."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a senior project manager communicating a project delay to executive stakeholders. Context:

Situation: The customer portal redesign project will miss its June 1 deadline. New estimated completion: June 22 (3 weeks late).

Root cause: Third-party authentication integration (Okta) took 2x longer than estimated due to undocumented API changes. The vendor's documentation did not match the current API version.

Impact: The marketing campaign launch tied to the portal must be rescheduled. Customer onboarding for the new feature is delayed.

Mitigation: (1) We've added a second senior developer to the integration, (2) Daily standup with Okta's technical account manager, (3) The core portal functionality (non-auth features) can still deploy June 1 for internal QA

Audience: CTO — direct, data-oriented, appreciates proactive problem-solving and hates surprises

Write an email that:
- Leads with the new timeline (don't bury the bad news)
- Takes ownership without being defensive
- Explains root cause briefly and factually
- Presents the mitigation plan with clear ownership
- Offers a decision point: deploy core features June 1 or wait for full release
- Under 200 words, professional tone, no excessive apologizing"</div>
  <p><strong>Why this works:</strong> Difficult conversations require emotional intelligence that AI can support through good prompting. This prompt provides the situation, root cause, impact, mitigations, and the recipient's personality. It explicitly instructs to lead with the news, own the problem, and avoid excessive apologizing — common mistakes in delay communications.</p>
</div>

<div class="example-box">
  <h4>Example 3: Tone Adaptation — Same Message, Three Audiences</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Write an email about the new expense policy."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are the Head of Operations announcing a new expense reimbursement policy. The key facts are:

- Reimbursement cap raised from $200 to $500 per transaction
- Digital receipt photos now accepted (previously required physical receipts)
- Same-day reimbursement for amounts under $100 (previously 5-7 business days)
- New policy effective Monday, June 1st
- Submit via the Workday portal under 'Expenses' tab

Write this email in 3 versions for different audiences:

VERSION A — Executive Team (C-suite):
Focus on: Strategic rationale (competitive talent market, employee satisfaction), compliance implications, budget impact summary. Tone: Brief, executive-summary style with bullet points.

VERSION B — Department Managers:
Focus on: How to communicate to their teams, handling edge cases (pre-approved exceptions, client entertainment), monitoring team adoption. Tone: Practical, managerial, includes FAQ section.

VERSION C — All Employees:
Focus on: What's changing, how to use the new system, examples of what's now possible (team lunch, conference tickets, home office equipment). Tone: Enthusiastic, supportive, includes step-by-step guide with screenshots description.

Each version should be self-contained — employees should not need to see the executive version to understand the policy."</div>
  <p><strong>Why this works:</strong> This prompt demonstrates audience-conditioned generation at scale. By providing the same facts but different audience descriptors, goals, and tone instructions, you get three completely different but factually consistent communications. This technique is invaluable for internal communications, product announcements, and change management.</p>
</div>

<h3>Follow-Up and Sequence Prompts</h3>
<p>Communication often requires sequences, not single messages. Prompt AI to create follow-up sequences: "Write a 3-email follow-up sequence for a prospect who downloaded our whitepaper but hasn't responded to our initial outreach. Space emails 3 days apart. Each email should provide new value, not just 'checking in.'" Sequence prompts should specify the timing, the value progression, and the exit condition (when to stop following up).</p>

<h3>Communication Best Practices with AI</h3>
<p>Always review AI-generated emails before sending. Check for: factual accuracy (the AI may hallucinate details), tone appropriateness (does it sound like you?), recipient-specific references (are names and details correct?), and any unintended implications. The AI is your drafting partner, not your autopilot.</p>
        `,
        templates: [
          `You are a [ROLE] writing a [EMAIL TYPE] to [RECIPIENT DESCRIPTION]. Context: [BACKGROUND]. Goal: [DESIRED OUTCOME]. Tone: [TONE]. Requirements: [LENGTH/SPECIFIC ELEMENTS/THINGS TO AVOID].`,
          `You are communicating [CHANGE/ANNOUNCEMENT] to [AUDIENCE]. Key facts: [LIST]. Write [N] versions for: [AUDIENCE 1] (focus: [FOCUS], tone: [TONE]), [AUDIENCE 2] (focus: [FOCUS], tone: [TONE]).`,
          `Write a [N]-email follow-up sequence for [SITUATION]. Space emails [TIMING]. Each email must provide new value about [TOPIC]. Include: Email 1 [GOAL], Email 2 [GOAL], Email 3 [GOAL]. CTA for each: [ACTION]. Exit condition: [WHEN TO STOP].`
        ],
        keyTakeaways: [
          "Every communication prompt needs 5 context layers: recipient, purpose, tone, constraints, and urgency",
          "Provide bullet points of key messages rather than rough drafts — AI excels at structuring, not editing rambling text",
          "Audience-conditioned generation produces radically different outputs from the same facts — use this for multi-audience communications",
          "Follow-up sequences should specify timing, value progression, and exit conditions",
          "Always review AI-generated emails for accuracy, tone, and recipient-specific details before sending"
        ],
        practiceExercise: "Think of 3 emails you need to write this week. For each, identify the 5 context layers (recipient, purpose, tone, constraints, urgency). Write detailed prompts for each email using the framework from this lesson. Generate the emails, then critically evaluate: Which one needed the most revision? What was missing from that prompt? Refine and regenerate."
      },

      // ---------- LESSON 7.3 ----------
      {
        id: "7-3",
        title: "Meeting Summaries & Notes",
        duration: "9 min",
        content: `
<h3>From Meeting Minutes to Actionable Intelligence</h3>
<p>The average knowledge worker attends 15-25 meetings per week. Most meeting notes are incomplete, delayed, and rarely referenced. AI-powered meeting summarization transforms raw transcripts into structured, actionable intelligence — but only when you know how to prompt for the right output format. This lesson covers how to generate executive summaries, extract action items with owners and deadlines, identify decisions and their rationale, and create follow-up communications from meeting content.</p>

<h3>The Meeting Intelligence Framework</h3>
<p>Meeting content contains multiple layers of information: (1) What was discussed — topics and key points, (2) What was decided — decisions with context and rationale, (3) What must happen next — action items with owners and deadlines, (4) What was unresolved — open questions and parking lot items, and (5) Who needs to know — stakeholders who should be informed. A great meeting summary prompt extracts all five layers and formats them for different consumption patterns.</p>

<p>The mechanism is structured information extraction. Meeting transcripts are unstructured text. The AI must parse this text, identify entities (people, dates, topics), classify statements (discussion, decision, action, question), and assign attributes (owner, priority, deadline). The prompt structure guides this extraction by defining the categories and format upfront.</p>

<h3>Input Sources for Meeting Summaries</h3>
<p>Meeting summary prompts can accept: raw transcripts (from Zoom, Teams, or Otter.ai), bullet-point notes you took during the meeting, a combination of both (your notes for context + transcript for completeness), or meeting recordings processed through Whisper. Always specify the input format so the AI knows what to expect and how to handle artifacts like timestamps, speaker labels, and transcription errors.</p>

<div class="example-box">
  <h4>Example 1: Executive Summary from Transcript</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Summarize this meeting transcript."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are an executive assistant preparing meeting intelligence from a transcript. I will paste a transcript from a 45-minute product strategy meeting with 6 participants.

Process the transcript and produce 3 output sections:

=== EXECUTIVE SUMMARY (for leadership) ===
- 3-4 sentences capturing the meeting's purpose, key decisions, and overall outcome
- Include any budget or timeline implications mentioned
- Note any escalations or requests for executive input

=== DECISION LOG ===
Create a table with columns: Decision | Context/Rationale | Approved By | Implications
- Include every decision made, even small ones
- For each decision, explain the 'why' based on discussion in the transcript
- Flag any decisions where consensus was not clear

=== ACTION ITEMS ===
Create a table with columns: Action Item | Owner | Deadline | Priority (High/Medium/Low) | Dependencies
- Extract every commitment made, even informal ones ('I'll look into that')
- If deadline not explicitly stated, infer from context or mark as 'TBD'
- Flag any action items without a clear owner

Input format: The transcript has [Speaker Name]: [Text] format with timestamps. Ignore timestamps. If speaker names are unclear, note this."</div>
  <p><strong>Why this works:</strong> The prompt requests three distinct output formats from the same input: a narrative summary for leadership, a structured decision log for reference, and an action item tracker for execution. The table formats make the output scannable and actionable. Explicit instructions about handling timestamps and unclear speakers prevent confusion.</p>
</div>

<div class="example-box">
  <h4>Example 2: Action Item Extraction with Follow-Up Drafts</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"What are the action items from this meeting?"</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a project coordinator extracting and operationalizing action items from a team standup meeting. I will paste my raw notes.

Extract all action items and produce:

PART 1 — Action Item Matrix:
For each action item, provide:
- Task description (rewrite as a clear, actionable statement starting with a verb)
- Owner (the person who committed to it)
- Deadline (explicit or inferred. If inferred, mark with * and explain reasoning)
- Priority (High = blocks others, Medium = important but not blocking, Low = nice to have)
- Status blocker (any dependency or obstacle mentioned)

PART 2 — Follow-Up Email Draft:
Write a follow-up email to all meeting participants that:
- Opens with the meeting purpose and date
- Lists the top 3 most important action items with owners and deadlines
- Includes the full action item matrix as an attachment summary
- Has a section 'Decisions Made' with 2-3 key decisions
- Closes with the next meeting date/time if mentioned
- Tone: Professional, concise, under 250 words

PART 3 — Slack/Teams Update:
Write a brief update for the team channel (under 100 words) highlighting what was accomplished and what's happening next. Include @mentions for action item owners.

Flag any action items where the owner seemed uncertain or where deadlines seemed unrealistic."</div>
  <p><strong>Why this works:</strong> This prompt goes beyond extraction to operationalization — it produces the action items AND the follow-up communications. The priority classification framework (blocking vs. important vs. nice-to-have) helps teams focus. The flagging of uncertain commitments catches soft 'maybe' commitments that often fall through cracks.</p>
</div>

<div class="example-box">
  <h4>Example 3: Multi-Meeting Synthesis</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Summarize these three meetings."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a Chief of Staff synthesizing three related meetings over the past two weeks. I will paste summaries from:
- Meeting 1 (Jan 3): Q1 Planning — Product team
- Meeting 2 (Jan 8): Resource Allocation — Engineering + Finance
- Meeting 3 (Jan 10): Executive Review — Leadership team

Produce a synthesis document:

THEME 1 — Evolving Decisions:
Identify any decisions that changed across meetings. Show the progression: what was initially proposed → what was debated → what was finalized. Include who influenced the change.

THEME 2 — Cross-Meeting Dependencies:
Map connections between meetings. Example: The Q1 roadmap decision in Meeting 1 depends on the hiring approval from Meeting 2, which was contingent on the budget revision from Meeting 3.

THEME 3 — Outstanding Questions:
List questions that were raised in one meeting but not answered, especially if they block decisions in other meetings.

THEME 4 — Accountability Map:
Create a table: Person | Commitments Across All Meetings | Potential Conflicts/Overload
- Flag anyone with more than 3 high-priority commitments
- Flag anyone whose commitments across meetings conflict

THEME 5 — Recommended Next Steps:
Based on the synthesis, recommend: (1) What needs to happen before the next meeting cycle, (2) Who should be in the room for key decisions, (3) What pre-work will make the next meetings more productive."</div>
  <p><strong>Why this works:</strong> Multi-meeting synthesis is a high-value executive function. This prompt structures the synthesis around five analytical themes that reveal patterns no single-meeting summary could capture. The accountability map and conflict detection are especially valuable for resource planning.</p>
</div>

<h3>Handling Different Meeting Types</h3>
<p>Different meetings need different summary approaches. A 1:1 needs personal action items and relationship notes. A standup needs blockers and cross-team dependencies. A board meeting needs strategic decisions and risk discussions. A brainstorming session needs idea categorization and feasibility assessment. Adapt your prompt structure to the meeting type for best results.</p>

<h3>Privacy and Confidentiality</h3>
<p>Meeting transcripts often contain sensitive information: financial data, personnel discussions, strategic plans, and competitive intelligence. Before uploading transcripts to AI services, verify: (1) your company's AI usage policy, (2) whether the service processes data in your region, (3) if the service retains or trains on your data, and (4) whether you should redact sensitive portions. When in doubt, use self-hosted models or enterprise AI platforms with data protection guarantees.</p>
        `,
        templates: [
          `You are an executive assistant preparing meeting intelligence from a [MEETING TYPE] transcript. Process the transcript and produce: (1) Executive Summary (3-4 sentences), (2) Decision Log (table: Decision | Rationale | Approved By), (3) Action Items (table: Task | Owner | Deadline | Priority). Input format: [TRANSCRIPT FORMAT].`,
          `You are a project coordinator. Extract action items from meeting notes and produce: (1) Action Item Matrix with rewritten task descriptions, (2) Follow-up email draft to participants, (3) Slack update with @mentions. Flag uncertain commitments and unrealistic deadlines.`,
          `You are a Chief of Staff synthesizing [N] related meetings. Identify: (1) Evolving decisions across meetings, (2) Cross-meeting dependencies, (3) Outstanding blocking questions, (4) Accountability map with overload/conflict detection, (5) Recommended next steps and pre-work.`
        ],
        keyTakeaways: [
          "Meeting transcripts contain 5 layers of information: discussion, decisions, actions, open questions, and stakeholders to inform",
          "Request multiple output formats from the same input: narrative summary, decision log table, and action item matrix",
          "Multi-meeting synthesis reveals patterns — evolving decisions, cross-meeting dependencies, and accountability conflicts — that single summaries miss",
          "Always specify the input format (transcript style, note style) so the AI handles timestamps and artifacts correctly",
          "Verify data privacy policies before uploading meeting transcripts to external AI services — they often contain sensitive information"
        ],
        practiceExercise: "Take notes from a recent meeting (or use a sample transcript). Write a comprehensive meeting intelligence prompt that extracts decisions, action items, and open questions in structured table formats. Generate the output and compare it to any notes you actually took. What did the AI catch that you missed? What did you catch that the AI missed?"
      },

      // ---------- LESSON 7.4 ----------
      {
        id: "7-4",
        title: "Research & Synthesis",
        duration: "9 min",
        content: `
<h3>AI-Powered Research at Scale</h3>
<p>Research is the foundation of informed decision-making, but it is time-consuming and cognitively demanding. AI can accelerate research by orders of magnitude — finding sources, extracting key findings, comparing perspectives, and synthesizing insights. This lesson teaches you how to build systematic research workflows using AI, how to evaluate and cite sources responsibly, and how to produce synthesis documents that inform action rather than just summarizing content.</p>

<h3>The Research Workflow Architecture</h3>
<p>Effective AI-assisted research follows a systematic workflow: (1) Query Formulation — defining the research question with scope and constraints, (2) Source Discovery — finding relevant documents, papers, reports, and data, (3) Extraction — pulling key findings, data points, and arguments from each source, (4) Synthesis — combining insights across sources to identify patterns, gaps, and consensus, and (5) Output Generation — producing the final research product in the right format. AI can assist at every stage, but human judgment is critical at stages 4 and 5.</p>

<p>The key principle is that AI research tools (like Perplexity, Elicit, and ChatGPT with browsing) excel at breadth — finding and summarizing many sources quickly. Human researchers excel at depth — evaluating methodology, identifying biases, and making contextual judgments. The best research workflow combines both: AI for initial discovery and extraction, human for synthesis and validation.</p>

<h3>Structured Research Prompts</h3>
<p>Research prompts must be more structured than typical prompts because they need to constrain a vast information space. Include: the exact research question, scope boundaries (time period, geography, industry), source preferences (academic, industry, government, news), what to prioritize (recency, authority, contrarian views), and the desired output format. The more constraints, the more focused and useful the research output.</p>

<div class="example-box">
  <h4>Example 1: Market Research Synthesis</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Tell me about the CRM software market."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a market research analyst preparing a competitive landscape report. Research question: 'What is the current state of the CRM software market for mid-market companies (100-999 employees) in 2025?'

Scope: 
- Time period: January 2024 to present (prioritize 2025 data)
- Geography: North America and Western Europe
- Focus: Cloud-based SaaS CRM solutions only

Research structure:
1. MARKET SIZE & GROWTH
   - Total addressable market (TAM) with 2024 actual and 2025-2028 projections
   - Year-over-year growth rate
   - Key growth drivers (remote work, AI integration, industry-specific solutions)

2. COMPETITIVE LANDSCAPE
   - Market share leaders (top 5) with approximate share percentages
   - For each: pricing model, key differentiator, recent product launches (2024-2025), customer satisfaction trends
   - Emerging challengers (3-5 companies gaining traction)

3. TECHNOLOGY TRENDS
   - AI/ML features becoming standard (predictive analytics, natural language query, automation)
   - Integration ecosystem depth (API availability, marketplace size)
   - Mobile-first vs. desktop-centric approaches

4. BUYER BEHAVIOR
   - Average deal size and sales cycle length
   - Top 3 selection criteria from buyer surveys
   - Switching patterns: what drives companies to change CRMs

5. FORECAST & IMPLICATIONS
   - 3 predictions for the next 18 months with confidence levels
   - Implications for a new entrant targeting the mid-market

Source requirements: Cite specific sources for every data point. Prioritize: Gartner, Forrester, IDC reports, vendor earnings calls, and peer-reviewed industry surveys. Flag any data older than 12 months.

Output: Structured report with executive summary, detailed sections, and source bibliography."</div>
  <p><strong>Why this works:</strong> This prompt constrains a massive topic into a focused research scope with specific company sizes, geographies, and time periods. The five-section structure ensures comprehensive coverage. The source requirements and citation demands ensure the output is evidence-based rather than AI hallucination. The new entrant implications section makes the research actionable.</p>
</div>

<div class="example-box">
  <h4>Example 2: Academic Literature Review</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Summarize research about remote work productivity."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are an academic researcher conducting a structured literature review on remote work productivity. Research question: 'What does peer-reviewed research say about the impact of remote work on knowledge worker productivity, and what factors moderate this relationship?'

Search parameters:
- Databases: Focus on papers from Nature, Academy of Management Journal, Journal of Applied Psychology, Organizational Behavior and Human Decision Processes
- Time range: 2020-2025 (the pandemic-era research wave)
- Study types: Prioritize randomized controlled trials, quasi-experimental designs, and large-scale longitudinal studies. Note when findings are based on self-report surveys vs. objective productivity measures.

Synthesis structure:
1. EXECUTIVE SUMMARY
   - Overall consensus: does remote work increase, decrease, or have no effect on productivity?
   - Confidence level based on study quality

2. KEY FINDINGS MATRIX
   Create a table: Study (Author, Year) | Methodology | Sample Size | Key Finding | Effect Size | Limitations
   - Include 8-12 most relevant high-quality studies

3. MODERATING FACTORS
   Analyze what moderates the productivity impact:
   - Job type/complexity
   - Individual traits (self-regulation, preference for structure)
   - Organizational factors (management practices, communication tools)
   - Home environment factors
   - Hybrid vs. fully remote arrangements

4. RESEARCH GAPS
   Identify 3-5 questions the current literature does not adequately answer

5. PRACTICAL IMPLICATIONS
   Translate findings into 5 evidence-based recommendations for organizational leaders

Critical evaluation: For each study, note the methodology quality and any conflicts of interest (e.g., funded by remote work tool vendors). Flag studies with sample sizes under 100 as preliminary."</div>
  <p><strong>Why this works:</strong> Academic research requires methodological rigor. This prompt specifies study quality hierarchies, asks for effect sizes and limitations, demands critical evaluation of funding sources and sample sizes, and requests the findings matrix format that academics expect. The moderating factors section produces nuanced understanding rather than a simplistic "remote work is good/bad" conclusion.</p>
</div>

<div class="example-box">
  <h4>Example 3: Technology Evaluation Research</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Should we use React or Vue for our new project?"</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a technical architect evaluating frontend frameworks for a new project. I need a structured technology evaluation to inform a build-vs-adopt decision.

Project context:
- Team: 8 frontend developers, mixed experience (3 senior, 3 mid, 2 junior)
- Existing stack: React 17 in legacy apps, considering migration opportunity
- Project type: B2B SaaS dashboard with heavy data visualization, real-time updates via WebSocket, and mobile-responsive requirements
- Performance targets: First Contentful Paint under 1.5s, Time to Interactive under 3s
- Timeline: 6 months to MVP

Evaluate: React 18, Vue 3, and SvelteKit

Evaluation framework (score each 1-5):
1. LEARNING CURVE: Time for the team to become productive, availability of learning resources
2. ECOSYSTEM: Availability of libraries for data visualization (D3 integration), WebSocket handling, testing tools
3. PERFORMANCE: Bundle sizes, runtime performance, SSR/SSG capabilities for our targets
4. DEVELOPER EXPERIENCE: DX quality, debugging tools, TypeScript support, build tooling
5. HIRING: Market availability of developers with this skill in our region
6. LONGEVITY: Community health, corporate backing, release cadence, migration history
7. RISK: Breaking changes frequency, upgrade path difficulty, vendor lock-in potential

For each framework:
- Provide scores with evidence-based justification
- Identify 2-3 specific risks for our project context
- List 2-3 companies with similar projects using this framework successfully

Final recommendation: Which framework to choose, primary rationale, and top 3 implementation risks to mitigate. Include a 'reevaluate in 12 months' trigger condition."</div>
  <p><strong>Why this works:</strong> Technology evaluations require context-specific analysis, not generic framework comparisons. This prompt provides the team composition, existing stack, project requirements, and performance targets. The scoring framework ensures consistent evaluation across options. The risk identification, success case references, and reevaluation trigger make the recommendation robust and actionable.</p>
</div>

<h3>Evaluating AI Research Quality</h3>
<p>AI-generated research requires careful validation. Always check: Are sources real and correctly cited? (AI sometimes hallucinates citations), Are findings accurately attributed? Is the synthesis balanced or does it overrepresent one perspective? Are recent developments included? Use the AI's research as a starting point, not a final product — follow up on the most important sources directly.</p>

<h3>Responsible Research Practices</h3>
<p>When using AI for research, transparency matters. Disclose AI assistance when sharing research. Never present AI-generated analysis as original research. Always verify citations by accessing the original sources. And remember that AI models have knowledge cutoffs — they cannot access the very latest developments without browsing capabilities.</p>
        `,
        templates: [
          `You are a [TYPE] research analyst. Research question: '[QUESTION]'. Scope: [TIME PERIOD], [GEOGRAPHY], [INDUSTRY]. Structure: [SECTIONS WITH SPECIFIC REQUIREMENTS]. Source requirements: [SOURCE TYPES]. Cite every data point. Output: [FORMAT].`,
          `You are an academic researcher conducting a [TYPE] literature review. Research question: '[QUESTION]'. Prioritize: [STUDY TYPES]. Synthesize [N] studies in a findings matrix (Author/Year | Method | Sample | Finding | Effect Size | Limitations). Identify moderating factors, research gaps, and evidence-based recommendations.`,
          `You are a technical architect evaluating [OPTIONS] for [USE CASE]. Context: [TEAM/STACK/REQUIREMENTS]. Evaluate using: [CRITERIA WITH SCORING]. For each option: scores with justification, specific risks, success case references. Final recommendation with rationale and reevaluation triggers.`
        ],
        keyTakeaways: [
          "AI excels at research breadth (finding and summarizing sources), humans excel at depth (evaluating methodology and bias)",
          "Research prompts must constrain the information space with scope boundaries, source preferences, and output structure",
          "Always demand citations and flag older data — AI can hallucinate sources and mix up timelines",
          "Technology evaluations need context-specific scoring frameworks, not generic comparisons",
          "Verify all AI-generated citations by accessing original sources; never present AI research as your own original work"
        ],
        practiceExercise: "Choose a research question relevant to your work (market trend, technology evaluation, or academic topic). Write a structured research prompt with scope boundaries, source requirements, section structure, and citation demands. Generate the research, then verify at least 3 of the cited sources independently. Note any discrepancies."
      },

      // ---------- LESSON 7.5 ----------
      {
        id: "7-5",
        title: "Learning & Skill Development",
        duration: "9 min",
        content: `
<h3>Accelerated Learning with AI</h3>
<p>The half-life of professional skills is shrinking — what you learned five years ago may already be obsolete. AI-powered learning can compress months of study into weeks by providing personalized explanations, adaptive practice, instant feedback, and structured curricula. This lesson teaches you how to use prompt engineering to create personalized learning systems: explaining complex concepts at your level, generating practice problems with progressive difficulty, creating memory aids, and designing spaced repetition schedules.</p>

<h3>The Personalized Learning Framework</h3>
<p>Effective AI tutoring follows the personalized learning framework: (1) Assess current knowledge — what do you already know about this topic? (2) Define learning objectives — what specific skills or knowledge do you want to acquire? (3) Set the explanation level — beginner, intermediate, or advanced? (4) Choose the learning modality — explanation, analogy, worked example, practice problem, or teaching? (5) Apply the Feynman Technique — explain it back to verify understanding. This framework transforms AI from an answer-giver into a true learning partner.</p>

<p>The mechanism is adaptive scaffolding. Good tutors don't just explain — they adjust the difficulty and approach based on your responses. AI can simulate this by: explaining a concept simply, checking your understanding, providing a slightly harder example, and continuing to adapt. The key is structuring the conversation as a dialogue, not a monologue.</p>

<h3>Concept Explanation Prompts</h3>
<p>For explaining complex concepts, the prompt should specify: your current knowledge level, the concept to learn, the context (why you need to know this), your preferred learning style (visual, analogical, mathematical, practical), and the depth needed (overview vs. deep understanding). The best explanation prompts ask the AI to use multiple modalities: "Explain this with an analogy, then with a mathematical definition, then with a practical code example."</p>

<div class="example-box">
  <h4>Example 1: Learning a Complex Concept</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Explain blockchain to me."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are an expert tutor adapting to my learning level. I am a software developer with 5 years of experience in backend systems. I understand distributed systems, databases, and cryptographic hashing, but I'm new to blockchain.

Teach me how blockchain consensus mechanisms work, specifically Proof of Work vs. Proof of Stake. I need to understand this for evaluating whether blockchain makes sense for a supply chain tracking project at my company.

Use this teaching structure:
1. ANALOGY LAYER: Explain using a relatable real-world analogy (like a group decision-making process)
2. TECHNICAL LAYER: Explain the actual mechanism with technical detail appropriate for an experienced developer
3. COMPARISON TABLE: PoW vs. PoS across dimensions — energy usage, security model, decentralization, scalability, finality time, hardware requirements
4. PRACTICAL EXAMPLE: Show a simplified Python simulation of each consensus process (under 50 lines each)
5. DECISION FRAMEWORK: Given my supply chain use case (5 enterprise participants, 1000 transactions/day, need auditability, low tolerance for energy waste), which consensus mechanism fits better and why?

After each section, ask me a verification question to check my understanding before proceeding."</div>
  <p><strong>Why this works:</strong> This prompt provides the learner's knowledge level (experienced developer, blockchain novice), the specific concepts to learn, the business context (supply chain evaluation), and a five-layer teaching structure. The verification questions turn it into an interactive dialogue. The decision framework at the end ensures the learning connects to a real decision.</p>
</div>

<div class="example-box">
  <h4>Example 2: Skill Practice with Progressive Difficulty</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Give me some SQL practice problems."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a SQL skills coach creating a progressive practice session. My current level: I can write basic SELECT, JOIN, GROUP BY queries. I struggle with window functions, CTEs, and query optimization.

Design a 6-problem practice set that progressively builds from my current level to advanced skills:

PROBLEM 1 (Warm-up): Basic JOIN + aggregation
- Scenario: E-commerce database with orders, customers, products tables
- Task: Find top 5 customers by total order value in 2024
- Skills practiced: JOIN, GROUP BY, ORDER BY, LIMIT

PROBLEM 2 (Foundation): Subquery + filtering
- Task: Find products that have never been ordered
- Skills practiced: NOT EXISTS, subquery, anti-join pattern

PROBLEM 3 (New concept — Window Functions): Introduction
- Task: Rank customers by monthly spending, showing their rank vs. previous month
- First provide a brief explanation of ROW_NUMBER() vs. RANK() vs. DENSE_RANK()
- Then give the problem with a hint about which window function to use

PROBLEM 4 (Application): CTEs
- Task: Calculate month-over-month revenue growth percentage using a CTE
- Include a brief CTE syntax refresher

PROBLEM 5 (Challenge): Complex window function
- Task: For each product category, find the 3 products with the highest 'velocity' (orders per day since launch), handling ties appropriately
- No hints — I should know which window function to use by now

PROBLEM 6 (Expert): Query optimization
- Provide an intentionally slow query that solves a real business problem
- Task: Identify why it's slow (missing index, unnecessary subquery, N+1 pattern) and rewrite it for performance
- Include the EXPLAIN ANALYZE output to analyze

For each problem: Provide the schema, the problem statement, and a hidden solution I can reveal. After I answer each problem, evaluate my solution for correctness, efficiency, and style. Point out any missed edge cases or optimization opportunities."</div>
  <p><strong>Why this works:</strong> This prompt creates a complete adaptive learning session. It establishes the learner's baseline, defines a skill progression path, introduces new concepts with explanations before problems, and includes a coaching feedback loop. The hidden solutions with evaluation criteria make it a self-contained practice environment.</p>
</div>

<div class="example-box">
  <h4>Example 3: Creating Memory Aids and Study Materials</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Help me study for my AWS certification."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a study coach helping me prepare for the AWS Solutions Architect Associate exam. I have 4 weeks to study and can dedicate 1 hour daily.

Create a comprehensive study system:

1. SPACED REPETITION SCHEDULE
   - Map the 4 weeks to exam domains: Domain 1 (Design Resilient Architectures) 30%, Domain 2 (Design High-Performing) 28%, Domain 3 (Design Secure) 24%, Domain 4 (Design Cost-Optimized) 18%
   - Create a daily schedule with specific topics, spaced to maximize retention
   - Include 2 full review days per week

2. MNEMONIC DEVICES
   For each AWS service category (compute, storage, database, networking, security), create 2-3 memorable mnemonics for the most important services and their use cases. Make them vivid and slightly absurd for better memory retention.

3. COMPARISON FLASHCARDS
   Create 15 comparison flashcards in Q&A format for commonly confused services:
   - EBS vs. EFS vs. S3
   - ALB vs. NLB vs. CLB
   - RDS vs. DynamoDB vs. Redshift
   - etc.
   Format: Front = comparison question, Back = key differentiators + when to use each

4. SCENARIO-BASED PRACTICE QUESTIONS
   Write 5 scenario questions that mirror the exam format:
   - A company needs X, Y, Z requirements. Which architecture is most cost-effective and resilient?
   - Each should have: scenario paragraph, 4 answer choices, detailed explanation of correct answer AND why each distractor is wrong

5. CHEAT SHEET
   Create a one-page "last-minute review" cheat sheet with: key service limits, pricing model differences, security best practices, and common architecture patterns."</div>
  <p><strong>Why this works:</strong> This prompt creates a complete study ecosystem: a spaced repetition schedule (evidence-based learning technique), mnemonics (memory aids), comparison flashcards (active recall), scenario questions (exam simulation), and a cheat sheet (consolidated reference). The 4-week constraint ensures the schedule is realistic and focused.</p>
</div>

<h3>The Feynman Technique with AI</h3>
<p>The Feynman Technique — explaining a concept in your own words as if teaching a beginner — is one of the most effective learning methods. Use AI to practice this: learn a concept, then prompt the AI with "I will explain [concept] to you as if you're a beginner. Evaluate my explanation for accuracy, clarity, and completeness. Point out anything I got wrong or oversimplified." This feedback loop creates powerful learning.</p>

<h3>Learning Accountability</h3>
<p>AI learning works best with accountability. Set specific learning goals with deadlines, use the AI to quiz yourself regularly, and track your progress. Consider sharing your AI-generated study plan with a human learning partner who can hold you accountable. The AI provides the content and structure; you provide the discipline and practice.</p>
        `,
        templates: [
          `You are an expert tutor. My knowledge level: [BACKGROUND]. I need to learn [CONCEPT] for [CONTEXT]. Use this structure: (1) Analogy explanation, (2) Technical explanation at my level, (3) Comparison table, (4) Practical code/example, (5) Decision framework. Ask verification questions after each section.`,
          `You are a skills coach. My level: [CURRENT SKILLS]. I want to improve: [TARGET SKILLS]. Design a [N]-problem progressive practice set: [PROBLEM 1 DESCRIPTION/SKILLS], [PROBLEM 2 DESCRIPTION/SKILLS], etc. Include explanations for new concepts, hints of decreasing helpfulness, hidden solutions, and feedback criteria.`,
          `You are a study coach. I'm preparing for [EXAM/CERTIFICATION] in [TIMEFRAME]. Create: (1) Spaced repetition schedule, (2) Mnemonics for [TOPICS], (3) [N] comparison flashcards, (4) [N] scenario practice questions with explanations, (5) One-page cheat sheet.`
        ],
        keyTakeaways: [
          "AI tutoring follows the personalized learning framework: assess knowledge, define objectives, set explanation level, choose modality, apply Feynman Technique",
          "The best learning prompts specify your current knowledge, learning context, preferred style, and target depth",
          "Progressive practice sets should build from known to new, with explanations before problems and coaching feedback after",
          "Use AI to create complete study ecosystems: schedules, mnemonics, flashcards, practice questions, and cheat sheets",
          "Practice the Feynman Technique by explaining concepts to AI and asking it to evaluate your explanation"
        ],
        practiceExercise: "Choose a skill you want to learn (technical or non-technical). Write a comprehensive learning prompt using the personalized learning framework. Include your current knowledge level, learning objectives, preferred style, and a request for a structured learning path with practice materials. Generate the learning plan and complete at least the first section."
      }
    ]
  },


  // ============================================================
  // MODULE 8 — INDUSTRY-SPECIFIC PROMPTS
  // ============================================================
  {
    module: 8,
    title: "Industry-Specific Prompts",
    description: "Master domain-specific prompt engineering for healthcare, legal, education, finance, and real estate. Learn the unique constraints, terminology, and compliance requirements of each industry.",
    lessons: [

      // ---------- LESSON 8.1 ----------
      {
        id: "8-1",
        title: "Healthcare & Medical",
        duration: "11 min",
        content: `
<h3>AI in Healthcare: Promise and Responsibility</h3>
<p>Healthcare is the highest-stakes domain for AI application. A well-crafted prompt can help clinicians synthesize research, draft patient communications, analyze symptoms, or prepare case summaries. A poorly crafted one can produce dangerous misinformation. This lesson teaches you how to use AI responsibly in healthcare contexts — what it can do, what it absolutely cannot do, and how to build prompts that comply with medical ethics and regulations.</p>

<h3>Understanding Healthcare AI Boundaries</h3>
<p>The single most important principle of healthcare prompting is: AI does not diagnose, prescribe, or replace clinical judgment. Every healthcare prompt must include explicit guardrails that limit the AI's role to administrative, educational, or synthesizing functions. The FDA has not approved general-purpose LLMs for clinical decision-making, and using them for diagnostic purposes is both unsafe and potentially illegal.</p>

<p>What AI CAN do in healthcare: Summarize medical literature, draft patient-friendly explanations of conditions, help format clinical notes, generate interview questions for patient intake, create educational materials, analyze population-level health trends from public data, and assist with medical coding/billing documentation. These are all information processing tasks, not clinical judgment tasks.</p>

<h3>Healthcare Prompt Structure</h3>
<p>Healthcare prompts need additional structure beyond standard prompts: (1) Explicit role limitation — "You are a medical information assistant, NOT a diagnostic tool," (2) Disclaimer inclusion — requiring the output to include appropriate medical disclaimers, (3) Source requirements — demanding evidence-based citations, (4) Scope boundaries — defining exactly what the AI should and should not address, and (5) Audience specification — whether the output is for clinicians, patients, administrators, or researchers.</p>

<div class="example-box">
  <h4>Example 1: Medical Literature Synthesis</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"What should I prescribe for Type 2 diabetes?"</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a medical research assistant (NOT a diagnostic or prescribing tool). I am a healthcare professional seeking a synthesis of recent clinical evidence.

Task: Synthesize the clinical evidence for GLP-1 receptor agonists (semaglutide, tirzepatide) in Type 2 diabetes management from peer-reviewed sources published 2023-2025.

Structure the synthesis:
1. MECHANISM OF ACTION — Brief explanation of GLP-1 pathway and how these agents work
2. EFFICACY DATA — HbA1c reduction, weight loss effects, and cardiovascular outcomes from major trials (SUSTAIN, SURPASS). Include trial names, sample sizes, and key effect sizes
3. SIDE EFFECT PROFILE — Most common adverse events, contraindications, and black box warnings
4. COMPARATIVE EFFECTIVENESS — Head-to-head data vs. metformin, SGLT2 inhibitors, and insulin where available
5. PRACTICAL CONSIDERATIONS — Dosing, administration route, cost considerations, patient selection factors

Source requirements: Cite only peer-reviewed journals (NEJM, Lancet Diabetes, JAMA, Diabetes Care). Include trial names and publication years. Flag any ongoing trials with preliminary data.

MANDATORY DISCLAIMER: Include a header stating: 'This is a research synthesis for informational purposes only. It does not constitute medical advice. Clinical decisions must be based on individual patient assessment and current guidelines.'

Scope limitation: Do NOT provide dosing recommendations for specific patients. Do NOT suggest starting, stopping, or changing any medication."
        </div>
  <p><strong>Why this works:</strong> This prompt explicitly limits the AI's role to research synthesis, demands peer-reviewed sources, includes a mandatory disclaimer, and explicitly forbids patient-specific recommendations. The structure mirrors how clinicians actually review evidence: mechanism, efficacy, safety, comparisons, and practical considerations.</p>
</div>

<div class="example-box">
  <h4>Example 2: Patient-Friendly Explanation</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Explain hypertension to a patient."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a health literacy specialist creating patient education materials. Create a patient-friendly explanation of hypertension (high blood pressure) following these guidelines:

AUDIENCE: Adult patient, 8th-grade reading level (Flesch-Kincaid target: 60-70), English as first language, newly diagnosed

STRUCTURE:
1. WHAT IT IS (1 paragraph): Explain blood pressure using the 'water through a hose' analogy. Define systolic and diastolic in plain terms
2. WHY IT MATTERS (1 paragraph): Long-term risks explained without causing panic. Use statistics sparingly and meaningfully
3. COMMON CAUSES (bullet list): Lifestyle factors the patient can control, plus note that sometimes there's no clear cause
4. TREATMENT OPTIONS (overview): Lifestyle modifications first (diet, exercise, sodium reduction, weight management), then mention medication categories without naming specific drugs or doses
5. WHAT YOU CAN DO (actionable checklist): 5 specific, achievable steps the patient can take this week
6. WHEN TO CALL YOUR DOCTOR (red flags): List symptoms requiring immediate medical attention

REQUIREMENTS:
- Use 'you' and 'your' language (second person)
- Define medical terms on first use
- Include one simple diagram description (text-based)
- Add a 'Questions to Ask Your Doctor' section with 5 suggested questions
- Include disclaimer: 'This information is educational and does not replace medical advice from your healthcare provider'
- Tone: Empathetic, empowering, not fear-mongering
- Length: 400-500 words

AVOID: Specific medication recommendations, specific dosages, diagnostic criteria that could encourage self-diagnosis, or minimization of the condition's seriousness."
        </div>
  <p><strong>Why this works:</strong> Patient education requires precise control over reading level, tone, and content boundaries. This prompt specifies the Flesch-Kincaid target, the analogy-based explanation approach, the lifestyle-first treatment framing, and explicit prohibitions on medication specifics. The red flags section ensures appropriate urgency without fear-mongering.</p>
</div>

<div class="example-box">
  <h4>Example 3: Clinical Documentation Assistant</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Write a SOAP note for a patient with chest pain."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a medical documentation assistant helping a clinician format clinical notes. You do NOT generate clinical content — you only organize and format information the clinician provides.

I will provide you with information from a patient encounter. Format it as a structured SOAP note following this template:

SUBJECTIVE:
- Chief Complaint (patient's words in quotes)
- History of Present Illness: Onset, Location, Duration, Characteristics, Aggravating/Alleviating factors, Associated symptoms, Severity (OLDCARTS framework)
- Relevant history, medications, allergies

OBJECTIVE:
- Vital signs (format as table: Measurement | Value | Normal Range)
- Physical exam findings (organize by system)
- Diagnostic test results if available

ASSESSMENT:
- Format as a numbered differential diagnosis list with supporting and contradicting evidence for each
- Include pre-test probabilities where relevant

PLAN:
- Format as checkboxes for: Additional tests, Treatment initiated, Patient education provided, Follow-up plan, Return precautions

IMPORTANT RULES:
1. Only use information I provide — do NOT invent vital signs, test results, or findings
2. If information is missing for a section, write '[Information not provided — complete before finalizing]'
3. Use standard medical terminology and abbreviations appropriate for clinical documentation
4. Flag any obvious inconsistencies in the provided data
5. Include a note: 'This is a documentation template only. Final clinical judgment rests with the treating clinician.'

Here is the encounter information: [CLINICIAN INPUTS DATA HERE]"
        </div>
  <p><strong>Why this works:</strong> Clinical documentation prompts must prevent the AI from hallucinating medical information. This prompt explicitly restricts the AI to formatting only, includes rules about missing data, adds consistency checking, and requires a disclaimer. The structured SOAP template with the OLDCARTS framework ensures clinical completeness.</p>
</div>

<h3>HIPAA and Data Privacy</h3>
<p>Never include Protected Health Information (PHI) in prompts sent to external AI services. This includes: names, dates of birth, medical record numbers, social security numbers, addresses, photos, and any other identifiable information. Use de-identified cases or synthetic data for training and template creation. For healthcare organizations, use HIPAA-compliant AI platforms with Business Associate Agreements (BAAs) in place.</p>

<h3>Healthcare AI Best Practices</h3>
<p>Always include explicit guardrails: role limitations, disclaimers, source requirements, scope boundaries, and prohibition of diagnostic/prescriptive content. Review all AI-generated healthcare content for accuracy before use. Keep humans in the loop for all clinical decisions. And stay current with FDA guidance, which evolves rapidly in this space.</p>
        `,
        templates: [
          `You are a medical [RESEARCH ASSISTANT/INFORMATION SPECIALIST/EDUCATION SPECIALIST] (NOT a diagnostic tool). Task: [SYNTHESIZE EXPLAIN/FORMAT]. Audience: [CLINICIANS/PATIENTS/ADMINISTRATORS]. Include mandatory disclaimer: '[DISCLAIMER TEXT]'. Do NOT: [DIAGNOSE/PRESCRIBE/RECOMMEND SPECIFIC TREATMENTS]. Sources: [PEER-REQUIRED REQUIREMENTS].`,
          `You are a medical documentation assistant. I will provide encounter information. Format it as [DOCUMENT TYPE: SOAP/H&P/PROGRESS NOTE] following [FRAMEWORK]. Rules: (1) Only use provided information, (2) Flag missing data with '[Information not provided]', (3) Do not invent any clinical data, (4) Flag inconsistencies, (5) Include disclaimer about clinician responsibility.`,
          `Create patient education material about [CONDITION/TOPIC] at [READING LEVEL: 8th grade] reading level. Include: (1) Plain-language explanation with analogy, (2) Why it matters, (3) Causes/risk factors, (4) Treatment overview without specific drugs/doses, (5) Actionable steps, (6) Red flags, (7) Questions for their doctor. Disclaimer required. Avoid fear-mongering.`
        ],
        keyTakeaways: [
          "AI in healthcare is for administrative, educational, and synthesis tasks — NEVER for diagnosis, prescription, or clinical judgment",
          "Every healthcare prompt must include: role limitation, medical disclaimer, source requirements, scope boundaries, and audience specification",
          "Never include PHI in prompts to external AI services — use de-identified or synthetic data only",
          "Clinical documentation prompts must prevent AI hallucination — restrict to formatting provided information only",
          "Stay current with FDA guidance and ensure HIPAA compliance through BAAs with AI vendors"
        ],
        practiceExercise: "Choose a medical topic (chronic condition, wellness topic, or healthcare workflow). Write a healthcare prompt following the guardrails framework: explicit role limitation, disclaimer, source requirements, scope boundaries, and audience specification. Generate the output and verify it includes appropriate safety limitations and does not overstep into clinical advice."
      },

      // ---------- LESSON 8.2 ----------
      {
        id: "8-2",
        title: "Legal & Compliance",
        duration: "10 min",
        content: `
<h3>AI in the Legal Domain</h3>
<p>The legal industry generates enormous volumes of text — contracts, briefs, regulations, case law, discovery documents — making it a natural fit for AI assistance. However, legal work carries significant liability risks, ethical obligations, and jurisdictional complexities. This lesson teaches you how to use AI responsibly in legal contexts: for legal research, contract analysis, compliance checking, and document drafting while maintaining attorney oversight and avoiding unauthorized practice of law.</p>

<h3>Understanding the Unauthorized Practice of Law (UPL)</h3>
<p>The most critical constraint on legal AI use is the prohibition on unauthorized practice of law. AI cannot: provide legal advice to specific clients, represent individuals in legal matters, or create attorney-client relationships. Every legal prompt must be structured as a tool that assists a licensed attorney, not as a substitute for one. Non-lawyers using legal AI tools should always include language indicating that the output is for informational purposes and does not constitute legal advice.</p>

<h3>Legal Prompt Architecture</h3>
<p>Legal prompts require a specific architecture: (1) Jurisdiction specification — which country's, state's, or region's law applies? (2) Temporal scope — as of what date should the analysis be current? (3) Role definition — paralegal, legal researcher, contract analyst? (4) Output format — memo style, checklist, comparison table? (5) Risk flagging — explicitly ask the AI to identify uncertainties and recommend attorney review. This architecture ensures legal prompts produce useful but appropriately bounded output.</p>

<div class="example-box">
  <h4>Example 1: Legal Research Memo</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"What are the laws about employee non-compete agreements?"</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a legal research assistant (NOT a licensed attorney). I am a practicing attorney seeking research support on employee non-compete agreements.

JURISDICTION: California, United States
TEMPORAL SCOPE: Current as of January 2025
TOPIC: Enforceability of employee non-compete agreements in California, including recent legislative changes

Research structure:
1. STATUTORY FRAMEWORK
   - California Business and Professions Code Section 16600 and key exceptions
   - Recent legislation: AB 1076 (2023) and SB 699 (2023) — effective dates and key provisions
   - Any pending legislation as of January 2025

2. CASE LAW SUMMARY
   - 3-5 most relevant California state court decisions (2019-2025) with citations
   - For each: facts, holding, and key reasoning
   - Note any conflicts or tensions between decisions

3. PRACTICAL IMPLICATIONS
   - What types of non-compete provisions remain enforceable in California (if any)?
   - Sale-of-business exception: scope and requirements
   - Choice-of-law clauses: how California courts treat out-of-state non-competes
   - Remedies available to employees for unlawful non-competes

4. COMPARATIVE CONTEXT (brief)
   - How does California's approach compare to the FTC's proposed nationwide ban?
   - Any states with similarly strict prohibitions?

OUTPUT REQUIREMENTS:
- Format as a legal research memo with standard headings
- Include full case citations in Bluebook format
- Flag any areas where the law is unclear or evolving
- End with a section titled 'REVIEW REQUIRED' listing specific questions that require attorney judgment

DISCLAIMER: Include a header: 'This research memo was prepared with AI assistance and does not constitute legal advice. All analysis must be verified by a licensed attorney before use in client matters.'"
        </div>
  <p><strong>Why this works:</strong> This prompt specifies jurisdiction and temporal scope (critical for legal accuracy), requests structured research with proper citations, asks for case law with facts-holding-reasoning format, includes practical implications, and explicitly flags areas requiring attorney judgment. The disclaimer and review requirement sections maintain appropriate boundaries.</p>
</div>

<div class="example-box">
  <h4>Example 2: Contract Clause Analysis</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Review this contract and tell me if it's good."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a contract analysis assistant supporting a commercial attorney. I will paste a Software as a Service (SaaS) subscription agreement. Analyze it following this structured framework:

ANALYSIS FRAMEWORK:

1. CONTRACT OVERVIEW
   - Contracting parties (identify roles: customer vs. vendor)
   - Contract term and renewal provisions
   - Financial summary: fees, payment terms, price increase clauses

2. RISK ANALYSIS MATRIX
   Create a table: Clause Category | Risk Level (High/Med/Low) | Specific Concern | Suggested Review Focus
   Analyze these categories:
   - Limitation of Liability (caps, exclusions, carve-outs)
   - Indemnification (scope, survival, procedures)
   - Data Security and Privacy (security standards, breach notification, subprocessor rights)
   - Service Level Agreements (uptime guarantees, remedies for failure)
   - Termination (convenience vs. cause, data return, transition assistance)
   - Intellectual Property (ownership of data, derived data, improvements)
   - Auto-renewal and price increase mechanisms

3. MISSING STANDARD PROVISIONS
   List common SaaS contract provisions that appear to be missing or incomplete, with explanation of why each matters

4. DRAFTING NOTES
   Flag ambiguous language, undefined terms, and provisions that may be unenforceable

5. NEGOTIATION PRIORITIES
   Rank the top 5 issues to negotiate, with suggested fallback positions

IMPORTANT RULES:
- Do NOT provide legal advice about whether to sign this contract
- Flag that this analysis is preliminary and requires attorney review
- If you encounter unfamiliar legal terms, note them rather than guessing
- Cite relevant legal standards where applicable (AIA, UCITA, etc.)
- Include disclaimer: 'This analysis is for attorney workflow support only and does not constitute legal advice.'"
        </div>
  <p><strong>Why this works:</strong> Contract analysis prompts need a structured framework that examines specific risk categories. The risk matrix format makes the output scannable. Asking for missing provisions catches gaps. The negotiation priorities with fallback positions make the output immediately useful for attorneys. The explicit rules prevent the AI from overstepping into advice-giving.</p>
</div>

<div class="example-box">
  <h4>Example 3: Compliance Checklist Generation</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Make a GDPR compliance checklist."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a compliance analyst assistant. Create a comprehensive GDPR compliance checklist for a mid-size US-based B2B SaaS company that processes EU customer data.

COMPANY CONTEXT:
- 200 employees, $50M ARR
- Processes personal data of EU business customers (B2B, not B2C)
- Data types: business contact info, usage analytics, support tickets
- Subprocessors: AWS (hosting), SendGrid (email), Zendesk (support)
- No sensitive category data (health, biometrics, etc.)

CHECKLIST STRUCTURE — Organize by GDPR Article:

ARTICLE 5: DATA PROCESSING PRINCIPLES
□ [Specific action items for lawful, fair, transparent processing]
□ [Purpose limitation compliance steps]
□ [Data minimization review checklist]
□ [Accuracy maintenance procedures]
□ [Storage limitation policy requirements]
□ [Integrity and confidentiality measures]

ARTICLE 6: LAWFUL BASIS
□ [Document lawful basis for each processing activity]
□ [Consent management if applicable]
□ [Legitimate interest assessment (LIA) template for analytics]

ARTICLE 13-14: TRANSPARENCY
□ [Privacy notice requirements checklist]
□ [Privacy notice content checklist — required disclosures]

ARTICLE 25: DATA PROTECTION BY DESIGN
□ [Technical measures checklist]
□ [Organizational measures checklist]

ARTICLE 28: PROCESSOR OBLIGATIONS
□ [DPA requirements for each subprocessor]
□ [Subprocessor approval workflow]
□ [Audit rights documentation]

ARTICLE 32: SECURITY
□ [Appropriate security measures checklist]
□ [Encryption requirements for data at rest and in transit]
□ [Access control and authentication requirements]

ARTICLE 33: BREACH NOTIFICATION
□ [Breach detection and assessment procedures]
□ [72-hour notification workflow to supervisory authority]
□ [Data subject notification trigger criteria]

ADDITIONAL SECTIONS:
- Data Subject Rights (Articles 15-22): Request handling procedures
- International Transfers (Chapter V): SCC implementation, Schrems II considerations
- DPO Requirements (Article 37): Assessment of whether DPO is required
- Record of Processing Activities (Article 30): Documentation template

For each checklist item:
- Status: [ ] Not Started / [ ] In Progress / [ ] Complete / [ ] N/A
- Owner: [Department/Role]
- Evidence Required: [What documentation proves compliance]
- Risk if Not Addressed: [Brief description]

Include a preamble stating: 'This checklist is for compliance planning purposes and should be reviewed by qualified legal counsel. GDPR compliance is fact-specific and this checklist may not cover all applicable requirements for your organization.'"
        </div>
  <p><strong>Why this works:</strong> Compliance checklists need to be comprehensive, organized by regulatory article, and tailored to the specific organization. This prompt provides company context (size, data types, subprocessors) that shapes the checklist items. The status/owner/evidence/risk format makes it an actionable project management tool, not just a list. The preamble maintains appropriate boundaries.</p>
</div>

<h3>Legal AI Best Practices</h3>
<p>Always verify AI-generated legal research against primary sources (statutes, regulations, case law). AI can hallucinate citations or misstate the law. Use AI for efficiency — drafting, organizing, initial research — but never as a substitute for legal judgment. Maintain clear boundaries between AI assistance and legal advice. And ensure all outputs include appropriate disclaimers.</p>

<h3>When NOT to Use AI for Legal Work</h3>
<p>Do not use AI for: urgent legal matters with impending deadlines (verify everything first), court filings (accuracy is paramount and errors can have severe consequences), client-facing advice without attorney review, matters involving privileged information sent to external services, or any jurisdiction where you are unfamiliar with local rules and cannot verify the output.</p>
        `,
        templates: [
          `You are a legal [RESEARCH ASSISTANT/CONTRACT ANALYST/COMPLIANCE ANALYST] (NOT a licensed attorney). Jurisdiction: [JURISDICTION]. Temporal scope: [DATE]. Task: [RESEARCH/ANALYZE/DRAFT]. Structure: [SECTIONS]. Include full citations in [FORMAT]. Flag uncertainties and include 'REVIEW REQUIRED' section. Disclaimer required.`,
          `You are a contract analysis assistant. I will paste a [CONTRACT TYPE]. Analyze using: (1) Overview, (2) Risk Matrix by category, (3) Missing standard provisions, (4) Ambiguous language flags, (5) Negotiation priorities with fallback positions. Do NOT advise whether to sign. Flag for attorney review.`,
          `You are a compliance analyst. Create a [REGULATION] compliance checklist for [COMPANY TYPE/DESCRIPTION]. Organize by [REGULATORY ARTICLES/SECTIONS]. For each item: status checkbox, owner, evidence required, risk if not addressed. Include regulatory preamble disclaimer.`
        ],
        keyTakeaways: [
          "AI in legal work must avoid unauthorized practice of law — structure prompts as tools for licensed attorneys, not substitutes",
          "Every legal prompt needs: jurisdiction, temporal scope, role definition, output format, and risk flagging",
          "Always verify AI-generated legal research against primary sources — AI can hallucinate citations",
          "Use AI for legal efficiency (drafting, organizing, research) but never as a substitute for legal judgment",
          "Include explicit disclaimers and 'REVIEW REQUIRED' sections in all legal AI outputs"
        ],
        practiceExercise: "Choose a legal topic relevant to your work (contract type, regulation, or compliance area). Write a legal prompt following the architecture: jurisdiction, temporal scope, role definition, output format, and risk flagging. Generate the output and verify any citations or legal references mentioned. Note what requires attorney review."
      },

      // ---------- LESSON 8.3 ----------
      {
        id: "8-3",
        title: "Education & Training",
        duration: "10 min",
        content: `
<h3>AI in Education: Enhancing Learning at Scale</h3>
<p>Education is undergoing a fundamental transformation. AI can personalize instruction, generate adaptive assessments, create differentiated materials, and provide real-time feedback — but only when guided by well-engineered prompts. This lesson focuses on how educators, instructional designers, and corporate trainers can use prompt engineering to create effective learning experiences while maintaining pedagogical rigor and academic integrity.</p>

<h3>Pedagogical Prompt Design</h3>
<p>Educational prompts must account for learning science principles: Bloom's Taxonomy (remember, understand, apply, analyze, evaluate, create), cognitive load theory (don't overwhelm working memory), scaffolding (support that fades as learners progress), and spaced repetition (review at increasing intervals). A well-designed educational prompt specifies the learning objective in Bloom's terms, the target audience's prior knowledge, the instructional strategy, and the assessment approach.</p>

<p>The mechanism is instructional design automation. When you specify a learning objective at the "analyze" level, the model generates activities requiring analysis (comparing, categorizing, deconstructing) rather than just recall (listing, defining, describing). The prompt acts as an instructional design brief that shapes the pedagogical approach.</p>

<h3>Creating Differentiated Learning Materials</h3>
<p>Differentiation — adapting content for learners with different needs, abilities, and backgrounds — is one of education's biggest challenges. AI excels at this when given clear parameters. Prompt for the same content at multiple reading levels, with varying cultural contexts, for different learning preferences (visual, auditory, kinesthetic), and with appropriate accommodations for learners with disabilities.</p>

<div class="example-box">
  <h4>Example 1: Lesson Plan Generation</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Make a lesson plan about photosynthesis."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are an instructional designer creating a lesson plan following the Understanding by Design (UbD) framework.

LESSON PARAMETERS:
- Subject: Biology
- Topic: Photosynthesis — light-dependent reactions and Calvin cycle
- Grade level: 9th grade (ages 14-15)
- Class duration: 50 minutes
- Class size: 28 students
- Prior knowledge: Students know cells have organelles; they have heard of chlorophyll but don't understand its role

STANDARDS ALIGNMENT: NGSS HS-LS1-5 — Use a model to illustrate how photosynthesis transforms light energy into stored chemical energy

LESSON STRUCTURE (UbD format):

STAGE 1 — DESIRED RESULTS:
- Essential Question: [Generate an engaging, thought-provoking essential question]
- Learning Objective (Bloom's Analyze level): Students will compare and contrast the light-dependent reactions and Calvin cycle, identifying the inputs, outputs, and locations of each
- Success Criteria: [3-4 observable indicators that students have met the objective]

STAGE 2 — ASSESSMENT EVIDENCE:
- Formative assessment: [A check-for-understanding activity at 15, 30, and 45 minutes]
- Summative assessment: [An exit ticket that assesses the learning objective]
- Performance task: [A brief activity where students apply their understanding]

STAGE 3 — LEARNING PLAN:
- Hook/Anticipatory Set (5 min): [An engaging opening that connects to prior knowledge]
- Direct Instruction (10 min): [Key concepts with a visual analogy]
- Guided Practice (10 min): [Students work in pairs with a graphic organizer comparing the two stages]
- Independent Practice (15 min): [Students label a diagram and explain the process in their own words]
- Closure (5 min): [Exit ticket + preview of next lesson]
- Differentiation: [Modifications for 3 ELL students, 2 students with ADHD, and 1 student with dyslexia]

MATERIALS LIST: [List all materials needed]

EXTENSION: [An optional activity for students who finish early and want to explore further]"
        </div>
  <p><strong>Why this works:</strong> This prompt uses the established UbD instructional design framework, specifies the standard being addressed, sets the Bloom's level at "Analyze" (not just recall), includes formative checkpoints, and requires differentiation for specific learner needs. The 50-minute structure ensures the lesson is realistic for a real classroom.</p>
</div>

<div class="example-box">
  <h4>Example 2: Assessment Creation with Rigor</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Write a quiz about World War II."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are an assessment specialist creating a rigorous history assessment. Create a 15-question quiz on World War II (1939-1945) for 11th-grade students.

ASSESSMENT SPECIFICATIONS:
- Difficulty distribution: 5 Easy (recall/comprehension), 7 Medium (application/analysis), 3 Hard (evaluation/synthesis)
- Question type distribution: 8 multiple-choice, 4 short-answer (2-3 sentences), 3 document-based (primary source analysis)

BLOOM'S TAXONOMY ALIGNMENT:
- Remember questions: Key dates, figures, definitions
- Understand questions: Explain causes, describe events
- Apply questions: Use historical thinking skills on new scenarios
- Analyze questions: Compare sources, identify bias, examine causation
- Evaluate questions: Assess decisions, judge significance

CONTENT COVERAGE:
- Causes of WWII: 3 questions (Treaty of Versailles, rise of fascism, appeasement)
- Major theaters and turning points: 4 questions
- Home front and civilian experience: 3 questions
- Holocaust and genocide: 2 questions
- End of war and consequences: 3 questions

QUALITY REQUIREMENTS:
- Multiple-choice questions: 4 options each, one clearly correct answer, 3 plausible distractors based on common misconceptions
- Short-answer questions: Include a specific scoring rubric (2 points: accurate and complete, 1 point: partially correct, 0 points: incorrect or no response)
- Document-based questions: Include the primary source excerpt, then ask students to source it (who, when, why) and contextualize it
- No trick questions — each question should assess genuine historical understanding
- Include an answer key with brief explanations for each question

FORMAT: Numbered questions, clear section headers by question type, answer key at the end."
        </div>
  <p><strong>Why this works:</strong> Assessment quality depends on precise specifications: difficulty distribution, Bloom's alignment, content coverage, and quality requirements for distractors and rubrics. The document-based questions requiring sourcing and contextualization reflect the College Board AP History format, ensuring college readiness. The explicit prohibition on trick questions keeps the assessment fair.</p>
</div>

<div class="example-box">
  <h4>Example 3: Corporate Training Module</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Write a training about cybersecurity for employees."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a corporate instructional designer creating a cybersecurity awareness training module.

TRAINING PARAMETERS:
- Audience: Non-technical employees at a financial services company (200 people, mixed age 22-60)
- Duration: 30-minute e-learning module
- Delivery: Self-paced online with quiz at the end
- Compliance context: Must satisfy SEC cybersecurity guidance requirements for employee training
- Company policy context: Employees handle client financial data; all email is monitored; USB drives are prohibited

LEARNING OBJECTIVES (ABCD format):
- Audience: All employees
- Behavior: Identify and appropriately respond to phishing attempts, social engineering, and suspicious email
- Condition: When presented with realistic scenarios
- Degree: With 90% accuracy on the post-training assessment

MODULE STRUCTURE:
1. OPENING SCENARIO (3 min): Start with a realistic, compelling story — an employee receives a convincing phishing email appearing to be from the CEO requesting urgent wire transfer. Hook the learner with 'Could you spot this?'

2. FOUNDATION (8 min): 
   - What is phishing? (definition with real statistics from 2024)
   - Common types: email phishing, spear phishing, whaling, smishing, vishing
   - Red flags checklist: 8 specific indicators employees can look for

3. SCENARIO-BASED PRACTICE (12 min):
   Create 4 interactive scenarios where learners must decide if an email/message is legitimate or a phishing attempt. For each scenario:
   - Show the realistic message (include realistic details: company logos, similar email addresses)
   - Present 3 response options
   - For incorrect choices: Explain why it's wrong and the potential consequences
   - For correct choice: Reinforce with a specific technique used

4. COMPANY POLICIES (4 min):
   - How to report suspected phishing (specific steps using our tools)
   - Consequences of non-compliance
   - Resources: IT security contact, reporting portal

5. KNOWLEDGE CHECK (3 min):
   5-question quiz: 3 scenario-based, 2 policy-based. Must score 4/5 to pass.

ACCESSIBILITY: Ensure all scenarios are screen-reader friendly. Include alt-text descriptions for any visual elements. Provide a text-only version of all scenarios.

ENGAGEMENT: Use conversational, non-patronizing tone. Include one memorable catchphrase or mnemonic for the red flags."
        </div>
  <p><strong>Why this works:</strong> Corporate training prompts need to balance engagement with compliance requirements. This prompt specifies the ABCD learning objective format (a training industry standard), includes realistic scenario-based practice (proven most effective for behavior change), references specific company policies, requires accessibility compliance, and sets a passing score threshold. The opening story creates emotional engagement that improves retention.</p>
</div>

<h3>Academic Integrity Considerations</h3>
<p>When using AI in education, be transparent with students about what is and isn't allowed. AI can assist educators in creating materials, but students using AI must follow academic integrity policies. Design assessments that focus on process, analysis, and in-class demonstration rather than easily AI-generated output. The goal is using AI to enhance teaching, not to replace authentic learning.</p>
        `,
        templates: [
          `You are an instructional designer. Create a [DURATION] lesson plan on [TOPIC] for [GRADE/LEVEL] following [FRAMEWORK: UbD/Bloom's]. Standards: [STANDARDS]. Structure: Hook, Direct Instruction, Guided Practice, Independent Practice, Closure. Include: differentiation for [SPECIFIC NEEDS], formative assessments, materials list. Learning objective at [BLOOM'S LEVEL].`,
          `You are an assessment specialist. Create a [N]-question [SUBJECT] assessment for [GRADE] with: difficulty distribution [EASY/MED/HARD], Bloom's alignment, content coverage [TOPICS], question types [TYPES]. Quality requirements: [DISTRACTOR SPECIFICATIONS, RUBRICS]. Include answer key with explanations.`,
          `You are a corporate instructional designer. Create a [DURATION] training module on [TOPIC] for [AUDIENCE]. Learning objectives (ABCD format): [OBJECTIVES]. Include: [N] interactive scenarios with feedback, company policy integration, knowledge check with passing score. Compliance context: [REQUIREMENTS]. Accessibility: [NEEDS].`
        ],
        keyTakeaways: [
          "Educational prompts must account for learning science: Bloom's Taxonomy, cognitive load, scaffolding, and spaced repetition",
          "Use established instructional design frameworks (UbD, ABCD objectives) to structure educational AI prompts",
          "Differentiation prompts should specify accommodations for specific learner needs (ELL, ADHD, dyslexia)",
          "Assessment prompts need precise difficulty distribution, Bloom's alignment, and quality specifications for distractors",
          "Corporate training must balance engagement with compliance requirements and include scenario-based practice"
        ],
        practiceExercise: "Choose a topic you could teach (work-related or academic). Write an instructional design prompt using the UbD framework with a Bloom's Taxonomy learning objective at the 'Analyze' level or higher. Include differentiation for at least two learner needs. Generate the lesson plan and evaluate whether the activities genuinely assess the stated objective."
      },

      // ---------- LESSON 8.4 ----------
      {
        id: "8-4",
        title: "Finance & Accounting",
        duration: "11 min",
        content: `
<h3>AI in Finance: Precision Meets Speed</h3>
<p>Finance professionals handle enormous volumes of data, complex regulations, and high-stakes decisions. AI can accelerate financial analysis, automate reporting, assist with compliance, and enhance forecasting — but financial accuracy is non-negotiable. This lesson teaches you how to build prompts for financial modeling, variance analysis, regulatory compliance, investment research, and client communication while maintaining the precision that finance demands.</p>

<h3>Financial Prompt Precision Requirements</h3>
<p>Financial prompts require a higher standard of precision than most domains. Every number must be traceable, every assumption must be explicit, and every projection must include confidence intervals or sensitivity analysis. The prompt must specify: the accounting standards in use (GAAP, IFRS), the currency and reporting period, the level of rounding, whether to use actual or pro forma figures, and what disclaimers to include.</p>

<p>The mechanism is constrained numerical reasoning. When you specify accounting standards and calculation methods, the AI applies the correct formulas and conventions. Without these constraints, the AI may use simplified or incorrect calculations. The prompt acts as a calculation specification that ensures consistency and compliance.</p>

<h3>Financial Analysis Prompts</h3>
<p>For financial analysis, structure prompts with: the data provided (or data structure if requesting a template), the analysis type (ratio analysis, trend analysis, variance analysis, DCF modeling), the benchmarks or comparables, the output format (table, chart description, narrative), and the intended audience (CFO, board, investors, regulators). Always ask for assumptions to be stated explicitly.</p>

<div class="example-box">
  <h4>Example 1: Financial Ratio Analysis</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Analyze this company's financial health."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a financial analyst performing a comprehensive ratio analysis. I will provide financial statement data for FY2023 and FY2024.

ANALYSIS PARAMETERS:
- Accounting standard: US GAAP
- Currency: USD (in thousands)
- Industry: Software as a Service (B2B)
- Company stage: Growth stage, $45M ARR, 5 years since founding
- Benchmark sources: Public SaaS comparables (Datadog, Twilio, HubSpot at similar revenue stages)

CALCULATE AND ANALYZE:

1. PROFITABILITY RATIOS
   - Gross margin, Operating margin, EBITDA margin, Net margin
   - Calculate for both years and show year-over-year change
   - Compare to SaaS industry medians (Gross margin: 70-75%, Operating margin: -10% to +15% depending on growth stage)

2. LIQUIDITY RATIOS
   - Current ratio, Quick ratio, Cash ratio
   - Working capital analysis

3. EFFICIENCY RATIOS
   - AR turnover and Days Sales Outstanding (DSO)
   - Revenue per employee
   - Magic Number (Net New ARR / S&M spend)
   - Rule of 40 score (Growth % + FCF margin %)

4. LEVERAGE RATIOS
   - Debt-to-equity, Debt-to-EBITDA, Interest coverage

5. VALUATION METRICS (if applicable)
   - Revenue multiple implied by last funding round
   - Comparables-based valuation range

OUTPUT FORMAT:
- Summary table: Ratio | FY2023 | FY2024 | Industry Benchmark | Assessment (Strong/Moderate/Weak)
- Narrative analysis: 3-4 paragraphs highlighting strengths, concerns, and trends
- Red flags: Any ratios indicating potential financial distress
- Recommendations: 2-3 specific actions to improve financial position

DISCLAIMER: Include 'This analysis is based on provided data and industry benchmarks. It does not constitute investment advice. All figures should be verified against official financial statements.'

ASSUMPTIONS: List all assumptions made in calculations."
        </div>
  <p><strong>Why this works:</strong> This prompt specifies the accounting standard, currency, industry context, and growth stage — all critical for selecting the right benchmarks. It requests specific SaaS metrics (Magic Number, Rule of 40) that general financial analysis might miss. The output format with benchmark comparison makes the analysis immediately actionable for a CFO or board member.</p>
</div>

<div class="example-box">
  <h4>Example 2: Variance Analysis Report</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Why did we go over budget this quarter?"</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a FP&A analyst preparing a quarterly variance analysis for the CFO. I will provide Q3 2024 actuals vs. budget.

ANALYSIS FRAMEWORK:

1. SUMMARY SECTION
   - Total variance: Actual vs. Budget (both absolute $ and %)
   - Direction: Favorable or Unfavorable for each category
   - Top 3 largest variances by absolute dollar amount

2. DETAILED VARIANCE BY DEPARTMENT
   For each department (Revenue, COGS, R&D, S&M, G&A):
   - Line-item variance table: Line Item | Budget | Actual | Variance $ | Variance % | Fav/Unfav
   - Variance threshold: Highlight any line item with >10% variance or >$50K absolute variance
   - Trend: Compare to Q2 2024 (sequential analysis)

3. ROOT CAUSE ANALYSIS
   For each significant variance (>10% or >$50K):
   - Likely cause categories: [Volume/Price/Mix for revenue], [Headcount/Timing/Rates for expenses]
   - Request for explanation: Specific questions to ask department heads
   - Impact assessment: One-time vs. structural (will it continue?)

4. FORECAST IMPLICATIONS
   - Revised full-year outlook based on Q3 actuals
   - Risk-adjusted scenario: If top 3 variances persist, what's the full-year impact?
   - Recommendations for Q4 action

5. MANAGEMENT PRESENTATION SUMMARY
   - 5-slide outline for presenting to executive team
   - Key messages: What they need to know, what decisions are needed

REQUIREMENTS:
- Use accounting conventions: Favorable = positive for revenue, negative for expenses
- Include a methodology note explaining calculation approach
- Flag any data quality issues (missing line items, obvious errors)
- Tone: Professional, objective, no blame language — focus on facts and forward-looking actions"
        </div>
  <p><strong>Why this works:</strong> Variance analysis is a core FP&A function. This prompt structures the analysis into summary, detail, root cause, forecast implications, and presentation preparation — the complete workflow a CFO expects. The threshold criteria (>10% or >$50K) focus attention on material items. The one-time vs. structural classification is critical for forecasting accuracy.</p>
</div>

<div class="example-box">
  <h4>Example 3: Investment Memo Structure</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Should I invest in Tesla stock?"</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are an equity research assistant preparing an investment thesis framework. I am analyzing Tesla (TSLA) for potential inclusion in a growth-oriented portfolio.

RESEARCH FRAMEWORK (following institutional equity research standards):

1. COMPANY OVERVIEW
   - Business model breakdown by segment (Automotive, Energy, Services)
   - Revenue and margin profile by segment
   - Key competitive advantages (moat analysis)

2. INDUSTRY CONTEXT
   - EV market size, growth rate, and penetration trajectory
   - Competitive landscape: Market share of top 5 EV manufacturers
   - Regulatory tailwinds/headwinds (emissions standards, subsidies, tariffs)
   - Technology disruption risks (battery tech, autonomous driving)

3. FINANCIAL ANALYSIS
   - 5-year revenue and earnings trajectory
   - Key metrics: Gross margin trend, FCF generation, capex intensity, R&D spend
   - Balance sheet strength: Cash position, debt maturity profile
   - Valuation: P/E, P/S, EV/EBITDA vs. auto industry and vs. tech growth companies

4. BULL CASE ($XXX price target)
   - Key assumptions: [FSD autonomy, energy scaling, robotaxi]
   - Implied valuation metrics at bull case
   - Probability assessment (High/Med/Low) with reasoning

5. BEAR CASE ($XXX price target)
   - Key risks: [Competition, margin compression, regulatory]
   - Implied valuation metrics at bear case
   - Probability assessment with reasoning

6. SCENARIO ANALYSIS
   - Base case assumptions and price target
   - Sensitivity table: How does valuation change with ±20% revenue growth and ±5% margin assumptions?

7. CATALYST CALENDAR
   - Upcoming events that could move the stock: earnings dates, product launches, regulatory decisions

OUTPUT FORMAT: Professional equity research memo structure with clear section headers, data tables, and risk disclosures.

MANDATORY DISCLAIMER: 'This analysis is for educational and informational purposes only. It does not constitute investment advice. Past performance does not guarantee future results. All investments carry risk of loss. Consult a qualified financial advisor before making investment decisions.'

DATA SCOPE: Use publicly available information only. Do not reference non-public material information."
        </div>
  <p><strong>Why this works:</n> Investment analysis requires a structured framework that covers bull/bear/base cases with explicit assumptions and probabilities. The sensitivity analysis table shows how valuation changes with key variable shifts. The catalyst calendar is actionable for timing decisions. The mandatory disclaimer and public-information-only constraint ensure regulatory compliance.</p>
</div>

<h3>Financial AI Best Practices</h3>
<p>Always verify AI-generated calculations independently — LLMs can make arithmetic errors. State all assumptions explicitly. Include appropriate disclaimers on all financial analysis. Use AI for structure, analysis frameworks, and narrative, but verify every number. And never use AI-generated financial advice without human expert review.</p>
        `,
        templates: [
          `You are a [FINANCIAL ANALYST/FP&A ANALYST/EQUITY RESEARCHER]. Perform [ANALYSIS TYPE] on [COMPANY/DATA]. Standard: [GAAP/IFRS]. Currency: [CURRENCY]. Period: [TIME]. Calculate: [SPECIFIC RATIOS/METRICS]. Output: [TABLE FORMAT + NARRATIVE]. Include: benchmark comparison, trend analysis, assumptions list. Disclaimer required.`,
          `You are an FP&A analyst. Prepare a [PERIOD] variance analysis comparing [ACTUALS] to [BUDGET]. Framework: summary, detailed line-item variance (>10% or >$[THRESHOLD] highlighted), root cause categories, forecast implications, presentation outline. Accounting conventions: [FAVORABLE/UNFAVORABLE DEFINITION].`,
          `You are an equity research assistant. Prepare an investment thesis framework for [COMPANY] following institutional standards: company overview, industry context, financial analysis, bull/bear/base cases with assumptions and probabilities, scenario sensitivity table, catalyst calendar. Public information only. Investment disclaimer required.`
        ],
        keyTakeaways: [
          "Financial prompts require precision: accounting standards, currency, reporting period, rounding rules, and calculation methods",
          "Always ask for explicit assumptions, benchmark comparisons, and trend analysis in financial prompts",
          "Include appropriate disclaimers on all financial analysis — AI output does not constitute financial advice",
          "Verify all AI-generated calculations independently — LLMs can make arithmetic errors",
          "Investment analysis frameworks should cover bull/bear/base cases with explicit assumptions and probability assessments"
        ],
        practiceExercise: "Choose a financial analysis task relevant to your work (budget variance, ratio analysis, or investment screening). Write a detailed financial prompt specifying accounting standards, metrics to calculate, benchmark comparisons, and output format. Generate the analysis and verify at least 3 calculations independently."
      },

      // ---------- LESSON 8.5 ----------
      {
        id: "8-5",
        title: "Real Estate & Property",
        duration: "10 min",
        content: `
<h3>AI in Real Estate: Data-Driven Decisions</h3>
<p>Real estate is fundamentally an information business — success depends on analyzing market data, understanding property valuations, crafting compelling listings, and navigating complex transactions. AI can assist with market analysis, property descriptions, investment analysis, lease review, and client communication. This lesson teaches you how to build real estate prompts that produce accurate, compliant, and actionable output for agents, investors, property managers, and developers.</p>

<h3>Real Estate Prompt Fundamentals</h3>
<p>Real estate prompts must account for three unique factors: (1) Hyperlocality — real estate is intensely local, and prompts must specify the exact market area, (2) Regulatory environment — disclosure requirements, fair housing laws, and licensing regulations vary by jurisdiction, and (3) Dual audiences — the same information often needs to be presented differently to buyers, sellers, investors, and lenders. Effective real estate prompts specify the property type, location, intended use, audience, and any regulatory constraints.</p>

<h3>Market Analysis Prompts</h3>
<p>Market analysis prompts need specific geographic boundaries, time frames, property type filters, and data sources. Always specify whether you want comparable sales (comps), active listings, pending sales, or a combination. Include property characteristics that affect comparability: square footage, lot size, bedrooms/bathrooms, year built, condition, and neighborhood features.</p>

<div class="example-box">
  <h4>Example 1: Comparative Market Analysis (CMA)</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"What's the value of a 3-bedroom house in Austin?"</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a real estate analyst preparing a Comparative Market Analysis (CMA). I need to estimate the market value of a subject property for a listing presentation.

SUBJECT PROPERTY:
- Address: [Address in 78704 zip code, Austin TX — near Zilker Park]
- Property type: Single-family detached
- Bedrooms: 3 | Bathrooms: 2.5
- Square footage: 2,150 (per tax records)
- Lot size: 6,500 sq ft
- Year built: 1985
- Condition: Recently renovated (2023) — new kitchen, bathrooms, flooring
- Features: Open floor plan, covered patio, 2-car garage, mature trees

CMA REQUIREMENTS:
1. COMP SELECTION CRITERIA
   - Geography: Within 0.5 miles of subject, same zip code
   - Sold within last 90 days (prioritize 30-60 day sales)
   - Property type: Single-family detached only (no condos, townhomes)
   - Size range: 1,800 - 2,500 sq ft
   - Age range: 1975-1995 (or renovated within 5 years if newer)

2. ADJUSTMENT ANALYSIS
   For each comp, provide:
   - Sale price and price per sq ft
   - Key differences from subject (size, condition, lot, features)
   - Estimated adjustments (up/down) for each difference
   - Adjusted sale price

3. VALUE RECONCILIATION
   - Sales comparison approach value range
   - Weight given to each comp (most similar = highest weight)
   - Final estimated value range and single point estimate
   - Confidence level (High/Medium/Low) with reasoning

4. MARKET CONDITIONS
   - Current inventory levels in 78704 (buyer's vs. seller's market)
   - Days on market trend
   - Price trend: Are prices rising, stable, or declining?
   - Any seasonal factors affecting current value

5. LISTING STRATEGY IMPLICATIONS
   - Recommended listing price range
   - Pricing strategy: At market, 5% below for multiple offers, or aspirational?
   - Expected days on market at recommended price

FAIR HOUSING COMPLIANCE: Ensure all analysis is based on property characteristics only. Do not reference demographic data, school ratings, or neighborhood desirability in ways that could violate fair housing laws.

DISCLAIMER: Include 'This CMA is prepared for informational purposes and does not constitute an appraisal. All value estimates should be verified by a licensed appraiser or real estate professional familiar with the local market.'"
        </div>
  <p><strong>Why this works:</strong> This CMA prompt provides complete property details, specific comp selection criteria, a structured adjustment methodology, value reconciliation, market conditions, and listing strategy implications. The fair housing compliance instruction prevents potentially discriminatory analysis. The 90-day sale window with 30-60 day priority ensures current market relevance.</p>
</div>

<div class="example-box">
  <h4>Example 2: Property Listing Description</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Write a listing description for my house."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a real estate copywriter creating a compelling property listing description.

PROPERTY DETAILS:
- Type: Single-family home, 2,800 sq ft
- Location: Coastal California, 0.3 miles from beach access
- Bedrooms: 4 | Bathrooms: 3
- Key features: Ocean views from master suite and deck, updated kitchen with quartz countertops and Viking appliances, open-concept living area with vaulted ceilings, backyard with fire pit and drought-resistant landscaping, attached 2-car garage with EV charger, smart home features (Nest thermostat, Ring doorbell, Lutron lighting)
- Recent updates: New roof (2022), HVAC replaced (2023), interior paint (2024)
- Lot: 8,000 sq ft with mature landscaping
- Community: Quiet cul-de-sac, no HOA

WRITING REQUIREMENTS:
- Headline: Under 80 characters, compelling, feature the ocean view
- Opening: Hook the reader in the first sentence with lifestyle, not just facts
- Body: 150-200 words. Lead with emotional appeal, follow with key features woven into narrative
- Structure: Lifestyle hook → Key features (grouped by living/entertaining/relaxing) → Location benefits → Call to action
- Tone: Warm, sophisticated, aspirational but not pretentious
- Fair Housing: Do NOT mention: schools, demographics, religious institutions, or 'family-friendly' language. Do NOT use words like 'perfect for families,' 'quiet neighborhood,' or 'safe area'
- SEO: Naturally include: 'ocean view home,' 'coastal living,' 'updated kitchen,' [city name] real estate
- Format: Headline in ALL CAPS, body in paragraphs with clear structure

WHAT TO AVOID:
- Excessive capitalization or exclamation points
- Overused phrases: 'must-see,' 'won't last,' 'diamond in the rough'
- Claiming something is 'the best' or 'luxury' unless justified
- ALL CAPS in body text"
        </div>
  <p><strong>Why this works:</strong> Listing descriptions must balance emotional appeal with factual accuracy and fair housing compliance. This prompt provides detailed property features, specifies the narrative structure (lifestyle hook → features → location → CTA), includes fair housing constraints, adds SEO requirements, and explicitly prohibits overused real estate cliches. The result is a listing that attracts buyers without creating compliance risk.</p>
</div>

<div class="example-box">
  <h4>Example 3: Investment Property Analysis</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Is this rental property a good investment?"</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a real estate investment analyst performing due diligence on a rental property acquisition.

PROPERTY PARAMETERS:
- Property: 4-unit multifamily building
- Location: [Midwest city, emerging neighborhood with new light rail station planned for 2026]
- Purchase price: $485,000
- Financing: 25% down, 6.5% interest, 30-year fixed
- Current rents: $950/unit/month (all 4 units occupied, below market)
- Operating expenses provided: Property tax ($8,200/year), Insurance ($3,600/year), Maintenance reserve ($200/unit/month), Property management (8% of gross rents), Utilities (owner-paid water: $150/month), Vacancy reserve (5% of gross potential rent)
- Capital improvements needed: $25,000 (roof repair, unit updates)

ANALYSIS FRAMEWORK:

1. INCOME ANALYSIS
   - Current gross rental income vs. market rent potential
   - Lease expiration schedule and renewal strategy
   - Other income opportunities (laundry, parking, pet fees)

2. EXPENSE ANALYSIS
   - Total operating expenses and expense ratio
   - Comparison to market norms (typical multifamily expense ratio: 35-45% of EGI)
   - Capital expenditure planning

3. CASH FLOW ANALYSIS
   - Monthly and annual cash flow (before and after tax)
   - Debt service coverage ratio
   - Cash-on-cash return
   - Cap rate (based on asking price and NOI)

4. RETURNS ANALYSIS
   - Year 1 projections with current rents
   - Year 3 projections with market rents after renovations
   - 5-year holding period IRR under conservative, base, and optimistic scenarios
   - Equity build-up over 5 years through loan paydown

5. RISK ASSESSMENT
   - Market risks: oversupply, economic downturn, rent control legislation
   - Property risks: deferred maintenance, tenant quality, environmental
   - Financing risks: interest rate changes on refinance
   - Mitigation strategies for top 3 risks

6. SENSITIVITY ANALYSIS
   - Table showing cash-on-cash return at different rent levels (current, +10%, +20%)
   - Table showing impact of interest rate changes (5.5%, 6.5%, 7.5%)
   - Break-even occupancy rate

7. INVESTMENT RECOMMENDATION
   - Go/No-Go with conditions
   - Maximum offer price for target returns
   - Top 3 due diligence items before closing

DISCLAIMER: 'This analysis is for informational purposes and does not constitute investment advice. All projections are estimates. Actual returns may vary. Consult a qualified financial advisor, tax professional, and real estate attorney before making investment decisions.'"
        </div>
  <p><strong>Why this works:</strong> Investment analysis requires comprehensive financial modeling. This prompt requests all key metrics (cash-on-cash, cap rate, IRR, DSCR), includes sensitivity analysis for key variables, assesses risks with mitigation strategies, and provides a clear recommendation framework. The 5-year holding period analysis with equity build-up shows the full investment picture beyond just cash flow.</p>
</div>

<h3>Real Estate AI Best Practices</h3>
<p>Always verify AI-generated market data against MLS data or public records. Include fair housing compliance constraints in all listing and market analysis prompts. Specify local market conditions rather than national trends. And remember that AI cannot replace local market expertise — use it as a tool to accelerate analysis, not to eliminate professional judgment.</p>
        `,
        templates: [
          `You are a real estate [ANALYST/AGENT/COPYWRITER]. Prepare a [CMA/LISTING/ANALYSIS] for [PROPERTY TYPE] in [LOCATION]. Subject property: [DETAILS]. Comp criteria: [SELECTION RULES]. Structure: [SECTIONS]. Fair housing compliance required. Disclaimer required.`,
          `You are a real estate copywriter. Create a [LISTING DESCRIPTION/MARKETING COPY] for [PROPERTY]. Details: [FEATURES]. Requirements: [WORD COUNT], [TONE], SEO keywords: [TERMS], Fair housing: [CONSTRAINTS]. Avoid: [BANNED PHRASES/WORDS].`,
          `You are a real estate investment analyst. Analyze [PROPERTY TYPE] acquisition at $[PRICE]. Financing: [TERMS]. Current rents: [AMOUNTS]. Expenses: [BREAKDOWN]. Calculate: cash flow, cap rate, cash-on-cash, IRR, DSCR. Include: sensitivity analysis, risk assessment with mitigations, scenario projections. Investment disclaimer required.`
        ],
        keyTakeaways: [
          "Real estate prompts must account for hyperlocality, regulatory environment, and dual audience needs",
          "CMA prompts need specific comp selection criteria, adjustment methodology, and value reconciliation",
          "Listing descriptions must balance emotional appeal with fair housing compliance constraints",
          "Investment analysis requires comprehensive financial modeling with sensitivity analysis and risk assessment",
          "Always verify AI-generated market data against MLS or public records — never rely solely on AI for pricing decisions"
        ],
        practiceExercise: "Choose a real estate scenario (listing a property, analyzing a market, or evaluating an investment). Write a detailed prompt specifying property details, location, audience, regulatory constraints, and required output format. Generate the analysis and evaluate whether it meets professional standards for your market."
      }
    ]
  },


  // ============================================================
  // MODULE 9 — BUILDING YOUR PROMPT LIBRARY
  // ============================================================
  {
    module: 9,
    title: "Building Your Prompt Library",
    description: "Develop a professional prompt management system with organization, version control, team collaboration, testing frameworks, and documentation standards that scale.",
    lessons: [

      // ---------- LESSON 9.1 ----------
      {
        id: "9-1",
        title: "Organization & Tagging",
        duration: "8 min",
        content: `
<h3>From Scattered Notes to Systematic Library</h3>
<p>Most prompt engineers start with a collection of scattered notes, copied prompts, and half-remembered techniques. As your prompt engineering practice grows, this chaos becomes a liability. You cannot find the right prompt when you need it, you forget why certain prompts work, and you recreate the same prompts repeatedly. This lesson teaches you how to build a systematic prompt library — an organized, searchable, maintainable collection of prompts that scales with your needs.</p>

<h3>The Library Architecture</h3>
<p>A professional prompt library has three layers: (1) The Collection — where prompts are stored, (2) The Taxonomy — how prompts are organized and tagged, and (3) The Retrieval System — how you find the right prompt quickly. Each layer must be designed intentionally. A library with great prompts but poor organization is nearly as useless as no library at all.</p>

<p>The collection layer is your storage infrastructure. Options range from simple (a well-organized folder of text files) to sophisticated (dedicated prompt management tools like PromptLayer, LangChain Hub, or a custom database). The key requirement is that it must be easy to add, edit, and search prompts. For individuals, a Notion database or Git repository often suffices. For teams, a shared platform with access controls becomes essential.</p>

<h3>Designing Your Taxonomy</h3>
<p>The taxonomy is the most important design decision. A good taxonomy has 3-5 dimensions that cover how you actually search for prompts. Common dimensions include: Domain (marketing, engineering, legal), Task Type (generation, analysis, transformation, classification), Model Target (GPT-4, Claude, Gemini, Midjourney), Complexity (simple, intermediate, advanced), and Effectiveness Rating (proven, experimental, draft). The key principle: design your taxonomy around how you search, not how you would theoretically organize.</p>

<div class="example-box">
  <h4>Example 1: Tagging Schema Design</h4>
  <p><strong>BEFORE (Bad Prompt/Library Practice):</strong></p>
  <div class="code-block">"I'll just save my prompts in a document with titles like 'Good email prompt' and 'Code helper.'"</div>
  <p><strong>AFTER (Improved Prompt/Library Practice):</strong></p>
  <div class="code-block">"You are designing a prompt library taxonomy for a marketing team of 8 people who use AI for content creation, SEO, email campaigns, social media, and data analysis.

Design a 4-dimensional tagging schema:

DIMENSION 1 — DOMAIN (What business area?)
- content-creation, seo, email-marketing, social-media, data-analysis, strategy, client-communication

DIMENSION 2 — TASK TYPE (What does the prompt DO?)
- generate: Creates new content from scratch
- transform: Modifies existing content (rewrite, summarize, expand)
- analyze: Extracts insights from data or text
- classify: Categorizes or labels content
- research: Gathers and synthesizes information
- review: Checks quality, accuracy, or compliance

DIMENSION 3 — MODEL TARGET (What AI system is this optimized for?)
- gpt-4, claude-sonnet, gemini-pro, midjourney, dall-e, multi-model

DIMENSION 4 — COMPLEXITY & STATUS
- complexity: simple (single-shot), intermediate (multi-step), advanced (chained with conditional logic)
- status: proven (tested and validated), experimental (being tested), draft (idea stage)

TAGGING RULES:
- Every prompt must have at least 1 tag from each dimension
- Maximum 2 tags per dimension per prompt
- Use consistent kebab-case formatting
- Include a 'favorites' tag for frequently used prompts

METADATA SCHEMA:
Each prompt entry should include:
- Title (descriptive, under 60 characters)
- Description (1-2 sentences explaining what it does and when to use it)
- Tags (from the schema above)
- Created date and author
- Last tested date and model version
- Effectiveness rating (1-5 stars with brief notes on what works)
- Related prompts (linked references)
- Example output (brief sample of what this prompt produces)

Search strategy: Design 3 common search scenarios and show how the taxonomy helps find the right prompt quickly."
        </div>
  <p><strong>Why this works:</strong> This prompt designs a complete 4-dimensional taxonomy that covers domain, task type, model target, and complexity/status. The tagging rules prevent tag sprawl. The metadata schema ensures each prompt entry has enough context to be usable by others. The search strategy section validates that the taxonomy actually supports real use cases.</p>
</div>

<div class="example-box">
  <h4>Example 2: Library Entry Template</h4>
  <p><strong>BEFORE (Bad Prompt/Library Practice):</strong></p>
  <div class="code-block">"Saved as: 'Email prompt' — Content: 'Write a professional email about [topic]'"</div>
  <p><strong>AFTER (Improved Prompt/Library Practice):</strong></p>
  <div class="code-block">"Create a standardized prompt library entry template that captures all information needed for a prompt to be discoverable, understandable, and maintainable.

PROMPT ENTRY TEMPLATE:

# [PROMPT TITLE]
  <pre><code>
[PROMPT ID: domain-task-number, e.g., email-marketing-generate-001]
  <pre><code>

## Quick Info
| Field | Value |
|-------|-------|
| Domain | [domain-tag] |
| Task Type | [task-type-tag] |
| Model Target | [model-tag] |
| Complexity | simple / intermediate / advanced |
| Status | proven / experimental / draft |
| Rating | ⭐⭐⭐⭐⭐ |
| Author | [name] |
| Created | [YYYY-MM-DD] |
| Last Tested | [YYYY-MM-DD] |

## Description
[2-3 sentences: What does this prompt do? When should you use it? What problem does it solve?]

## Prompt Template
\`\`\`
[The full prompt text with fill-in variables marked as [VARIABLE_NAME]]
\`\`\`

## Variables
| Variable | Description | Example Value | Required? |
|----------|-------------|---------------|-----------|
| [VARIABLE] | [What goes here] | [Example] | Yes/No |

## Example Usage
**Input:** [Example filled-in prompt]
**Output:** [Brief example of what the AI produces]

## Why This Works
[1-2 sentences on the prompt engineering technique used: role assignment, chain-of-thought, few-shot, etc.]

## Known Limitations
- [What this prompt doesn't do well]
- [Edge cases where it fails]
- [Model-specific quirks]

## Related Prompts
- [link to related prompt 1] — [brief relationship description]
- [link to related prompt 2]

## Version History
| Date | Change | Author |
|------|--------|--------|
| YYYY-MM-DD | Initial version | [name] |
| YYYY-MM-DD | [What changed and why] | [name] |

## Testing Notes
[Notes from actual usage: what worked, what needed tweaking, model performance differences]"
        </div>
  <p><strong>Why this works:</strong> This standardized template ensures every prompt in the library has complete context: what it does, how to use it, what variables to fill in, example output, why it works, known limitations, related prompts, version history, and testing notes. A new team member can pick up this prompt and use it effectively without asking questions.</p>
</div>

<div class="example-box">
  <h4>Example 3: Library Search and Discovery</h4>
  <p><strong>BEFORE (Bad Prompt/Library Practice):</strong></p>
  <div class="code-block">"I'll just scroll through my documents when I need a prompt."</div>
  <p><strong>AFTER (Improved Prompt/Library Practice):</strong></p>
  <div class="code-block">"You are designing a prompt discovery system for a team of 12 prompt engineers with 500+ prompts in their library.

Design a multi-modal search system:

1. FACETED SEARCH
   Users should be able to filter by any combination of:
   - Domain (checkbox multi-select)
   - Task Type (checkbox multi-select)
   - Model Target (dropdown)
   - Complexity (slider or radio buttons)
   - Status (checkbox)
   - Rating (minimum stars)
   - Date range (last tested within X days)

2. FULL-TEXT SEARCH
   Search across: prompt titles, descriptions, prompt content, variable names, and testing notes. Support partial matching and common synonyms (e.g., 'email' matches 'e-mail').

3. USE-CASE SEARCH
   A natural language query interface where users describe what they're trying to accomplish:
   - Input: 'I need to write a cold outreach email for SaaS sales'
   - System matches against: domain=email-marketing, task-type=generate, complexity=intermediate, plus keyword matching
   - Output: Ranked list of 5 most relevant prompts with match score

4. BROWSE BY WORKFLOW
   Organize prompts into common workflow sequences:
   - 'Content Creation Pipeline': research → outline → draft → edit → optimize
   - 'Sales Outreach Sequence': prospect research → cold email → follow-up 1 → follow-up 2 → break-up
   - 'Code Review Workflow': generate → test → review → document → deploy
   Users can browse workflows and see which prompts connect to each step.

5. RECOMMENDATION ENGINE
   Based on: prompts used recently, prompts used by similar team members, and popular prompts in similar domains. Surface 'You might also need...' suggestions.

Implementation priority: Rank by ease of implementation vs. impact. Which features should be built first for maximum value?"
        </div>
  <p><strong>Why this works:</strong> Discovery is the hardest part of prompt library management at scale. This prompt designs a 5-mode search system that covers different search behaviors: precise filtering (faceted), keyword search (full-text), intent-based (use-case), sequential (workflow), and serendipitous (recommendation). The implementation priority question ensures practical focus.</p>
</div>

<h3>Tools for Prompt Libraries</h3>
<p>For individual use: Notion databases, Obsidian with tags, GitHub repositories with Markdown files, or specialized tools like PromptLayer. For teams: LangChain Hub, internal wikis with structured templates, or custom-built solutions. The key is choosing a tool your team will actually use — the best taxonomy is worthless if people don't add prompts to the library.</p>
        `,
        templates: [
          `Design a [N]-dimensional tagging schema for a prompt library used by [TEAM DESCRIPTION] for [USE CASES]. Dimensions: [LIST WITH OPTIONS]. Tagging rules: [CONSTRAINTS]. Include metadata schema and search strategy.`,
          `Create a standardized prompt library entry template with sections for: quick info (tags, rating, status), description, prompt template with [VARIABLES] marked, variable definitions, example usage, why it works, known limitations, related prompts, version history, testing notes.`,
          `Design a prompt discovery system with: faceted search, full-text search, use-case natural language search, workflow browsing, and recommendation engine. Specify implementation priority by ease vs. impact.`
        ],
        keyTakeaways: [
          "A prompt library has three layers: collection (storage), taxonomy (organization), and retrieval (search)",
          "Design your taxonomy around how you actually search, not theoretical categories — 3-5 dimensions is optimal",
          "Every prompt entry needs complete context: description, variables, example, limitations, and version history",
          "Discovery systems need multiple search modes: faceted filtering, full-text, use-case, workflow, and recommendation",
          "Choose a library tool your team will actually use — adoption matters more than feature completeness"
        ],
        practiceExercise: "Audit your current prompt collection (even if it's just scattered notes). Design a 4-dimensional tagging schema that matches how you actually work. Create a standardized entry template. Reformat your 3 best prompts using the template and test whether you can find them quickly using your taxonomy."
      },

      // ---------- LESSON 9.2 ----------
      {
        id: "9-2",
        title: "Version Control for Prompts",
        duration: "8 min",
        content: `
<h3>Treating Prompts Like Code</h3>
<p>Prompts are intellectual property. A well-crafted prompt that generates $100K in business value is an asset worth protecting. Yet most practitioners treat prompts as disposable — tweak, use, lose, repeat. This lesson teaches you how to apply software engineering version control practices to your prompts: tracking changes, understanding what worked and why, rolling back when changes break things, and collaborating without conflicts.</p>

<h3>Why Prompts Need Version Control</h3>
<p>Prompts evolve constantly. You tweak wording to improve output, adapt for new model versions, customize for different clients, and experiment with new techniques. Without version control, you cannot answer critical questions: What changed between v1 and v2? Which version performed better? Who made this change and why? Can we revert to the previous version? Version control transforms prompt engineering from craft to engineering.</p>

<p>The mechanism is identical to code version control: each change is committed with a descriptive message, stored in a repository with full history, and can be branched, merged, or reverted. Git is the most common tool, but the principles apply to any version control system. The key difference from code: prompt commits should include performance notes alongside the change description.</p>

<h3>The Prompt Commit Standard</h3>
<p>A prompt commit message should include: what changed, why it changed, and how it performed. This performance context is unique to prompts and critical for iterative improvement.</p>

<div class="example-box">
  <h4>Example 1: Prompt Version Control Workflow</h4>
  <p><strong>BEFORE (Bad Prompt/Practice):</strong></p>
  <div class="code-block">"I updated the email prompt and saved it as 'email_prompt_v2_final_ACTUAL_FINAL.txt'"</div>
  <p><strong>AFTER (Improved Prompt/Practice):</strong></p>
  <div class="code-block">"You are establishing a version control workflow for a team's prompt library. Design the complete workflow:

COMMIT MESSAGE STANDARD:
  <pre><code>
[type]: [Brief description of change]

What changed:
- [Specific change 1]
- [Specific change 2]

Why changed:
- [Business or technical reason]
- [Problem the previous version had]

Performance impact:
- Previous: [baseline metric, e.g., 73% user satisfaction]
- Current: [new metric, e.g., 89% user satisfaction]
- Tested on: [model, date, sample size]

Breaking changes: [Yes/No — does this change affect existing workflows?]
  <pre><code>

VERSION NUMBERING SCHEME:
- MAJOR (X.0.0): Fundamental approach change, different technique, or incompatible with previous usage
- MINOR (x.X.0): Significant improvement, new features, better performance — backward compatible
- PATCH (x.x.X): Wording tweaks, typo fixes, small refinements — no functional change

BRANCHING STRATEGY:
- main: Production-ready prompts that have been validated
- develop: Prompts being tested and refined
- feature/[name]: Experimental variations for specific use cases
- hotfix: Urgent fixes for broken production prompts

PROMPT FILE STRUCTURE:
  <pre><code>
prompts/
  email-marketing/
    cold-outreach/
      v1.0.0.md          # Initial stable version
      v1.1.0.md          # Improved with personalization
      v1.1.1.md          # Wording tweak
      v2.0.0.md          # Major rewrite using chain-of-thought
      latest.md -> v2.0.0.md  # Symlink to current stable
      experiments/
        personalization-test.md
        humor-variant.md
  content-creation/
    blog-posts/
      ...
  <pre><code>

CHANGELOG FORMAT:
For each prompt, maintain a CHANGELOG.md:
  <pre><code>
# Cold Outreach Email Prompt Changelog

## [2.0.0] — 2025-03-15
### Changed
- Complete rewrite using chain-of-thought reasoning
- Added audience research section before email generation
- Switched from single-shot to 3-step pipeline

### Performance
- Response rate: 3.2% → 5.8% (+81%)
- Tested on: GPT-4, 500 emails, 2-week period

## [1.1.0] — 2025-02-20
### Changed
- Added industry-specific personalization variables
- Improved subject line generation with A/B testing framework

### Performance
- Response rate: 2.1% → 3.2% (+52%)
  <pre><code>

REVIEW PROCESS:
Before a prompt moves from develop to main:
1. Peer review: Another engineer tests the prompt and validates performance claims
2. Regression test: Confirm the new version doesn't break existing use cases
3. Documentation update: Variable definitions, examples, and limitations are current
4. Approval: At least one approval required for minor versions, two for major"
        </div>
  <p><strong>Why this works:</strong> This prompt designs a complete version control system for prompts with commit standards, semantic versioning, branching strategy, file structure, changelog format, and a review process. The performance impact section in commits is unique to prompts and essential for iterative improvement. The symlink pattern (latest.md → v2.0.0.md) lets systems always point to the current stable version.</p>
</div>

<div class="example-box">
  <h4>Example 2: Performance Regression Testing</h4>
  <p><strong>BEFORE (Bad Prompt/Practice):</strong></p>
  <div class="code-block">"I think the new version works better, so I'll just use it."</div>
  <p><strong>AFTER (Improved Prompt/Practice):</strong></p>
  <div class="code-block">"You are a prompt quality engineer. Design a regression testing framework for prompt versions.

REGRESSION TEST FRAMEWORK:

1. TEST SUITE STRUCTURE
   For each prompt, maintain a test suite of 10-20 standard inputs that cover:
   - Typical cases (60%): Common, expected inputs
   - Edge cases (25%): Boundary values, unusual but valid inputs
   - Stress cases (15%): Ambiguous, contradictory, or adversarial inputs

2. EVALUATION CRITERIA
   Define 3-5 evaluation dimensions with scoring rubrics:
   - Accuracy (1-5): How correct is the output?
   - Completeness (1-5): Does it cover all aspects of the request?
   - Format compliance (1-5): Does it follow the requested output format?
   - Tone appropriateness (1-5): Is the tone right for the context?
   - Safety (Pass/Fail): Does it violate any guardrails?

3. AUTOMATED EVALUATION
   For measurable criteria, use:
   - JSON schema validation for structured outputs
   - Keyword/regex checks for required elements
   - Length and format validation
   - Hallucination detection via source verification

4. MANUAL EVALUATION
   For subjective criteria, use:
   - Blind comparison: Human raters compare vN vs. vN+1 without knowing which is which
   - Minimum sample: 3 independent raters per test case
   - Inter-rater agreement target: Cohen's kappa > 0.7

5. REGRESSION DETECTION
   Before merging a new prompt version:
   - Run full test suite on both old and new versions
   - Generate comparison report: improved/unchanged/regressed per dimension
   - Block merge if any dimension shows regression > 10%
   - Require sign-off for any intentional trade-offs (e.g., improved accuracy but longer outputs)

6. CONTINUOUS MONITORING
   - In production, sample 5% of actual usage for quality spot-checks
   - Track user satisfaction scores per prompt version
   - Alert if satisfaction drops > 15% week-over-week

REPORT TEMPLATE:
  <pre><code>
Prompt: [Name] | Version: [N+1] vs [N]
Test Date: [Date] | Tester: [Name] | Model: [Version]

| Test Case | Type | v[N] Score | v[N+1] Score | Delta | Status |
|-----------|------|------------|--------------|-------|--------|
| TC-001 | Typical | 4.2 | 4.5 | +0.3 | PASS |
| TC-007 | Edge | 3.8 | 2.1 | -1.7 | REGRESSION |

Summary: [N]/[Total] tests improved, [N] unchanged, [N] regressed
Overall: PASS / PASS WITH NOTES / BLOCKED
Notes: [Any observations or required actions]
  <pre><code>

Design this framework for a customer support response prompt that handles 1000+ tickets daily."
        </div>
  <p><strong>Why this works:</strong> Regression testing prevents the common problem where a "better" prompt actually breaks existing use cases. This framework defines test suite composition (typical/edge/stress ratio), evaluation dimensions, automated and manual evaluation methods, regression detection thresholds, and continuous monitoring. The blind comparison protocol eliminates bias in human evaluation.</p>
</div>

<div class="example-box">
  <h4>Example 3: Model Version Migration</h4>
  <p><strong>BEFORE (Bad Prompt/Practice):</strong></p>
  <div class="code-block">"GPT-4 Turbo came out so I'll just update my API call and hope the prompts still work."</div>
  <p><strong>AFTER (Improved Prompt/Practice):</strong></p>
  <div class="code-block">"You are managing a prompt migration from GPT-4 to GPT-4 Turbo for a production application with 50+ active prompts. Design a systematic migration process.

MIGRATION PROCESS:

1. PRE-MIGRATION AUDIT
   Document for each prompt:
   - Current model version and API parameters (temperature, max_tokens, etc.)
   - Purpose and business criticality (Critical/Important/Low)
   - Known model-specific behaviors the prompt relies on
   - Recent performance metrics

2. BATCH PRIORITIZATION
   Migrate in batches:
   - Batch 1 (Week 1): Low-criticality prompts — test migration process
   - Batch 2 (Week 2): Important prompts — refine process based on Batch 1 learnings
   - Batch 3 (Week 3): Critical prompts — maximum scrutiny, rollback ready

3. PROMPT ADAPTATION
   For each prompt, check:
   - Has context window changed? Adjust if the prompt was near previous limits
   - Has instruction following improved? May be able to simplify complex prompts
   - Has formatting behavior changed? Verify JSON, Markdown, and structured outputs
   - Has safety filtering changed? Test edge cases that were previously borderline
   - Update system prompts if model personality/tone has shifted

4. VALIDATION PROTOCOL
   For each migrated prompt:
   - Run the regression test suite (from previous framework)
   - Test 5 novel inputs that weren't in the test suite
   - Verify output format compliance with downstream consumers
   - Check latency and token usage (new model may have different costs)

5. ROLLOUT STRATEGY
   - Shadow mode: Run new model in parallel, compare outputs, don't use results
   - Canary: Route 5% of traffic to new model, monitor error rates
   - Gradual: Increase traffic 20% per day if metrics are healthy
   - Full: Complete migration with rollback plan documented

6. ROLLBACK PLAN
   Document for each prompt:
   - Criteria for rollback (error rate threshold, satisfaction score drop)
   - Rollback procedure: revert API version + any prompt changes
   - Estimated rollback time: [target under 15 minutes]
   - Communication plan: who to notify and how

7. POST-MIGRATION REVIEW
   After 30 days:
   - Compare aggregate metrics: quality, latency, cost, error rate
   - Document lessons learned for next migration
   - Archive old prompt versions with deprecation notices
   - Update documentation and variable definitions if behavior changed"
        </div>
  <p><strong>Why this works:</strong> Model migrations are risky events that can break production systems. This prompt designs a systematic 7-phase migration process with audit, prioritization, adaptation, validation, gradual rollout, rollback plans, and post-migration review. The shadow-to-canary-to-gradual rollout pattern is a proven deployment strategy adapted for prompt management.</p>
</div>

<h3>Tools for Prompt Version Control</h3>
<p>Git is the standard for version control. For prompt-specific needs, consider: Git + Markdown files (simple, universal), PromptLayer (commercial, with built-in versioning), LangSmith (for LangChain users), DagsHub (ML-focused with prompt support), or Weights & Biases (experiment tracking that includes prompts). Choose based on your team's existing workflow and the complexity of your prompt operations.</p>
        `,
        templates: [
          `Design a version control workflow for prompts including: commit message standard (what/why/performance), semantic versioning (MAJOR.MINOR.PATCH), branching strategy (main/develop/feature/hotfix), file structure, changelog format, and review process before promotion to production.`,
          `Design a regression testing framework for prompt versions with: test suite structure (typical/edge/stress split), evaluation dimensions with rubrics, automated and manual evaluation protocols, regression detection thresholds, and continuous monitoring. Include report template.`,
          `Design a model migration process for [N] production prompts from [OLD MODEL] to [NEW MODEL] including: pre-migration audit, batch prioritization, prompt adaptation checklist, validation protocol, gradual rollout strategy (shadow→canary→gradual→full), rollback plan, and post-migration review.`
        ],
        keyTakeaways: [
          "Prompts are intellectual property — treat them like code with proper version control",
          "Prompt commits must include performance impact notes: what changed, why, and how it performed",
          "Use semantic versioning for prompts: MAJOR for technique changes, MINOR for improvements, PATCH for tweaks",
          "Regression testing prevents 'improvements' that break existing use cases — test typical, edge, and stress cases",
          "Model migrations need systematic processes with shadow mode, canary deployment, and rollback plans"
        ],
        practiceExercise: "Take your 3 most-used prompts. Apply the version control workflow: write proper commit messages for their current state, create a CHANGELOG, and design a regression test suite with 5 test cases each. Set up a Git repository (or folder structure) and commit your prompts following the standards from this lesson."
      },

      // ---------- LESSON 9.3 ----------
      {
        id: "9-3",
        title: "Team Sharing & Collaboration",
        duration: "8 min",
        content: `
<h3>Scaling Prompt Engineering Across Teams</h3>
<p>A single prompt engineer can be productive. A team of prompt engineers sharing knowledge and building on each other's work can be transformative. But collaboration doesn't happen automatically — it requires shared conventions, clear ownership, quality standards, and communication practices. This lesson teaches you how to build a collaborative prompt engineering culture: establishing team standards, reviewing each other's prompts, sharing discoveries, and maintaining quality as the team grows.</p>

<h3>The Collaboration Framework</h3>
<p>Effective prompt team collaboration has four pillars: (1) Shared Standards — everyone uses the same templates, naming conventions, and documentation formats, (2) Peer Review — prompts are reviewed before being marked as production-ready, (3) Knowledge Sharing — discoveries, techniques, and lessons learned are disseminated regularly, and (4) Clear Ownership — every prompt has a maintainer who understands it deeply and can answer questions about it.</p>

<p>The underlying principle is that prompt engineering is a team sport in production environments. The best prompts are often the result of multiple iterations by multiple people, each bringing different perspectives. A developer might optimize for code correctness, a designer for user experience, a subject matter expert for domain accuracy. Collaboration captures these perspectives systematically.</p>

<h3>Establishing Team Standards</h3>
<p>Team standards prevent the chaos of everyone using their own conventions. Standards should cover: prompt naming conventions, file organization, documentation format, variable naming, testing requirements, approval workflows, and deprecation procedures. The key is writing them down and getting team agreement — even imperfect standards are better than none.</p>

<div class="example-box">
  <h4>Example 1: Prompt Review Process</h4>
  <p><strong>BEFORE (Bad Prompt/Practice):</strong></p>
  <div class="code-block">"Hey, can someone look at my prompt and tell me if it's good?"</div>
  <p><strong>AFTER (Improved Prompt/Practice):</strong></p>
  <div class="code-block">"You are establishing a peer review process for a prompt engineering team of 6 people. Design a structured review workflow:

REVIEW REQUEST TEMPLATE:
  <pre><code>
## Prompt Review Request

**Prompt:** [Link to prompt file]
**Requester:** [Name]
**Review Type:** [New prompt / Major change / Minor update / Experimental]
**Target Model:** [Model and version]
**Business Context:** [What does this prompt do and why does it matter?]
**Success Criteria:** [How will we know this prompt works well?]
**Testing Done:** [What tests has the requester already run?]
**Specific Questions for Reviewers:** [What feedback is most needed?]
  <pre><code>

REVIEW CHECKLIST:
Reviewers evaluate prompts across these dimensions:

□ CLARITY (1-5)
- Is the prompt's purpose immediately clear?
- Are instructions unambiguous?
- Are variable names descriptive and consistent?

□ TECHNIQUE (1-5)
- Is an appropriate prompt engineering technique used?
- Is the technique applied correctly?
- Could a different technique yield better results?

□ COMPLETENESS (1-5)
- Does the prompt handle edge cases?
- Are error conditions addressed?
- Is the output format fully specified?

□ SAFETY (1-5)
- Are appropriate guardrails in place?
- Could the prompt produce harmful, biased, or non-compliant output?
- Are there injection or manipulation vulnerabilities?

□ EFFICIENCY (1-5)
- Is the prompt as concise as possible while being complete?
- Could the same result be achieved with fewer tokens?
- Are there unnecessary instructions that might confuse the model?

□ MAINTAINABILITY (1-5)
- Is the prompt well-documented?
- Would a new team member understand how to use it?
- Are there clear version control and ownership records?

REVIEW WORKFLOW:
1. Requester submits review request with template
2. Automated checks run: formatting, variable consistency, forbidden patterns
3. Peer reviewer assigned (round-robin, excluding requester)
4. Reviewer completes checklist within 48 hours
5. If score >= 4.0 in all dimensions: APPROVE
6. If score 3.0-3.9 in any dimension: REQUEST CHANGES with specific feedback
7. If score < 3.0 in any dimension: NEEDS REDESIGN with detailed guidance
8. Requester addresses feedback, re-submits if needed
9. Approved prompt promoted to production library

ESCALATION:
- Disagreements between requester and reviewer → Team lead mediates
- Major architectural decisions → Team discussion, decision documented
- Safety concerns → Block immediately, escalate to safety team

REVIEW CULTURE GUIDELINES:
- Reviews are about the prompt, not the person
- Suggest improvements, don't just criticize
- Share why a suggestion matters (teach while reviewing)
- Celebrate great prompts — call out excellent work in team meetings"
        </div>
  <p><strong>Why this works:</strong> This prompt designs a complete peer review system with a structured request template, 6 evaluation dimensions with clear criteria, a scoring system with approval thresholds, a defined workflow with SLAs, escalation procedures, and culture guidelines. The separation of prompt from person in the culture guidelines prevents defensiveness and encourages learning.</p>
</div>

<div class="example-box">
  <h4>Example 2: Team Knowledge Sharing System</h4>
  <p><strong>BEFORE (Bad Prompt/Practice):</strong></p>
  <div class="code-block">"I'll just tell people in Slack when I learn something new about prompting."</div>
  <p><strong>AFTER (Improved Prompt/Practice):</strong></p>
  <div class="code-block">"You are building a knowledge sharing system for a prompt engineering team. Design a comprehensive system for capturing and disseminating prompt engineering knowledge.

KNOWLEDGE CATEGORIES:
1. TECHNIQUE DISCOVERIES: New prompting techniques the team has validated
2. MODEL BEHAVIORS: Observations about how specific models respond to different approaches
3. FAILURE MODES: Patterns of prompt failures and how to avoid them
4. DOMAIN PATTERNS: Reusable patterns for specific domains (legal, medical, finance)
5. TOOL UPDATES: Changes to AI platforms, APIs, and tooling

CAPTURE MECHANISMS:

1. WEEKLY PROMPT JOURNAL
   Each team member submits a brief journal entry every Friday:
  <pre><code>
   ## [Name] — Prompt Journal — [Date]
   
   ### What I Built This Week
   - [Prompt/Feature] — [1 sentence description]
   
   ### What I Learned
   - [Technique/Observation] — [Brief explanation with example]
   
   ### What Failed
   - [Attempt] — [Why it didn't work and what was tried]
   
   ### What I Want to Try Next
   - [Idea] — [Brief description]
  <pre><code>

2. TECHNIQUE DOCUMENTATION TEMPLATE
   For validated new techniques:
  <pre><code>
   # Technique: [Name]
   **Discovered by:** [Name] | **Date:** [Date] | **Status:** [Proven/Experimental]
   
   ## How It Works
   [2-3 sentence explanation of the mechanism]
   
   ## When to Use
   [Specific scenarios where this technique excels]
   
   ## When NOT to Use
   [Scenarios where this technique underperforms]
   
   ## Example
   **Without technique:** [Standard prompt and result]
   **With technique:** [Improved prompt and result]
   
   ## Variations
   [Different ways to apply the technique]
   
   ## Evidence
   [Performance data, test results, model-specific notes]
  <pre><code>

3. MODEL BEHAVIOR LOG
   Structured observations about model behavior:
  <pre><code>
   | Model | Date | Observation | Context | Reproducible? |
   |-------|------|-------------|---------|---------------|
   | GPT-4 | 2025-01 | Ignores negative instructions when... | Instruction: "Do NOT..." | Yes, 4/5 tests |
  <pre><code>

4. MONTHLY PROMPT SHOWCASE
   Team meeting agenda:
   - Best prompt of the month (vote)
   - Biggest failure and lesson learned
   - New technique demo (5 minutes)
   - Model update impact report
   - Q&A and open discussion

5. SEARCHABLE KNOWLEDGE BASE
   All knowledge entries tagged and searchable by:
   - Technique type
   - Model target
   - Domain
   - Date range
   - Author
   - Status (proven/experimental/deprecated)

KNOWLEDGE STEWARD ROLE:
- One team member rotates monthly as Knowledge Steward
- Responsible for organizing entries, updating statuses, and archiving outdated content
- Publishes monthly 'State of Prompt Engineering' summary for the team"
        </div>
  <p><strong>Why this works:</strong> Knowledge sharing doesn't happen by accident — it needs structured mechanisms. This system includes weekly individual capture (journal), detailed technique documentation, structured model behavior logging, monthly team showcases, and a searchable knowledge base. The Knowledge Steward role ensures the system stays organized over time. The technique template with "When NOT to Use" is particularly valuable — it prevents misuse of techniques in wrong contexts.</p>
</div>

<div class="example-box">
  <h4>Example 3: Cross-Functional Collaboration</h4>
  <p><strong>BEFORE (Bad Prompt/Practice):</strong></p>
  <div class="code-block">"The prompt engineers just give us prompts and we use them. We don't really talk."</div>
  <p><strong>AFTER (Improved Prompt/Practice):</strong></p>
  <div class="code-block">"You are designing a cross-functional collaboration model between a prompt engineering team and the departments they serve: marketing, customer support, product, and engineering.

COLLABORATION MODEL:

1. PROMINT PARTNERSHIPS (Prompt Liaisons)
   Each department gets a dedicated Prompt Liaison from the prompt engineering team:
   - Meets bi-weekly with department head
   - Understands department goals, pain points, and use cases
   - Translates business needs into prompt engineering tasks
   - Trains 2-3 'prompt champions' within the department
   - Gathers feedback and usage data from the department

2. USE CASE INTAKE PROCESS
  <pre><code>
   Department submits: Use Case Request Form
   ├── Problem description: What business problem needs solving?
   ├── Current approach: How is it handled today? What's the cost?
   ├── Success metrics: How will we measure improvement?
   ├── Data availability: What data can be used in prompts?
   ├── Constraints: Compliance, privacy, latency, cost limits
   ├── Priority: P0 (urgent), P1 (planned), P2 (nice-to-have)
   └── Timeline: When is this needed?
   
   Prompt Engineering team responds within 48 hours with:
   ├── Feasibility assessment
   ├── Estimated effort
   ├── Proposed approach
   └── Timeline commitment
  <pre><code>

3. CO-DESIGN SESSIONS
   For complex use cases, structured 90-minute sessions:
   - 0-15 min: Problem deep-dive with domain experts
   - 15-45 min: Prompt design workshop (collaborative whiteboard)
   - 45-75 min: Prototype testing with real examples
   - 75-90 min: Next steps, ownership, and timeline

4. FEEDBACK LOOP
   After prompt deployment:
   - Week 1: Daily check-ins on output quality
   - Week 2-4: Weekly usage and satisfaction reports
   - Month 2+: Monthly review with metric dashboard
   - Continuous: Feedback submission form (always available)

5. TRAINING AND ENABLEMENT
   - Quarterly 'Prompt Engineering for Non-Engineers' workshop
   - Self-service prompt customization guide (safe modifications)
   - 'Ask Me Anything' office hours (weekly, open to all)
   - Internal newsletter: 'Prompt of the Week' with explanation

6. GOVERNANCE
   - Cross-functional steering committee (monthly)
   - Shared OKRs between prompt engineering and business units
   - Quarterly business impact review with executives
   - Annual 'State of AI' report for the organization

METRICS FOR SUCCESS:
- Time from use case request to production prompt (target: <2 weeks for P1)
- User satisfaction score per department (target: >4.2/5)
- Self-service adoption rate (target: 40% of minor tweaks done by departments)
- Business impact: Cost savings, revenue impact, quality improvement
- Prompt reuse rate across departments (target: >30% of prompts used by multiple teams)"
        </div>
  <p><strong>Why this works:</strong> Cross-functional collaboration is where most prompt engineering teams struggle. This model creates dedicated partnerships (Prompt Liaisons), a structured intake process, co-design sessions for complex cases, continuous feedback loops, training programs, and governance mechanisms. The metrics provide clear targets for the collaboration's effectiveness. The self-service adoption target is particularly important — it scales the team's impact beyond their headcount.</p>
</div>

<h3>Building a Collaborative Culture</h3>
<p>Processes enable collaboration, but culture sustains it. Encourage: sharing failures openly (they teach more than successes), celebrating discoveries, giving credit generously, and maintaining psychological safety. The best prompt engineering teams are learning organizations where everyone improves together.</p>
        `,
        templates: [
          `Design a peer review process for a prompt engineering team including: review request template, evaluation dimensions with rubrics (clarity, technique, completeness, safety, efficiency, maintainability), scoring thresholds, workflow with SLAs, escalation procedures, and culture guidelines.`,
          `Design a knowledge sharing system with: weekly prompt journals, technique documentation template (with 'When NOT to Use'), model behavior log, monthly showcase agenda, searchable knowledge base with tagging, and a rotating Knowledge Steward role.`,
          `Design a cross-functional collaboration model between prompt engineering and business departments including: Prompt Liaison role, use case intake process, co-design sessions, feedback loops, training programs, governance structure, and success metrics.`
        ],
        keyTakeaways: [
          "Prompt team collaboration has four pillars: shared standards, peer review, knowledge sharing, and clear ownership",
          "Peer review should evaluate prompts across 6 dimensions: clarity, technique, completeness, safety, efficiency, and maintainability",
          "Knowledge sharing needs structured capture mechanisms: journals, technique docs, behavior logs, and showcases",
          "Cross-functional collaboration requires dedicated liaisons, structured intake, co-design sessions, and self-service enablement",
          "Build a learning culture where failures are shared openly and discoveries are celebrated generously"
        ],
        practiceExercise: "If you work on a team: Propose a peer review process based on the 6-dimension framework. If you work alone: Design a knowledge sharing system for yourself using the weekly journal and technique documentation templates. Start by documenting your top 3 prompting techniques using the technique template."
      },

      // ---------- LESSON 9.4 ----------
      {
        id: "9-4",
        title: "Testing & Benchmarking",
        duration: "8 min",
        content: `
<h3>Measuring What Matters</h3>
<p>How do you know if your prompt is good? 'It looks right' is not a rigorous answer. Professional prompt engineering requires systematic testing and benchmarking — measuring prompt performance against defined criteria, comparing variations, and tracking improvement over time. This lesson teaches you how to design test suites, create evaluation rubrics, benchmark across models, and build automated testing pipelines for production prompts.</p>

<h3>The Testing Mindset</h3>
<p>Testing prompts is different from testing software. Software has deterministic outputs — the same input always produces the same output. Prompts are probabilistic — the same input may produce different outputs each time. This means prompt testing requires statistical thinking: measuring distributions of outcomes, not single outcomes. A prompt that works once might fail 30% of the time. Your testing must reveal that failure rate.</p>

<p>The testing framework has three levels: (1) Unit Tests — does the prompt handle individual test cases correctly? (2) Integration Tests — does the prompt work end-to-end with real data and downstream systems? (3) Benchmark Tests — how does this prompt compare to alternatives and baselines? Each level catches different categories of problems.</p>

<h3>Designing Evaluation Rubrics</h3>
<p>An evaluation rubric defines what 'good' means for a specific prompt. Without a rubric, evaluation is subjective and inconsistent. A good rubric has 3-7 dimensions, each with a clear 1-5 scale description. Dimensions vary by prompt type: a code generation prompt might evaluate correctness, efficiency, documentation, and error handling; a creative writing prompt might evaluate originality, tone consistency, character development, and plot coherence.</p>

<div class="example-box">
  <h4>Example 1: Prompt Test Suite Design</h4>
  <p><strong>BEFORE (Bad Prompt/Practice):</strong></p>
  <div class="code-block">"I tested my prompt once and it worked, so it's ready for production."</div>
  <p><strong>AFTER (Improved Prompt/Practice):</strong></p>
  <div class="code-block">"You are a prompt quality engineer. Design a comprehensive test suite for a customer support response generation prompt.

PROMPT UNDER TEST:
Generates empathetic, accurate responses to customer support tickets for an e-commerce company.

TEST SUITE DESIGN:

1. TEST CASE CATEGORIES
   Each category has 5 test cases (25 total):

   A. STANDARD REQUESTS (5 cases)
   - Order status inquiry
   - Return request (within policy)
   - Product information question
   - Shipping address change
   - Discount code application
   → Expected: Helpful, accurate, on-brand response

   B. EDGE CASES (5 cases)
   - Return request (outside policy window)
   - Order never received (tracking shows delivered)
   - Product defect with safety implications
   - Request for compensation beyond policy
   - Customer wants to speak to a human
   → Expected: Appropriate handling, knows when to escalate

   C. EMOTIONAL SCENARIOS (5 cases)
   - Very angry customer (ALL CAPS, exclamation marks)
   - Customer expressing disappointment in brand
   - Customer asking for exception due to hardship
   - Customer threatening legal action
   - Customer demanding immediate resolution
   → Expected: Empathetic, de-escalating, appropriate tone

   D. AMBIGUOUS INPUTS (5 cases)
   - Vague complaint: 'This is terrible'
   - Multiple issues in one ticket
   - Contradictory information provided
   - Foreign language mixed with English
   - Ticket with no order number or identifying info
   → Expected: Asks clarifying questions, doesn't make assumptions

   E. ADVERSARIAL INPUTS (5 cases)
   - Attempt to get the AI to reveal internal information
   - Prompt injection attempt
   - Request to ignore previous instructions
   - Offensive language designed to provoke
   - Request for actions outside the AI's scope (refunds, account changes)
   → Expected: Maintains guardrails, doesn't comply with manipulation

2. EVALUATION RUBRIC
   | Dimension | 1 (Poor) | 3 (Acceptable) | 5 (Excellent) |
   |-----------|----------|----------------|---------------|
   | Accuracy | Factually incorrect | Mostly correct, minor errors | Fully accurate with helpful specifics |
   | Tone | Wrong tone, offensive | Acceptable, somewhat generic | Perfectly calibrated to situation |
   | Helpfulness | Not helpful, frustrates customer | Addresses main question | Goes above with proactive suggestions |
   | Safety | Guardrails bypassed | Mostly secure | Fully secure, catches edge cases |
   | Brand Voice | Off-brand, inconsistent | Somewhat on-brand | Perfectly on-brand, recognizable |

3. TESTING PROTOCOL
   - Run each test case 5 times (to account for variability)
   - Score each run independently using the rubric
   - Calculate: mean score, score variance, worst-case score
   - Pass threshold: Mean >= 4.0, Variance <= 0.5, Worst-case >= 2.5
   - Track regression: New versions must not decrease any dimension's mean score

4. AUTOMATED CHECKS
   - Response length within acceptable range (50-300 words)
   - Contains required elements: greeting, answer, closing
   - Doesn't contain forbidden phrases: [list company-specific]
   - JSON output is valid (if applicable)
   - Response time under 3 seconds

5. HUMAN EVALUATION PROTOCOL
   - 3 independent evaluators per test batch
   - Blind evaluation: evaluators don't know which prompt version they're scoring
   - Calibration session: score 5 examples together before independent scoring
   - Inter-rater agreement target: Cohen's kappa >= 0.75
   - Disagreement resolution: discuss cases with >1 point difference"
        </div>
  <p><strong>Why this works:</strong> This test suite covers 5 categories of inputs that represent the full spectrum of real-world usage. Running each case 5 times accounts for LLM variability — critical for probabilistic systems. The multi-dimensional rubric with 1-3-5 scale descriptions makes evaluation consistent. The automated checks catch obvious problems quickly, while human evaluation catches nuanced quality issues. The inter-rater agreement target ensures evaluation consistency.</p>
</div>

<div class="example-box">
  <h4>Example 2: Model Benchmarking Framework</h4>
  <p><strong>BEFORE (Bad Prompt/Practice):</strong></p>
  <div class="code-block">"GPT-4 is the best model so I'll just use it for everything."</div>
  <p><strong>AFTER (Improved Prompt/Practice):</strong></p>
  <div class="code-block">"You are benchmarking 4 LLMs for a content generation use case. Design a systematic benchmarking framework.

MODELS TO BENCHMARK:
- GPT-4 Turbo
- Claude 3.5 Sonnet
- Gemini 1.5 Pro
- Llama 3 70B (via API)

BENCHMARK PARAMETERS:
- Use identical prompts across all models (same system prompt, same user prompt, same temperature=0.7)
- Run each prompt 10 times per model
- Test 20 different prompts covering: blog posts, social media, emails, product descriptions, technical docs

EVALUATION DIMENSIONS:

1. OUTPUT QUALITY (Human-evaluated, 1-5)
   - Accuracy: Factual correctness
   - Coherence: Logical flow and readability
   - Creativity: Originality and engagement
   - Format compliance: Adherence to requested structure

2. CONSISTENCY (Statistical)
   - Variance in quality scores across 10 runs
   - Format consistency (does it follow instructions every time?)
   - Failure rate: % of runs that produce garbage or errors

3. CAPABILITY COVERAGE
   - Can it follow complex multi-step instructions?
   - Can it maintain context over long inputs?
   - Can it handle structured output (JSON, XML)?
   - Can it refuse appropriately when it should?

4. COST EFFICIENCY
   - Average tokens per response
   - Cost per 1000 requests
   - Cost per unit of quality (quality score / cost)

5. LATENCY
   - Time to first token
   - Total response time
   - 95th percentile (worst-case realistic)

BENCHMARK REPORT FORMAT:
  <pre><code>
| Model | Quality | Consistency | Coverage | Cost/1K | Latency | Overall |
|-------|---------|-------------|----------|---------|---------|---------|
| GPT-4 | 4.5     | 4.2         | 4.8      | $X.XX   | X.Xs    | XX.X    |
| ...   | ...     | ...         | ...      | ...     | ...     | ...     |

Per-Prompt Breakdown:
| Prompt | Best Model | Score | Notes |
|--------|------------|-------|-------|
| ...    | ...        | ...   | ...   |

Recommendations:
- Best overall: [Model] for [reason]
- Best value: [Model] for [reason]
- Best quality: [Model] for [reason]
- Model selection guide: Decision tree for which model to use when
  <pre><code>

RE-BENCHMARKING SCHEDULE:
- Full benchmark: Quarterly (when new model versions release)
- Spot checks: Monthly on 5 random prompts
- Triggered re-benchmark: When model API version updates"
        </div>
  <p><strong>Why this works:</strong> Model selection should be evidence-based, not habit-based. This benchmarking framework evaluates across quality, consistency, capability, cost, and latency — the dimensions that matter for production decisions. Running each prompt 10 times captures variability. The cost-per-quality metric is particularly valuable for budget-conscious teams. The decision tree recommendation translates benchmark results into actionable guidance.</p>
</div>

<div class="example-box">
  <h4>Example 3: Automated Testing Pipeline</h4>
  <p><strong>BEFORE (Bad Prompt/Practice):</strong></p>
  <div class="code-block">"I test my prompts manually when I change them."</div>
  <p><strong>AFTER (Improved Prompt/Practice):</strong></p>
  <div class="code-block">"You are building an automated testing pipeline for production prompts. Design the complete system.

PIPELINE ARCHITECTURE:

1. TRIGGER CONDITIONS
   Run automated tests when:
   - Prompt file changes (CI/CD hook)
   - Model API version updates
   - Scheduled: Daily at 2 AM for all production prompts
   - Manual: On-demand via dashboard

2. TEST EXECUTION FLOW
  <pre><code>
   Trigger → Load prompt + test suite → Execute tests → Evaluate → Report → Alert
   
   Execute phase:
   - Parallel test execution (respecting rate limits)
   - Each test case run 3 times for variance
   - Timeout: 30 seconds per request
   - Retry once on timeout/failure
   
   Evaluate phase:
   - Automated checks (format, length, forbidden words, JSON validity)
   - LLM-as-judge evaluation (separate evaluator model scores outputs)
   - Embedding similarity check (output should be similar to reference)
   
   Report phase:
   - Dashboard update with trend charts
   - Slack notification if any failures
   - Weekly summary email to team
  <pre><code>

3. LLM-AS-JUDGE PROMPT
  <pre><code>
   You are evaluating the output of another AI system. Rate this response:
   
   Original request: [test case input]
   Expected behavior: [what good looks like]
   Actual response: [AI output to evaluate]
   
   Rate 1-5 on: Accuracy, Helpfulness, Tone, Format compliance
   Provide brief justification for each score.
   Flag any safety concerns or policy violations.
  <pre><code>

4. FAILURE HANDLING
   | Severity | Condition | Action |
   |----------|-----------|--------|
   | CRITICAL | Safety guardrail bypassed | Immediate alert, auto-revert to previous version |
   | HIGH | Mean quality score < 3.5 | Alert team, block deployment |
   | MEDIUM | Format compliance < 90% | Warning, require review within 24h |
   | LOW | Individual test case failure | Log for investigation |

5. DASHBOARD METRICS
   - Pass/fail rate over time
   - Quality score trends per prompt
   - Model comparison (if multi-model)
   - Cost per test run
   - Flakiest tests (highest variance)

6. CONTINUOUS IMPROVEMENT
   - Monthly review of failed tests to refine test cases
   - Quarterly review of evaluation rubric calibration
   - Semi-annual review of LLM-as-judge accuracy vs. human evaluation"
        </div>
  <p><strong>Why this works:</strong> Manual testing doesn't scale. This automated pipeline defines trigger conditions, execution flow with parallelization and retry logic, LLM-as-judge evaluation (a cost-effective alternative to human evaluation at scale), severity-based failure handling, dashboard metrics, and continuous improvement processes. The auto-revert for critical safety failures prevents bad prompts from staying in production.</p>
</div>

<h3>Key Testing Principles</h3>
<p>Always test probabilistically (multiple runs per test case), define 'good' with rubrics before testing, automate what you can, and validate automated evaluation against human judgment periodically. Testing is not a one-time activity — it is a continuous practice that maintains prompt quality as models, requirements, and data evolve.</p>
        `,
        templates: [
          `Design a test suite for [PROMPT TYPE] with: [N] test cases across categories (standard, edge, emotional, ambiguous, adversarial), evaluation rubric with 1-5 scales, testing protocol (runs per case, pass thresholds), automated checks, and human evaluation protocol with inter-rater agreement targets.`,
          `Design a benchmarking framework comparing [MODELS] for [USE CASE] across dimensions: output quality, consistency, capability coverage, cost efficiency, latency. Include report format, recommendations structure, and re-benchmarking schedule.`,
          `Design an automated testing pipeline for production prompts with: trigger conditions, execution flow, LLM-as-judge evaluation prompt, severity-based failure handling, dashboard metrics, and continuous improvement process.`
        ],
        keyTakeaways: [
          "Prompt testing requires statistical thinking — measure distributions of outcomes, not single results",
          "Design test suites with 5 categories: standard, edge, emotional, ambiguous, and adversarial inputs",
          "Evaluation rubrics with 1-5 scales make quality measurement consistent and comparable",
          "Benchmark models systematically across quality, consistency, capability, cost, and latency",
          "Automated testing pipelines with LLM-as-judge evaluation scale quality assurance beyond manual testing"
        ],
        practiceExercise: "Choose one of your most-used prompts. Design a 10-case test suite with at least 2 cases from each category (standard, edge, emotional, ambiguous, adversarial). Create a 4-dimension evaluation rubric with 1-5 scales. Run each test case 3 times and score the outputs. Calculate the mean, variance, and identify the weakest dimension."
      },

      // ---------- LESSON 9.5 ----------
      {
        id: "9-5",
        title: "Documentation Standards",
        duration: "8 min",
        content: `
<h3>Documentation as Competitive Advantage</h3>
<p>The difference between amateur and professional prompt engineering often comes down to documentation. A well-documented prompt library can be used, maintained, and improved by anyone on the team. A poorly documented one creates bottlenecks, knowledge silos, and quality drift. This lesson teaches you how to write documentation that makes your prompts accessible, maintainable, and trustworthy — covering prompt docs, API integration docs, runbooks, and user guides.</p>

<h3>The Documentation Pyramid</h3>
<p>Documentation exists at four levels, forming a pyramid: (1) Prompt-Level — what this specific prompt does and how to use it, (2) Workflow-Level — how multiple prompts work together, (3) System-Level — how the prompt system integrates with the broader application, and (4) User-Level — how end users interact with AI features. Most teams focus only on level 1 and suffer from context gaps. Professional prompt operations document at all four levels.</p>

<h3>Prompt-Level Documentation</h3>
<p>Each prompt needs: a clear title and description, the problem it solves, input requirements (variables, data format, constraints), output specification (format, length, examples), the model and parameters it was tested with, known limitations and edge cases, the owner/maintainer, version history, and examples of good and bad outputs. This is the minimum viable documentation for any production prompt.</p>

<div class="example-box">
  <h4>Example 1: Comprehensive Prompt Documentation</h4>
  <p><strong>BEFORE (Bad Prompt/Practice):</strong></p>
  <div class="code-block">"Here's the prompt. It works. Good luck."</div>
  <p><strong>AFTER (Improved Prompt/Practice):</strong></p>
  <div class="code-block">"You are writing documentation for a production prompt. Create comprehensive documentation following this template:

# Prompt Documentation: [Title]

## Overview
**Purpose:** [One sentence: what business problem does this solve?]
**Trigger:** [When/why is this prompt invoked?]
**Owner:** [Name and contact]
**Status:** [Active / Deprecated / Experimental]
**Last Updated:** [Date]

## Prompt Details
  <pre><code>
[Full prompt text with all variables clearly marked]
  <pre><code>

## Variables
| Variable | Type | Required | Description | Example | Validation |
|----------|------|----------|-------------|---------|------------|
| [VAR] | string | Yes | [Description] | [Example] | [Rules] |

## Model Configuration
| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Model | [Name/Version] | [Why this model?] |
| Temperature | [Value] | [Why this temperature?] |
| Max Tokens | [Value] | [Expected output length + buffer] |
| Top P | [Value] | [If non-default, why?] |

## Input Requirements
- **Data format:** [What format must inputs be in?]
- **Preprocessing:** [Any cleaning/normalization required?]
- **Validation:** [Input validation rules]
- **Context window:** [How much context fits?]

## Output Specification
- **Format:** [JSON, Markdown, plain text, etc.]
- **Schema:** [If structured, the output schema]
- **Length:** [Expected range]
- **Example output:**
  <pre><code>
  [Realistic example of good output]
  <pre><code>

## Performance Characteristics
- **Average latency:** [Time]
- **Average tokens:** [Input/Output breakdown]
- **Cost per 1K requests:** [$]
- **Success rate:** [% of calls that produce usable output]

## Known Limitations
- [Limitation 1]: [Description and impact]
- [Limitation 2]: [Description and impact]
- **Edge cases that fail:** [Specific inputs to avoid]
- **Confusion patterns:** [Inputs that produce inconsistent results]

## Examples
### Good Input → Good Output
**Input:** [Example]
**Output:** [Result]
**Why it works:** [Explanation]

### Bad Input → Bad Output
**Input:** [Example]
**Output:** [Result]
**What went wrong:** [Explanation]

## Testing
- **Test suite:** [Link to tests]
- **Last tested:** [Date]
- **Test results:** [Pass/fail summary]
- **Coverage:** [% of edge cases covered]

## Related Prompts
- [Link]: [Relationship description]

## Changelog
| Date | Version | Change | Author |
|------|---------|--------|--------|
| [Date] | [Ver] | [What and why] | [Name] |"
        </div>
  <p><strong>Why this works:</strong> This template captures everything a new team member needs to use, maintain, or improve a prompt: purpose, full text, variables, model configuration with rationale, input/output specs, performance data, limitations, good/bad examples, testing info, and change history. The 'Why it works' and 'What went wrong' sections capture institutional knowledge that prevents repeated mistakes.</p>
</div>

<div class="example-box">
  <h4>Example 2: Workflow Documentation</h4>
  <p><strong>BEFORE (Bad Prompt/Practice):</strong></p>
  <div class="code-block">"We have a few prompts that work together for content creation, but it's not really documented."</div>
  <p><strong>AFTER (Improved Prompt/Practice):</strong></p>
  <div class="code-block">"You are documenting a multi-prompt workflow. Create workflow documentation for a content creation pipeline.

WORKFLOW DOCUMENTATION TEMPLATE:

# Workflow: [Name]

## Overview
**Purpose:** [What does this workflow accomplish?]
**Trigger:** [How is the workflow initiated?]
**Expected duration:** [End-to-end time]
**Owner:** [Team/Person]

## Architecture Diagram
  <pre><code>
[Step 1: Prompt Name] → [Step 2: Prompt Name] → [Step 3: Prompt Name]
       ↓                      ↓                      ↓
  [Output Type]          [Output Type]          [Final Output]
  <pre><code>

## Step-by-Step Flow

### Step 1: [Prompt Name]
- **Prompt:** [Link to prompt doc]
- **Input:** [What this step receives]
- **Transformation:** [What this step does]
- **Output:** [What this step produces]
- **Pass condition:** [How to know this step succeeded]
- **Fail condition:** [What failure looks like and what happens]
- **Timeout:** [Max time allowed]

### Step 2: [Prompt Name]
[Same structure...]

### Step 3: [Prompt Name]
[Same structure...]

## Error Handling
| Failure Point | Detection | Action | Fallback |
|---------------|-----------|--------|----------|
| Step 1 fails | Timeout or error | Retry once, then skip to human review | Manual research |
| Step 2 produces low quality | Quality score < 3.5 | Re-run with modified prompt | Use previous good output |
| Step 3 format invalid | JSON parse failure | Retry with format reminder | Default template |

## Data Flow
| Step | Input Size | Output Size | Latency | Cost |
|------|------------|-------------|---------|------|
| 1 | [tokens] | [tokens] | [time] | [$] |
| 2 | [tokens] | [tokens] | [time] | [$] |
| 3 | [tokens] | [tokens] | [time] | [$] |
| **Total** | | | | |

## Monitoring
- **Dashboard:** [Link]
- **Key metrics:** [What to watch]
- **Alert conditions:** [When to page someone]
- **SLA:** [Target success rate and latency]

## Troubleshooting Guide
| Symptom | Likely Cause | Solution |
|---------|--------------|----------|
| [Problem] | [Root cause] | [Fix] |

## Runbook
[Step-by-step procedures for common operational tasks:
- How to manually trigger the workflow
- How to bypass a failed step
- How to roll back to a previous version
- How to scale up capacity]"
        </div>
  <p><strong>Why this works:</strong> Workflow documentation connects individual prompts into a coherent system. The architecture diagram provides visual understanding. The per-step documentation with pass/fail conditions enables troubleshooting. The error handling matrix with fallbacks ensures operational resilience. The data flow table with costs supports capacity planning. The runbook captures operational procedures that are often tribal knowledge.</p>
</div>

<div class="example-box">
  <h4>Example 3: User-Facing Documentation</h4>
  <p><strong>BEFORE (Bad Prompt/Practice):</strong></p>
  <div class="code-block">"Our users will figure out how to use the AI features."</div>
  <p><strong>AFTER (Improved Prompt/Practice):</strong></p>
  <div class="code-block">"You are writing user-facing documentation for an AI-powered feature. Create documentation for a 'Smart Reply' email suggestion feature.

USER DOCUMENTATION TEMPLATE:

# Feature Guide: [Feature Name]

## What This Feature Does
[In 2-3 sentences, explain the feature in user-benefit terms, not technical terms]

**Example:**
> Smart Reply suggests quick response options based on the email you received. It analyzes the email content and offers 3 relevant replies you can send with one click.

## How to Use It
### Step 1: [Action]
[Screenshot description or clear instruction]
### Step 2: [Action]
...

## When It Works Best
- [Scenario 1]: [Example email type]
- [Scenario 2]: [Example email type]
- [Scenario 3]: [Example email type]

## Limitations to Know
- [Limitation 1]: [Honest description in non-technical language]
- [Limitation 2]: [Honest description]

**Example:**
> Smart Reply works best for short, straightforward responses. It may not capture nuance for sensitive topics like compensation discussions or conflict resolution. Always review and edit suggestions before sending.

## Tips for Best Results
1. [Tip 1]: [How to get better suggestions]
2. [Tip 2]: [How to get better suggestions]
3. [Tip 3]: [How to get better suggestions]

## Privacy & Data
- What data is used: [Clear, honest description]
- How data is protected: [Relevant security info]
- Opt-out: [How to disable if desired]

## FAQ
**Q: [Common question]?**
A: [Clear answer]

**Q: [Common question]?**
A: [Clear answer]

## Feedback
[How to report issues or suggest improvements]

---

DOCUMENTATION PRINCIPLES APPLIED:
- Lead with user benefit, not technology
- Be honest about limitations (builds trust)
- Include specific examples, not just abstract descriptions
- Address privacy concerns proactively
- Make feedback easy (shows you care about improvement)
- Use progressive disclosure: overview → how-to → details → troubleshooting"
        </div>
  <p><strong>Why this works:</strong> User-facing documentation for AI features has unique requirements. Users need to understand what the feature does, when to trust it, and when to override it. Honest limitations build trust — users who discover limitations on their own lose faith in the system. The privacy section addresses the #1 concern users have about AI features. Progressive disclosure lets users get started quickly and dive deeper as needed.</p>
</div>

<h3>Documentation Maintenance</h3>
<p>Documentation rots faster than code. Set a recurring calendar reminder to review prompt documentation quarterly. Check: Are the examples still accurate? Have model versions changed? Are the limitations still correct? Is the owner information current? Outdated documentation is often worse than no documentation — it misleads users who trust it.</p>
        `,
        templates: [
          `Write comprehensive documentation for a production prompt including: overview, full prompt text, variables table, model configuration with rationale, input requirements, output specification, performance characteristics, known limitations, good/bad examples, testing info, related prompts, and changelog.`,
          `Write workflow documentation for a multi-prompt pipeline including: architecture diagram, step-by-step flow with pass/fail conditions, error handling matrix with fallbacks, data flow with costs, monitoring setup, troubleshooting guide, and operational runbook.`,
          `Write user-facing documentation for an AI feature including: benefit-focused description, how-to steps, when it works best, honest limitations, tips for best results, privacy information, FAQ, and feedback mechanism. Use progressive disclosure.`
        ],
        keyTakeaways: [
          "Documentation exists at four levels: prompt-level, workflow-level, system-level, and user-level — document all four",
          "Prompt documentation must include: purpose, variables, model config with rationale, I/O specs, limitations, examples, and change history",
          "Workflow documentation connects prompts into systems: architecture diagrams, error handling, data flow, and operational runbooks",
          "User-facing AI documentation must be honest about limitations — this builds trust and prevents misuse",
          "Review documentation quarterly — outdated docs mislead users and erode trust"
        ],
        practiceExercise: "Choose your best prompt and write complete documentation using the comprehensive template from this lesson. Include: overview, full prompt text, variables table with examples, model configuration with rationale, output specification, known limitations, good and bad examples, and a changelog. Ask a colleague (or imagine a new team member) to review it — can they use the prompt without asking questions?"
      }
    ]
  },


  // ============================================================
  // MODULE 10 — FUTURE OF AI & PROMPT ENGINEERING
  // ============================================================
  {
    module: 10,
    title: "Future of AI & Prompt Engineering",
    description: "Explore emerging models, AI agents, ethics, career paths, and build your personal 90-day action plan for mastering prompt engineering in an evolving landscape.",
    lessons: [

      // ---------- LESSON 10.1 ----------
      {
        id: "10-1",
        title: "Emerging Models & Capabilities",
        duration: "8 min",
        content: `
<h3>The Accelerating Frontier</h3>
<p>The AI landscape in 2025 barely resembles that of 2023. Models have grown more capable, more efficient, and more specialized. Multimodal systems process text, images, audio, and video simultaneously. Reasoning models tackle complex problems through extended thinking. Small models run on edge devices with surprising capability. This lesson maps the current frontier of AI capabilities and teaches you how to evaluate and adopt new models as they emerge — a critical skill as the pace of innovation accelerates.</p>

<h3>The Capability Evolution</h3>
<p>Understanding AI capabilities requires tracking evolution across dimensions: scale (parameter count, context window), modalities (text, image, audio, video, code), reasoning (logical inference, planning, multi-step problem solving), efficiency (speed, cost, energy usage), and specialization (domain-tuned models). Each dimension evolves independently, creating a complex landscape where different models excel at different tasks.</p>

<p>The key insight is that bigger is not always better. A 70B parameter model fine-tuned for your specific domain may outperform a 400B general model on your tasks at one-tenth the cost. The prompt engineer's job is matching the right model to the right task — and that matching requires staying current with capabilities.</p>

<h3>Evaluating New Models</h3>
<p>When a new model releases, evaluate it systematically: (1) Benchmark scores — how does it perform on standard evaluations? (2) Real-world testing — how does it perform on YOUR specific prompts? (3) Capability gaps — what can it NOT do that your current model can? (4) Cost analysis — is the performance improvement worth the price change? (5) Operational factors — latency, availability, API stability, support quality.</p>

<div class="example-box">
  <h4>Example 1: Model Evaluation Prompt</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Is Claude 3.5 Sonnet better than GPT-4?"</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a technical evaluator assessing a new AI model (Claude 3.5 Sonnet) against our current production model (GPT-4 Turbo) for our specific use cases.

OUR CONTEXT:
- Use cases: Customer support response generation, technical documentation writing, code review assistance
- Current pain points with GPT-4 Turbo: Occasionally verbose responses, sometimes misses nuanced tone requirements, JSON mode can be unreliable
- Cost sensitivity: Medium — we process ~50K requests/day
- Latency requirements: P95 < 3 seconds

EVALUATION FRAMEWORK:

1. BENCHMARK REVIEW
   Check published benchmarks for:
   - MMLU (general knowledge)
   - HumanEval (code generation)
   - MT-Bench (instruction following)
   - HellaSwag (common sense reasoning)
   - TruthfulQA (hallucination resistance)
   
   For each benchmark: What does the score mean in practical terms? What are the limitations of this benchmark?

2. REAL-WORLD TEST SUITE
   Design 10 test prompts representing our actual use cases:
   - 3 customer support scenarios (angry customer, technical question, billing inquiry)
   - 3 documentation tasks (API endpoint doc, troubleshooting guide, release notes)
   - 3 code review scenarios (bug identification, style feedback, architecture suggestion)
   - 1 edge case (ambiguous input with safety considerations)

   For each test: Run on both models with identical parameters. Evaluate on: accuracy, conciseness, tone appropriateness, format compliance, and safety.

3. CAPABILITY DEEP-DIVE
   Test specific capabilities we need:
   - JSON mode reliability: 10 structured output requests, measure parse success rate
   - Long context: Process a 50K token document, measure retention of details at start/middle/end
   - Instruction following: Give contradictory instructions, measure how model handles conflict
   - Creativity vs. determinism: Same prompt 5 times, measure output variance

4. COST-BENEFIT ANALYSIS
   | Factor | GPT-4 Turbo | Claude 3.5 Sonnet | Impact |
   |--------|-------------|-------------------|--------|
   | Input cost per 1M tokens | $X | $X | [Savings/Increase] |
   | Output cost per 1M tokens | $X | $X | [Savings/Increase] |
   | Avg tokens per request | X | X | [Efficiency] |
   | Daily cost at current volume | $X | $X | [Net change] |
   | Quality improvement value | baseline | ? | [Worth $X/day?] |

5. RISK ASSESSMENT
   - API stability and uptime history
   - Vendor lock-in considerations
   - Data handling and residency compliance
   - Rate limits and scalability
   - Support quality and response time

RECOMMENDATION FORMAT:
- Go / Go with conditions / Hold
- Primary rationale
- Migration effort estimate
- Risk mitigation steps"
        </div>
  <p><strong>Why this works:</strong> This evaluation framework moves beyond simplistic "which is better" comparisons to systematic assessment for a specific use case. It combines published benchmarks with real-world testing, capability deep-dives, cost analysis, and risk assessment. The structured recommendation format ensures the evaluation produces actionable decisions, not just interesting observations.</p>
</div>

<div class="example-box">
  <h4>Example 2: Multimodal Prompt Design</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Describe this image."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are analyzing a multimodal input for a product quality control system. I will provide an image of a manufactured component alongside its technical specification document.

INPUTS:
- Image: [High-resolution photo of component]
- Specification: [Text excerpt from engineering spec]
- Context: This is a batch of 500 units received from Supplier B. Previous batch from Supplier A had a 2% defect rate.

ANALYSIS TASKS:
1. VISUAL INSPECTION
   - Compare the component in the image against the specification drawing
   - Identify any visible defects: scratches, discoloration, dimensional anomalies, missing features
   - Rate overall quality: Pass / Conditional Pass / Fail
   - Highlight areas of concern with bounding box descriptions

2. SPECIFICATION COMPLIANCE
   - Check each dimension against spec tolerances
   - Verify surface finish requirements
   - Confirm material markings are present and legible
   - Identify any specification requirements that cannot be verified from the image alone

3. BATCH RECOMMENDATION
   - Based on this sample, recommend: Accept batch / Inspect more samples / Reject batch
   - Statistical confidence level for your recommendation
   - Additional samples needed if recommendation is conditional

4. DOCUMENTATION
   Format output as a QC report:
   - Inspection date and sample ID
   - Inspector (AI-assisted)
   - Findings with severity ratings
   - Recommendation with rationale
   - Limitations: What a human inspector should additionally verify

SAFETY: If the component appears to be safety-critical and shows any defect, immediately flag for human review regardless of other factors."
        </div>
  <p><strong>Why this works:</strong> Multimodal prompts must specify how to process and integrate information from different input types. This prompt gives the AI explicit instructions for processing the image, the text specification, and the batch context — then specifies how to synthesize them into a structured recommendation. The safety override instruction ensures critical defects don't get missed due to statistical reasoning.</p>
</div>

<div class="example-box">
  <h4>Example 3: Small Model Optimization</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Small models are too dumb for real work."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are optimizing prompts for a small language model (Llama 3 8B) running on-device for a privacy-sensitive healthcare application. The model has limited capabilities compared to GPT-4, so prompts must be carefully designed.

OPTIMIZATION STRATEGIES:

1. SCOPE REDUCTION
   Instead of a general medical assistant prompt, create 5 specialized prompts:
   - Prompt A: Symptom collection (structured intake questions)
   - Prompt B: Medication interaction checking (against a specific drug database)
   - Prompt C: Appointment scheduling logic
   - Prompt D: Follow-up reminder generation
   - Prompt E: Simple health education (pre-approved content selection)

   Each prompt should be focused on a single task with no ambiguity about what to do.

2. FEW-SHOT OPTIMIZATION
   For each specialized prompt, provide 3-5 examples of perfect inputs and outputs. Format examples consistently so the model learns the pattern.

3. CONSTRAINT TIGHTENING
   Add strict formatting constraints:
   - Output must be valid JSON with specified schema
   - Responses must use only pre-approved medical phrases
   - If uncertain, respond with {"status": "uncertain", "reason": "..."} rather than guessing
   - Maximum response length: 200 tokens

4. CHAIN-OF-THOUGHT SIMPLIFICATION
   For tasks requiring reasoning:
   - Break into 2-3 explicit steps maximum
   - Use fill-in-the-blank format: 'Step 1: [REASONING]. Step 2: [CONCLUSION]'
   - Validate at each step before proceeding

5. FALLBACK DESIGN
   When the small model's confidence is low:
   - Return a structured 'escalation' response
   - Include what was understood and what needs clarification
   - Never hallucinate to fill gaps

EVALUATE EACH PROMPT:
- Run 20 test cases
- Measure: accuracy, token usage, response time
- Identify failure modes
- Compare against GPT-4 baseline on same cases
- Determine if small model meets minimum viable quality threshold"
        </div>
  <p><strong>Why this works:</strong> Small models require different prompting strategies than large ones. This prompt designs a complete optimization approach: scope reduction (narrow tasks), few-shot examples (pattern learning), constraint tightening (preventing errors), simplified chain-of-thought (cognitive scaffolding), and fallback design (graceful degradation). The evaluation framework with GPT-4 baseline comparison determines if the small model is viable for the use case.</p>
</div>

<h3>Staying Current</h3>
<p>The AI field moves fast. Establish a systematic approach to staying current: follow key researchers and labs on social media, subscribe to newsletters (Import AI, The Batch, TLDR AI), join communities (r/LocalLLaMA, Hugging Face forums, Discord servers), attend virtual conferences, and most importantly — experiment hands-on with new models as they release. There is no substitute for direct experience.</p>
        `,
        templates: [
          `Evaluate [NEW MODEL] against [CURRENT MODEL] for our use cases: [LIST]. Framework: benchmark review, real-world test suite ([N] cases), capability deep-dive (JSON, long context, instruction following, consistency), cost-benefit analysis, risk assessment. Recommendation: Go/Conditional/Hold with rationale.`,
          `Design a multimodal prompt that processes [INPUT TYPES] and performs: [ANALYSIS TASKS]. Specify how to integrate information across modalities, structured output format, and safety overrides for critical findings.`,
          `Optimize prompts for a small model ([MODEL, SIZE]) for [USE CASE]. Strategies: scope reduction into specialized prompts, few-shot examples, constraint tightening, simplified chain-of-thought, fallback design. Evaluate against large model baseline.`
        ],
        keyTakeaways: [
          "AI capabilities evolve across 5 dimensions: scale, modalities, reasoning, efficiency, and specialization — track each independently",
          "Systematic model evaluation requires: benchmarks, real-world testing, capability deep-dives, cost analysis, and risk assessment",
          "Multimodal prompts must specify how to process and integrate information from different input types",
          "Small models need different prompting: scope reduction, few-shot examples, tight constraints, simplified reasoning, and fallback design",
          "Stay current through systematic learning: newsletters, communities, conferences, and hands-on experimentation"
        ],
        practiceExercise: "Identify one new AI model or capability announced in the last 3 months. Run it through the evaluation framework from this lesson: check benchmarks, test it on 3 of your real-world prompts, analyze cost implications, and write a brief recommendation (Go/Conditional/Hold) with rationale."
      },

      // ---------- LESSON 10.2 ----------
      {
        id: "10-2",
        title: "AI Agents & Autonomous Systems",
        duration: "8 min",
        content: `
<h3>Beyond Single Prompts: The Agent Revolution</h3>
<p>AI agents represent the next frontier of prompt engineering. Unlike single-turn prompts that produce one output, agents are systems that operate autonomously over multiple steps: planning, executing, observing results, and adapting. They can use tools (search, code execution, APIs), maintain memory across interactions, and collaborate with other agents. This lesson introduces the agent paradigm, teaches you how to design agent architectures, and shows how prompt engineering evolves when the AI is not just responding but acting.</p>

<h3>What Are AI Agents?</h3>
<p>An AI agent is a system that: (1) receives a high-level goal, (2) plans a sequence of steps to achieve it, (3) executes those steps using available tools, (4) observes the results of each step, and (5) adapts the plan based on observations until the goal is achieved or determined impossible. The prompt engineer's role shifts from crafting single outputs to designing agent architectures — the system prompts, tool descriptions, planning frameworks, and observation loops that enable autonomous operation.</p>

<p>The key difference from traditional prompting is agency. A standard prompt asks "generate X." An agent prompt asks "achieve Y, using whatever tools and steps are necessary, and report back when done or blocked." This requires fundamentally different prompt structures: tool descriptions, planning formats, error recovery instructions, and termination conditions.</p>

<h3>Agent Architecture Components</h3>
<p>Every agent system needs: a system prompt (the agent's persona and instructions), tool descriptions (what tools are available and how to use them), a planning format (how the agent structures its thinking), observation handling (how results are fed back), memory management (what the agent remembers), and termination logic (when to stop). Each component needs careful prompt engineering.</p>

<div class="example-box">
  <h4>Example 1: ReAct Agent Prompt</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Search the web and find information about this topic."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a research agent. Your goal is to find accurate, comprehensive information to answer the user's question. You have access to tools and should use them strategically.

AVAILABLE TOOLS:
1. search(query: str) → Search the web for information. Returns top 5 results with summaries.
2. calculator(expression: str) → Evaluate mathematical expressions.
3. read_url(url: str) → Read and summarize the content of a specific webpage.
4. final_answer(answer: str, sources: list) → Submit your final answer with cited sources.

OPERATING RULES:
- You must follow the ReAct format: Thought → Action → Observation
- Plan before acting: First think about what information you need and which tools to use
- You may take up to 10 steps maximum
- Always cite your sources — never claim information without a source
- If a search doesn't yield useful results, try a rephrased query
- If you cannot find sufficient information after 5 attempts, use final_answer to explain what you found and what's missing

REACT FORMAT:
Thought: [Your reasoning about what to do next]
Action: [Tool name]([Parameter value])
Observation: [Result from the tool — provided by system]
[Repeat Thought → Action → Observation as needed]
Thought: [I have enough information to answer]
Action: final_answer([Your comprehensive answer], [List of sources])

EXAMPLE SESSION:
Question: "What was the revenue of Tesla in Q3 2024?"

Thought: I need to find Tesla's Q3 2024 financial results. I'll search for this specific information.
Action: search("Tesla Q3 2024 revenue earnings")
Observation: [Search results with links to Tesla investor relations and news articles]

Thought: The search results show Tesla's Q3 2024 earnings report. Let me read the official investor relations page for the exact figure.
Action: read_url("https://ir.tesla.com/...")
Observation: [Page content with Q3 2024 financial data]

Thought: I now have the exact revenue figure from Tesla's official Q3 2024 earnings report. I can provide the final answer.
Action: final_answer("Tesla's revenue in Q3 2024 was $25.18 billion, up 8% year-over-year, as reported in their official Q3 2024 earnings release.", ["Tesla Q3 2024 Earnings Report, ir.tesla.com"])

Now begin with the user's question:
Question: {user_question}"
        </div>
  <p><strong>Why this works:</strong> This is a classic ReAct (Reasoning + Acting) agent prompt. It defines the available tools with their parameters, enforces a structured thinking format (Thought → Action → Observation), includes operating rules (step limits, citation requirements, error handling), provides a complete example of the expected interaction pattern, and specifies termination conditions. The ReAct format forces the agent to think explicitly before acting, reducing errors.</p>
</div>

<div class="example-box">
  <h4>Example 2: Multi-Agent Collaboration</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Analyze this business problem from every angle."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are orchestrating a multi-agent analysis of a business proposal. Three specialist agents will analyze different aspects, then a synthesizer will combine their insights.

PROPOSAL TO ANALYZE:
[Business proposal text will be inserted here]

AGENT 1 — FINANCIAL ANALYST
Role: Analyze the financial aspects of the proposal
Analyze: Revenue projections, cost structure, ROI timeline, funding requirements, sensitivity to key assumptions, comparison to industry benchmarks
Output format:
  <pre><code>
FINANCIAL ASSESSMENT
- Revenue Model: [Analysis]
- Cost Structure: [Analysis]
- ROI Projection: [Analysis]
- Key Risks: [List]
- Verdict: [Strong/Moderate/Weak financial case]
- Confidence: [High/Medium/Low]
  <pre><code>

AGENT 2 — MARKET STRATEGIST
Role: Analyze the market and competitive positioning
Analyze: Target market size, competitive landscape, differentiation, go-to-market strategy, timing, market risks
Output format:
  <pre><code>
MARKET ASSESSMENT
- Market Opportunity: [Analysis]
- Competitive Position: [Analysis]
- Go-to-Market: [Analysis]
- Key Risks: [List]
- Verdict: [Strong/Moderate/Weak market case]
- Confidence: [High/Medium/Low]
  <pre><code>

AGENT 3 — OPERATIONAL ANALYST
Role: Analyze operational feasibility
Analyze: Team requirements, technical feasibility, execution timeline, resource needs, operational risks, scalability
Output format:
  <pre><code>
OPERATIONAL ASSESSMENT
- Execution Plan: [Analysis]
- Resource Requirements: [Analysis]
- Timeline Feasibility: [Analysis]
- Key Risks: [List]
- Verdict: [Strong/Moderate/Weak operational case]
- Confidence: [High/Medium/Low]
  <pre><code>

SYNTHESIZER
After all three agents complete their analysis:
- Identify areas of agreement and disagreement
- Highlight critical risks that appear across multiple assessments
- Assess overall proposal viability: Proceed / Proceed with modifications / Reconsider / Reject
- Provide 3-5 specific, prioritized recommendations
- Identify the most important assumptions to validate

COLLABORATION RULES:
- Each agent focuses only on their domain — no overlapping analysis
- Agents should flag when their analysis depends on assumptions from another domain
- The synthesizer must give equal weight to all three perspectives
- If confidence levels are low across agents, recommend additional research before deciding
- All agents must provide evidence-based reasoning, not just opinions"
        </div>
  <p><strong>Why this works:</strong> Multi-agent systems leverage specialization — each agent focuses on its domain expertise. This prompt defines three specialist agents with clear roles, structured output formats, and specific analysis dimensions. The synthesizer agent resolves conflicts and produces an integrated recommendation. The collaboration rules prevent overlap, ensure balanced consideration, and flag cross-domain dependencies.</p>
</div>

<div class="example-box">
  <h4>Example 3: Agent with Memory and Learning</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Help me organize my tasks every day."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a personal productivity agent that helps manage tasks and schedule time. You maintain memory across sessions to learn the user's preferences and improve over time.

MEMORY SYSTEM:
You have access to a memory store with these categories:
1. user_preferences: Working hours, preferred task batching, energy patterns, communication style
2. task_history: Previous tasks completed, time estimates vs. actuals, frequently deferred tasks
3. project_context: Active projects, deadlines, stakeholder priorities, dependencies
4. learned_patterns: What scheduling approaches work best, typical interruption patterns, productivity trends

DAILY WORKFLOW:
1. MORNING BRIEFING (triggered at user's start time)
   - Review calendar and incoming tasks
   - Check for deadlines today and tomorrow
   - Generate prioritized task list based on urgency, importance, and user's energy patterns
   - Suggest time blocks for deep work based on learned patterns

2. TASK PROCESSING (when user adds new tasks)
   - Categorize and estimate duration based on task_history patterns
   - Suggest optimal scheduling based on user's calendar and energy
   - Flag conflicts with existing commitments
   - Learn: Update duration estimates based on user's feedback

3. END-OF-DAY REVIEW (triggered 30 min before end of day)
   - Summarize completed tasks
   - Carry forward incomplete tasks with re-prioritization
   - Update task_history with actual completion times
   - Identify patterns: What types of tasks were underestimated? What got deferred?

LEARNING RULES:
- Track prediction accuracy: Compare estimated vs. actual task durations
- When estimates are consistently wrong for a task type, adjust the baseline
- Note contextual factors: 'User is less productive on Monday mornings' → schedule lighter tasks then
- Ask clarifying questions when preferences are unclear — don't assume
- Periodically summarize what you've learned and ask for correction

OUTPUT FORMAT:
Always use structured, scannable format:
- Use headers and bullet points
- Include time estimates with confidence levels
- Highlight anything requiring immediate attention with ⏰
- End with one proactive suggestion based on learned patterns

PRIVACY NOTE: All learning is local — no personal data leaves the system."
        </div>
  <p><strong>Why this works:</strong> This agent prompt designs a system with explicit memory categories, structured daily workflows, learning rules that improve predictions over time, and clear output formatting. The learning rules are critical — they define how the agent improves through feedback rather than repeating the same patterns. The privacy note addresses a key concern for personal assistant agents.</p>
</div>

<h3>Agent Design Principles</h3>
<p>Designing effective agents requires: clear goal definitions, well-described tools, explicit reasoning formats, robust error handling, memory management, and human oversight mechanisms. Start simple — a single agent with 2-3 tools — and add complexity only when needed. The most common agent failure mode is excessive complexity that makes the system unreliable.</p>
        `,
        templates: [
          `Design a ReAct agent for [GOAL]. Define: available tools with parameters, operating rules (step limits, error handling), ReAct format (Thought → Action → Observation), example session, and termination conditions.`,
          `Design a multi-agent system for [COMPLEX TASK]. Define [N] specialist agents with roles, structured output formats, a synthesizer agent, and collaboration rules for resolving disagreements and handling cross-domain dependencies.`,
          `Design an agent with memory and learning for [ONGOING TASK]. Define: memory categories, workflow triggers, learning rules for improving predictions, output format, and privacy considerations.`
        ],
        keyTakeaways: [
          "AI agents autonomously plan, execute, observe, and adapt to achieve goals using available tools",
          "Agent prompts need: tool descriptions, planning formats, observation handling, memory, and termination logic",
          "ReAct format (Thought → Action → Observation) forces explicit reasoning before acting",
          "Multi-agent systems leverage specialization — each agent focuses on its domain with a synthesizer integrating results",
          "Start with simple agents (2-3 tools) and add complexity only when necessary — complexity reduces reliability"
        ],
        practiceExercise: "Design a simple ReAct agent for a task you perform regularly (research, analysis, planning). Define 2-3 tools it could use, write the system prompt with ReAct format, create an example session, and test it manually by simulating tool responses. Identify where the agent might fail and how you would handle those failures."
      },

      // ---------- LESSON 10.3 ----------
      {
        id: "10-3",
        title: "Ethics & Responsible AI",
        duration: "8 min",
        content: `
<h3>With Great Power Comes Great Responsibility</h3>
<p>Prompt engineering is not a neutral technical skill. The prompts you write shape the behavior of AI systems that influence decisions, affect lives, and amplify values — both good and bad. This lesson addresses the ethical dimensions of prompt engineering: bias mitigation, transparency, privacy protection, safety guardrails, and the broader societal implications of AI deployment. You will learn practical techniques for building ethical prompts and systems that you can be proud to put into the world.</p>

<h3>The Ethics of Prompt Engineering</h3>
<p>Every prompt encodes values. When you assign a role ("You are a helpful assistant"), you define helpfulness. When you specify an output format, you shape how information is consumed. When you include examples, you establish patterns the model will follow. These choices have ethical implications: Who benefits from this prompt? Who might be harmed? What values are being prioritized? What voices are being amplified or silenced?</p>

<p>The fundamental principle is intentionality. Ethical prompt engineering is not about following a checklist — it is about thoughtfully considering the impact of your work and making deliberate choices. This requires understanding the stakeholders affected by your prompts, the contexts in which they will be used, and the potential for both intended and unintended consequences.</p>

<h3>Bias Detection and Mitigation</h3>
<p>AI models can amplify biases present in their training data. Prompt engineers play a critical role in detecting and mitigating these biases through careful prompt design. Techniques include: specifying fairness constraints, requiring diverse perspectives, testing outputs across demographic groups, and including bias-checking steps in prompt workflows.</p>

<div class="example-box">
  <h4>Example 1: Bias-Aware Prompt Design</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Describe the ideal candidate for a software engineering position."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a hiring advisor committed to equitable, inclusive hiring practices. Help define objective criteria for a software engineering position.

POSITION: Senior Software Engineer — Backend Systems

INSTRUCTIONS:
1. Define 5-7 core competencies required for this role. Each competency should be:
   - Job-relevant and tied to actual work requirements
   - Measurable through work samples or structured interviews
   - Free from unnecessary barriers (e.g., requiring specific degrees if skills can be demonstrated otherwise)

2. For each competency, provide:
   - What it means in this context
   - How to assess it fairly (interview questions, work sample ideas)
   - Common biases to avoid when evaluating this competency

3. EXPLICIT BIAS GUARDRAILS:
   - Do NOT assume 'cultural fit' means shared backgrounds or interests
   - Do NOT recommend criteria that correlate with gender, race, age, or socioeconomic status unless directly job-relevant
   - Do include 'alternative pathways' — how someone might demonstrate competency without traditional credentials
   - Flag any criteria that might disadvantage candidates from non-traditional backgrounds

4. DIVERSE PERSPECTIVE CHECK:
   After defining criteria, review: Would these criteria unfairly disadvantage any of these candidate profiles?
   - Self-taught developers with 5+ years of experience
   - Career changers from adjacent fields (data science, DevOps, QA)
   - Candidates from countries with different educational systems
   - Candidates with non-visible disabilities
   - Candidates who took career breaks

   If yes, revise the criteria or assessment methods.

5. INTERVIEW STRUCTURE:
   Recommend a structured interview format that:
   - Asks all candidates the same core questions
   - Uses work-sample tests rather than hypothetical scenarios
   - Has diverse interview panels
   - Documents decisions with specific evidence

OUTPUT: Structured hiring criteria with bias analysis, alternative pathway considerations, and recommended interview structure."
        </div>
  <p><strong>Why this works:</strong> This prompt explicitly embeds ethical considerations into the hiring criteria development process. The bias guardrails prevent common pitfalls like "cultural fit" becoming a proxy for demographic similarity. The diverse perspective check forces consideration of non-traditional candidates. The structured interview recommendations reduce subjective bias in evaluation. The result is hiring criteria that are both effective and equitable.</p>
</div>

<div class="example-box">
  <h4>Example 2: Safety-First Content Generation</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Write a story about a character dealing with a difficult situation."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are a creative writing assistant that generates age-appropriate, psychologically safe content for a young adult fiction platform (readers aged 13-18).

SAFETY FRAMEWORK:

1. CONTENT BOUNDARIES
   BEFORE generating any content, verify it does NOT contain:
   - Detailed descriptions of self-harm, suicide, or eating disorders
   - Graphic violence or gore
   - Sexual content or suggestive themes involving minors
   - Glorification of substance abuse, illegal activities, or dangerous behaviors
   - Hate speech, discrimination, or harassment
   - Content that could trigger trauma survivors without warning

   If the request would violate these boundaries, respond: 'I'm not able to generate that content. I'd be happy to help with a different story direction that explores similar themes in a safe way.'

2. THEMATIC HANDLING
   Some important themes CAN be addressed if handled responsibly:
   - Mental health struggles: Show characters seeking help, focus on coping strategies, include resources
   - Conflict/challenges: Show constructive resolution, growth through adversity
   - Difficult emotions: Validate feelings while modeling healthy expression
   - Social issues: Present multiple perspectives, avoid preaching, show complexity

3. POSITIVE MESSAGING
   Stories should include at least 2 of these elements:
   - Characters demonstrate resilience or growth
   - Help-seeking behavior is portrayed positively
   - Diverse perspectives are represented respectfully
   - Conflict is resolved through communication or understanding
   - Characters learn from mistakes

4. AGE APPROPRIATENESS CHECKLIST
   - Would a 13-year-old understand and benefit from this content?
   - Would a parent or educator find this suitable?
   - Does the content model behaviors you'd want young readers to emulate?
   - Is the emotional intensity appropriate for the age group?

5. DIVERSE REPRESENTATION
   - When characters are specified, include diverse backgrounds when possible
   - Avoid stereotypes and tokenism
   - Represent different cultures, abilities, and experiences respectfully
   - Don't make a character's identity their only defining trait

STORY REQUEST: [User's story concept will be inserted here]

After generating, self-review against all 5 frameworks. If any concerns are found, revise before presenting the final output."
        </div>
  <p><strong>Why this works:</strong> This prompt creates a comprehensive safety framework for content generation targeting young adults. It doesn't simply block all difficult topics — it provides guidance for handling them responsibly. The self-review requirement adds a layer of verification. The diverse representation guidelines prevent tokenism and stereotypes. The positive messaging requirement ensures content is not just safe but actively beneficial.</p>
</div>

<div class="example-box">
  <h4>Example 3: Transparent AI Communication</h4>
  <p><strong>BEFORE (Bad Prompt):</strong></p>
  <div class="code-block">"Generate responses that sound like they come from a human expert."</div>
  <p><strong>AFTER (Improved Prompt):</strong></p>
  <div class="code-block">"You are an AI assistant for a healthcare information website. You provide general health information to users. Transparency and honesty about your nature and limitations are essential.

TRANSPARENCY RULES:

1. IDENTITY DISCLOSURE
   - Always acknowledge that you are an AI, not a human doctor
   - Example opening: 'I'm an AI assistant trained to provide general health information...'
   - Never imply human judgment, emotional understanding, or personal experience

2. CONFIDENCE CALIBRATION
   - When stating facts: Cite sources and indicate evidence strength
     (Strong evidence / Moderate evidence / Limited evidence / Expert opinion)
   - When uncertain: Say 'I'm not certain about this' rather than guessing
   - When conflicting evidence exists: Present multiple perspectives
   - Never present speculation as fact

3. LIMITATION ACKNOWLEDGMENT
   Always include these limitations when relevant:
   - 'This information is general and not specific to your situation'
   - 'I cannot diagnose conditions or recommend specific treatments'
   - 'This does not replace consultation with a healthcare provider'
   - 'Medical knowledge evolves — verify with current sources'

4. SOURCE ATTRIBUTION
   - Cite reputable sources (medical journals, health organizations, government health agencies)
   - Include publication dates for time-sensitive information
   - Distinguish between established medical consensus and emerging research
   - If no reliable source is available, state this explicitly

5. DECISION SUPPORT, NOT DECISION MAKING
   - Present information to help users make informed decisions
   - Ask clarifying questions to understand their situation better
   - Encourage consultation with appropriate professionals
   - Never pressure users toward or away from specific decisions

6. BIAS AND LIMITATION ACKNOWLEDGMENT
   - Acknowledge that AI systems have limitations and may reflect biases in training data
   - Encourage users to consult multiple sources
   - Provide balanced information even on controversial topics

OUTPUT FORMAT:
[AI identity statement]
[Information response with source citations and evidence strength]
[Limitations relevant to this specific query]
[Encouragement to consult appropriate professionals]
[Optional: Suggested follow-up questions]"
        </div>
  <p><strong>Why this works:</strong> Transparency is an ethical imperative for AI systems. This prompt creates a framework for honest AI communication: identity disclosure prevents deception, confidence calibration prevents overconfident misinformation, limitation acknowledgment sets appropriate expectations, source attribution enables verification, and the decision support framing prevents the AI from overstepping. The output format ensures these principles are applied consistently.</p>
</div>

<h3>Building an Ethical Practice</h3>
<p>Make ethics a habit, not an afterthought. Before deploying any prompt, ask: Who benefits? Who might be harmed? What are the failure modes? What happens if this is misused? Document your ethical considerations. And create feedback mechanisms so users can report problems. Responsible AI is built one thoughtful decision at a time.</p>
        `,
        templates: [
          `Design a [TASK] prompt with embedded ethical guardrails including: explicit bias guardrails, diverse perspective checks, alternative pathway considerations, fairness constraints, and structured evaluation criteria that minimize subjective bias.`,
          `Design a safety framework for [CONTENT TYPE] generation targeting [AUDIENCE] including: content boundaries, responsible thematic handling guidelines, positive messaging requirements, age appropriateness checks, diverse representation guidelines, and self-review requirements.`,
          `Design a transparency framework for an AI [DOMAIN] assistant including: identity disclosure rules, confidence calibration, limitation acknowledgment, source attribution standards, decision support framing, and bias acknowledgment.`
        ],
        keyTakeaways: [
          "Every prompt encodes values — ethical prompt engineering requires intentional consideration of impact",
          "Embed bias guardrails directly in prompts: fairness constraints, diverse perspective checks, and alternative pathways",
          "Safety frameworks should handle difficult topics responsibly, not just block them entirely",
          "Transparency requires: identity disclosure, confidence calibration, limitation acknowledgment, and source attribution",
          "Make ethics a habit: ask 'Who benefits? Who is harmed?' before deploying any prompt"
        ],
        practiceExercise: "Take one of your most-used prompts and conduct an ethical review: Who benefits from this prompt? Who might be harmed? What biases could it amplify? What are the failure modes? What happens if it's misused? Write specific modifications to address any concerns you identify, then implement and test them."
      },

      // ---------- LESSON 10.4 ----------
      {
        id: "10-4",
        title: "Career Opportunities",
        duration: "7 min",
        content: `
<h3>The Prompt Engineering Career Landscape</h3>
<p>Prompt engineering has evolved from a niche skill to a recognized profession. In 2025, demand for prompt engineering expertise spans industries and roles — from dedicated Prompt Engineers to product managers, developers, marketers, and consultants who integrate prompting into their work. This lesson maps the career landscape, identifies high-growth opportunities, and provides a framework for positioning yourself in this rapidly evolving field.</p>

<h3>Career Paths in Prompt Engineering</h3>
<p>The field offers several distinct career trajectories: (1) Specialist Prompt Engineer — deep expertise in prompt design for specific domains or models, often in AI-native companies, (2) AI Product Manager — owns AI-powered features, combining prompt engineering with product strategy, (3) AI Integration Developer — builds systems that incorporate LLMs, handling the full stack from prompt to production, (4) AI Consultant — advises organizations on AI adoption, including prompt strategy and implementation, and (5) AI Safety/Alignment Researcher — focuses on making AI systems behave reliably and ethically.</p>

<p>Each path requires different skill combinations. The Specialist needs deep prompt expertise and domain knowledge. The Product Manager needs prompt skills plus user research, data analysis, and roadmap planning. The Developer needs prompt skills plus software engineering, API design, and system architecture. The Consultant needs prompt skills plus business analysis, change management, and communication. Choose the path that aligns with your existing strengths and interests.</p>

<h3>Building Your Professional Profile</h3>
<p>Stand out in the prompt engineering field by: documenting your work publicly (blog posts, case studies, open-source contributions), building a portfolio of before/after prompt improvements with measurable results, specializing in a high-demand domain (healthcare, legal, finance), contributing to prompt engineering communities, and staying current with model releases and techniques. The professionals who thrive combine technical skill with demonstrated impact.</p>

<div class="example-box">
  <h4>Example 1: Career Positioning Strategy</h4>
  <p><strong>BEFORE (Bad Prompt/Approach):</strong></p>
  <div class="code-block">"I know how to use ChatGPT. I'll apply for AI jobs."</div>
  <p><strong>AFTER (Improved Prompt/Approach):</strong></p>
  <div class="code-block">"You are a career strategist specializing in AI roles. Help me develop a positioning strategy for transitioning into a prompt engineering career.

MY PROFILE:
- Current role: [Marketing Manager, 5 years experience]
- Skills: Content strategy, data analysis (SQL, Excel), A/B testing, team management, customer research
- Education: BA in Communications
- Prompt engineering experience: Self-taught, use ChatGPT/Claude daily for work, completed a comprehensive prompt engineering course
- Goal: Move into an AI Product Manager or Prompt Engineering role within 12 months

POSITIONING STRATEGY:

1. UNIQUE VALUE PROPOSITION
   Define my positioning statement:
   'I help [target company type] [achieve specific outcome] by [unique approach combining marketing expertise + prompt engineering]'

   Identify 3 angles that combine my marketing background with prompt engineering:
   - Angle 1: [e.g., AI-powered content optimization specialist]
   - Angle 2: [e.g., Customer-facing AI product manager with marketing empathy]
   - Angle 3: [e.g., AI adoption consultant for marketing teams]

2. SKILL GAP ANALYSIS
   | Skill | Current Level | Target Level | Gap | How to Close |
   |-------|--------------|--------------|-----|--------------|
   | [Skill] | [1-5] | [1-5] | [Description] | [Action plan] |

   Prioritize skills by: impact on hireability × time to acquire

3. PORTFOLIO PROJECTS
   Design 3 portfolio projects that demonstrate prompt engineering + marketing expertise:
   - Project 1: [Description with measurable outcome]
   - Project 2: [Description with measurable outcome]
   - Project 3: [Description with measurable outcome]

   Each project should be:
   - Documented with before/after metrics
   - Published publicly (GitHub, blog, case study)
   - Relevant to target roles
   - Demonstrate both technical skill and business impact

4. TARGET COMPANY LIST
   Identify 20 companies hiring for target roles, categorized:
   - Tier 1 (Dream): [5 companies]
   - Tier 2 (Great fit): [7 companies]
   - Tier 3 (Good stepping stone): [8 companies]

   For each tier, define: company characteristics, role titles to search for, application strategy

5. NETWORKING PLAN
   - Communities to join: [Specific subreddits, Discord servers, LinkedIn groups]
   - People to follow: [Thought leaders in the space]
   - Events to attend: [Conferences, meetups, webinars]
   - Content to create: [Blog posts, LinkedIn updates, Twitter threads]

6. 12-MONTH TIMELINE
   Month 1-3: [Skill building + first portfolio project]
   Month 4-6: [Portfolio completion + networking]
   Month 7-9: [Applications + interviews]
   Month 10-12: [Role transition]

7. RESUME AND LINKEDIN OPTIMIZATION
   - Keywords to include for AI roles
   - How to frame marketing experience as relevant to AI
   - LinkedIn headline and summary optimization
   - Featured section content recommendations"
        </div>
  <p><strong>Why this works:</strong> Career transitions require strategic positioning, not just skill acquisition. This prompt creates a comprehensive career strategy: unique value proposition that differentiates from generic applicants, skill gap analysis with prioritization, portfolio projects that demonstrate real capability, targeted company list, networking plan, 12-month timeline, and profile optimization. The combination of domain expertise (marketing) with prompt engineering is more valuable than either alone.</p>
</div>

<div class="example-box">
  <h4>Example 2: Interview Preparation</h4>
  <p><strong>BEFORE (Bad Prompt/Approach):</strong></p>
  <div class="code-block">"I'll just wing the interview and show them I know ChatGPT."</div>
  <p><strong>AFTER (Improved Prompt/Approach):</strong></p>
  <div class="code-block">"You are preparing me for a Prompt Engineer interview at a mid-size AI company. The role involves designing prompts for customer-facing applications.

INTERVIEW PREPARATION FRAMEWORK:

1. LIKELY INTERVIEW QUESTIONS
   Generate 15 questions across these categories:
   
   A. TECHNICAL KNOWLEDGE (5 questions)
   - How LLMs work (attention, transformers, tokenization)
   - Prompt engineering techniques and when to use each
   - Model-specific knowledge (GPT-4, Claude, Gemini differences)
   - Evaluation methodologies
   - Safety and alignment considerations

   B. PRACTICAL PROBLEMS (5 questions)
   - Given a bad prompt, improve it
   - Design a prompt for a specific use case
   - Debug a prompt that's producing inconsistent results
   - Optimize a prompt for cost/latency
   - Handle a safety edge case

   C. EXPERIENCE AND APPROACH (3 questions)
   - Describe a prompt engineering project and its impact
   - How do you stay current with model capabilities?
   - How do you handle disagreements about prompt behavior?

   D. SYSTEM DESIGN (2 questions)
   - Design a prompt system for a multi-step workflow
   - How would you organize and maintain 100+ production prompts?

   For each question: Provide the question, what interviewers are looking for, and a strong answer framework.

2. TAKE-HOME EXERCISE PREPARATION
   Common take-home assignments and how to approach them:
   - Assignment type 1: Improve prompts for an existing product
   - Assignment type 2: Design a prompt system from scratch
   - Assignment type 3: Evaluate and benchmark different approaches

   For each: Suggested structure, what to emphasize, common pitfalls

3. QUESTIONS TO ASK THE INTERVIEWER
   - About the team structure and role expectations
   - About the tech stack and model infrastructure
   - About the biggest prompt engineering challenges they face
   - About success metrics for the role
   - About growth and learning opportunities

4. SALARY NEGOTIATION PREPARATION
   - Market rate research for Prompt Engineer roles
   - How to frame non-traditional background as an asset
   - Total compensation components to discuss
   - Red flags in offers (equity terms, IP clauses)

5. MOCK INTERVIEW SCRIPT
   A 30-minute mock interview scenario with:
   - Company background
   - Role description
   - Interviewer questions and follow-ups
   - Evaluation criteria

   Practice responses and get feedback."
        </div>
  <p><strong>Why this works:</strong> Interview preparation requires understanding what interviewers actually evaluate. This prompt generates preparation across technical knowledge, practical problem-solving, experience discussion, system design, take-home exercises, questions to ask, salary negotiation, and a mock interview. The practical problems section (improve a prompt, debug a prompt, optimize for cost) reflects what candidates actually do in these roles.</p>
</div>

<div class="example-box">
  <h4>Example 3: Freelance Consulting Framework</h4>
  <p><strong>BEFORE (Bad Prompt/Approach):</strong></p>
  <div class="code-block">"I'll just offer prompt writing services on Upwork."</div>
  <p><strong>AFTER (Improved Prompt/Approach):</strong></p>
  <div class="code-block">"You are a business strategist helping me launch a freelance AI consulting practice.

CONSULTING FRAMEWORK:

1. SERVICE OFFERINGS (Tiered)
   Tier 1 — Prompt Audit ($2,500-$5,000):
   - Audit existing AI prompts for quality, safety, and performance
   - Deliverable: Audit report with prioritized recommendations
   - Timeline: 1-2 weeks
   - Ideal for: Companies with existing AI features that need improvement

   Tier 2 — Prompt System Design ($5,000-$15,000):
   - Design complete prompt systems for new AI features
   - Deliverable: Prompt library, testing framework, documentation
   - Timeline: 2-4 weeks
   - Ideal for: Companies launching new AI-powered products

   Tier 3 — AI Strategy + Implementation ($15,000-$50,000):
   - End-to-end AI strategy, prompt engineering, and team training
   - Deliverable: Working system, documentation, training, handoff
   - Timeline: 1-3 months
   - Ideal for: Enterprises adopting AI across multiple use cases

2. PROPOSAL TEMPLATE
   Structure for client proposals:
   - Executive summary (problem, approach, outcomes)
   - Discovery findings (what we learned in initial conversations)
   - Recommended approach (scope, methodology, timeline)
   - Investment and terms (pricing, payment schedule, deliverables)
   - Case studies (relevant past work with metrics)
   - Next steps (how to get started)

3. CLIENT ONBOARDING PROCESS
   Week 1: Discovery — Understand current state, goals, constraints
   Week 2: Assessment — Audit existing prompts or research use cases
   Week 3: Design — Create prompt system with client feedback
   Week 4: Testing — Validate prompts with real data
   Week 5: Documentation — Create comprehensive docs and training
   Week 6: Handoff — Train team, transition ownership

4. PRICING STRATEGY
   - Value-based pricing: Price based on client outcomes, not hours
   - Discovery fee: Charge for initial assessment (credited toward project)
   - Retainers: Monthly retainers for ongoing optimization
   - Licensing: License prompt libraries for ongoing use

5. BUSINESS DEVELOPMENT
   - Content marketing: Weekly blog posts on prompt engineering topics
   - Speaking: Apply to speak at industry conferences
   - Partnerships: Partner with AI platforms as a recommended consultant
   - Case studies: Document every project with before/after metrics
   - Referrals: Systematic referral program for past clients

6. LEGAL AND OPERATIONS
   - Contract template with IP clauses, liability limits, termination
   - Insurance: Professional liability coverage
   - Tools stack: Project management, invoicing, time tracking
   - Financial: Quarterly tax payments, expense tracking"
        </div>
  <p><strong>Why this works:</strong> Freelance consulting requires business infrastructure, not just technical skill. This prompt designs a complete consulting practice: tiered service offerings with clear pricing and deliverables, proposal template, structured onboarding process, value-based pricing strategy, business development plan, and legal/operations foundation. The tiered structure lets clients start small (audit) and expand (implementation).</p>
</div>

<h3>The Future of Prompt Engineering Roles</h3>
<p>Prompt engineering as a standalone role may evolve as models become more capable and tools abstract away prompt complexity. However, the underlying skills — understanding AI capabilities, designing human-AI interactions, ensuring quality and safety — will remain valuable. The professionals who thrive will combine prompt expertise with domain knowledge, product thinking, or technical depth. Prompt engineering is a foundation, not a destination.</p>
        `,
        templates: [
          `Create a career positioning strategy for transitioning into [TARGET ROLE] from [CURRENT BACKGROUND]. Include: unique value proposition, skill gap analysis, portfolio project ideas, target company list, networking plan, 12-month timeline, and profile optimization.`,
          `Create interview preparation for a [ROLE] at [COMPANY TYPE] including: technical questions with answer frameworks, practical problems, experience questions, system design scenarios, take-home exercise approaches, questions to ask, salary prep, and a mock interview script.`,
          `Design a freelance [SPECIALTY] consulting practice including: tiered service offerings, proposal template, client onboarding process, pricing strategy, business development plan, and legal/operations setup.`
        ],
        keyTakeaways: [
          "Prompt engineering career paths include: Specialist, AI Product Manager, Integration Developer, Consultant, and Safety Researcher",
          "Stand out by combining prompt expertise with domain knowledge, demonstrated impact, and a public portfolio",
          "Career transitions require strategic positioning: unique value proposition, skill gap analysis, portfolio projects, and networking",
          "Freelance consulting needs business infrastructure: tiered offerings, structured process, value-based pricing, and business development",
          "Prompt engineering skills are a foundation — combine them with domain expertise, product thinking, or technical depth for long-term career growth"
        ],
        practiceExercise: "Write your personal career positioning statement: 'I help [target audience] [achieve specific outcome] by [unique approach].' Identify your top 3 skill gaps for your target role. Design one portfolio project that demonstrates your prompt engineering capability with measurable business impact. Create a 90-day plan to close your biggest skill gap."
      },

      // ---------- LESSON 10.5 ----------
      {
        id: "10-5",
        title: "Your 90-Day Action Plan",
        duration: "7 min",
        content: `
<h3>From Learning to Mastery</h3>
<p>This course has given you a comprehensive toolkit for prompt engineering. But knowledge without action is just potential. This final lesson translates everything you've learned into a concrete 90-day action plan — a week-by-week roadmap for building skills, creating deliverables, and establishing yourself as a competent prompt engineer. This is not a generic plan. It is a structured execution framework you will customize for your specific goals and context.</p>

<h3>The 90-Day Framework</h3>
<p>The plan is organized into three 30-day phases: (1) Foundation Days 1-30 — master core techniques, build your prompt library, and establish daily practice habits, (2) Application Days 31-60 — apply your skills to real projects, specialize in a domain, and create public portfolio pieces, and (3) Integration Days 61-90 — optimize and refine, share knowledge, and position yourself for opportunities. Each phase has specific objectives, weekly tasks, and deliverables.</p>

<h3>Phase 1: Foundation (Days 1-30)</h3>
<p>The first phase focuses on building core competency. Daily deliberate practice is essential — theory alone does not build skill. Each week has a focus theme, daily exercises, and a weekend project that produces a tangible deliverable.</p>

<div class="example-box">
  <h4>Example 1: 90-Day Action Plan — Phase 1</h4>
  <p><strong>BEFORE (Bad Plan):</strong></p>
  <div class="code-block">"I'll practice prompt engineering when I have time and hope to get better."</div>
  <p><strong>AFTER (Improved Plan):</strong></p>
  <div class="code-block">"You are creating a detailed 90-day action plan for mastering prompt engineering.

PHASE 1: FOUNDATION (Days 1-30)
Goal: Build core prompt engineering competency and establish daily practice

WEEK 1 — Role Assignment & Context Setting
Daily practice (30 min/day):
- Day 1: Rewrite 5 simple prompts with explicit role assignment
- Day 2: Add detailed context to 5 prompts and compare results
- Day 3: Experiment with 3 different tones for the same request
- Day 4: Practice chain-of-thought prompting with step-by-step reasoning
- Day 5: Create 3 prompts using few-shot examples
- Day 6: Weekend project — Write a comprehensive prompt for a task you do regularly
- Day 7: Review week's learning, document insights in your prompt journal

WEEK 2 — Structured Output & Formatting
Daily practice:
- Day 8: Design prompts that output JSON with specific schemas
- Day 9: Create prompts that generate Markdown tables and structured reports
- Day 10: Practice XML formatting for complex structured data
- Day 11: Build prompts with conditional logic in outputs
- Day 12: Create a prompt that generates both summary and detailed versions
- Day 13: Weekend project — Build a complete reporting prompt with tables, analysis, and recommendations
- Day 14: Journal review and reflection

WEEK 3 — Advanced Techniques
Daily practice:
- Day 15: Design chain-of-thought prompts for complex reasoning tasks
- Day 16: Create tree-of-thought prompts exploring multiple solution paths
- Day 17: Practice self-consistency prompting (same prompt, multiple runs)
- Day 18: Build a prompt with built-in verification steps
- Day 19: Design a ReAct-style agent prompt with tool descriptions
- Day 20: Weekend project — Create a multi-step analysis pipeline with 3 connected prompts
- Day 21: Journal review

WEEK 4 — Evaluation & Refinement
Daily practice:
- Day 22: Design a 10-case test suite for one of your prompts
- Day 23: Create an evaluation rubric with 4-5 dimensions
- Day 24: Benchmark your best prompt across 2 different models
- Day 25: Practice identifying and fixing failure modes
- Day 26: Document 3 prompts using the comprehensive documentation template
- Day 27-28: Weekend project — Build your personal prompt library with 10 fully documented prompts
- Day 29-30: Phase 1 review: Assess progress, identify strengths/weaknesses, plan Phase 2 focus areas

PHASE 1 DELIVERABLES:
- [ ] 10+ documented prompts in your personal library
- [ ] 1 multi-step prompt pipeline
- [ ] 1 comprehensive test suite with evaluation rubric
- [ ] Daily practice habit established (30 min/day, 30 days)
- [ ] Prompt journal with 30+ entries

TRACKING:
Daily: Check off practice, note one insight
Weekly: Review journal, assess deliverable completion
Phase end: Comprehensive self-assessment against objectives"
        </div>
  <p><strong>Why this works:</strong> This action plan transforms learning into daily practice with specific, achievable tasks. The weekly themes build progressively: role assignment → structured output → advanced techniques → evaluation. The weekend projects produce tangible deliverables. The tracking system creates accountability. The 30-minute daily commitment is sustainable for most professionals.</p>
</div>

<div class="example-box">
  <h4>Example 2: 90-Day Action Plan — Phases 2 & 3</h4>
  <p><strong>BEFORE (Bad Plan):</strong></p>
  <div class="code-block">"After the first month, I'll just keep practicing and see what happens."</div>
  <p><strong>AFTER (Improved Plan):</strong></p>
  <div class="code-block">"PHASE 2: APPLICATION (Days 31-60)
Goal: Apply skills to real projects and build public portfolio

WEEK 5 — Domain Specialization
- Choose your specialization domain: [healthcare/legal/marketing/engineering/finance/education]
- Study domain-specific prompting techniques from this course
- Create 5 domain-specific prompts with proper guardrails
- Weekend project: Build a complete domain workflow (e.g., legal research memo generator)

WEEK 6 — Real-World Project 1
- Identify a real problem at work or in your community that AI can help solve
- Design and implement a prompt-based solution
- Measure before/after impact (time saved, quality improvement, etc.)
- Document the project as a case study

WEEK 7 — Real-World Project 2
- Choose a different type of problem (if Week 6 was analysis, Week 7 should be creation)
- Implement with a different model to compare approaches
- Document as second case study
- Begin drafting a blog post about one project

WEEK 8 — Portfolio Building
- Create a public portfolio (GitHub, Notion, or personal website)
- Publish 2 blog posts about your projects with before/after metrics
- Contribute to 1 prompt engineering community discussion
- Get feedback on your portfolio from 2 peers

PHASE 2 DELIVERABLES:
- [ ] Domain specialization established
- [ ] 2 real-world projects with measurable impact
- [ ] 2 published blog posts or case studies
- [ ] Public portfolio live
- [ ] Community engagement (1+ meaningful contribution)

PHASE 3: INTEGRATION (Days 61-90)
Goal: Optimize, share knowledge, and position for opportunities

WEEK 9 — Optimization & Efficiency
- Review all prompts created — identify top 3 for optimization
- Optimize for: quality, cost, latency, and maintainability
- Implement version control for your prompt library
- Create reusable prompt templates for common patterns

WEEK 10 — Team Sharing
- If on a team: Present your best prompt to colleagues, teach one technique
- If solo: Create a tutorial or guide sharing what you've learned
- Get 3 people to test your prompts and provide feedback
- Incorporate feedback and document lessons

WEEK 11 — Advanced Exploration
- Experiment with one emerging capability (agents, multimodal, fine-tuning)
- Read 3 research papers on prompt engineering advances
- Attend 1 AI event (conference, meetup, or webinar)
- Update your skill gap analysis from Week 1

WEEK 12 — Strategic Planning
- Assess your progress against initial goals
- Update your career positioning statement
- Identify next steps: deeper specialization, career transition, consulting, etc.
- Create a 6-month continuation plan
- Celebrate your progress — you've built a valuable skill set

PHASE 3 DELIVERABLES:
- [ ] 3 optimized prompts with version control
- [ ] 1 tutorial, guide, or team presentation delivered
- [ ] 1 advanced exploration project completed
- [ ] Updated career positioning and 6-month plan
- [ ] Comprehensive portfolio of 90 days of work

FINAL 90-DAY PORTFOLIO CHECKLIST:
- [ ] 20+ documented prompts
- [ ] 3+ multi-step workflows or pipelines
- [ ] 2+ real-world projects with metrics
- [ ] 2+ public blog posts or case studies
- [ ] 1+ team presentation or tutorial
- [ ] 1+ advanced technique exploration
- [ ] Complete prompt library with version control
- [ ] Professional network expanded through community engagement"
        </div>
  <p><strong>Why this works:</strong> Phases 2 and 3 transition from learning to application and integration. Phase 2 focuses on real-world impact — the difference between someone who knows about prompt engineering and someone who can demonstrate results. Phase 3 focuses on optimization, sharing (which reinforces learning), and strategic positioning. The final portfolio checklist provides a concrete measure of progress.</p>
</div>

<div class="example-box">
  <h4>Example 3: Accountability and Tracking System</h4>
  <p><strong>BEFORE (Bad Plan):</strong></p>
  <div class="code-block">"I'll try to stick to the plan and hope I stay motivated."</div>
  <p><strong>AFTER (Improved Plan):</strong></p>
  <div class="code-block">"You are designing an accountability and tracking system for a 90-day prompt engineering mastery plan.

ACCOUNTABILITY SYSTEM:

1. DAILY TRACKING (5 minutes)
   Use a simple spreadsheet or habit tracker:
   | Date | Practice Done? | Duration | Focus Area | Key Insight | Prompts Created |
   
   Daily questions:
   - What did I practice today?
   - What was my key insight or learning?
   - What will I practice tomorrow?

2. WEEKLY REVIEW (30 minutes, same time each week)
   Template:
   ## Week [N] Review
   
   ### Practices Completed
   - [X] Days practiced: [N]/7
   - Total practice time: [N] hours
   - Prompts created: [N]
   
   ### What Worked
   - [List techniques that produced great results]
   
   ### What Didn't Work
   - [List techniques or approaches that failed]
   
   ### Key Insights
   - [New understanding or discovery]
   
   ### Next Week Focus
   - [Specific focus area and goals]
   
   ### Blockers
   - [Anything preventing progress and plan to resolve]

3. PHASE REVIEWS (2 hours at end of each 30-day phase)
   Score yourself 1-5 on each competency:
   - Role assignment and context setting
   - Structured output formatting
   - Chain-of-thought reasoning
   - Few-shot prompting
   - Agent design
   - Evaluation and testing
   - Domain-specific prompting
   - Safety and ethics
   - Documentation
   - Version control
   
   Compare to previous phase. Celebrate improvements. Plan focus for next phase.

4. ACCOUNTABILITY PARTNERS
   - Find 1-2 other people working on similar goals
   - Weekly 15-minute check-in: What did you do? What did you learn? What's next?
   - Share weekly reviews with each other
   - Celebrate wins together, troubleshoot blockers together

5. MOTIVATION SYSTEM
   - Visual progress tracker (calendar with X's, progress bar, etc.)
   - Milestone rewards: Week 4 (small treat), Week 8 (meaningful reward), Day 90 (celebration)
   - Public commitment: Post weekly updates on LinkedIn or Twitter
   - Before/after comparisons: Look back at your Day 1 prompts on Day 30, 60, 90

6. BLOCKER MITIGATION
   Common blockers and solutions:
   - 'No time' → Reduce to 15 minutes/day minimum, practice during commute/lunch
   - 'Not motivated' → Accountability partner check-in, revisit your 'why'
   - 'Too hard' → Simplify the task, go back to basics, ask for help
   - 'No real projects' → Use open-source projects, volunteer, create hypothetical projects
   - 'Stuck on a technique' → Move to a different technique, return later with fresh eyes

7. CONTINGENCY PLAN
   If you fall behind by more than 1 week:
   - Don't try to catch up — skip to current week
   - Reduce scope: Focus on core skills, defer advanced topics
   - Extend timeline: Turn 90 days into 120 days rather than quitting
   - Identify root cause: Is the plan too ambitious? Adjust accordingly"
        </div>
  <p><strong>Why this works:</strong> The best plan fails without execution support. This accountability system includes daily tracking (habit formation), weekly reviews (reflection and adjustment), phase reviews (competency measurement), accountability partners (social commitment), motivation systems (reward and recognition), blocker mitigation (problem prevention), and contingency planning (resilience). The key insight: consistency beats intensity — 15 minutes every day beats 3 hours once a week.</p>
</div>

<h3>Your Journey Starts Now</h3>
<p>You have the knowledge. You have the tools. You have the plan. The only remaining ingredient is action. Start today — not tomorrow, not Monday, not when you have more time. Open your preferred AI tool, choose one technique from this course, and practice it for 30 minutes. That first session is the beginning of your transformation from AI user to prompt engineer. The future belongs to those who can effectively communicate with, direct, and harness AI. That future starts now.</p>
        `,
        templates: [
          `Create a 90-day action plan for mastering [SKILL] with three phases: Foundation (Days 1-30), Application (Days 31-60), Integration (Days 61-90). Each phase has weekly themes, daily practice tasks, weekend projects, and specific deliverables. Include tracking and accountability mechanisms.`,
          `Design an accountability system for a [DURATION] learning plan including: daily tracking template, weekly review structure, phase assessment rubric, accountability partner framework, motivation system, blocker mitigation strategies, and contingency planning.`,
          `Create a career transition portfolio plan for moving into [TARGET ROLE] including: project ideas with metrics, content creation schedule, networking activities, public portfolio structure, and timeline with milestones.`
        ],
        keyTakeaways: [
          "The 90-day plan has three phases: Foundation (core skills), Application (real projects), Integration (optimization and positioning)",
          "Daily deliberate practice (30 min) produces more skill than occasional intensive sessions",
          "Phase 2 is about real-world impact — demonstrate measurable results, not just knowledge",
          "Accountability systems include: daily tracking, weekly reviews, accountability partners, and contingency plans",
          "Consistency beats intensity — a small daily practice sustained over 90 days transforms capability"
        ],
        practiceExercise: "Customize the 90-day action plan for your specific goals, availability, and context. Identify your Phase 1 Week 1 daily practice tasks. Schedule 30 minutes for tomorrow. Find an accountability partner and share your plan with them. Start your prompt journal today with entry #1: 'What I hope to achieve in 90 days and why it matters to me.'"
      }
    ]
  }
];
// ============================================================
// END OF COURSE CONTENT — PART B (Modules 6-10)
// Total: 5 Modules, 25 Lessons
// ============================================================
