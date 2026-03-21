---
title: My Kids Have a New Dungeon Master. It Lives on My Phone.
slug: my-kids-have-a-new-dungeon-master
date: 2026-03-21
categories: programming, product-management, ai
summary: !
  How I built an AI-powered Dungeon Master for family D&D nights. There's no
  session prep required. Using flat files, git, and a workflow bridge between
  Claude Code and Gemini or Claude mobile live mode, our AI-driven DM handles
  narration, rule mechanics, and state management across any device. This post
  is a practical look at orchestrating LLM strengths rather than building from
  scratch.
---

## Evolving Family Game Night

One kid asks if their character can scale the goblin hideout and sneak down the
chimney. The other has the idea to bribe a goblin into pretending to sneak their
character in as a prisoner. The youngest realizes his character can shoot missles
and goes for it.

We're playing Dungeons and Dragons and I spent 0 time planning the campaign or
setting up the world. In fact, I've never played myself before. Instead, a
voice comes through my computer's speakers. It happens to be named Fiona this
time around. Our DM is a computer program and we're playing in my office.

A few sessions later, we're on my tablet in the living room. The DM opens with
"Previously on..." and recaps our last session before leading us on a new adventure.

Our new is an AI bot I've been building to flexibly follow us into a variety of
situations. In this post, I'll tell you how we got here, how it works, and how I set
it up.

## Untapped Potential Just Out of Reach

