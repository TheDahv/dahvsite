import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from '../components/header'
import SEO from '../components/seo'
import styles from './page.module.css';

export default function PageLayout ({ title, summary, children, location }) {
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
      <SEO
        title={title}
        description={summary}
        location={location}
      />

      <div className={styles.header}>
        <Header siteTitle={data.site.siteMetadata.title} />
      </div>
      <div className={styles.content}>
        <h1>{title}</h1>
        {children}
      </div>
    </main>
  )
}
