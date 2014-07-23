---
title: Oh yeah, I almost forgot about Ruby
date: 2011-08-29
categories: programming
summary: !
  Blending problem-solving, a rediscovery of Ruby, and basic software engineering to solve problems in childcare.
---

So last week, I got an opportunity to tinker around on a MacBook Air for a particular work project. It actually had very little to do with development, but I once read an article about setting one up to use as a development tool. I honestly can't form a reasonable opinion regarding all the fuss around using Apple products since I've never used one seriously since a semester-long development project in college.

I still hear the Mac OS is great for development, so I thought I'd give it a try. I stayed in over my lunch breaks to try figuring my way around. Besides non-obvious shortcuts (I don't happen to be an emacs user) and windowing idioms with which I wasn't familiar, nothing struck me as things I couldn't get on my Linux machine. Granted, just about all my work was done in the terminal.

Anyway, this post isn't about Mac. What was cool about the Mac was that Ruby and Python were already installed, so I decided to work through [Ruby Koans](http://rubykoans.com/) on my lunch break. If you haven't already heard of the Ruby Koans, it's like a self-guided tour through Ruby programming. It also introduces you to a form of test-driven development, and it's just kind of fun anyway.

So that got me thinking about Ruby again. I never really had anything against the language, but I never fell in love with it like I did with JavaScript and [node.js](http://nodejs.org).

Recent conversations reminded me about pursuing the notion of [polyglot programming](http://www.google.com/search?sourceid=chrome&ie=UTF-8&q=define%3A+polyglot) and not using any given framework or language as a silver bullet for a given problem.

I tend to want to use node.js for everything, and I think the [Jade](http://jade-lang.com/)/[Stylus](http://learnboost.github.com/stylus/)/[Express](http://expressjs.com/) combination is great for throwing together quick sites. However, I find myself thinking of node.js for simple sites that don't involve concurrency or asynchronous programming. Other tools exist for simple site building as well.

Two things fell into place and I decided to check out [Sinatra](http://www.sinatrarb.com/) again. I taught myself how to use [haml](http://haml-lang.com/) and [sass](http://sass-lang.com/). This actually came pretty easy because these projects inspired a lot of the things that went into the node.js stack I mentioned above. It pretty much felt readily familiar and it was like expressing the same words and ideas in a slightly different accent.

So fast forward to Sunday where I started talking with [a good friend](http://jashurst.com/) and fellow volunteer in our church's children's ministry. As it turns out, keeping 20-30 kids from burning the place down for 90 minutes isn't an easy task. But we push for more than that and we even attempt to create a place where they can have fun, grow, and learn. Beyond that, we hope to be a resource so families can have fun, grow, and learn.

It doesn't often happen, but there are times where my desire to volunteer and help out cross paths with my desire to use code to make things better. You'd think there would be more opportunities, but I don't find them as often.

So now, the new side project is to build a system to track attendance and check-ins at the classroom to make sure we have reliable data that helps us keep things safe and accountable. I had a fun time mapping out the data requirements and diagramming some screens on the whiteboard on what would soon become the classroom for 5-10 year olds.

It was so much fun to actually turn ideas from a non-technical person into an [ER Diagram](http://en.wikipedia.org/wiki/Entity-relationship_model) and plan out something that could potentially help people.

Looking at all my scribbles on the whiteboard, my immediate reaction was to figure out how I could bend and twist node.js to fit that problem. But really, this wasn't the kind of problem for which node was the best solution. I had given up Rails a long time ago as too much stuff. Too much clutter, too much stuff I didn't need, and too much configuration.

But Rails is really good at mapping data models that are best described in an ER format, and this is a kind of problem that seems to match what Rails does well. So I guess I'm going to build another Rails project in my spare time.

Wish me luck!

