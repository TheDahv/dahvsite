---
title: Hello Again
date: 2018-05-28
categories: general
summary: !
  This is what happens when you decided to implement your own blog generator,
  change the OS on your laptop, get a new job, and move.
---

Well, here is another one of those "sorry I stopped writing, I'm really going to
stick with it this time posts".

I finally have access to my "blogging engine" again and a few more things to say
since 2014. Let's recap a few noteworthy things since then that took attention
away from contributing to my own site. I will leave more significant events to
their own posts.

# Building a Blogging Engine

Rails taught me building a blogging engine was a good way to kick the tires on a
new programming language. One of the first toy apps I learned was a data system
to model posts and a UI to move around through content.

Fast forward a couple years, and I fell in love with Node.js. More importantly,
I fell in love with the idea of modeling data as streams and writing programs as
transformations on those streams. [Gulp.js](https://gulpjs.com/) was emerging as
a serious alternative to [Grunt](https://gruntjs.com/). Gulp offered a way to
describe builds with code and boasted a rich ecosystem of plugins. The most
interesting thing about Gulp was it featured streams—a concept I previously
considered only within the context of HTTP or database IO. Gulp streams
allowed the programmer to define a build with input streams (your source code
files), describe transformations over those streams (your plugins), and pipe
those streams to a final destination (your build output).

Streams can live anywhere! My current coworkers will attest to streams
processing as my "silver bullet" for many problems where they make sense. Gulp
taught me I could model more problems as streams than I originally thought.

So naturally, I built a static site generator and blogging engine as a streams
processing library. The output of the stream transform is then streamed to AWS
S3 and hosted from there. My site costs a couple dollars a year to run, and
that's pretty fun.

You can read the code for the generator and the site content itself [on Gitlab
](https://gitlab.com/TheDahv/dahvsite-gulp). It represents the kind of code I
wrote in 2014, and I definitely don't recommend trying to use it
yourself.

The site you're reading is an artifact of me scratching a dumb itch. It also
clearly exemplifies how little a programmer values their own time if you give
them the right problem to geek out on.

All that is to say: if you want to make it harder to contribute to your own
blog, do it with a blog engine you built yourself and that you can only run from
a computer on which you have the code checked out and access to Node.js and the
right AWS keys.

I'd be lying if I said it wasn't fun, though.

# Changing Jobs

My last post was in August 2014. At that time, I was Technical Director at UP
Global, formerly Startup Weekend. As a community and a small team, we were doing
exciting things to promote entrepreneurship as a force to shape communities and
change lives. I was into that mission. As a business, we weren't doing nearly as
well.

Fast forward to Tuesday, April 7 2015. I got to work and prepared for our weekly
all-hands meeting and noticed I had a calendar invitation to attend the meeting
in a different room. Fast forward a couple hours and the entire company learned
about large, sweeping layoffs that affected many teams across the
organization—including my own team and my own position.

I'll always remember that it was on a Tuesday because my second son was born
Friday, April 10. UP Global was generous in giving me a month to unwind things
and find a new job. I used every day of my two weeks of paternity leave to find
a new job.

That's really all I need to say about that right now, but it illustrates the
context: blogging was not a huge priority to me at that time. There was a little
flurry of updates on my site and some polishing of my résume to prepare for my
job search.

I ended up at another Seattle company working on [Moz
Local](https://moz.com/products/local).

# Returning to Linux

Before Startup Weekend, I was a full-time "Linux on the desktop" person. About a
month into working there, it was obvious that silly X.Org issues—like being
unable to move from an external monitor at my desk to a project in a conference
room without rebooting—weren't going to work for me. I spend the majority of my
time programming, but I tend toward roles that also involve designing, running
meetings, sharing presentations, and other "business" activities.

So I switched to OSX, got over the learning curve, and eventually grew to feel
pretty natural in that environment.

After Startup Weekend, I got to keep my 2013 Macbook Air and it was collecting
dust in a closet. So I committed another weekend to devaluing my time and
figured out how to partition the disk, replace the bootloader, and dual-boot
Linux on Apple hardware.

The downside is I haven't put in the time to either figure out how to mount my
OSX partition from Linux, or create a 3rd shared partition to share content
between the operating systems.

That left me with a cool Linux setup, but with no access to my old
content—including my website.

So that really slowed things down until I was able to make the site more “`git`
friendly” and move the source code into the cloud.

# Moving

My wife and I met in Belltown in 2009. We found a church that was committed to
its downtown context, and building community in a city commonly lonely to many.
We made Belltown home until 2013 when our first son was born; we could only
stand sharing a one-bedroom apartment with an infant for so long.

We managed to find a new neighborhood not too far away and moved to North Queen
Anne. What to me was once a "dead zone" between Fremont and Ballard became the
place where we would discover a sweet community, where my oldest son would learn
to walk and talk, and where we would meet our second son.

We experienced many big life moments there—both joyous and painful—and really
felt like we were putting down roots. But Seattle house and rent prices are
neither charitable nor sentimental. We learned we were pregnant with our third
child; as exciting as that was, our non-reciprocal romance with core Seattle
wasn't leaving room for us to grow our family sustainably and stay where we
were.

So we looked into neighborhoods North and South of core Seattle. We even
briefly considered ideas like trying out Bellingham or Tacoma. On a whim, we
looked at a rental in West Seattle and finally discovered how cool this
neighborhood is.

We found a house near a school that was perfect for our kids. I finally have a
yard and easier access to Seattle's natural beauty to share with my children. We
have space to pursue hobbies and interests I had sacrificed to fit within our space
and budget.

# And Now What?

Well, there was a lot I left out in the last 4 years. Those were definitely
among the bigger events, but there have also been a few other life-changing and
life-defining things.

I suspect I'll do more dedicated writing about that in the future. I also have a
few nerdy ideas I'd like to share.

So clocking in at just over a 1,000 words, I'll close it here. Here's to hoping
it doesn't take another 4 years to write again.
