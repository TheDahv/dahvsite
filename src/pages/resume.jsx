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
              Sr. Technical Product Manager
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
            I'm a customer-focused product leader with a software engineering
            background that I use to create products for technical customers or
            that require technical understanding. From startups to corporations,
            I turn ambiguity into clear direction to deliver results in
            collaborative and iterative cross-functional teams. Notable skills
            include:
          </p>
        </div>
        <div>
          <ul className={styles.skills}>
            <li>
              Technical Product Leadership
            </li>
            <li>
              Data & Analytics (Redshift, Jupyter)
            </li>
            <li>
              Cross-functional Collaboration
            </li>
            <li>
              Software Design &amp; Architecture (React, Node.js, and Go)
            </li>
            <li>
              Scrappy UX research &amp; prototyping (Figma)
            </li>
            <li>
              Program & Project Management (Asana and Jira)
            </li>
          </ul>
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
            I build feedback insights and community products for 3K Amazon's
            transportation partners in the Last Mile network. I bridge business
            stakeholder needs to Science, Software, and Business Intelligence
            teams. Accomplishments include:
          </p>
          <ul className={styles.accomplishments}>
            <li>
              Launched a "zero to one" feedback aggregation and insights
              platform saving 40+ Amazon teams an average ~2 hours/week to
              detect defects and drive proactive improvements based on a
              projected 245K feedback touchpoints across five channels.
            </li>
            <li>
              Drove product strategy and execution for API-driven widget to
              surface important unread community discussions, achieving a 4.06%
              daily click-through rate and outperforming a comparable widget by
              46bps in the pilot.
            </li>
            <li>
              Launched a community sentiment metric with weighted prioritization
              components to turn ML-based sentiment signals into actionable
              insights resulting in 97% content viewership growth, 180%
              interactions growth, and 68% view percentage growth.
            </li>
            <li>
              Led an annotation campaign that produced 43K ground-truth
              documents for BERT-based sentiment model training, improving
              accuracy from 68% to 72%.
            </li>
          </ul>
          <div className={cx(styles.entry)}>
            <h3>Moz; Seattle, WA &ndash; Technical Product Manager</h3>
            <span className={styles.dateRange}>
              June 2015 &ndash; August 2021
            </span>
          </div>
          <p>
            Starting as a software engineer, I pivoted to product management,
            driving local SEO products and internal innovation programs. I used
            Jira, Confluence, and Loom for product planning and internal
            communications. Accomplishments include:
          </p>
          <ul className={styles.accomplishments}>
            <li>
              Launched a "zero to one" Local SEO beta supporting 6.7K sites
              tracking 90.5K keywords across 62.4K markets that secured early
              client gains of $73.2 enterprise ARR and ~$9K SMB ARR. The beta
              eventually folded into Moz's flagship product.
            </li>
            <li>
              Spearheaded an internal rapid prototyping studio creating a
              React-based component library and alpha testing environment,
              reducing prototype development from months to two sprints, and
              launching three product alphas in a quarter.
            </li>
            <li>
              Drove technical leadership and influenced product direction for a
              listings management product supporting over 100K business
              locations, leading exploration and prototyping of an embedded
              audit tool for new revenue streams.
            </li>
            <li>
              Drove enterprise locations management API success by translating
              customer needs into technical solutions while supporting sales
              processes, onboarding experiences, documentation, and customer key
              management.
            </li>
            <li>
              Led API integrations for popular listings services such as Google
              My Business and Yelp to help customers manage their business
              presence on those services.
            </li>
          </ul>
          <div className={cx(styles.entry, styles.pageBreak)}>
            <h3>Startup Weekend; Seattle, WA &ndash; Technical Director</h3>
            <span className={styles.dateRange}>
              June 2012 &ndash; June 2015
            </span>
          </div>
          <p>
            I led the engineering team for a global non-profit building
            entrepreneurial communities in over 150 countries. As technical
            director, I served as product manager, team lead, architect, and
            engineer. Accomplishments and deliverables include:
          </p>
          <ul className={styles.accomplishments}>
            <li>
              Developed a database and management tool to help staff track,
              budget, and support over 13.2K organizer-planned events.
            </li>
            <li>
              Developed a partner-facing admin portal, enabling volunteer
              organizers to plan, promote, and finance their events using the
              same database as Startup Weekend staff.
            </li>
            <li>
              Built an automated framework to deliver five regional marketing
              websites and a platform for generating and hosting customizable
              event pages for all tracked events.
            </li>
          </ul>
          <div className={styles.entry}>
            <h3>WineBid.com; Seattle, WA – Software Engineer</h3>
            <span className={styles.dateRange}>
              January 2010 &ndash; June 2012
            </span>
          </div>
          <p>
            I grew my skills as a well-rounded full-stack developer on a small
            team building public and internal software for an Internet wine
            auction. Technologies and languages include C#, JavaScript, CSS, and
            MSSQL. Frameworks include ASP.NET MVC, ASP.NET Forms, and WPF.
            Notable accomplishments include delivering a custom hands-free,
            no-look inventory tool that reduced the inventory process from an
            entire workday to a couple hours.
          </p>
          <div className={styles.entry}>
            <h3>Microsoft; Redmond, WA – Program Manager</h3>
            <span className={styles.dateRange}>
              June 2009 &ndash; December 2009
            </span>
          </div>
          <p>
            I worked on a SharePoint hosted services team. Accomplishments include
            authoring specifications for service platform monitoring system. I
            wrote PowerShell scripts to manage VM instances in a dynamic service
            platform and managing Microsoft's 5 month SharePoint Online 2010
            Community Tech Preview.
          </p>
          <h2>Education</h2>
          <div className={styles.entry}>
            <h3>Raikes School at University of Nebraska</h3>
            <span className={styles.dateRange}>
              September 2005 &ndash; May 2009
            </span>
          </div>
          <p>
            Bachelor of Science in Management Information Systems; Minor in Computer Science.
          </p>
        </div>
      </div>
    </>
  )
}
