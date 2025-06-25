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
            I'm a customer-focused product leader that leverages my product and
            software background to create impactful products. From startups to
            corporations, I thrive in turning ambiguity into clear direction in
            collaboration with cross-functional teams.
          </p>
        </div>
        <div>
          <h2>Skills</h2>
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
            I build feedback insights and content delivery products for global
            communities of 3K Last Mile transportation partners. I bridge
            business stakeholder needs to Science, Software, and Business
            Intelligence teams. Accomplishments include:
          </p>
          <ul className={styles.accomplishments}>
            <li>
              Town Square: Led "zero to one" launch of a centralized partner
              feedback analytics platform, integrating five channels and
              achieving EU parity in year one, projected to expand and consume
              245K touchpoints in 2025. This saved early pilot teams ~2
              hours/week and enabled 15+ teams to reduce deep dives to 30
              minutes, exceeding 2025 adoption goals by April.
            </li>
            <li>
              Community Sentiment Metric: Partnered with Science to define and
              launch a comprehensive sentiment metric, driving its adoption into
              Page 0 views and enabling community managers to guide
              content/engagement. This resulted in 97% improved content
              viewership, 180% increased interactions, and 68% higher average
              view percentage in 2022.
            </li>
            <li>
              Sentiment Model Retraining: Led an annotation campaign that
              produced 43K ground-truth documents for BERT-based model training,
              improving accuracy from 68% to 72%.
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
              Local Market Analytics Beta: Drove "zero to one" launch to expand
              Moz local SEO offering. The beta supported 6.7K sites tracking
              90.5K keywords across 62.4K markets, securing early client gains
              of $31.2K ARR and $42K ARR accounts, plus ~$9K ARR from 18 SMB
              customers.
            </li>
            <li>
              Applications Framework Development: Spearheaded an internal program creating a
              React-based component library and alpha testing environment, reducing prototype
              development from months to two sprints.
            </li>
            <li>
              Listings Management Product Technical Leadership: Influenced product direction
              for a listings management product supporting over 100K business locations,
              leading exploration and prototyping of an embedded audit tool for new revenue
              streams and spearheading API-driven integrations with popular listings services
              such as Google My Business and Yelp.
            </li>
          </ul>
          <div className={cx(styles.entry, styles.pageBreak)}>
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
          <ul className={styles.accomplishments}>
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
