import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import PageLayout from '../layouts/page'

import * as styles from './blogTemplate.module.css'

export default function Template({ data, location }) {
  const { face, markdownRemark } = data
  const { frontmatter, html, timeToRead, wordCount } = markdownRemark

  const img = frontmatter.ogimage
    ? frontmatter.ogimage.childImageSharp.gatsbyImageData.src
    : face.childImageSharp.gatsbyImageData.src
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
    content: img
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
            <span className={styles.postDate}>
              {frontmatter.date} &ndash;{' '}
              {`${wordCount.words.toLocaleString()} words (${timeToRead} minutes)`}
            </span>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        </main>
      </PageLayout>
    </>
  )
}

export const pageQuery = graphql`query ($slug: String!) {
  markdownRemark(frontmatter: {slug: {eq: $slug}}) {
    html
    frontmatter {
      categories
      date(formatString: "dddd, MMMM D yyyy")
      ogimage {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, layout: FIXED)
        }
      }
      slug
      title
      summary
    }
    timeToRead
    wordCount {
      words
    }
  }
  face: file(relativePath: {eq: "face-lincoln-park.png"}) {
    id
    childImageSharp {
      gatsbyImageData(width: 200, placeholder: BLURRED, layout: FIXED)
    }
  }
}`
