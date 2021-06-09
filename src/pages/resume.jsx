import React from 'react'
import cx from 'classnames'

import SEO from '../components/seo'
import styles from './resume.module.css'
import { GoogleAnalytics } from '../components/analytics'
import { ResumeTypography } from '../components/Typography'

export default function Resume ({ location }) {
  return (
    <>
      <GoogleAnalytics />
      <ResumeTypography />
      <SEO title='Resume' location={location} />
      <div className={styles.root}>
        <h1>David Pierce</h1>
        <div className={styles.introduction}>
          <div>
            <p>
              Technical Product Manager and Senior Software Engineer
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
            I'm a customer-focused product leader specializing in products
            delivered via web applications. I want to use my customer empathy and
            technical background to create great products as a technical product
            manager. I thrive in small, collaborative teams where I can turn ambiguity
            into product direction with iterative discovery and delivery methodologies.
          </p>
        </div>
        <div>
          <h2>Work Experience</h2>
          <div className={styles.entry}>
            <h3>
              Moz; Seattle, WA &ndash; Technical Product Manager
            </h3>
            <span className={styles.dateRange}>
              <nobr>June 2015 &ndash; Present</nobr>
            </span>
          </div>
          <p>
            My Moz career included leading in product management and software
            engineering. Technologies used include Node.js, React, Go, MySQL, Postgres,
            Elasticache, and NSQ in VM and cloud-based architectures. I used Jira,
            Confluence, and Miro to manage sprints and document products.
          </p>
          <div className={styles.entry}>
            <strong>Technical Product Manager</strong>
            <span className={styles.dateRange}>
              <nobr>January 2019 &ndash; Present</nobr>
            </span>
          </div>
          <p>
            Leveraged my software background, entrepreneurial experience, and
            customer focus to build technical solutions for marketers. Worked with
            engineers to build a culture of customer empathy, iterative development, and
            prioritization to deliver to market faster. I oversaw and led the following:
          </p>
          <ul>
            <li>
              Local Market Analytics beta: helped SEOs understand site
              performance in hyper-local searches, identify regional competitors, and
              surface colloquial nuance in ranking pages. The beta earned 2 enterprise deals
              and users tracked 6.7K sites. The beta supported about 50 daily active users
              tracking 90.5K keywords in 62.4K markets in the US, Canada, UK, and Australia.
              </li>
            <li>
              MozNext Applications Framework: an internal cross-functional
              program to improve product delivery. Projects include a standard
              component library based on React and Material UI and the creation
              of a Moz Labs alpha testing environment.
            </li>
            <li>
              Rapid Prototyping Team: a small team of engineers creating MVPs
              for use in alpha testing. I served as technical product manager and coach for
              the program. I led delivery on 3 alphas for Moz product teams within Q4 2020,
              with one promoting to beta in the following quarter.
            </li>
          </ul>

          <div className={styles.entry}>
            <strong>Technical Lead</strong>
            <span className={styles.dateRange}>
              May 2017 &ndash; January 2019
            </span>
          </div>

          <p>
            Promoted consistency in design, implementation, and execution on
            product goals. Promoted org-wide engineering principles through
            architecture reviews and knowledge-sharing. Worked with product
            managers to steer product direction.
          </p>

          <div className={styles.entry}>
            <strong>Software Engineer</strong>
            <span className={styles.dateRange}>June 2015 &ndash; May 2017</span>
          </div>
          <p>
            Full-stack Node.js engineer responsible for designing, implementing,
            and operating product features. Accomplishments include redesigning a
            duplicate listings management experience, upgrading and expanding Moz' GMB API
            integration, and building a high-performance analytics data service.
          </p>

          <div className={cx(styles.entry, styles.pageBreak)}>
            <h3>Startup Weekend; Seattle, WA &ndash; Technical Director</h3>
            <span className={styles.dateRange}>
              June 2012 &ndash; June 2015
            </span>
          </div>
          <p>
            I led the engineering team for a global non-profit building
            entrepreneurial communities in over 150 countries. As technical director, I
            served as product manager, team lead, architect, and engineer. Notable accomplishments include:
          </p>
          <ul>
            <li>
              SWOOP: a database and management tool to help staff track,
              budget, and support over 13.2K organizer-planned events.
            </li>
            <li>
              Organizer Portal: an extension to SWOOP to support volunteer
              organizers in planning, promoting, and financing their events using the same
              database as their support staff.
            </li>
            <li>
              Community Sites: a family of regional marketing websites and a
              platform for generating and hosting customizable event pages for organizers to
              market all events tracked in SWOOP.
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
            MVC, ASP.NET Forms, and WPF. Notable accomplishments include:
          </p>
          <ul>
            <li>
              Research and development of custom hands-free, no-look inventory
              tool. Cut inventory process from an entire workday to a couple
              hours.
            </li>
            <li>
              Reconstructed site password algorithm with seamless upgrade for
              existing users.
            </li>
            <li>
              Built and maintained continuous integration test system with
              NUnit, WatiN, CruiseControl.NET, and NANT.
            </li>
          </ul>

          <div className={styles.entry}>
            <h3>Microsoft; Redmond, WA – Program Manager</h3>
            <span className={styles.dateRange}>
              June 2009 &ndash; December 2009
            </span>
          </div>
          <p>
            Worked on a SharePoint hosted services team. Accomplishments include
            writing specifications for service platform monitoring system,
            writing PowerShell scripts to manage VM instances in a dynamic
            service platform, and managing Microsoft's 5 month SharePoint Online
            2010 Community Tech Preview.
          </p>
        </div>
      </div>
    </>
  )
}