I love finding ways to entertain my kids and engage their imagination without a
screen.  Since they were little, they've loved immersive storytelling and games
we invent together. These usually took the form of hand-drawn board games or
"Choose Your Own Adventure" stories. We tried a game called
[Adventure Maximus](https://www.adventuremaximus.co/) which was a simplified, kid-friendly
Dungeons and Dragons game.

I knew we were on to something. However, I never got to play D&D as a kid. I
struggled with the DM role trying to manage the mechanics without losing the
kids. I knew there was more to explore, but I didn't quite have what I needed.
Beyond that, I realized I don't have the time to prep to create a meaningful
experience every time we tried to pick it up again.

So we put that down for a while. Until recently. We introduced the kids to
Stranger Things and it created a new reference point.

## How a Session Works

Our new setup runs from any device without requiring me to hand-hold the
experience. Every session starts the same way. The AI-driven DM loads state
silently—no fanfare, no setup. It checks who's at the table and can handle
existing characters, set up new players, or write in guests. Once, it's ready to
go, we get a 2-3 sentence recap of where we were and what we were doing, and
then we're dropped right into action. No preamble.  No mechanics explanation. No
"before we begin."

The campaign lives in flat files. This is not a database or a hidden backend.
It's there, in the repository, for anyone to see:

- [`campaigns/{name}/STATE.md`](https://github.com/thedahv/family-dnd/blob/main/campaigns/lost-mines/STATE.md) — party location, active quests, shared inventory
- [`characters/{name}.md`](https://github.com/thedahv/family-dnd/blob/main/characters/) — one file per player, updated mid-session when HP changes or spell slots get used
- [`campaigns/{name}/session-log.md`](https://github.com/thedahv/family-dnd/blob/main/campaigns/lost-mines/session-log.md) — append-only log so the kids can reread what happened last time

From the kids' perspective, a session is a screenless interaction where they
listen to the story, the choices they want to make, and describe their
characters' next steps. The DM narrates the story and drives the NPC
interaction. The DM addresses each player by name. Descriptions stay punchy
because a kid's attention will wander if the goblins' lair description is too flowery.

The session can run in three different formats depending on how you want to play:

- `audio-local` — on the Mac Mini, all the players are in the room, using built-in Mac speech-to-text while I type in responses
- `audio-remote` — control the computer from my iPad with the audio coming from the Mac Mini
- `text-only` — pure CLI interface, works anywhere, has full capability
- `live-mode` - fully conversational using Claude or Gemini live modes

## Designing for the Hardest User

Before any code was written, before any technical decision was made, there's a
file at the root of the repo called
[`FIRST-TIMERS.md`](https://github.com/thedahv/family-dnd/blob/main/FIRST-TIMERS.md).
It's a plain-language onboarding doc for players who have never played D&D in
their lives. It isn't written for experienced gamers. It's for kids and it lives
alongside the agent configuration files.

Here's the core rule: "The DM handles all the math. You just tell us what you *try* to do."

That line describes both the documentation and the entire system. The whole
setup is philosophically consistent because they were built that way
intentionally. Everything else flows from this one principle. The hardest user
is a 7-year-old who has never played before and might get scared. So here's what
that means:

- Don't interrupt a scene to explain a rule. Keep playing and handle it.
- Describe what the player *sees* like the monster's big teeth or the goblin's laugh without worrying about what it means for their character's armor class.
- Pacing: keep scenes to 2-3 minute bursts, then check in with the table. Kids' attention is precious and you're borrowing it.

## Beautiful Flexibility from File-Based Tech

The post starts to get technical here, but stick with me. Staying low-tech
lends to the strengths of an AI-driven system.

All campaign files, character sheets, and session notes are markdown. They're
managed in git, published to GitHub. There is no database. There is no
proprietary format. All AI instructions and features are platform-agnostic so I
can switch AI providers or build different experiences.

Story and character changes get written to flat files on specific triggers. When
combat ends, the AI updates HP. When someone uses a spell slot, it updates the
character sheet. Items, gold, and experience we earn from quests are stored to
party and character inventories. That durability was a deliberate choice.

The state splits cleanly so everything can stay in sync:

- `STATE.md` holds the party's shared world: location, quests, shared loot, party gold
- [`characters/{name}.md`](https://github.com/thedahv/family-dnd/blob/main/characters/) hold individual resources: current HP, spell slots, conditions, what equipment they're carrying
- The [`/campaign-import` skill](https://github.com/thedahv/family-dnd/tree/main/.agents/skills/campaign-import) merges session updates back as git commits

This was a deliberate choice from the beginning to bias for flexibility,
portability, and interopability.  This means campaigns could move between
platforms, tools, and AI providers without me rebuilding anything. The boring
architecture—markdown, git, flat files—that's what made the multi-platform
solution possible later.

## Teaching the DM to Play

As a builder, I'm focusing on programming a Dungeon Master rather than building one.

The [`AGENTS.md`](https://github.com/thedahv/family-dnd/blob/main/AGENTS.md) file at the
root of the repo is the DM's brain. It contains personality traits, pacing rules, behavioral
constraints, state management responsibilities, and the full sequence for how a session gets initialized.
Skills in [`.agents/skills/`](https://github.com/thedahv/family-dnd/tree/main/.agents/skills) handle
specific moments—character creation is its own skill, campaign export and import are their own
skills, each one focused on one job.

These are the concrete constraints in AGENTS.md:

- "Check who's at the table first" — figure out which characters are known, which are guests, which are brand new
- "Address each character by name" — personalization isn't optional, it's required
- "NEVER generate a random number yourself. You are bad at randomness." Every single roll—attack roll, saving throw, skill check runs through a custom `roll.py` program designed for D&D gameplay.

The model doesn't get to decide if something should be random. It doesn't get to
fudge rolls or make judgment calls about fairness. It calls the tool every time.
If we're not at the computer, we adjust the session to ask for rolls from an app
I installed on my phone.

As a builder, I take advantage of the LLM already knowing D&D 5e rules. Its
built-in training already knows the introductory Lost Mines of Phandelver
adventure.  It knows how to narrate a scene. The real engineering problem isn't
building a DM from scratch. It's orchestration: giving it the right context, the
right constraints, the right tools to perform reliably session after session.
That distinction between what the model is inherently good at and what it needs
help with is what let this project move fast and stay maintainable. This lets
me channel the model rather than fighting with it.

## Content Generation Options at my Fingertips

A key advantage to getting started quickly was finding out Lost Mine of
Phandelver is one of the most popular introductory D&D campaigns ever published.
It's deeply embedded in the training data. The model knows the geography, the
NPCs, the encounters, the story beats. I didn't spend hours briefing the
DM on lore. I just need to tell it where the party is right now and what they
did last session.

There's a spectrum here worth understanding. On one end, you can play a
published campaign because the model already knows it and we just provide the
state. On the other end of the spectrum, we can bring our own worlds and
stories. We can import our original characters and layer them on top of established settings.

For maximum zero-prep, we can drop our characters into an established universe
and play a one-shot right then. For example, I loaded my character sheet into a
fresh session and asked for a 30-minute story in The Expanse universe while I
was on the treadmill. My character already exists, the universe is already
known, and there was zero setup required.

## Bridging Technology Gaps to Meet Us in the Moment

I did experience some tension bridging the gaps with today's state of
technology. There are three ways to interact with AI for something like this,
and none of them are perfect:

- **High capability** (Claude Code, Anthropic SDK, Gemini with agents): you get full skills, filesystem access, state management—everything you need to run a complex stateful system. But the interface is a CLI. It's not as engaging for the family because I'm typing the responses.
- **High experience** (Claude app, Gemini Live): beautiful UX, immersive voice mode, the kind of thing you'd actually want to use with your family. But no filesystem access, no skills, no way to read and write your campaign state.
- **Mobile**: the best form factor—couch sessions, treadmill sessions, anywhere you want to play. But it's the least capable of all.

The solution I landed on is a workflow bridge. There are [`/campaign-export` and `/campaign-import` skills](https://github.com/thedahv/family-dnd/tree/main/.agents/skills) that do the translation. Here's how it works:

I load the campaign in the capable environment (Claude Code) and run the export
skill from the chat. It reads the entire campaign state, generates a compact
priming prompt with everything the model needs to know, and hands it off to Live
mode on my phone or iPad. The prompt includes instructions and an export format
for the end of the session. Then we play: no CLI or typing, just story. At the
end of the session, I ask the AI to export the changes from the session.

That output format is minimal and structured:

```json
{
  "characters": { "name": { "hp_current", "spell_slots", "conditions", "equipment_add/remove", "gold_change" } },
  "party": { "location", "gold_change", "inventory_add/remove" },
  "quests": { "completed", "discovered", "failed", "progress" },
  "discoveries": [ { "type", "name", "description" } ],
  "session_notes": "string"
}
```

The spec lives in the export itself. The importer doesn't need a separate
reference. It just parses what changed and merges it back into the campaign files
as a git commit.

This is my best response to the gaps in the current AI platform landscape.
Capability and UX aren't unified in one environment. Not yet. Unfortunately,
this approach still requires a technical background. You need to understand git,
you need comfort with the CLI. That will still feel out of reach for plenty of
people, and it's the a problem worth solving.

## Zooming Out to the Implications for Building and Innovating

Let me zoom out from D&D for a second. What we're actually looking at is a
pattern for using LLMs as persistent, character-driven narrators for any story
your family wants to live inside. The floor is a markdown file and a phone. The
ceiling is just how often you want to play. That turns out to be way more often
when prep is no longer the bottleneck.

The D&D campaign was the proving ground. But the builder experience takeaway
is I can build great experiences by programming against the existing AI chatbot
platform rather than building from scratch. I'm orchestrating existing LLM
strengths like narration, improvisation, and rule knowledge.

The fact that it opens up new angles for game night with the kids is honestly a
good bonus.