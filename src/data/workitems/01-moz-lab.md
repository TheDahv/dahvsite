---
title: Moz Lab
linkUrl:
slug: moz-lab
screenshotUrl: ../../images/work/moz-lab.png
---

Moz Lab is an environment for product teams to test new ideas and validate
business opportunities  with customers and industry experts.

This is the output of the Moz' Rapid Prototyping Team I helped form and led.
We saw a need for near-term progress on various product initiatives and a
capability to rapidly vet and validate business opportunities.

I led a small team of engineers with an appetite for exploration and innovation,
and we worked tightly with 3 product teams made up of product managers,
designers, and product marketers. The result is a platform where we can quickly
turn ideas into simple prototypes with customer access controlled by feature
flags.

Node.js let us quickly cycle between front-end and back-end concerns. We
built a flexible UI environment using React, Material UI, and an in-house
component library to quickly create and modify applications. We used the UI
server to also build a set of APIs to implement a "backend for frontend"
pattern.

Any workloads related to persistence or background jobs were implemented in a
"middle tier" service. We used AWS SQS to process long-running jobs and MySQL
for general persistence needs.

### Technologies Used

- Node.js and Express.js
- JavaScript
- React and Material UI
- AWS Aurora RDS MySQL
- AWS Elasticache Redis

### Personal Contributions

- Team lead, ensuring engineers had clear objectives and a barrier-free path to
  implement and collaborate on product ideas
- Software engineer when sprint needs demanded it
- Consult and coaching with product managers to help them turn their visions
  into iterable milestones
- Interface to the rest of the company from individual contributors to
  executives to help them understand progress of the alphas
