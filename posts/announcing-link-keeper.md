---
title: Announcing - link-keeper
date: 2012-03-19
categories: programming, link-keeper
summary: !
  Small, concise programs that do one thing well are a hallmark of the UNIX philosopy. With modern technologies,
  we are able to build new tools to solve new problems. This post covers using README-driven development and CoffeeScript
  to build a small command-line link storage tool called link-keeper.

---

Exactly 2 weekends ago (around 10 March, that is), a project idea popped into my brain as I was getting ready to sit down and work on a completely unrelated project.

You see, this was coding weekend. My wife is not technical, and in my delightful little marriage I enjoy paying attention to her more than to my programming. This says a lot because I **really** enjoy programming. Every once in a while, we agree to be together while we work on our own things. I will take to my programming and she to her knitting, reading, or work. These only happen every once in a while, so my brain was pretty excited to code on lots of [random](https://github.com/TheDahv/MYCG)
[little](https://github.com/TheDahv/CMTracker) [projects](https://github.com/TheDahv/dahvsite).

# And Suddently, An Idea

Unfortunately, my travels across the Internet had resulted in many open tabs in my browser for pages I had yet to read. I don't like the clutter and I figured I'd want a fresh browser before diving into a given project. The pages weren't important enough to mark as favorites (and frankly, I have no idea what is in my favorites folder right now), but they were significant enough I wanted them around.

I have occasionally copied a list of URLs into a text file and saved things that way, but the programmer in me knew there should be a more elegant solution.

And this is how [link-keeper](https://github.com/TheDahv/link-keeper) was born.

I had a general sense of what I wanted this tool to do before I built it. I knew it needed to hold on to links for me and let me slice and dice through them quickly. I wanted it to be a command-line tool because lately I've been all about amputating "conveniences" in my work flow. I knew it needed to be fast enough to keep up with me while I'm hacking away at things and it needed to be smart enough to intuit the appropriate action when I can't remember anything more about a link other than its existence.

I spent about 30 minutes thinking and imagining how I'd use it until I was able to write a sufficient README for the project. This was actually a fun process and one that has been [written about before](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html). The [very first commit](https://github.com/TheDahv/link-keeper/commit/5d6de9cf60e3b2964ff66c54a180ad5897372b7e) to the project was actually nothing more than a well-formed README. I had to get up and take my wife somewhere so I didn't get to hack on the idea for at least a day.

# Choosing a Language

In that time, I got a chance to stew on my idea a bit more and think about how I wanted to implement the project. Ruby and JavaScript are my favorite languages right now, and it was kind of a challenge to decide which implementation I wanted to pursue.

The [DailyJS blog](http://dailyjs.com/) has been doing articles about building UNIX command-line applications with node.js, and this [particular post](http://dailyjs.com/2012/03/01/unix-node-arguments/) had me thinking it might be a feasible possibility. And before you go ranting and raving and asking why I'd want to use node, the simplest answer is because it is fun. I **really** enjoy building node applications in the same way the world freaked out when Ruby made web application development really fun for the masses.

I also wanted to use Ruby since I'd like to build more experience with things other than Rails applications. But then I remembered Zach Holman already built a project called [Boom](http://zachholman.com/boom/) that is pretty similar to this one.

However, I decided to pursue the idea with node.js because:

- Boom deals with more than just links. Mine is specifically about saving URLs
- Since a similar project has been implemented in Ruby, I'll do mine in JavaScript
- I wanted to learn by building my own tool

# Enter The CoffeeScript

I've never really formed an opinion about [CoffeeScript](http://coffeescript.org/). I already like JavaScript--warts and all--and it seemed like it was solving a problem I didn't have. The truth so far about building command-line applications is that I write a lot of little functions to do heavy lifting. I end up typing the same letters over and over and realize that they don't add a lot of value. I decided to give it a shot and it's like taking away the keywords and cruft that don't add value and leaving behind a pleasant experience. I won't rant or rave too much more about CoffeeScript in this post, but I thought I'd throw it out there that I have crossed over to the dark side.

# Wrap This Thing Up

So this article is less about what link-keeper is and more about how it came to be. I hope that is still interesting to you, because watching this idea go from conception to birth was really fun.

Right now, it is a usable tool on my machine. I need to figure out things like hiding platform-specific functionality away and building in more customizability. I also need to figure out a painless installation process. I'd love for you to try things out and leave feedback so I can figure out how to take this to a place that is helpful to others.

Ok, my database restore is done and I can be done typing!

