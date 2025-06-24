import React from 'react'
import cx from 'classnames'

import Seo from '../components/seo'
import * as styles from './resume.module.css'
import { GoogleAnalytics } from '../components/analytics'
import { ResumeTypography } from '../components/Typography'

export default function Resume({ location }) {
  return (
    <>
      <GoogleAnalytics />
      <ResumeTypography />
      <Seo title='Resume' location={location} />
      <div className={styles.root}>
        <h1>David Pierce</h1>
        <div className={styles.introduction}>
          <div>
            <p>
              Technical Product Manager
              <br />
              7915 14th Ave SW, Seattle WA 98106
            </p>
          </div>
          <div className={styles.contact}>
            <a href='https://www.thedahv.com/'>www.thedahv.com</a> |{' '}
            <a href='https://github.com/TheDahv/'>github.com/TheDahv</a>
            <br />
            <a href='tel:206.488.3438'>206.488.3438</a> |{' '}
            <a href='mailto:david.dean.pierce@gmail.com'>
              david.dean.pierce@gmail.com
            </a>
          </div>
        </div>
        <div>
          <h2>Summary</h2>
          <p>
            I'm a customer-focused product leader that leverages my diverse
            software engineering and product background to create impactful
            digital products. From small startups to large enterprise, I thrive
            in small, collaborative cross-functional teams, transforming
            ambiguity into clear product direction through iterative discovery
            and delivery.
          </p>
        </div>
        <div>
          <h2>Work Experience</h2>
          <div className={styles.entry}>
            <h3>
              Amazon; Seattle, WA &ndash; Sr. Product Manager - Technical
            </h3>
            <span className={styles.dateRange}>
              <nobr>August 2021 &ndash; Present</nobr>
            </span>
          </div>
          <p>
            At Amazon, I leveraged my technical background to build products and
            programs that transform feedback into actionable insights for global
            communities of 3K Delivery Service Partners (DSPs) and Amazon
            Freight Partners (AFPs), vital to the Last and Middle Mile delivery
            network. I specialized in bridging the needs of business
            stakeholders to Science, Software, and Business Intelligence teams
            to enable data-driven decisions, leading the creation and launch of
            products that streamlined feedback aggregation and analysis. Accomplishments
            and deliverables include:
          </p>
          <ul>
            <li>
              Town Square: Led the development and launch of a centralized
              transportation partner feedback analytics platform. It integrated
              five feedback channels, achieved EU parity within its first year,
              and is projected to consume 245K touchpoints in 2025. It saved
              early pilot teams ~2 hours/week, allowed one team to redirect 2-8
              FTEs from manual scanning, and exceeded its 2025 adoption goal
              within a month, enabling 15+ teams to reduce deep dives from
              multi-hour efforts to 30-minute processes. Teams are now
              proactively detecting and addressing issues in support cases and
              product pilots, guiding root cause analysis, and informing product
              improvements.
            </li>
            <li>
              "Top Stories from Ignite" Integration Widget: Researched,
              proposed, and led delivery of a community content widget
              integrating top unread stories into a user's daily logistics
              dashboard, achieving an average 4.06% daily CTR post-launch,
              outperforming the goal by 206bps and a comparable widget by 46bps.
              The pilot for this project activated 5+ previously inactive users,
              demonstrating the impact of reaching the right people with the
              right content in the right place.
            </li>
            <li>
              Search UX Improvements: Led the redesign and implementation of
              search functionality in our community discussion platform to
              address challenges with discoverability and surfacing diverse
              content types. This resulted in a 9.5% increase in advanced search
              usage in our largest community and a 300% increase in usage for
              our newest community within six weeks of launch.
            </li>
            <li>
              Community Sentiment Metric: Partnered with the Science team to
              define and launch a new, comprehensive sentiment metric, driving
              its adoption into Page 0 views for all supported communities. I
              delivered an associated self-service dashboard to enable community
              managers to guide content and engagement plans using sentiment-
              and engagement-drivers. Additionally, community escalations
              managers used its prominence component to identify and prioritize
              high-visibility escalations. As a result, community improved
              community content viewership by 97%, interactions by 180% and
              average view percentage by 68% in 2022.
            </li>
            <li>
              Sentiment Model Retraining: Led an annotation campaign that
              produced 43K ground-truth documents for BERT-based model training,
              improving accuracy from 68% to 72% and outlining future
              performance improvements.
            </li>
          </ul>
          <div className={cx(styles.entry, styles.pageBreak)}>
            <h3>Moz; Seattle, WA &ndash; Technical Product Manager</h3>
            <span className={styles.dateRange}>
              June 2015 &ndash; August 2021
            </span>
          </div>
          <p>
            Starting as a software engineer, I pivoted to product management
            where I focused on local SEO, new product launches, and leading
            innovation. I used Jira, Confluence, Loom, and Miro for product
            planning and internal communications. Accomplishments and
            deliverables include:
          </p>
          <ul>
            <li>
              Local Market Analytics Beta: Supported 6.7K sites tracking 90.5K
              keywords across 62.4K markets (US, Canada, UK, Australia),
              enabling hyper-local performance analysis and competitor
              identification. Secured early client gains, including $31.2K ARR
              and $42K ARR accounts, alongside ~$9K ARR from 18 SMB customers.
              User analysis showed 47% high satisfaction for features like
              market-based ranks and local search volume.
            </li>
            <li>
              Applications Framework Development: Spearheaded an internal
              program that enhanced product delivery by creating a React-based
              component library and an alpha testing environment, reducing
              prototype development from months to two sprints.
            </li>
            <li>
              Listings Management Product Technical Leadership: Influenced
              product direction for a listings management product supporting
              over 100K business locations. Led exploration and prototyping of
              an embedded audit tool to create new enterprise and SMB revenue
              streams. I spearheaded API-driven integrations with leading
              industry listings services such as Google My Business and Yelp,
              adding value to customers who wanted to manage their online
              presence on those services.
            </li>
          </ul>
          <div className={cx(styles.entry)}>
            <h3>Startup Weekend; Seattle, WA &ndash; Technical Director</h3>
            <span className={styles.dateRange}>
              June 2012 &ndash; June 2015
            </span>
          </div>
          <p>
            Led the engineering team for a global non-profit building
            entrepreneurial communities in over 150 countries. As technical
            director, I served as product manager, team lead, architect, and
            engineer. Accomplishments and deliverables include:
          </p>
          <ul>
            <li>
              SWOOP: Developed a database and management tool to help staff track,
              budget, and support over 13.2K organizer-planned events.
            </li>
            <li>
              Organizer Portal: Developed an extension to SWOOP, enabling
              volunteer organizers in planning, promoting, and financing their
              events using the same database as their support staff.
            </li>
            <li>
              Community Sites: Built a family of regional marketing websites and
              a platform for generating and hosting customizable event pages for
              all SWOOP-tracked events.
            </li>
          </ul>
          <div className={styles.entry}>
            <h3>WineBid.com; Seattle, WA – Software Engineer</h3>
            <span className={styles.dateRange}>
              January 2010 &ndash; June 2012
            </span>
          </div>
          <p>
            Full-stack developer on a small team building public and internal
            software for an Internet wine auction. Technologies and languages
            include C#, JavaScript, CSS, and MSSQL. Frameworks include ASP.NET
            MVC, ASP.NET Forms, and WPF. Notable accomplishments include
            delivering a custom hands-free, no-look inventory tool that reduced
            the inventory process from an entire workday to a couple hours.
          </p>
          <div className={styles.entry}>
            <h3>Microsoft; Redmond, WA – Program Manager</h3>
            <span className={styles.dateRange}>
              June 2009 &ndash; December 2009
            </span>
          </div>
          <p>
            Worked on a SharePoint hosted services team. Accomplishments include
            authoring specifications for service platform monitoring system.  I
            wrote PowerShell scripts to manage VM instances in a dynamic service
            platform and managing Microsoft's 5 month SharePoint Online 2010
            Community Tech Preview.
          </p>
          <h2>Education</h2>
          <p>
            Raikes School at University of Nebraska &ndash; Bachelor of Science, Management
            Information Systems; Computer Science Minor.
          </p>
        </div>
      </div>
    </>
  )
}
