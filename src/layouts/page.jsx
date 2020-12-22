import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import cx from 'classnames'

import Header from '../components/header'
import SEO from '../components/seo'
import styles from './page.module.css'

export default function PageLayout ({
  children,
  location,
  summary,
  title,
  wideLayout,
}) {
  const data = useStaticQuery(graphql`
    query PageLayoutQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <main>
      <SEO title={title} description={summary} location={location} />

      <div className={styles.header}>
        <Header siteTitle={data.site.siteMetadata.title} />
      </div>
      <div className={cx(styles.content, wideLayout ? undefined : styles.readableLayout)}>
        <h1>
          {title}
        </h1>
        {children}
      </div>
    </main>
  )
}
