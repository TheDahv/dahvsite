---
title: My Kids Have a New Dungeon Master. It Lives on My Phone.
slug: my-kids-have-a-new-dungeon-master
date: 2025-09-12
categories: programming, product-management, ai
summary: 
---

## Opening: The Scene

One kid asks if their character can scale the goblin hideout and sneak down the
chimney. The other has the idea to bribe a goblin into pretending to sneak their
character in as a prisoner. The youngest realizes his character can shoot missles
and just does so.

We're playing Dungeons and Dragons and I spent 0 time planning the campaign or
setting up the world. In fact, I've never played myself before. Instead, a
voice comes through my computer's speakers. It happens to be named Fiona this
time around. Our DM is a computer program and we're playing in my office.

A few sessions later, we're on my tablet in the living room. The DM opens with
"Previously on..." and recaps our last session before leading us on a new adventure.

Our new is an AI bot I've been building to flexibly follow us into a variety of
situations. In this post, I'll tell you how we got here, how it works, and how I set
it up.

## The Before: Why We Never Played

I love finding ways to entertain my kids and engage their imagination
in ways that doesn't involve a screen. Since they were little, they've loved immersive
storytelling and engaging games we invent together. These usually took the form of
hand-drawn board games or "Choose Your Own Adventure" stories. We tried a game
called Adventurous Maximus which was a simplified, kid-friendly Dungeons and Dragons game.

I knew we were on to something. However, I never got to play D&D as a kid. I struggled
as a DM trying to manage the mechanics without losing the kids. I knew there was more
to explore, but I didn't quite have what I needed. Beyond that, every time I've tried
to pick it up again, I realized I don't have the time to prep in a way that would be
meaningful for them.

So we put that down for a while. Until recently. We recently introduced the kids to Stranger Things
and we got our fresh reference point.

## How a Session Works

Every session starts the same way. The DM loads state silently—no fanfare, no setup. It checks who's actually at the table: known characters, guests, new players. Then comes one simple question: "Anything happen since last session I should know about?" After that, you get a 2-3 sentence recap of where you were and what you were doing, and then you're dropped right into action. No preamble. No mechanics explanation. No "before we begin."

The campaign lives in flat files. This is not a database or a hidden backend. It's there, in the repository, for anyone to see:

