import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import PageLayout from '../layouts/page'

import styles from './blogTemplate.module.css'

export default function Template ({ data, location }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <>
      <Helmet
        meta={[
          {
            name: 'keywords',
            content: frontmatter.categories
          }
        ]}
      />
      <PageLayout
        location={location}
        summary={markdownRemark.frontmatter.summary}
        title={markdownRemark.frontmatter.title}
      >
        <hr />
        <main className={styles.post}>
          <div className={styles.postHeader}>
            <span className={styles.postDate}>{frontmatter.date}</span>
          </div>

          <div
            className={styles.postBody}
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        </main>
      </PageLayout>
    </>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        categories
        date(formatString: "dddd, D MMMM yyyy")
        slug
        title
        summary
      }
    }
  }
`
