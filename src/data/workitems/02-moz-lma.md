---
title: Moz Local Market Analytics
linkUrl: https://moz.com/local-market-analytics-announcement
slug: moz-local-market-analytics
screenshotUrl: ../../images/work/local-market-analytics.png
---

Local Market Analytics (LMA) is the result of an exploration effort at Moz to
answer the question "how do local SEOs determine their next step after business
listings". I led a small team of engineers and a designer to interview
customers for pain points, rapidly produce prototypes, and iterate toward a
validated opportunity for Moz.

We built and launched a beta product for [launch at MozCon
2019](https://moz.com/learn/seo/local-market-analytics-opportunities) where I
helped support sales calls and various press releases.
[[1]](https://www.businesswire.com/news/home/20190715005747/en/MozCon-2019-Moz-Announces-Local-Market-Analytics-Giving-Users-Understanding-Into-True-Local-Competitors-and-Market-Performance),
[[2]](https://uberall.com/en-gb/resources/blog/industry-insights-big-announcement-at-mozcon-take-a-sneak-peek-at-local-market-analytics)

To help customers with local search analytics needs, we focused on these core
promises:

- gather data that reflects and surfaces your target markets
- learn how searcher location impacts your search presence
- identify Who, Where, and Why among market competitors
- detect Anomalies and SERP Movement with Alerts
- determine a "next step" to improve presence in a target market and overtake
  competitors

We were able to do this with sophisticated awareness of geography and
geo-located SERP analysis. We could show users how their search presence changed
from city to city, neighborhood to neighborhood, and coast to coast. More
importantly, we could show them how their competitors changed as market segments
changed.

We made use of Postgres and its fantastic PostGIS extensions to model our
understanding of the geographies of target audiences. Even more exciting was our
approach to what we called "multisampling": for any target market our user
identified, we computed a set of SERP observations radiating out from the
centroid we determined for that market. That means analysis of any given target
search was made up of multiple samples around the target geography, revealing
variance within the market itself.

This was an exciting project where I led as product manager. I could leverage my
interview and research capabilities to discover and validate product
opportunities. I also used my software background to improve the cycle time
of determining feasibility of any idea -- often implementing a proof of concept
myself.

### Technologies Used

- Node.js and Express
- React and Material UI
- Postgres with PostGIS
- Docker and Docker Compose for development, deployment, and orchestration
- Unleashed for feature flagging

### Personal Contributions

- Product manager leading activities like user research, roadmapping and vision
  casting, customer support preparation, sales enablement, demos, sales calls,
  backlog management, and sprint planning
- Implemented many original core features both in the UI and in back end
  services powering those features
- Conducted many experiments and interviewed with customers to explore
  opportunities
