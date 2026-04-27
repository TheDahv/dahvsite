---
title: My AI Development Setup (Q2 2026)
slug: my-ai-development-setup-q2-2026
date: 2026-04-26
categories: programming, product-management, software-engineering, ai
summary:
  ! How I use a mix of free and pay-as-you-go AI tools — Gemini, Claude Code,
  VS Code, tmux, Tailscale, and Termius — to keep building personal projects
  without a paid subscription to everything. My Q2 2026 hobby coding setup,
  optimized for simplicity, mobility, and staying vendor-independent.
---

## My Home Setup

I'm a PM by trade, but a builder at heart. Building projects at home is how I
reconnect to my software engineering roots, scratch the itch to learn, and stay
sharp on concepts I'm not using at work.

So let's get into my AI build stack for hobby coding.

The decisions here optimize for four things: simplicity, frugality, vendor
independence, and mobility. Simplicity means the setup is portable and easy to
replicate on another machine. Frugality means free or usage-based pricing.
Vendor independence means my AI platform is interchangeable and decoupled from
both my work tools and my process. Mobility means I can kick off, modify, or
resume work from anywhere.

Two caveats upfront: first, I'm leaning on my software engineering background
to unlock options that aren't realistic for non-technical users. Second, Claude
has released a paid version of nearly everything I'll describe here.

Here's the full tool list if you want to jump ahead:

