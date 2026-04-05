---
title: Your Budget Shouldn't Need You to Check In.
slug: your-budget-shouldnt-need-you-to-check-in
date: 2026-04-04
categories: programming, product-management, ai, finance
summary: Most budgeting tools fail not because they lack features, but because they demand consistent attention we don't always have. Here's how I built an always-on AI financial assistant — running locally on a Mac Mini, pushing updates via Telegram — that works around real constraints like ADHD and a busy schedule, so our budget stays useful even when life gets in the way.
---

## Our Journey With Budgeting

We already had a budget. We just kept forgetting to use it.

Budgeting is something I didn't really learn until becoming an adult. My early attempts were based on Dave Ramsey-style planning and allocation, creating a plan based on goals for my money.

Things got more complicated when I got married and combined finances with my wife. We struggled to maintain alignment between our plan and our actual spending. Then I learned about Mint and set up consistent rhythms to review our progress, track our goals, and keep ourselves disciplined.

Sadly Mint went away. We eventually replaced it with [Monarch](https://www.monarch.com/) and got back to our ideal setup: accounts, spending, and budget goal progress all in one place.

Something still wasn't working, though.

## How Attention Became Our Bottleneck

As our lives got fuller, it felt like we _had_ a budget but weren't _using_ our budget. Weeks could go by without either of us logging in. A portion of my income comes from RSUs, and we frequently don't know how much I need to sell to cover our budget needs.

Three kids. A busy job. Distractions. ADHD. These and plenty more reasons keep getting in the way.

When a great tool demands more attention than we can give it, something needs to change.

## What I Built and Why It Works

I built an AI assistant that bridges the attention gap between our budget tracking and our daily accountability. It's an always-on system running on my Mac Mini at home and costs close to nothing to run ($2.18 from March 15 to April 4).

The features I built target specific pain points:

1. **Message-Based UX:** We interact with the bot through Telegram, so engagement can be transactional and concise with no new apps.
1. **Scheduled Push Notifications:** The bot reaches out to us, so we don't have to remember to use it to get value.
1. **Monarch Integration:** Monarch handles multi-account syncing and budget goal setting. My assistant downloads that data so I can build on a solid foundation.
1. **Pre-Defined Reports:** I built daily, weekly, and monthly reports on our Monarch data with concise Claude-driven interpretation, covering standard questions proactively.
1. **Ad Hoc Analysis:** The assistant has access to tools and Claude-driven analysis, so we can get help on questions as our life flows around us, even when we're on the go.

So far it has consistently brought our budget back to top of mind. It helps me ask better questions so our budget becomes a leading guide rather than a lagging indicator.

## Builder Notes

I built this with TypeScript and Claude Code. It uses [monarch-money](https://github.com/keithah/monarchmoney-ts) to download Monarch data, SQLite for local analysis, macOS `launchctl` to run it as an always-on service, [Telegram](https://telegram.org/) to handle the UX, and [Anthropic's Claude](https://www.anthropic.com/) to interpret reports and field ad hoc questions.

A few key things about the build experience really made this shine.

### Spec-Driven Development to Get Things Right the First Time

Before a single line of code, I planned, designed, and debated the plan with Claude Code. The result is the [specs directory](https://github.com/TheDahv/financial-assistant/tree/main/specs). I could set AI coding agents on broad or specific tasks, run multiple in parallel, or even pit models from different providers against each other without any of them losing the plot.

This isn't novel by any means and is widely seen as best practice. What's interesting is the impact it has on frugality and getting things right the first time. When I talk to friends who work as professional software developers, they describe liberal budgets with highly-capable models that let them go nuts until the problem is solved. I'm paying with my own credit card, so I want my tokens to count. I spent _lots_ of time scrutinizing designs, challenging plans, and ensuring quality up front.

The result was minimized rework, cleaner designs, and reduced overhead.

One positive side effect was coordinating the strengths of different model platforms. Gemini has decent capacity in its free tier, but I find Claude Code's overall code quality to be better. To balance the two, I had Gemini create git branches to implement specific features following Claude-authored plans, then had it write a code review document for Gemini to read and clean up its own work. A great way to make progress frugally, using documentation to guide the way.

### AI Steering Files to Govern Agent Behavior

In addition to specs, I wrote documentation to govern AI behavior on tasks.

[AGENTS.md](https://github.com/TheDahv/financial-assistant/blob/main/AGENTS.md) contains a general project and purpose overview and guides AI assistants for general tasks. I've had mixed results getting Claude Code to read it consistently and have tried creating a CLAUDE.md symlink. Gemini seems to read it more reliably. It also refers to other files for specific tasks like development.

[DEVELOPMENT.md](https://github.com/TheDahv/financial-assistant/blob/main/DEVELOPMENT.md) tries to minimize codebase scans and enforce consistent patterns. The former keeps agents working from context rather than token-heavy code scans. The latter creates guardrails to keep development patterns consistent and avoid Frankenstein codebases.

[SYSTEM.md](https://github.com/TheDahv/financial-assistant/blob/main/SYSTEM.md) governs the behavior of the financial assistant at runtime. It gets loaded for each analysis program and ad hoc question from the users. This includes an overview of schema and available tools.

### LangChain to Abstract AI Agent Patterns

I used [LangChain](https://docs.langchain.com/oss/javascript/langchain/overview) for the LLM-driven aspects of the assistant. While I knew I wanted Claude models, I wanted to take advantage of well-worn patterns these libraries provide, including out-of-box code for [conversation history, tool invocation, and system prompt loading](https://github.com/TheDahv/financial-assistant/blob/main/src/routing/agent-executor.ts#L143-L233). There's still a lot for me to learn in the ecosystem, but the docs are extensive, coding assistants know these tools, and the TypeScript compiler keeps me honest.

### Telegram as Available-Everywhere UX

Telegram solves the problem of making my assistant available from anywhere without deploying to the cloud or securing an internet-enabled pathway to my home server. As a bonus, it's a UX that takes no effort to learn. My friend [Caleb](https://www.linkedin.com/in/caleb-johnston/) turned me on to this idea. The setup took some guesswork, but I found a couple helpful guides ([1](https://docs.flockx.io/documentation/integrations/telegram), [2](https://pub.towardsai.net/telegram-is-quietly-becoming-the-default-front-door-for-ai-agents-e0ba57a5b681)). Here's what I had to do:

1. Create a Telegram account if you don't already have one.
1. Search for [BotFather](https://telegram.me/BotFather) to create and manage bots.
1. Follow its instructions to create a new bot. I called ours `@pierce_financial_advisor_bot`.
1. Start a new chat with BotFather, run `/mybots`, and choose your bot to manage its settings.
1. Choose "Bot Settings" and click "Allow Groups?" to turn that on.
1. Create a new private group and invite your bot and anyone else using the app.

If you're using my program (see below), you'll also need the IDs for your group, your bot, and the allowed users. I used [GetIDs Bot](https://t.me/getidsbot) and invited it to my room. It loaded the group chat ID automatically — the hyphen in front of the number matters. Finding user IDs took me way too many tries and I never sorted it out through the bot. I pulled them from my program logs instead.

Once I had all the IDs, my program [creates a Telegram bot listener](https://github.com/TheDahv/financial-assistant/blob/main/src/bot/telegram.ts) to watch for incoming messages. It uses a whitelist to only respond to allowed users and functions as a router, mapping requests to programs or to the AI agent for ad hoc queries.

### Don't Use AI When Code Will Do

My design biases toward running well-known and repeated tasks through code rather than an LLM. This takes advantage of Telegram slash commands, where each command maps to an analysis program or routine. Since it's code, it runs predictably every time without spending tokens. Pre-defined analysis programs combine SQL and data manipulation patterns before handing results to the AI for a concise narrative.

This saves the AI for truly novel tasks, routing ad hoc queries through LangChain and on to Claude.

### Are We Agentic Yet?

I built capabilities to let the AI handle problems when ad hoc requests route to it. This includes invoking any pre-defined analysis program to fetch recent results ([see tool definitions](https://github.com/TheDahv/financial-assistant/tree/main/mcp/tools)). I also gave it a map of [the database schema](https://github.com/TheDahv/financial-assistant/blob/main/SYSTEM.md#database-schema) and the ability to run read-only queries ([see tool definition](https://github.com/TheDahv/financial-assistant/blob/main/src/mcp/tools/run-query.ts)).

Whether this meets the definition of agentic is debatable. It only makes choices when I ask questions, and it only reads information rather than taking actions or making real-world changes on my behalf. More advanced patterns would do both without waiting for input.

I don't need those things yet. It's enough that the assistant can compose simple tools to tackle questions I haven't thought of without me writing new code for each one.

## What's Next

I built in a question log and a program registry. This will let me turn common ad hoc queries into new pre-defined reports. Beyond that, we've mostly met our needs. Down the road it might be nice to get recommendations and automatic budget goal management, like automatically moving things to savings or managing investments. For now, I'm content to do that by hand.

## Want to Try It for Yourself?

All of this code lives on [GitHub](https://github.com/TheDahv/financial-assistant/tree/main). You're welcome to try it out, though this isn't a product with any customer guarantees. I'd be happy to hear what you try and would welcome any additions you want to make.
