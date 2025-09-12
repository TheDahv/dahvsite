---
title: Wine Pairings and AI Part 3
slug: wine-pairings-and-part-3
date: 2025-09-12
categories: programming, product-management, ai
summary: 
  My experience using Claude Code to refactor from containers to serverless infrastructure revealed 
  the hidden costs of AI-assisted development. A $1.50 code generation task turned into weeks of 
  debugging AWS IAM policies and VPC networking issues, teaching me that different AI tools excel 
  at different tasks and that production infrastructure complexity still requires human expertise.
---

# When AI Coding Meets Production Reality: My $1.50 Refactor That Cost Me Weeks

I'm a technical product manager trying to ramp up on AI, just like all of you. When I want to 
learn something new, I like to get my hands dirty with a project so I can experience things for 
myself – including the good, bad, and the ugly. I was a full-stack engineer for 10+ years before 
transitioning to product management, but I haven't written any serious code since 2021, so this 
journey was a mix of new things and familiar things for me.

Most wine pairing advice is generic — "red wine with red meat, white wine with fish" — but that's 
not helpful when you're making Thai basil chicken or your grandmother's complicated braised short 
rib recipe. So I built an app that reads your actual recipe and suggests wines based on the 
specific ingredients, cooking methods, and flavor profiles. You can try it at 
[wine-suggestions.thedahv.com](https://wine-suggestions.thedahv.com).

Full disclaimer: I happen to work at Amazon, but this is a home project I pursued to guide my 
personal learning journey. These thoughts are my own and do not represent any company mentioned 
here.

This is the third post in a series about building that app. In my first post, I covered prompt 
engineering fundamentals. In my second post, I covered moving from CLI tools to a full-stack web 
app. This post is about what happens when AI coding collides with production infrastructure 
reality – specifically, my experience using Claude Code to refactor from containers to serverless, 
and why a $1.50 code generation task turned into weeks of debugging.

You can read the code for this post on 
[GitHub](https://github.com/TheDahv/wine-pairing-suggestions/commit/cde0dc35ecdacb52024304da1474e8c17a09c3e0).

Here's what I learned about AI coding assistants during that process.

## Key Lessons Learned

Let me start with the most important insights, then we'll dig into how I got there.

### Combine the Strengths of Multiple AI Assistants

Different AI tools excel at different tasks, and I ended up using four different assistants 
throughout this project:

**Claude Code** was excellent for isolated coding tasks and architecture conversations, but 
struggled with cross-module concerns and AWS-specific practices. It's the only one I paid for, so 
my expectations were higher.

**Gemini's CLI and Mobile apps** became my rubber duck for design conversations while on the go. Its web 
search capabilities made it exceptional at troubleshooting cryptic AWS deployment errors.

**AWS Q** was hands-down the best for DevOps and production issues. Its agents could read my actual 
AWS account, test connectivity, and generate scripts I could run directly in the Cloud Console.

The takeaway: no single AI assistant handles every aspect of software development well. Match the 
tool to the task. Combine what you can to get the job done.

### AI Coding Doesn't Replace Infrastructure Knowledge

Unless you're building entirely in a managed ecosystem like Replit, "vibe coding" hits hard limits 
when your code needs to run on real infrastructure. VPC networking, IAM policies, and production 
concerns still require human expertise.

### Strategic AI Usage for Cost and Value

If you're spending your personal money for a coding assistant, here's what I learned about where to spend your quota:

**Don't use:** Line-level code completion. It burns tokens for minimal value.

**Use cautiously:** Well-scoped tasks within a single module. The cost of cleaning up AI-generated 
clutter often exceeds the value it creates, especially across modules.

**Use freely:** Design and architecture assistance as a thought partner. Also great for commodity 
tasks like "generate a hash function" or "parse this JSON structure" – things you'd look up anyway.

## My Refactoring Process

### The Architecture Problem

My containerized full-stack app was working perfectly, but it was expensive. I was paying for ECS 
containers and Application Load Balancers even when nobody was using the app. For a prototype 
getting minimal traffic, this felt wasteful.

I turned to Claude Code to explore serverless alternatives.

### Code Generation and Refactoring

Claude Code recommended the AWS SAM (Serverless Application Model) stack after researching 
solutions. The plan looked solid: reuse my existing web server code as a single Lambda handler for 
all application routes, including both frontend and API endpoints.

I approved the plan and watched the tokens rack up. The refactor took 5-10 minutes of AI time and 
cost about $1.50. At first, I thought this was incredible value.

**What went well:**

- **Idiomatic code generation**: Claude Code wrote proper Go code that followed language conventions 
  and best practices.
- **Comprehensive documentation**: It created detailed READMEs and migration plans without being 
  asked.
- **Smart code reuse**: It correctly identified how to reuse my existing webapp API code from the 
  new Lambda module.

**What didn't go well:**

- **Missing AWS expertise**: The AI lacked awareness of AWS practices, IAM policies, and VPC 
  networking concerns. This alone caused weeks of reworking to get the application running in 
  production.
- **No strategic pushback**: It lacked appropriate pushback to steer me toward better solutions. 
  For example, I asked for build and deploy scripts, but it had already generated a Makefile with 
  those steps. Instead of pointing this out, it created both anyway.
- **Code quality issues**: The generated code included unnecessary inline comments that didn't add 
  value beyond what well-written code already expressed.
- **Repetitive implementations**: It had a tendency toward duplicating logic. While it correctly 
  found ways to reuse my existing code, it reimplemented Go's URL path parameter logic twice rather 
  than creating a shared package to eliminate circular dependencies.

### Deploying and Running Online

After building and testing locally, I needed to deploy this to AWS: create a new Lambda to replace 
my ECS container, set up API Gateway to replace my Application Load Balancer, and use AWS SAM CLI 
to provision everything.

I immediately hit show-stopping deployment errors: insufficient permissions to provision resources, 
VPC connectivity issues, and memory allocation problems.

**What went well:**

- **Professional documentation**: Claude Code generated comprehensive deployment scripts, SAM 
  architecture documentation, and migration verification plans. On paper, everything looked 
  professional.
- **Solid technology choice**: The choice of SAM was sound. It created a decent YAML configuration 
  file, though I had to guide it to reuse existing AWS resources rather than assuming greenfield 
  infrastructure.
- **Right tool for the right job**: Gemini's CLI interface excelled at reading AWS deployment 
  errors and suggesting IAM permission fixes. AWS Q was exceptional at inspecting my actual AWS 
  configuration to troubleshoot VPC issues.
- **Direct integration benefits**: AWS Q's integration with the browser-based AWS Console meant it 
  could generate scripts I could run directly from my account.

**What didn't go well:**

- **Limited local simulation**: The SAM tooling simulated local environments reasonably well for 
  development, but didn't simulate IAM and VPC connectivity issues. Great for low-friction 
  development, rough for deployment surprises.
- **Poor troubleshooting support**: Claude Code didn't anticipate the IAM permissions I'd actually 
  need and was unhelpful getting me unstuck when things broke.
- **Insufficient requirements gathering**: It should have pushed for more information about my 
  workload and runtime requirements. It recommended insufficient Lambda memory allocation for 
  processing internet content.
- **Architecture blind spots**: It architected a Lambda to run in a VPC to communicate with my 
  cache service (the right choice) without anticipating that VPCs prevent Lambdas from reaching 
  the public internet (the wrong choice).

I had to figure out private subnets and NAT Gateway configuration myself. Unfortunately, getting a 
dedicated IP address for the NAT Gateway now costs more than the ECS container that inspired this 
refactor in the first place.

## The Infrastructure Reality Check

Moving from local code to cloud-deployed software requires more expertise than you can get from a 
coding assistant. A couple hours saved on coding tasks turned into weeks of debugging 
infrastructure issues. This might have gone better if I were still a professional
developer building every day and keeping up with ecosystem changes. In reality, I worked
in 2-3 hour chunks after the kids went to bed. I need things to work right the first time or
AI assistance will stay in the domain of research and design for me.

This isn't entirely the AI's fault – working with AWS IAM and VPC concepts is still genuinely 
hard. But the promise of "AI handles the complexity" breaks down when that complexity involves 
understanding how your specific AWS account is configured, what your actual traffic patterns look 
like, and how different AWS services interact in production.

The $1.50 code refactor was technically successful. The weeks of infrastructure debugging that 
followed revealed the hidden costs of "AI-first" development approaches.

## Takeaways for Different Audiences

### For Developers Exploring AI Coding Tools:

- Match AI tools to specific tasks rather than expecting one tool to handle everything
- Budget for infrastructure debugging time even when code generation goes smoothly
- Use AI assistants as thought partners for design conversations, not just code generation
- Domain-specific tools (like AWS Q) often outperform general coding assistants for specialized 
  tasks

### For Developers Building on AWS:

- Local development simulation has limits – SAM CLI doesn't catch IAM and VPC issues
- Always validate AI-generated infrastructure code against AWS best practices
- Consider using AWS-native AI tools for AWS-specific tasks rather than general coding assistants
- VPC networking complexity doesn't disappear because an AI wrote the YAML

### For Product Managers:

- AI coding productivity gains are real, but infrastructure complexity remains a bottleneck
- Budget for infrastructure expertise even when using AI for code generation
- The "democratization of coding" promise hits hard limits when code needs to run in production
  - Side-note: I confirmed this with a church friend who is an SDE at a different part of Amazon. Apparently it's common to either slam into the IAM wall until it stops complaining or just memorize what you need.
- Cost optimization decisions (containers vs serverless) involve trade-offs AI assistants may not 
  fully understand

### For Anyone Considering AI-Assisted Development:

- Unless you have a substantial budget, AI coding doesn't replace fundamental software engineering 
  experience
- The gap between "working locally" and "running in production" remains significant
- AI excels at generating code that follows patterns, but struggles with the integration challenges 
  that make software actually work

This is the third post in a series about building an AI-driven app. Next up: adding MCP tools to extend capabilities and optimize LLM output.
