---
title: My Favorite Bugs - Part 1
slug: my-favorite-bugs-part-1
date: 2022-10-19
categories: software engineering
ogimage: 
summary: !
  Let's walk through some of the most gnarly, tough, and educational bugs I
  have faced in my career. I'll share what happened, why it happened, what
  I did to solve it, and what I learned in the process. Our first story will
  deal with database replication.
---

Even though I don't write code much anymore, most of the "core memories"
in my career have been the nasty bugs I solved. The industry strives
to prevent bugs in the first place, however the team work, creative problem solving,
and tenacity I experienced solving bugs are invaluable. These
stories are plain fun for someone who loves problem solving and 
who steps back to marvel at what we're doing with these machines 
of silicon and metal. And so begins a small series of memorable bugs, how they 
happened, how we solved it, and what we learned along the way.

The first bug for this is a time we saved a migration by recovering an accidentally
deleted file from a Linux file descriptor. For context, my team built a time-series
analytics product based on log metrics data. When thinking through the best way
to enable a customer to ask for an arbitrary time range analysis on their data, we
turned to an approach called [the lambda architecture](https://en.wikipedia.org/wiki/Lambda_architecture).
If you don't have time to read the article, it's an approach to merge the strengths
of rapid access to long-term storage with real-time access to recent data stored in memory.

Our servers wrote all customer metrics data into a daily compressed log. We wrote the recent data 
(e.g., less than 24 hours old) in Redis so we could serve it immediately, and turned to 
[sortdb](https://github.com/jehiah/sortdb) to handle long-term storage. I built a Go program to handle 
merging results from both to serve requests, but the bug lies in how data moves
from short-term storage to long-term storage.

The thing that makes sortdb interesting is it takes advantage of 
(1) Linux [mmap]([https://man7.org/linux/man-pages/man2/mmap.2.html](https://en.wikipedia.org/wiki/Mmap) to
work with the file contents as if they were in memory and (2) the sorting
of file contents to rapidly find entries with binary search.

I built the daily job to processed metrics logs and appended the aggregate results 
to the file that backed sortdb.
that transferred in-memory data into sortdb. 
