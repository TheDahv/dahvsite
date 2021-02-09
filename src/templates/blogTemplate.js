import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import PageLayout from '../layouts/page'

import styles from './blogTemplate.module.css'

export default function Template ({ data, location }) {
  const { face, markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  const meta = [
    {
      name: 'keywords',
      content: frontmatter.categories
    },
    {
      name: 'og:title',
      content: frontmatter.title
    },
    {
      name: 'og:description',
      content: frontmatter.summary
    },
    {
      name: 'og:url',
      content: location.href
    }
  ]
  meta.push({
    name: 'og:image',
    content: frontmatter.og_image || face.childImageSharp.fixed.src
  })

  return (
    <>
      <Helmet meta={meta} />
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

    face: file(relativePath: { eq: "face-lincoln-park.png" }) {
      id
      childImageSharp {
        fixed(width: 200) {
          src
        }
      }
    }
  }
`
