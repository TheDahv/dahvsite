---
title: Real-Time What's For Dinner
date: 2011-07-10
categories: programming, wfd
summary: !
  Leveraging software in What's for Dinner to help couples plan their meals together
  simultaneously without having to be in the same room.
---

I managed to trick What's For Dinner into doing something cool!

I've mentioned before I wanted to make the application dead simple and easy to use. This meant sharing details among meal planners seamlessly and without effort. Previously, users would need to coordinate when to save manually and refresh to retrieve updates, so that wasn't very seamless or effortless. Without close coordination, it was pretty easy to overwrite each others' entries.

In this update, I put some code together to enable real-time updates of plan details while you plan your meals for the week. Micaline and I tested this between Safari on her Mac and Chrome and Firefox 4 on my Linux machine on our local network.

Here is how it works:

- I load up a new session and send it to Micaline to get started
- Micaline types in 'Tacos' for Monday and then tabs out of the text field
- The browser detects the change and pushes it to the server
- The server saves the new change and then pushes it out to any other browsers listening on that 'channel'
- My browser picks up the message pushed out from the server and updates my screen to let me know we're eating tacos on Monday!

A couple posts ago, I wrote about the <a href="http://socket.io/">socket.io</a> library and my intent to explore that. As I learned more, I realized that it was certainly a cool library useful for real-time applications. However, it didn't enable a subscription-based publication system. That basically means everybody would get everybody's changes without any regard to which plans they were working on.

Instead, I turned to the [Faye](http://faye.jcoglan.com/) pubsub messaging system. Each browser subscribes to a 'channel' based on the current plan id. Only other browsers listening on that channel get the changes relevant to that plan.

I haven't gotten a good chance to test this with <strong>other</strong> browser (aka, Internet Explorer), nor have I been able to try it with bigger numbers of people using it at once.

Try it out and let me know how it works for you!

