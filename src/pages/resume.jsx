import React from "react";
import cx from "classnames";

import Seo from "../components/seo";
import * as styles from "./resume.module.css";
import { GoogleAnalytics } from "../components/analytics";
import { ResumeTypography } from "../components/Typography";

export default function Resume({ location }) {
  return (
    <>
      <GoogleAnalytics />
      <ResumeTypography />
      <Seo title="Resume" location={location} />
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
            <a href="https://www.thedahv.com/">www.thedahv.com</a> |{" "}
            <a href="https://github.com/TheDahv/">github.com/TheDahv</a>
            <br />
            <a href="tel:206.488.3438">206.488.3438</a> |{" "}
            <a href="mailto:david.dean.pierce@gmail.com">
              david.dean.pierce@gmail.com
            </a>
          </div>
        </div>
        <div>
          <p>
            Technical PM who validates ideas through rapid prototyping before
            handing to engineering. 10+ years leading technical products across
            SaaS, data platforms, APIs, and AI/ML systems. Comfortable designing
            APIs, leading technical spaces, and staying hands-on with personal
            AI projects.
          </p>
        </div>
        <div>
          <h2>Skills &amp; Tools</h2>
          <ul>
            <li>
              <b>AI/ML Tooling:</b> Claude Code, Gemini, AWS Kiro, LangChain,
              MCP, prompt engineering
            </li>
            <li>
              <b>Languages &amp; Frameworks:</b> TypeScript/Node.js, Go, Python,
              SQL (Redshift, Postgres), React
            </li>
            <li>
              <b>Data &amp; Analytics:</b> Data & ML product management,
              NLP/sentiment pipelines, experimentation design
            </li>
            <li>
              <b>Product &amp; Process</b>: Discovery &amp; UX research,
              agile/scrum, cross-functional leadership, API design,
              zero-to-one-launches
            </li>
            <li>
              <b>Tools:</b> Jira, Asana, Confluence, Miro
            </li>
          </ul>
          <h2>Work Experience</h2>
          <div className={styles.entry}>
            <h3>
              Amazon Web Services; Seattle, WA &ndash; Sr. Product Manager -
              Technical
            </h3>
            <span className={styles.dateRange}>
              <nobr>November 2025 &ndash; Present</nobr>
            </span>
          </div>
          <p>
            Supporting automation for programmatic, seller-led AWS deals through
            the global Private Pricing program.
          </p>
          <ul className={styles.accomplishments}>
            <li>
              <b>PM Feedback Automation:</b> AI tool eliminating 90% of manual
              PM effort for defect classification and summarization across Slack
              channels, delivering weekly analysis and metrics for executive
              reviews.
            </li>
            <li>
              <b>Enterprise Support Integration:</b> Enabled programmatic deal
              automation to integrate Q4 AWS Support updates into Private
              Pricing, coordinating the April 2026 launch across 4 orgs spanning
              engineering to sales enablement.
            </li>
          </ul>
          <div className={styles.entry}>
            <h3>Amazon; Seattle, WA &ndash; Sr. Product Manager - Technical</h3>
            <span className={styles.dateRange}>
              <nobr>August 2021 &ndash; November 2025</nobr>
            </span>
          </div>
          <p>
            Built AI-driven feedback analytics for 3K Last Mile transportation
            partners across business, science, software, and BI teams.
          </p>
          <ul className={styles.accomplishments}>
            <li>
              <b>AI Feedback Analysis Platform:</b> Zero-to-one multi-channel
              feedback platform allowing 40+ teams to analyze feedback trends
              across 245K touchpoints with ML sentiment scoring and AI-driven
              summaries. One program drove $500K+ annual defect prevention
              through feedback-driven transporter education strategy.
            </li>
            <li>
              <b>AI Sentiment Pipeline:</b> Designed and delivered sentiment
              metric, validated and prototyped using Amazon's ETL framework.
              Teams achieved 97% viewership, 180% interaction, 68%
              view-percentage growth. 43K-document annotation campaign with
              Applied Science improved underlying BERT model accuracy 68%→72%.
            </li>
            <li>
              <b>Content Integration Widget:</b> Drove strategy and execution
              for API-driven widget to surface important unread community
              discussions, achieving a 4.06% daily click-through rate, 2.06
              percentage points above pilot goal.
            </li>
          </ul>
          <div className={cx(styles.entry)}>
            <h3>Moz; Seattle, WA &ndash; Technical Product Manager</h3>
            <span className={styles.dateRange}>
              June 2015 &ndash; August 2021
            </span>
          </div>
          <p>
            Owned platform API strategy and zero-to-one launches; established
            company-wide innovation culture.
          </p>
          <ul className={styles.accomplishments}>
            <li>
              <b>Moz Local Enterprise API:</b> Designed and owned Moz Local API
              managing 100K+ listings. Embedded in sales cycles, translating
              customer needs into API enhancements for programmatic bulk
              location data management.
            </li>
            <li>
              <b>Local Market Analytics Beta:</b> Launched zero-to-one beta
              supporting 6.7K sites/90.5K keywords/62.4K markets, securing
              $73.2K enterprise + $9K SMB ARR by prototyping with real customer
              data; features merged into flagship product.
            </li>
            <li>
              <b>Rapid Experimentation Studio:</b> Led across PMs and
              engineering to accelerate Moz product validation. Reduced
              prototype cycles from months to 4 weeks, shipped 3 alphas in first
              quarter to enable hypothesis-driven innovation.
            </li>
          </ul>
          <div className={cx(styles.entry, styles.pageBreak)}>
            <h3>Startup Weekend; Seattle, WA &ndash; Technical Director</h3>
            <span className={styles.dateRange}>
              June 2012 &ndash; June 2015
            </span>
          </div>
          <p>
            Led engineering for a global non-profit, serving as PM, team lead,
            architect, and engineer. Built and shipped internal event planning
            and management platform supporting 13.2K events as well as a suite
            of regional marketing and event sites.
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
          <div>
            <h2>Personal Projects</h2>
            <p>
              <strong>Family Financial Assistant</strong>: Household AI agent
              connecting Monarch Money to a shared Telegram interface, running
              persistently on a local Mac Mini with zero cloud infrastructure.
              Dual-mode architecture validates patterns for financial
              decision-making. Learn more:
              <a href="https://github.com/TheDahv/financial-assistant">
                {" "}
                github.com/TheDahv/financial-assistant
              </a>
            </p>
            <p>
              <strong>AI Dungeon Master</strong>: LLM-powered Dungeon Master for
              family tabletop RPG sessions with voice synthesis and structured
              session initialization. Multi-modal design validates orchestrating
              AI capabilities across form factors (desktop, terminal, mobile).
              Learn more:
              <a href="https://github.com/TheDahv/family-dnd">
                {" "}
                github.com/TheDahv/family-dnd{" "}
              </a>
            </p>
            <p>
              <strong>Wine Pairing Suggestions</strong>: Food-first AI wine
              pairing tool for user-described meals. Built in Go and deployed on
              AWS Lambda via SAM with Claude-generated pairings and response
              caching. Learn more:
              <a href="https://wine-suggestions.thedahv.com">
                {" "}
                wine-suggestions.thedahv.com
              </a>
            </p>
          </div>

          <h2>Education</h2>
          <div className={styles.entry}>
            <h3>Raikes School at University of Nebraska</h3>
            <span className={styles.dateRange}>
              September 2005 &ndash; May 2009
            </span>
          </div>
          <p>
            Bachelor of Science in Management Information Systems; Minor in
            Computer Science.
          </p>
        </div>
      </div>
    </>
  );
}
