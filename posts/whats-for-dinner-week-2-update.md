---
title: What's For Dinner - Week 2 Update
date: 2011-06-20
categories: programming, wfd
summary: A brief update on my What's For Dinner project
---

#What's For Dinner - Week 2 Update

*Monday, 20 June 2011*

I got even **less** time to code on anything this week, so there hasn't been anything major. [What's For Dinner](http://dinnerplanner.herokuapp.com) is still in development mode and I have a list of cool ideas I want to put into the application.

The one thing I was able to make was a bookmarklet to generate shopping lists based on the plans you enter. This was another innovation born of necessity as Micaline and I used this feature more. We were able to use WFD to plan our meals just fine, but getting them onto paper so we could use the plan in the real world was a bit cumbersome. Before, I was copying and pasting each meal and its ingredients into a separate document and printing that to take to the grocery store.

Now, I use a bookmark to generate something a little easier to use. To try it out, head over to my [bookmarklets page](http://dl.dropbox.com/u/11288811/personal_ideas/bookmarklets/bookmarklets.html) and find the What's For Dinner bookmarklet. I'd link to it here, but markdown wasn't too pleased.

The bookmarklet uses jQuery and to pick out each meal and its ingredients and build a shopping list that get inserted at the end of the page.

I think this will tide us over until I build a better print feature, but it was fun to build and it works for now.

Feel free to check out [other bookmarks](http://dl.dropbox.com/u/11288811/personal_ideas/bookmarklets/bookmarklets.html) I've put together (Be warned, I've seen this page look funky on older browsers I didn't get a chance to test).

## Future Plans

I think the next thing I want to work on in WFD is a smarter update experience. Instead of updating all 7 meals on saving, each individual plan that was updated should just get saved in the database.

Once that gets finished, I'll be working on an automated push from the server to all browsers when a meal changes. This way, you won't have to refresh when somebody else updates the plan you are working on together.

Happy planning! 