- [`campaigns/{name}/STATE.md`](https://github.com/thedahv/dnd-family/blob/main/campaigns/lost-mines/STATE.md) — party location, active quests, shared inventory
- [`characters/{name}.md`](https://github.com/thedahv/dnd-family/blob/main/characters/) — one file per player, updated mid-session when HP changes or spell slots get used
- [`campaigns/{name}/session-log.md`](https://github.com/thedahv/dnd-family/blob/main/campaigns/lost-mines/session-log.md) — append-only log so the kids can reread what happened last time

From the kids' side, here's what a session feels like. Fiona narrates the scene with personality. NPCs have their own voices—sometimes hesitant, sometimes commanding, sometimes annoyed that these kids keep trying to bribe them. The DM addresses each player by name. Descriptions stay punchy because a kid's attention will wander if you're flowery about the goblins' lair.

And underneath it all, there's a safety rule: if the 7-year-old gets scared, the DM checks in immediately and reassures them about what's coming. But here's the thing—the DM doesn't stop the monster attacks. Fear is okay. What matters is that they know they can save themselves. It gives them a path to be heroic instead of helpless.

The session can run in three different formats depending on how you want to play:

- `audio-local` — you're at the desktop, all the players are in the room, and Fiona speaks through the speakers
- `audio-remote` — you SSH in from another room or a different device entirely, but the audio still plays locally so the kids hear the DM's voice
- `text-only` — pure CLI interface, works anywhere, has full capability

## Designing for the Hardest User

Before any code was written, before any technical decision was made, there's a file at the root of the repo called [`FIRST-TIMERS.md`](https://github.com/thedahv/dnd-family/blob/main/FIRST-TIMERS.md). It's a plain-language onboarding doc for players who have never played D&D in their lives. Not written for experienced gamers. Written for kids. And it lives right alongside the agent configuration files because it's not supplementary—it's foundational.

Here's the core rule: "The DM handles all the math. You just tell us what you *try* to do."

That single line describes both the documentation and the entire system. They're philosophically consistent because they were built that way intentionally. Everything that follows—all the design constraints—flows from this one principle. The hardest user is a 7-year-old who has never played before and might get scared. So here's what that means:

- Don't interrupt a scene to explain a rule. Keep playing and handle it.
- Describe what the player *sees*—the monster's big teeth, the goblin's laugh—not what it means for their character's armor class.
- When a player is scared, the DM checks in: "This is what happens next, and here's how you can save yourself." Fear is okay. Helplessness isn't.
- Pacing: keep scenes to 2-3 minute bursts, then check in with the table. Kids' attention is precious and you're borrowing it.

This wasn't an accessibility constraint that got bolted on later. It shaped the entire build from the beginning. And here's the thing—designing for the hardest user actually made the system better for everyone. The pacing rules work for experienced players too. The safety handling keeps everyone grounded. The "Previously on..." recap helps you jump right back in whether you played last week or three months ago. The roster check means you never have to break immersion to figure out who's here.

**Builder frame:** There's a real lesson here. Designing for the hardest user—the person with the fewest advantages, the most to lose—doesn't limit the system. It actually produces a better system overall. Everyone benefits.

## Beautiful Flexibility from File-Based Tech

Here's where things get technical, but stick with me—this decision is why the whole system actually works.

All campaign files, character sheets, and session notes are markdown. They're managed in git, published to GitHub. No database. No proprietary format. No lock-in to a specific app or service. If I ever want to switch AI providers or build a different interface, all the data comes with me.

State gets written to flat files on specific triggers. When combat ends, update HP immediately. When someone uses a spell slot, record it right then. When a condition gets applied, write it down. Not just at session end—throughout the session, every change that matters gets persisted. That durability was a deliberate choice.

The state splits cleanly so everything can stay in sync:

- `STATE.md` holds the party's shared world: location, quests, shared loot, party gold
- [`characters/{name}.md`](https://github.com/thedahv/dnd-family/blob/main/characters/) hold individual resources: current HP, spell slots, conditions, what equipment they're carrying
- The [`/campaign-import` skill](https://github.com/thedahv/dnd-family/tree/main/.agents/skills/campaign-import) merges session deltas back as git commits—no database, no custom format, just version history that you can read and audit

Every transaction is timestamped. You can see when things changed and why.

**Builder frame:** This architecture wasn't the default choice. It was deliberate. I could have built a database, created a proprietary app, made it convenient to work with my specific system. Instead, I chose portability and interoperability over convenience. That meant the campaign could move between platforms, tools, and AI providers without me rebuilding anything. The boring architecture—markdown, git, flat files—that's what made the multi-platform solution possible later. Sometimes the unsexy choice is the right one.

## Teaching the DM to Play

The real engineering insight here is that I'm not building a Dungeon Master. I'm programming one.

The [`AGENTS.md`](https://github.com/thedahv/dnd-family/blob/main/AGENTS.md) file at the root of the repo is the DM's brain. It contains personality traits, pacing rules, behavioral constraints, state management responsibilities, and the full sequence for how a session gets initialized. Skills in [`.agents/skills/`](https://github.com/thedahv/dnd-family/tree/main/.agents/skills) handle specific moments—character creation is its own skill, campaign export and import are their own skills, each one focused on one job.

These are the concrete constraints that actually live in AGENTS.md:

- "Check who's at the table first" — figure out which characters are known, which are guests, which are brand new
- "Address each kid by name" — personalization isn't optional, it's required
- Safety comes before rules: "if the 7-year-old gets scared, reassure them immediately, but don't stop the monster"
- "NEVER generate a random number yourself. You are bad at randomness." Every single roll—attack roll, saving throw, skill check—goes through `roll.py` with standard dice notation

The model doesn't get to decide if something should be random. It doesn't get to fudge rolls or make judgment calls about fairness. It calls the tool. Every time.

**Builder frame:** Here's the key insight: the LLM already knows D&D 5e rules. It knows the Lost Mines of Phandelver adventure. It knows how to narrate a scene. The real engineering problem isn't building a DM from scratch. It's orchestration: giving it the right context, the right constraints, the right tools to perform reliably session after session. That distinction—between what the model is inherently good at and what it needs help with—is what let this project move fast and stay maintainable. You're not fighting the model. You're channeling it.

## Content Generation Options at my Fingertips

Let me be honest about what makes this work: Lost Mine of Phandelver is one of the most popular introductory D&D campaigns ever published. It's deeply embedded in the training data. The model knows the geography, the NPCs, the encounters, the story beats. I don't need to spend hours briefing the DM on lore. I just need to tell it where the party is right now and what they did last session.

There's a spectrum here worth understanding. On one end, you can play a published campaign—the model knows it, you just provide state. On the other end, you can bring your own world. Your original characters layer on top of established settings. Or if you want maximum zero-prep, you drop your character into an established universe and play a one-shot right then. Thirty minutes on the treadmill in The Expanse? The character already exists, the universe is already known, zero setup required. That's the floor.

## Bridging Technology Gaps to Meet Us in the Moment

Here's the honest tension at the heart of this whole build. There are three ways to interact with AI for something like this, and none of them are perfect:

- **High capability** (Claude Code, Anthropic SDK, Gemini with agents): you get full skills, filesystem access, state management—everything you need to run a complex stateful system. But the interface is a CLI. It's not fun for a family. You're typing commands.
- **High experience** (Claude app, Gemini Live): beautiful UX, immersive voice mode, the kind of thing you'd actually want to use with your family. But no filesystem access, no skills, no way to read and write your campaign state.
- **Mobile**: the best form factor—couch sessions, treadmill sessions, anywhere you want to play. But it's the least capable of all.

The solution I landed on is a workflow bridge. There are [`/campaign-export` and `/campaign-import` skills](https://github.com/thedahv/dnd-family/tree/main/.agents/skills) that do the translation. Here's how it works:

You load the campaign in the capable environment (Claude Code). The export skill reads the entire campaign state, generates a compact priming prompt with everything the model needs to know, and hands it off to Live mode on your phone or iPad. You play the session there—voice, no CLI, just story. At the end of the session, you generate a session delta: only what changed.

That delta is minimal and structured:

```json
{
  "characters": { "name": { "hp_current", "spell_slots", "conditions", "equipment_add/remove", "gold_change" } },
  "party": { "location", "gold_change", "inventory_add/remove" },
  "quests": { "completed", "discovered", "failed", "progress" },
  "discoveries": [ { "type", "name", "description" } ],
  "session_notes": "string"
}
```

The spec lives in the export itself. The importer doesn't need a separate reference—it just parses what changed and merges it back into the campaign files as a git commit.

**Builder frame:** This is a systems design response to a real gap in the current AI platform landscape. Capability and UX aren't unified in one environment yet. The export/import pattern is a workflow bridge that works today. I want to be honest, though: replicating this still requires a technical background. You need to understand git, you need comfort with the CLI. That ceiling is real, and it's the next problem worth solving.

## Closing: What This Really Is

Let me zoom out from D&D for a second. What we're actually looking at is a pattern for using LLMs as persistent, character-driven narrators for any story your family wants to live inside. The floor is a markdown file and a phone. The ceiling is just how often you want to play—which turns out to be way more often when prep is no longer the bottleneck.

The D&D campaign was the proving ground. But the thing actually built here is a framework for orchestrating LLMs as reliable, stateful, immersive collaborators. You're not asking it to be a perfect simulation or a replacement for human judgment. You're asking it to do what it's good at—narration, improvisation, rule knowledge—while you handle what matters: character, pacing, safety, state management.

That it made the kids love game night is honestly a good bonus.
