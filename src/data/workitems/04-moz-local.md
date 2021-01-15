---
title: Moz Local
linkUrl:
slug: moz-local
screenshotUrl: ../../images/work/moz-local.png
---

Moz Local is a data management and performance analysis tool to help customers
manage the presence of their business locations online. It dealt primarily with
managing accuracy of listings across a portfolio of business directories and
aggregators.

In order to achieve accuracy, the service ran repeated checks for accuracy and
regularly pushed updates to resolve any inconsistencies that crept into the
ecosystem.

The service also identified and suppressed alternates, near matches, and
duplicates to help customers ensure their audience was finding the one true
canonical representation of their business.

It also offered analytics features for power users who wanted to track
performance in accuracy, rankings, and business review over time.

### Technologies Used

- Node.js and Express
- Backbone, React, and Bootstrap
- Elasticsearch to power multi-facet search experiences and reporting
- MySQL for product attributes and state
- RethinkDB to store unstructured ecosystem search results and accuracy checks
- Redis for caching, service discovery, and <24 hour analytics data access
- Internally developed service discovery and port registry
- [NSQ](https://nsq.io/) for distributed messaging
- [sortdb](https://github.com/jehiah/sortdb) to power time-series location
  analytics queries for customer dashboards
- Go for high-performance multiplexing of analytics queries to sortdb
- [drake](https://github.com/Factual/drake) to power ETL pipelines for product
  analytics
- Ubuntu VMs and [puppet](https://forge.puppet.com/modules/puppet/python) for
  provisioning and deployments
