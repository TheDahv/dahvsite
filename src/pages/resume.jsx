import React from 'react'
import cx from 'classnames'

import SEO from '../components/seo'
import { ResumeTypography } from '../components/Typography'
import styles from './resume.module.css'

export default function Resume ({ location }) {
  return (
    <>
      <ResumeTypography />
      <SEO title='Home' location={location} />
      <div className={styles.root}>
        <h1>David Pierce</h1>
        <div className={styles.introduction}>
          <div>
            <p>
              Technical Product Manager and Software Engineer
              <br />
              4027 52nd Ave SW, Seattle WA 98116
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
            I'm a customer-focused product leader and full-stack engineer
            specializing in web applications development. I want to use my
            talents to help people and make an impact I can be proud of. My goal
            is to use my technical background to bring solutions to customers as
            a technical product manager, or as a software engineer in a role
            that can leverage my product background.
          </p>
        </div>
        <div>
          <h2>Work Experience</h2>
          <div className={styles.entry}>
            <h3>
              Moz; Seattle, WA &ndash; Technical Product Manager and Senior
              Software Engineer
            </h3>
            <span className={styles.dateRange}>
              <nobr>June 2015 &ndash; Present</nobr>
            </span>
          </div>
          <p>
            My Moz career included product management, software engineering, and
            leadership. Technologies used include JavaScript, Node.js, Express,
            Go, React, MySQL, Postgres, RethinkDB, Elasticache, Redis, and NSQ
            in both Linux VM-based and cloud-based architectures. I leaned
            heavily on Jira, Confluence, and Miro to manage sprints and document
            products and processes.
          </p>
          <div className={styles.entry}>
            <strong>Technical Product Manager</strong>
            <span className={styles.dateRange}>
              <nobr>January 2019 &ndash; Present</nobr>
            </span>
          </div>
          <p>
            Leveraged my software background, entrepreneurial experience, and
            customer focus to build technical solutions for marketers. Worked
            with engineers to build a culture of customer empathy, iterative
            development, and prioritization to help our company learn and
            deliver to market faster. I oversaw and led the following:
          </p>
          <ul>
            <li>
              Local Market Analytics: a local SEO beta program within the Moz
              Pro suite with about 5,000 sites registered and 2 enterprise
              deals. I led customer research, prototyping, implementation, and
              launch and sales support.
            </li>
            <li>
              MozNext Applications Framework: an internal cross-functional
              program to improve product delivery. Projects include a standard
              component library based on React and Material UI and the creation
              of a Moz Labs alpha testing environment.
            </li>
            <li>
              Rapid Prototyping Team: a small team of engineers creating MVPs
              for use in alpha testing. I served as technical lead and alpha
              program coach. We produced 3 different alphas for Moz product
              teams within the last quarter of 2020.
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
            Full-stack Node.js engineer responsible for designing and
            implementing features, working with data vendor partners, and
            managing a fleet of VMs. Accomplishments include a redesigning a
            duplicate listings management experience, upgrading and expanding
            Moz' GMB API integration, and building a high-performance analytics
            data service.
          </p>

          <div className={cx(styles.entry, styles.pageBreak)}>
            <h3>Startup Weekend; Seattle, WA &ndash; Technical Director</h3>
            <span className={styles.dateRange}>
              June 2012 &ndash; June 2015
            </span>
          </div>
          <p>
            I led the engineering team for a global non-profit building
            entrepreneurial communities. As technical director, I served as:
          </p>
          <ul>
            <li>
              Product Manager: Conduct customer interviews, map out pain points
              and opportunities, and manage roadmap. Work with stakeholders,
              builders, and third-party vendors to deliver projects.
            </li>
            <li>
              Team Lead: Build a healthy team through hiring, culture building,
              and supporting individual engineers.
            </li>
            <li>
              Architect: Design products across systems powered by connected API
              services.
            </li>
            <li>
              Engineer: Contribute back-end and front-end code on projects from
              internal tools to public-facing sites.
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
            2010 Community Tech Preview
          </p>
        </div>
        <div>
          <h2>Education</h2>
          <h3>
            Raikes School in Computer Science and Management at the Univerity of
            Nebraska-Lincoln
          </h3>
          <h4>Management Information Systems Major, May 2009</h4>

          <p>Senior/Junior Design Studio Projects</p>

          <ul>
            <li>
              Nanonation: Platform-agnostic media rendering software using Qt
              framework and C++ &ndash; Team contributor.
            </li>
            <li>
              Jacob North: Closed-loop sales and marketing system using Groovy
              and Grails &ndash; Scrum master.
            </li>
            <li>
              Microsoft: Dynamics Great Plains vendor workflow extension using
              C# &ndash; Documentation Lead.
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