- [Gemini](https://gemini.google.com/) — voice-first brainstorming and wide-angle research via Live mode
- [NotebookLM](https://notebooklm.google.com/) — research workbench for organizing and synthesizing sources before I start building
- [Claude](https://claude.ai/) — where I refine ideas, stress-test plans, and carry context across sessions with Projects
- [Claude Code](https://claude.ai/code) — my primary coding agent for structured, plan-driven implementation
- [VS Code](https://code.visualstudio.com/) — IDE for writing code and managing agent conversations
- [tmux](https://github.com/tmux/tmux/wiki) — persistent terminal sessions I can attach and detach from anywhere
- [Tailscale](https://tailscale.com/) — private network that makes my Mac Mini reachable from my phone or tablet
- [Termius](https://termius.com/) — SSH client for iOS and Android that connects me to my home setup on the go

## Languages: Go and TypeScript.

I default to Go and TypeScript unless I have a hard dependency on something
else, like Python for data science or machine learning. I haven't been a
professional developer in a few years, so these languages have specific
advantages that help me as an intermittent one:

1. **Simplicity and Familiarity:** Auditing LLM code suggestions and picking up
   where I left off both depend on working in languages I actually know well. Go
   is simple by design, which matters more than people give it credit for.
   TypeScript can get complex, but I've worked with it long enough that I can
   scan it quickly and understand what's happening.
1. **Good Dev Tooling:** Compilers, linters, and language servers keep a
   codebase honest. The richer the compiler output and warnings, the more
   signal I have to feed back into the loop when working with an LLM coding agent.
1. **Good LLM Training Data:** There's so much TypeScript and JavaScript out in
   the world that LLMs have strong intuitions for it. Sticking to well-known
   technologies lets me focus on novel business problems rather than fighting
   the model on novel technical ones.

## LLM for Brainstorming: Gemini and Claude

I use Gemini for walk-and-talk brainstorming and Claude for developing and
refining ideas.

Gemini's Live mode was one of the first voice AI experiences I tried and it's
still one of the best. It lets me explore and capture ideas while walking the
dog or riding the bus. Its foundation in web search means it does a good job
helping me go wide on a concept before narrowing down. The growing
[integrations with NotebookLM](https://blog.google/innovation-and-ai/products/gemini-app/notebooks-gemini-notebooklm/)
mean I can go from daydreaming to research workbench by the time I'm ready to
take the dog off the leash. Claude also has [Research
modes](https://support.claude.com/en/articles/11088861-using-research-on-claude)
for deep dives, and it's worth knowing they exist. In practice, I've gotten
more mileage from Gemini's expansiveness and its generous free-tier session
windows.

Claude is where I refine and develop. I use [Projects and
Artifacts](https://support.claude.com/en/articles/9547008-publishing-and-sharing-artifacts)
to carry context from session to session, and its [interactive visualizations](https://support.claude.com/en/articles/13641943-visual-and-interactive-content)
let me vet ideas and look around corners as things take shape.

Regardless of where I start, I move from concept to code the same way: convert
the brainstorming session into an implementation launchpad with an LLM-generated
prompt.

Here's a typical hand-off prompt:

> Generate an OVERVIEW.md to capture our high-level idea with the details and nuances we've worked out. Include anything that an LLM-based assistant needs to know about the desired end state. Then, generate a prompt optimized for Claude Code to read it as input, ask me clarifying questions, and generate a SPECS.md to provide a step-by-step guide for LLM coding assistants to help me build it.

I bring that into a new project folder and save it to a "docs" or "specs"
directory before writing a single line of code.

## LLM for Building: Claude Code, and sometimes Gemini.

Claude Code is my primary building partner. With a solid, well-debated plan, its
code quality and ability to stay on track has exceeded everything else I've
tried. I run it pay-as-you-go with an API key, and set up project-specific keys
when I'm using Claude within the product itself.

To keep costs down, I'll sometimes delegate grunt work to Gemini. Its code
quality and ability to stay on task isn't as consistent as Claude Code, but it
has a solid free tier, so I mix their strengths. A typical pattern: I assign
Gemini a specific step within the spec and let it run until it hits its free
tier limit. Then I ask Claude Code to run `git diff`, assess the change, and
leave feedback in a code review file. Gemini picks that up and implements the
changes. It's a way to get Claude's big-picture judgment without paying for
every line of generated code.

## IDE: VS Code

I use [VS Code](https://code.visualstudio.com/) to manage LLM conversations,
drive coding agent tasks, and write my own code. Cursor exists, I know. I
haven't felt the need. Since I can plan and interact with my codebase inside
or outside the app, the decoupling works fine for me.

VS Code has agent chat plugins for both Claude and Gemini, but I prefer the
terminal versions of each. That lets me manage multiple conversations and
sub-agents at once, and it sets me up well for the mobile workflow I'll describe
next.

## Mobile Workflow

The nice thing about running agents in the terminal is that I can reconnect to
a session from anywhere. The three tools that make this work are
[tmux](https://github.com/tmux/tmux/wiki), [Tailscale](https://tailscale.com/),
and [Termius](https://termius.com/index.html).

Tmux gives me multi-window CLI sessions I can attach to from any terminal.
Tailscale gives me a private network connecting my Mac Mini, iPad, and Android
phone. Termius lets me SSH into the Mac Mini from either device.

The typical flow: I set up a project on my Mac Mini and kick off an agent task
in a tmux session. Then I close the lid and walk away while the work continues
in the background. When I want to check in, I SSH back from my phone or tablet
and reconnect to the session. From there it's mostly monitoring progress and
granting any permissions the agent needs.

## What I Would Improve

Now that I'm settling into a pattern, I can see a few ways to grow:

1. **Standardize and Package:** The landscape changes constantly, but patterns
   like AGENTS.md and Skills definitions are durable, mostly vendor-agnostic, and
   easy to track in Git. The same way engineers moved their dotfiles to GitHub to
   standardize their setup across machines, I think a portable personal AI
   customization package is achievable. I just haven't built it yet.
1. **Streamline the Mobile Experience:** The SSH+tmux approach works, but typing
   on a phone is genuinely unpleasant. What would be better is either a dedicated
   app for connecting to remote sessions ([Claude
   Remote](https://code.claude.com/docs/en/remote-control), for example) or an
   always-on agent that can mediate the interaction
   ([OpenClaw](https://tmuxcheatsheet.com/openclaw-tmux-setup/), for example).
   AI vendors know this is a pain point for most users, so they charge for the
   good solutions. Claude, to their credit, seems to think carefully about the
   user experience here. But I'm on a pay-as-you-go API plan with a free account,
   and most of those features require a paid subscription. For now, "clunky but
   free" is the right trade-off.
