---
title: Your Budget Shouldn't Need You to Check In.
slug: your-budget-shouldnt-need-you-to-check-in
date: 2026-04-04
categories: programming, product-management, ai, finance
summary: !
---

## Our Journey With Budgeting

We already had a budget. We just kept forgetting to use it.

Budgeting is something I didn't really learn until becoming an adult. My early
attempts were based on David Ramsey-style planning and allocation, creating an
plan based on goals for my money.

Things got more complicated when I got married and combined finances with my wife. We
struggled trying to maintain alignment between our plan and our actual spending. Then
I learned about Mint and set up consistent rhythms to review our progress, track our goals,
and keep ourselves disciplined to our plan.

Sadly Mint went away. We eventually replaced it with
[Monarch](https://www.monarch.com/) and were able to get back to our ideal
setup: accounts, spending, and budget goals progress all in one place.

However, something still wasn't working.

## How Attention Became Our Bottleneck

As our lives got more and more full, it felt like we _had_ a budget but weren't
_using_ our budget. Weeks could go by without either of us logging in. I currently
work in a job where a portio of my income comes from RSUs, and we frequently don't
know how much I need to sell to cover our budget needs.

Three kids. A busy job. Distractions. ADHD. These reasons and plenty more keep
getting in the way.

When a great tool demands more attention than we can give it for it to be
successful, something needs to change.

## What I Built and Why It Works

I built an AI assistant that bridges the attention gap between our budget tracking
and our daily accountability. It's an always-on system that runs on my Mac Mini at
home and it costs me close to nothing to run ($2.18 from March 15 to April 4).

The features I built into it target specific pain points:

1. Message-Based UX: We interact with the bot through Telegram, so engagement can be transactional and concise with no new apps.
1. Scheduled Push Notifications: The bot reaches out to us, so we don't have to remember to use it to get the value.
1. Monarch Integration: Monarch handles multi-account syncing and budget goal setting and my assistant downloads the data, so I can build on top of a solid foundation.
1. Pre-Defined Reports: I build daily, weekly, and monthly reports on our Monarch data with concise Claude-driven interpretation, so I'm covering standard questions proactively.
1. Ad Hoc Analysis: The assistant has access to tools and Claude-driven analysis, so we can get help on questions and accountability as our life flows around us -- even when we're on the go.

So far, it has been helpful to consistently bringing our budget back to top of
mind. It helps me ask better questions so our budget becomes a leading guide
rather than a lagging indicator.

## Builder Notes

I built this with TypeScript and Claude Code. It uses
[monach-money](https://github.com/keithah/monarchmoney-ts) to download Monarch
data, sqlite for local analysis, Mac `launchtl` to run this as an always-on
service, [Telegram](https://telegram.org/) to handle the UX, and [Anrhropic's Claude](https://www.anthropic.com/) to interpret reports and
field ad hoc questions.

A few key things about the build experience really made this shine.

### Spec-driven Development

Before a single line of code, I planned, designed, and debated the plan with Claude Code. The result is the [specs directory](https://github.com/TheDahv/financial-assistant/tree/main/specs). I could set AI coding agents on broad or specific tasks, run multiple in parallel, or even compete models from different providers without any of them losing the plot.

This isn't novel by and means and is widely seen as best practice in industry. It's interesting the impact it has om frugality and getting things right the first time. When I talk to friends who work as profession software developers, they describe liberal budgets with highly-capable models that let them go nuts until the problem is solved. I'm paying with my own credit card, so I want my tokens to count. I spent *lots* of time scrutinizing designs, challenging plans, and ensuring quality up front. 

I experienced minimized rework, cleaner designs, and reduced overhead as a result.

A new positive consequence was coordinating the strengths different model platforms. Gemini has decent capacity in its free tier. However, I find Claude Code's overall code quality to be better. Unfortunately, there's no such free tier. To balance, I had Gemini create git branches to implement specific features following Claude-authored plans. Then I had write a code review document document for Gemini to read and clean up its work. This proved to be a great way to make progress frugally, using documentation to guide the way.

### AI steering files:

In addition to specs, I also wrote documentation to govern AI behavior on tasks. 

[AGENTS.md](https://github.com/TheDahv/financial-assistant/blob/main/AGENTS.md) contains a general project and purpose overview and guides AI assistants for general tasks. I've had mixed results getting Claude Code to read it consistently and have tried creating a CLAUDE.md symlink. However, I can also ask to load it when we start sessions. Gemini seems to read it consistently. It also refers to other files for specific tasks, such as development.

[DEVELOPMENT.md](https://github.com/TheDahv/financial-assistant/blob/main/DEVELOPMENT.md) tries to minimize code base scans and enforce consistent patterns. The former is an attempt to be frugal so agents can get project details its context rather than token-heavy code scans. The latter creates guardrails to keep development patterns consistent and minimize Frankenstein code bases.

[SYSTEM.md](https://github.com/TheDahv/financial-assistant/blob/main/SYSTEM.md) governs the behavior of the financial assistant in action. It gets loaded for each analysis program and ad hoc question from the users (that's us).

1. AGENTS.md
  2. DEVELOPMENT.md
  3. SYSTEM.md

## What's Next

## Want to Try it for Yourself
