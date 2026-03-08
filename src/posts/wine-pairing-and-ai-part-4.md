---
title: Wine Pairings and AI Part 4
slug: wine-pairings-and-ai-part-4
date: 2025-03-08
categories: programming, product-management, ai
summary: >
  Picking a managed cache service early in the project came with hidden
  infrastructure costs I hadn't questioned in months. Learning to write detailed
  specs and architecture docs before touching code let me migrate to a simpler
  data layer, deploy without hand-holding, and cut my monthly bill by 85%. The
  bigger lesson is that comprehensive planning unlocks AI autonomy and
  architectural knowledge you don't have can come from the docs you give your AI
  tools.
---

# A Guiding Hand Goes a Long Way

I'm a technical product manager trying to ramp up on AI, just like all of you. When I want to
learn something new, I like to get my hands dirty with a project so I can experience things for
myself, including the good, bad, and the ugly. I was a full-stack engineer for 10+ years before
transitioning to product management, but I haven't written any serious code since 2021, so this
journey was a mix of new things and familiar things for me.

Most wine pairing advice is generic. "Red wine with red meat, white wine with fish" isn't
helpful when you're making Thai basil chicken or your grandmother's complicated braised short rib
recipe. So I built an app that reads your actual recipe and suggests wines based on the specific
ingredients, cooking methods, and flavor profiles. You can try it at
[wine-suggestions.thedahv.com](https://wine-suggestions.thedahv.com).

Full disclaimer: I happen to work at Amazon, but this is a home project I pursued to guide my
personal learning journey. These thoughts are my own and do not represent any company mentioned
here.

This is the fourth post in a series about building that app. I took a break from working on it,
and the way I use AI to build tools has improved dramatically.

In previous posts, we explored building apps with AI as a key service driver. We stopped short of
fully embracing AI for the build process ([read more on that](https://www.thedahv.com/blog/wine-pairings-and-ai-part-3/)).
My conclusion at the time was to avoid low-ROI applications like line-level assistants, instead
focusing on high-level operations like design, system architecture, and module-level code
organization.

What's transformed my usage of AI in the build phase is putting more effort into planning before
letting these tools touch code or cloud resources. In this post, we'll cover the problem I needed
to solve, what plan-driven AI assistance actually looks like in practice, how I approached the
migration, and what it all cost (and saved).

You can read the code for this post on
[GitHub](https://github.com/TheDahv/wine-pairing-suggestions/commit/cde0dc35ecdacb52024304da1474e8c17a09c3e0).

## Key Lessons Up Front

### Document Early and Often

Whether specs, AGENTS.md files, steering files, or architecture guides, comprehensive
documentation prevents hallucination, enables consistency across AI sessions, and makes your
work reproducible. Pick the approaches that fit your workflow. I'll mention these frequently,
so make sure you read these links if you stop reading here:

* **[Steering](https://kiro.dev/docs/steering/)** guide AI behavior at the project or task level.
* **[AGENTS.md](https://agents.md/)** gives AI assistants project-specific context they can always reference.
* **[Skills](https://agentskills.io/home)** capture reusable patterns and domain knowledge your AI can draw on.

### Invest in Planning For Better Savings and Results

Comprehensive specs unlock AI autonomy. Clearer plans lead to fewer clarifications, which leads
to successful deployments while you're away from the keyboard. Plus, infrastructure savings dwarf
the AI tooling costs that made them possible.

### Cloud Architecture Wisdom Needs to Come from Somewhere

Without guidance, you inherit complexity. You can inject architectural knowledge via specs,
documentation, and AGENTS.md files. Combining multiple AIs with prompt-for-prompt techniques lets
you leverage each tool's strengths. The result: you can question inherited decisions and remove
infrastructure that no longer serves you.

## How a Subtle Design Choice Cost $432 a Year

My app was running, but the architecture was costing more than it should. To understand why, it
helps to know what the app actually needs to store.

A cache is a simple, fast storage layer for data you want to retrieve cheaply
without recomputing it. My app needed that for two reasons: saving and reusing
expensive LLM and web calls and tracking user quotas to keep the app from being
abused. A cache was a reasonable solution to both problems.

The trouble was the specific cache I chose. I picked Elasticache, Amazon's managed cache service,
early in the project without fully thinking through what it was implying about the rest of my
architecture. Elasticache requires a VPC, Amazon's private networking layer. That meant my Lambda
function, which needs to talk to the public Internet to fetch recipes and call APIs, also had to
live inside a VPC to reach the cache. Having both required internal IP gateways and an always-on
IP address, at $32/month for the NAT Gateway and $3.60/month for the static IP. That's $432/year
just to keep the plumbing in place for a learning project with light traffic.

## Write the Plan Down Before Touching the Code

The biggest change in how I work with AI tools is what I do before I let them write a single line
of code. I collaborate with the AI to plan the approach, define the outcomes, and debate the
paths to get there. The industry is starting to formalize this into dedicated modes:
[Anthropic Plan Mode](https://code.claude.com/docs/en/common-workflows#use-plan-mode-for-safe-code-analysis),
[Gemini Plan Mode](https://geminicli.com/docs/cli/plan-mode/), and
[Kiro Spec-Driven Development](https://kiro.dev/docs/specs/) are all variations on the same idea.

Writing the plan to disk, not just keeping it in the chat session, is what makes the difference.
A written plan lets you inspect it, change it, ask questions about it, and challenge its
assumptions before any code changes hands. It also lets AI agents resume from a last checkpoint
across sessions and enables product-agnostic workflows where you can use multiple AIs on the same
project.

In practice, I created three documents for this migration:

* [`specs/migrate-data-layer.md`](https://github.com/TheDahv/wine-pairing-suggestions/blob/main/specs/migrate-data-layer.md): a detailed migration plan with patterns, examples, and validation checkpoints
* [`specs/codebase-guide.md`](https://github.com/TheDahv/wine-pairing-suggestions/blob/main/specs/codebase-guide.md): an architecture guide documenting decisions and their rationale
* [`AGENTS.md`](https://github.com/TheDahv/wine-pairing-suggestions/blob/main/AGENTS.md): a quick reference for AI assistants on project standards

These weren't just methodology for methodology's sake. They prevented hallucination, ensured
consistency across AI sessions, and made the work reproducible in a way that pure chat history
never could.

## Replacing the Cache Without Breaking the App

The goal was to replace Elasticache with a data layer that didn't require a VPC. I started with
research, where Google's AI search product did fine, though Claude and Gemini were also good
thought partners for working through the trade-offs. After settling on DynamoDB for its cost
structure, serverless approach, and feature compatibility, I used the project-specific AI context
to draft an architecture and code migration plan.

The approach was a side-by-side implementation: build the new DynamoDB layer alongside the
existing Elasticache layer, vet functionality before fully offboarding from the old system. The
key technique was documenting the high-level plan in the project root and in a specs folder, with
folder-level guidance wherever the AI needed extra context to stay on track. You can see the
[migration spec on GitHub](https://github.com/TheDahv/wine-pairing-suggestions/blob/main/specs/migrate-data-layer.md)
if you want a concrete example of what that looks like.

## Letting the Specs Handle Deployment

Deploying to AWS well requires expertise in SAM, CloudFormation, and a handful of AWS-specific
configuration patterns. I don't have deep familiarity with any of those. In the past, that meant
either doing a lot of trial-and-error or accepting that the result might not follow best practices
because I didn't know what I didn't know.

Documenting the deployment config, the steps required, and the desired end state changed that.
With a clear spec in place, the AI could apply consistent, correct deployment patterns without
needing me to personally know every detail of SAM configuration. The consistency comes from the
spec, not from me holding its hand through every decision.

The technique I leaned on most was prompt-for-prompt: ask one AI to generate a prompt for a
different AI. Claude knew my project context well. Amazon Q is well-trained in AWS technologies.
Gemini had access to web search to validate assumptions. By asking Claude to write a prompt
tailored for Amazon Q to update my SAM deployment config, I got the best of each tool without
manually translating context between them.

I realized the payoff when I pre-approved all deployment actions and came back later to find the
work completed, without back-and-forth, without ambiguity. The specs had encoded enough context
that the AI could follow industry best practices on my behalf.

## The Results: 85% Off the AWS Bill

Everything worked. The migration was clean, and the numbers were immediate. My AWS bill dropped
from roughly $55/month to roughly $8/month, an 85% reduction. That's $432/year in infrastructure
costs eliminated, which is more than I spent on LLM tokens for the entire migration project. The
savings will go down further once the old cache layer is fully decommissioned.

## Takeaways for Different Audiences

### For Developers Exploring AI Coding Tools

Think of spec-driven development the way you'd think of an architecture or design review with a
teammate before starting a project. Putting in hard thinking up front streamlines the
implementation. Your team is probably already using these concepts in some form. If not, they're
worth learning and bringing to your team:

* **[Steering](https://kiro.dev/docs/steering/)** guide AI behavior at the project or task level.
* **[AGENTS.md](https://agents.md/)** gives AI assistants project-specific context they can always reference.
* **[Skills](https://agentskills.io/home)** capture reusable patterns and domain knowledge your AI can draw on.

### For Product Managers

One of the biggest gaps for technical and non-technical users alike is moving an idea from local
prototype to an Internet-facing tool. If you don't have cloud or DevOps knowledge, it needs to
come from somewhere. You can inject it through the same Steering Files, AGENTS.md, or Skills approaches.

The [Kiro AWS Well-Architected Steering File example](https://builder.aws.com/content/35ciE341oLnIjDbpGsVRvIGfMCf/mastering-kiro-steering-a-complete-guide-to-context-aware-ai-development)
is a good concrete starting point. Steering files are technically a Kiro-specific concept, but the
underlying idea maps directly to skills and AGENTS.md in other tools. The point is the same: give
your AI the knowledge it needs before it starts making decisions on your behalf.

I'll keep working on this tool and documenting what I learn as I go. Stay tuned!