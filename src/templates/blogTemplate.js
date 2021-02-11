import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import PageLayout from '../layouts/page'

import styles from './blogTemplate.module.css'

export default function Template ({ data, location }) {
  const { face, markdownRemark } = data
  const { frontmatter, html, timeToRead, wordCount } = markdownRemark

  const img = frontmatter.ogimage
    ? frontmatter.ogimage.childImageSharp.fixed.src
    : face.childImageSharp.fixed.src
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
              {`${wordCount.words} words (${timeToRead} minutes)`}
            </span>
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
        ogimage {
          childImageSharp {
            fixed {
              src
            }
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
