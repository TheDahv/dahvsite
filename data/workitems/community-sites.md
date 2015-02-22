---
title: UP Global - Community Sites
linkUrl: http://www.up.co/communities
screenshotUrl: http://placehold.it/350x350
---

The "Community Sites" project is a platform to showcase entrepreneurial
communities and highlight the efforts of UP Global community leaders.

We simplified the efforts of gathering information about UP Global
programs in a community from various sources. Most importantly,
we automated the creation of Startup Weekend and Startup Next
event sites from our event planning tools.

### Noteworthy Technical Accomplishments

* **Disparate Data Source Compilation**  <br>
We chose Node.js for its ability to serve as robust component
in a network graph. In our case, we leverage the asynchronous nature of
Node.js programming to bring multiple API sources together quickly. This allows
to create the feeling of "one site" powered by multiple datasources
* **Intelligent Routing**  <br>
In order to balance SEO needs with human-friendly URL paths, we use Nginx to
perform pattern matching, community lookups, and intelligent rerouting to ensure
our URL schemas work for all communities.
* **Flexible Community Definitions**   <br>
Communities define themselve differently than what they see on a map. Some
communities identify as an entire country; others define themselves a collection
of small cities or nearby states.
Our system allows for complex community modeling to describe communities as
our community members do.

### Technologies Used

* Node.js and Express.js
* CoffeeScript
* Sass and Foundation 4
* Redis

### Personal Contributions

* Overall multi-system architecture and design
* Lead engineer and primary support engineer
* Early customer research and product management
