---
title: Wine Pairings and AI Part 1
slug: wine-pairings-and-ai-part-1
date: 2025-08-28
categories: programming, product-management, ai
summary: !
  Follow this technical product manager's journey back into coding through
  building a wine pairing AI app. Learn practical prompt engineering techniques,
  AWS Bedrock model comparison strategies, and meta-prompting optimization using
  Claude Sonnet 4 to improve Claude Haiku 3.5 performance. Includes real
  examples and takeaways for developers and PMs ramping up on AI development.
---

# From Recipe to Recommendation: My First Deep Dive into Prompt Engineering

I'm a technical product manager trying to ramp up on AI, just like all of you.
When I want to learn something new, I like to get my hands dirty with a project
so I can experience things for myself – including the good, bad, and the ugly.
I was a full-stack engineer for 10+ years before transitioning to product
management, but I haven't written any serious code since 2021, so this journey
was a mix of new things and familiar things for me.

I also have a passion for wine. It's the kind that likes getting nerdy when that
makes sense and it's the kind where I just want to focus on what feels good when
it doesn't. And that's what I want for you too – to help you discover wines
you'd like with your dinner tonight. And not just "like", but fully enjoy the
magic when the flavors from your food and drink combine to hit just right.

Most wine pairing advice is generic. "Red wine with red meat, white wine with
fish." That's not wrong, but it's not particularly helpful when you're making
Thai basil chicken, trying to figure out what goes with your grandmother's
complicated braised short rib recipe, or trying to honor that someone who
invited you over for a special dinner.

