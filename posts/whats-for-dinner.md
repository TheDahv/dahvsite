---
title: What's For Dinner?
date: 2011-06-06
categories: programming, wfd
summary: !
  Here are some things we all have in common - 1) we all must eat, 2) we all spend money on food,
  3) we all could benefit from a better approach to meal planning. This post begins my story as
  I set out to build a web application to help my wife and I plan meals together.
---

I'm a pretty organized person and I really enjoy planning as much as my life as is sensible and rational. This includes planning out meals for the week.

# The Story

My habits of meal planning and grocery shopping grew over the span of a couple years. After I graduated from college and moved to Nebraska, I was suddenly thrust into a new world where no dining halls nor mothers were preparing food for me. Thankfully, I learned to love cooking when I was younger and I was able to feed myself. I survived through my first months on my own and life was fine.

However, I started noticing that cooking meals and shopping for one person was hard. Lots of food would be left to rot in my refrigerator because I would either forget they were there or not make a meal that included that ingredient before it spoiled.

I started learning to plan my meals and only buy enough food that I could consume within a week. My grocery bills started to go down and I was able to manage my food budget a little better. Impulse purchases were less likely because they weren't on the list and it was easier to stay accountable. I stopped having to go out when I randomly ran out of food and didn't have time to go to the grocery store.

Ultimately, my diet improved since I was actually able to be thoughtful and craft a well-rounded set of meals.

Then I got married.

I had to learn to adjust to planning for 2 people, and coordinate with my wife to plan out a week's worth of meals that worked well for the both of us. Our weeks can get pretty hectic, and so can our diets without a good plan. Unfortunately, it was hard for us to find time to draft a plan together and make it to a grocery store on a free evening (that happens to be Mondays for us). Without a better solution, Micaline and I would chat about what we wanted to eat and I would compile our ideas onto a piece of paper that we would take to the store after I picked her up from work.

# The Solution

Our meal planning was working, but it could be better. I decided to start working on a tool that would help us plan together and keep our grocery list in check. That's how [What's For Dinner](http://dinnerplanner.herokuapp.com) was born.

The idea is we can use the application to generate a blank slate on which we can plan our meals together. There is no need for authentication or authorization. You just make a new plan, share the URL with somebody, and start planning together. Eventually, you should be able to print out your finished plan and never think about it again until the next time you need to make a new plan.

Feel free to try it out and let me know what still needs work!

# The Future

There are a few things I would like What's For Dinner to be able to do.

First off, a lot of features are implemented, and those that are working still have a few bugs and could use more testing. My hopes are that opening up to the wild jungle that is the Internet, issues will crop up that will eventually lead to a better product.

Here are some things I would like the application to do:

- Real Concurrency: At the time of this writing, it is the burden of the user to refresh often and make sure he or she is getting the latest updates from the other people working on the plan. The next big thing I want to work on is automatic syncing among users. So, when Micaline adds a new meal for Thursday, it should show up on my screen right when she saves it without me having to refresh the page.
- Sort and Manage Ingredients: The system should be able to recognize that "tomato" goes in produce, and that one tomato in two different meals should aggregate into two tomatoes total in the shopping list. I'd like to come up with a way for ingredients to be recognized by the system and automatically put a new ingredient in the right list. Unrecognized ingredients would be filed as "Miscellaneous" and could be recategorized by the community.
- Customized Shopping List: Right now, the shopping list is laid out to model my path through the Queen Anne Safeway. Your grocery store might not be the same, so it would be cool if you could reorder the layout.
- Print-Optimized Stylesheet: Once the meal plan is finished, it really doesn't do you any good until you can take it to the store or pin it on your refrigerator. I want to make a stylesheet that will be used when printing the plan to paper.

# Feedback

Do you have other good ideas? If you're a developer, you can file bugs on the [GitHub Issues Page](https://github.com/TheDahv/whatsfordinner/issues?sort=created&direction=desc&state=open) for the project.

Eventually, I'm going to implement comments on this blog, so that might be a way to add feedback.

Otherwise, hit me up on [twitter](https://twitter.com/TheDahv) or shoot me an email.

Thanks for reading!
