import React from 'react'
import { graphql } from 'gatsby'

import PageLayout from '../layouts/page'

import styles from './blogTemplate.module.css'

export default function Template({ data, location }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <PageLayout
      title={markdownRemark.frontmatter.title}
      summary={markdownRemark.frontmatter.summary}
      location={location}
    >
      <main>
        <div className={styles.postHeader}>
          <span className={styles.postDate}>{frontmatter.date}</span>
        </div>

        <div className="post-body" dangerouslySetInnerHTML={{ __html: html }}>
        </div>
      </main>
    </PageLayout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "dddd, D MMMM yyyy")
        slug
        title
        summary
      }
    }
  }
`