So I built an app that reads your actual recipe and suggests wines based on the
specific ingredients, cooking methods, and flavor profiles. You can try it at
[wine-suggestions.thedahv.com](https://wine-suggestions.thedahv.com). 

Full disclaimer: I happen to work at Amazon, but this is a home project I 
pursued to guide my personal learning journey. These thoughts are my own
and do not represent any company mentioned here.

This is the first post in a series about building that app. This post focuses on
prompt engineering – learning to communicate effectively with AI models to get
consistent, useful results. The other posts cover moving from prompts to a web
app on AWS, using Claude Code to refactor from containers to serverless,
leveraging multiple AIs for DevOps work, and adding MCP tools to extend the
app's capabilities.

You can read the code for this post [on GitHub](https://github.com/TheDahv/wine-pairing-suggestions/commit/6321667427516dccd601d5f9684ca689ddc4200e#diff-ed4d81d29a7267f93fd77e17993fd3491b9ef6ded18490b4514d10ed1d803bc2).

Here's what I learned about prompt engineering during that process.

## Key Lessons Learned

Let me start with the most important insights, then we'll dig into how I got
there.

### Model Selection Strategy: Optimize for Your Production Constraints

This was a learning project for me, so I made decisions based on "feels right" criteria rather than rigorous testing. I settled on Claude Haiku 3.5 because
it hit the sweet spot I needed: fast enough for real-time responses, accurate
enough for wine recommendations, and cheap enough that I wouldn't panic about my
AWS bill.

If this were a production decision at work, the process would look different.
You'd define success metrics (accuracy scores, consistency rates, latency
targets), create test datasets with 50-100 diverse recipes, run statistical
comparisons across models, and build cost projections at different usage
volumes. But understanding that framework helped me make better decisions even
in my informal evaluation.

The takeaway: you don't always need the most sophisticated model. You need the
right model for your specific constraints.

### Use Bedrock to Evaluate Performance Across Providers

AWS Bedrock let me test the same prompts across different models systematically
– Claude, Titan, Nova, all with the same interface. This revealed differences
you don't see in marketing materials. Some models were faster but inconsistent
with JSON formatting. Others were accurate but verbose in ways that didn't match
my app's style.

Real-world performance often differs from benchmark claims, and Bedrock made it
easy to discover those differences.

### Meta-Prompting: Use Advanced Models to Optimize for Efficient Models

Here's a technique that surprised me: I used Claude Sonnet 4 to optimize my
prompts for Claude Haiku 3.5. This is an example of strategic cost management –
expensive model for one-time optimization, cheap model for production.

I'll show you a concrete example later, but Claude Sonnet 4 identified
optimization patterns I missed: cleaner structure, better error handling, more
effective few-shot examples. The AI could analyze my prompts more systematically
than I could.

### AWS and Development Experience

Now, I was a full-stack developer back in the day. I've seen the full range from
deploying to a physical server in a Tukwila datacenter, pushing code to Heroku,
downloading code to virtual machines, and pushing containers to AWS.  Even with
that experience, the world of software engineering moves fast. There was a lot
more to learn about AWS since the last time I looked.

That started with catching up with Bedrock model setup, configuring IAM
permissions with roles and policies, and understanding regional availability.
Other tools simplify this with just API keys, but that comes with less control
over permissions and usage.

I knew [Langchain](https://www.langchain.com/) is the leading toolkit to
standardize the API for interacting with LLMs in code. I like Go, so I found [LangChain Go](https://github.com/tmc/langchaingo) 
to abstract away model-specific API differences, letting me focus on the problem 
rather than service integration details. I recommend this as worth the learning curve if
you're planning to test multiple providers.

## The Two-Phase Architecture Decision

I could have built this as one big prompt: "Look at this recipe and suggest
wines." Instead, I split it into two phases, and that decision shaped everything
that followed.

**Phase 1**: Web content → clean recipe summary (ingredients, cooking methods,
*flavor profiles)  
**Phase 2**: Recipe summary → wine recommendations with reasoning

Why split it? Recipe extraction and wine pairing are different tasks and I
wanted tight control in my code rather than the LLM in early project phases.
More importantly, I was working with raw internet content, which meant potential
security risks. Converting to Markdown stripped out any executable code and gave
me clean, predictable input without.

This approach also saved tokens. Rather than sending entire recipe blog posts to
the wine pairing prompt, I could send a focused summary. More deterministic,
more reliable, cheaper to run. More importantly, I could keep the "boring" parts
of the problem in code while saving my tokens and LLM power for the core of my
idea.

Early testing validated this: the two-phase approach gave more consistent
results than trying to do everything in one prompt.

## The Experimentation Journey

### Manual Prompt Development (Claude Desktop, Gemini Web App)

I started where most people start: typing prompts into Claude Desktop and
Gemini's web interface. This is actually a good way to begin. You can iterate
quickly, try different phrasings, see how models respond to various approaches.

I learned that specificity matters more than creativity. "Suggest wines for this
recipe" produces generic results. "Analyze the primary flavors and cooking
methods in this recipe, then suggest three wines with specific regions and
vintage ranges, explaining why each pairing works" gets you somewhere useful.

Each model has personality differences. Claude tends toward structured, detailed
responses. Gemini sometimes gives more creative suggestions but less consistent
formatting. Understanding these differences helped me choose the right model for
each task.

### Programmatic Testing with AWS Bedrock

Moving from manual testing to programmatic testing changed everything. I could
run the same prompt across multiple models, compare results systematically, and
start building repeatable workflows.

Bedrock's Chat Playground helped bridge the gap – you can test prompts
interactively before moving to code. But getting a local program to talk to
Bedrock involves several IAM steps: requesting model access, setting up roles
and policies, understanding which models are available in which regions.

This is where other tools have an advantage. OpenAI, Anthropic, and others let
you start with just an API key. No role scoping, no permission policies upfront.
AWS gives you more control, but that control comes with complexity that can kill
experimentation momentum.

### CLI Tools and LangChain Go

I built simple command-line tools to systematize prompt testing. LangChain Go
abstracted the differences between model APIs – the same code works with Claude,
Titan, or Llama, just by changing configuration parameters.

This let me focus on prompt engineering rather than service integration. I could
test prompt variations, track which approaches worked, and build reproducible
workflows for evaluation.

## Meta-Prompting: Using Claude to Optimize Prompts

Once I settled on Haiku 3.5 as my production model, I had a new problem: my
prompts worked, but they were verbose and sometimes inconsistent.

So I tried something that felt recursive: I asked Claude Sonnet 4 to help me
optimize my prompts for Claude Haiku 3.5.

Here's a concrete example. My original prompt for wine recommendations was long
and conversational:

```
Role: You are a wine-minded foodie who wants to make wine accessible to 
everyone, particularly focusing on wine's relationship with food. Rather 
than being highbrow and inaccessible, you bias for approachable 
suggestions that are easy to understand.

Context: You are given a recipe in markdown format with an intent to 
think about wines that would pair well...
```

After optimization with Claude Sonnet 4, it became:

```
Summarize this recipe for wine pairing. Focus on flavors and key ingredients.

Create a one-paragraph summary highlighting:
- Primary flavors (sweet, salty, acidic, bitter, umami)
- Cooking methods (grilled, braised, roasted, etc.)
- Key ingredients by flavor impact (most important first)
- Sauce/seasoning profile
- Overall dish weight (light, medium, heavy)

Respond in this exact JSON format:
{
  "ok": boolean,
  "abortReason": string or null,
  "summary": string or null
}
```

The optimized version had several improvements I hadn't considered:

* **Prompt Clarity**: Direct task instructions instead of role-setting prose  
* **Structured Output**: Explicit JSON schema with error handling  
* **Few-Shot Examples**: Concrete success and failure cases  
* **Input Validation**: Abort conditions for non-recipe content  

The meta-prompting process revealed something interesting: AI can identify
prompt weaknesses that humans miss. Claude Sonnet 4 analyzed my original prompt
more systematically than I could, suggesting specific improvements based on how
language models actually process instructions.

When should you use this technique? When you have working prompts that need
optimization, when you're targeting a specific model for production, or when you
want to understand prompt engineering patterns more systematically.

## Takeaways Regardless of What you Do

**For Returning Developers**: 
* The AWS "secure-by-default" still takes time to learn if you're not already solid on it.
* Abstractions like LangChain help you focus on the problem rather than service specifics. 
* Don't let IAM complexity stop you from experimenting – start with
simpler API-key-based services if needed.

**For Current Developers**:
* Systematic prompt engineering approaches pay off.
* Test across models, use meta-prompting for optimization, and treat prompt
development like any other code – version it, test it, refactor it.

**For Product Managers**:
* Understanding these technical decisions helps you make better product choices.
*  Model selection involves real trade-offs between accuracy, speed, and cost.
* The cheapest model isn't always the most expensive when you factor in reliability and user experience.

---

*This is the first post in a series about building an AI-driven app. Next up:
moving from command-line tools to a web app deployed on AWS.*
