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
              Seattle WA
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
            Technical product manager with a software engineering foundation and
            10+ years leading data-driven products from discovery through
            launch. Experienced working across Science, Engineering, and BI
            teams to turn ambiguous problems into products with measurable
            outcomes. Brings equal comfort in product strategy and technical
            depth to environments that need both.
          </p>
        </div>
        <div>
          <h2>Work Experience</h2>
          <div className={styles.entry}>
            <h3>
              Amazon Web Services (AWS); Seattle, WA &ndash; Sr. Product Manager - Technical
            </h3>
            <span className={styles.dateRange}>
              <nobr>November 2025 &ndash; Present</nobr>
            </span>
          </div>
          <p>
            Internal transfer to AWS Private Pricing Programs & Experiences team.
          </p>
          <div className={styles.entry}>
            <h3>
              Amazon; Seattle, WA &ndash; Sr. Product Manager - Technical
            </h3>
            <span className={styles.dateRange}>
              <nobr>August 2021 &ndash; November 2025</nobr>
            </span>
          </div>
          <p>
            Built community experience, feedback analytics, and insights
            products for 3K Amazon transportation partners in the Last Mile
            network. Bridged business stakeholders with Science, Software,
            and BI teams.
          </p>
          <ul className={styles.accomplishments}>
            <li>
              <b>Town Square:</b> Identified a broken customer feedback flywheel
              limiting data-driven program improvements. Launched a "zero to
              one" feedback aggregation and AI-driven sentiment insights
              platform saving 40+ Amazon teams an average 5+ hours/week to drive
              defect monitoring and proactive research across 245K feedback
              touchpoints across five channels.
            </li>
            <li>
              <b>Community Sentiment Metric:</b> To balance inconsistent
              feedback signals and volumes across customer voices, launched a
              community sentiment metric to balance ML-based sentiment signals
              and drive actionable insights.  Application resulted in 97%
              content viewership growth, 180% interactions growth, and 68% view
              percentage growth.
            </li>
            <li>
              <b>Content Integration Widget:</b> Drove strategy and
              execution for API-driven widget to surface important unread
              community discussions, achieving a 4.06% daily click-through rate,
              206bps above pilot goal.
            </li>
            <li>
              <b>Sentiment Model Retraining:</b> Led an annotation campaign that
              produced 43K ground-truth documents for BERT-based sentiment model
              training, improving accuracy from 68% to 72%.
            </li>
          </ul>
          <div className={cx(styles.entry)}>
            <h3>Moz; Seattle, WA &ndash; Technical Product Manager</h3>
            <span className={styles.dateRange}>
              June 2015 &ndash; August 2021
            </span>
          </div>
          <p>
            Joined as a software engineer and transitioned into product
            management, leading local SEO products, new product launches, and
            internal platform initiatives across consumer and enterprise SaaS
            segments.
          </p>
          <ul className={styles.accomplishments}>
            <li>
              <b>Local Market Analytics Beta:</b> Identified gap for Moz
              customers in hyperlocal SEO performance analysis and competitor
              research. Launched a "zero to one" Local SEO beta supporting 6.7K
              sites tracking 90.5K keywords across 62.4K markets that secured
              early client gains of $73.2 enterprise ARR and ~$9K SMB ARR. The
              beta folded into Moz's flagship product.
            </li>
            <li>
              <b>Applications Framework:</b> Led an internal rapid
              prototyping studio using React-based component libraries and alpha
              testing environment. Reduced prototype development from months to
              two sprints. Launched three product alphas in a quarter.
            </li>
            <li>
              <b>Listings Management:</b> Drove technical leadership and
              product direction for a listings management product
              supporting over 100K business locations, leading exploration and
              prototyping of an embedded audit tool for new revenue streams.
            </li>
            <li>
              <b>Enterprise API Management:</b> Drove enterprise locations
              management API success by translating customer needs into
              technical solutions while supporting sales, onboarding
              experiences, and documentation.
            </li>
          </ul>
          <div className={cx(styles.entry, styles.pageBreak)}>
            <h3>Startup Weekend; Seattle, WA &ndash; Technical Director</h3>
            <span className={styles.dateRange}>
              June 2012 &ndash; June 2015
            </span>
          </div>
          <p>
            Led engineering for a global non-profit operating in 150+ countries,
            serving as PM, team lead, architect, and engineer. Built and shipped
            SWOOP (internal event management database supporting 13.2K events),
            an Organizer Portal for volunteer event planning, and a family of
            regional marketing and event hosting sites.
          </p>
          <div className={styles.entry}>
            <h3>WineBid.com; Seattle, WA – Software Engineer</h3>
            <span className={styles.dateRange}>
              January 2010 &ndash; June 2012
            </span>
          </div>
          <p>
            Full-stack developer building public and internal tools for an
            Internet wine auction (C#, JavaScript, ASP.NET MVC, MSSQL). Designed
            a custom hands-free inventory tool that cut a full-day inventory
            process down to ~2 hours.
          </p>
          <div className={styles.entry}>
            <h3>Microsoft; Redmond, WA – Program Manager</h3>
            <span className={styles.dateRange}>
              June 2009 &ndash; December 2009
            </span>
          </div>
          <p>
            Worked on a SharePoint hosted services team. Wrote specifications
            for a service platform monitoring system, authored PowerShell
            scripts for VM management, and managed the SharePoint Online 2010
            Community Tech Preview.
          </p>
          <h2>Summary of Skills</h2>

          <p>
            <b>Technical</b> Python (data analysis), SQL (Redshift), JavaScript/Node, Go, React, Jupyter, Figma (wireframing & stakeholder mockups).
          </p>
          <p>
            <b>Product</b> Data product lifecycle, ML product management, experimentation design, discovery & UX research, agile/scrum, cross-functional leadership.
          </p>
          <p>
            <b>Tools</b> Jira, Asana, Confluence, Miro, Loom.
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
