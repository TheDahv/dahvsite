---
title: Designgeneering Diaries - Part 2
date: 2012-03-10
categories: programming, designgeneering
summary: !
  Blending more design thinking into my development process. This is an installment in a multi-post series of exploring
  a better relationship between the disciplines of product design and software engineering.
---

# Designgeneering Diaries - Part 2

*Saturday, 10 March 2012*

[Last week](/blog/designgeneering-diaries-part-1), I introduced an idea I call "designgeneering" to describe the interaction between developers and designers when building a software product.

Some [initial](https://twitter.com/#!/moltman/status/176860828111355906) [responses](https://twitter.com/#!/kirkryyn/status/176875696067579904) I got to the tweet I made for this post were pretty favorable. I was even more excited to hear there are already organizations out there pursuing this idea. So that's good.

I'm not out to say nobody is doing this already and I'm the brilliant genius finally pointing this out. Instead, I'm loudly agreeing this is a Good Thing. I'm imagining a world where this is the norm and users come to realize they should expect working software they love to use. As a Linux guy, I really love that I have options. I don't really have the expectation that the options with GUIs should be beautiful like a Mac user does, and so I have to live with that.

Imagine if I didn't, though. Imagine if the norm and expectation was for beautiful software that works on all platforms for all users. What if the barrier to entry for a developer included well-thought out experiences?

Anyway, that wasn't the point of this blog post. I'd like to start talking about what we're working on and what our experience has been so far.

By way of reminder, my designer friend [Brad](https://twitter.com/#!/bradmcnally) and I are going to try a new way of working on an open-source project while we record our experiences.

## Before We Begin

Here is the "tl;dr" summary for this post. I'll talk about what the project is and why we decided to build it. I'll talk about the brainstorming and planning process for the idea. I'll wrap up by sharing my experiences for the first day where we put about an hour and a half of actual work in side by side.

## A Problem and an Idea

An idea I've been kicking around for a while is finding an easier way to tell people about something called Community Groups. In full disclosure, I'm a Christian and I lead what is called a Community Group for my church here in Seattle.

Past experience has shown the words "Christian" or "church" can be a blood-boilers for some people, so I just wanted to give you fair warning if that's something that is going to freak you out. Just so you know, I'm not here to tell you that you're a bad person or anything like that. This post is about software and a way I want build something that will help people.

Ok, if you're still with me, I assume you're not here to start a war. Community Groups are small pockets of like-minded people that live near each other. They commit to walking through life together as friends and commit to real relationships with conversations deeper than "how was work" or "let us discuss a sports team".

I really enjoy these Community Groups and my wife and I host one in our home. Telling people about Community Groups can be kind of hard though. I just spent one paragraph on it and I didn't really even scratch the surface of what they are. Moreover, I tried not to use too much Christian lingo, which tends to be common when we talk about groups within the church. We also use a tool called [The City](http://www.onthecity.org/) to help with communication and finding your way around.

Unfortunately, this all assumes you're already a part of the church system and it doesn't seem very friendly to people who have never been to church before but still want to be a part of a community.

I know because I've tried. Before I can tell somebody what my Community Group is like, I first  have to find out how much they already know, educate them about key concepts, find out if they have a City account, and then write down information they need to know because it is most likely they don't have one.

This takes too long. Meeting new people and inviting yourself to an existing community is hard, and this process isn't friendly for new people.

What if it were easier

## A Project and a Solution

This project is basically about making it easier for group leaders like me to generate a one-page site with an easy URL that makes it easier to talk about what their Community Group is like.

It should be clear. It should be attractive. It should be safe and secure. It should be inviting and useful, otherwise this project is pointless.

## The Process

Again, I'm sorry for all the background information. You've already read a lot and I haven't told you anything about designgeneering.

The beginnings of the project started in a note in [Evernote](http://www.evernote.com/) and  conversation in GChat. Any tool that lets you get ideas down, bounce them off other people, and then get the new ideas down as they evolve helps with that.

Before any code gets written or any mockups are drawn up, Brad and I are generating ideas and putting a roadmap together.

What I like about this is how each person responds when an idea is spoken aloud. I hear an idea and think about data models and architecture. Brad is thinking about interfaces and experiences. Both of those things are cool, but it gets really interesting when they start to feed off each other.

We drew our first sketches in our notebooks and wrote down most of the verbs and nouns we could think of. As we compared the different perspectives we each took on the idea, I saw things I would have missed if I had been thinking of them in isolation, and they influenced my own technical designs.

I decided to go with Rails for this project. While I was setting up the code, Brad was putting ideas together in Photoshop. Looking at his mockups was cool because that gave me a chance to figure out what data models would support his interpretation of the idea and I was able to put together more code.

## First Day Results

We didn't get much more done than that. It was mostly a big planning session. The big takeaway was I got a more complete picture of the project than I would have had I not included a designer's perspective up front.

I have the initial structure up at [Github](https://github.com/TheDahv/MYCG). I should be getting some initial mockups soon. There isn't much more than that so far.

I'm hoping to try to use Github Pull Requests to include Brad into the developer flow earlier and more often. I don't think I can teach him git, but I think it will be a good platform to get him closer to the code.

Ok, I hope future posts get a little more interesting and have less rambling later on.

Cheers and have a wonderful weekend.

