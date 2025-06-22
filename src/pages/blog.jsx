import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import PageLayout from '../layouts/page'
import * as styles from './blog.module.css';

export default function Blog({ location }) {
  const data = useStaticQuery(graphql`
    query PostsIndex {
      allFile(
        filter: {sourceInstanceName: {eq: "posts"}},
        sort: {childMarkdownRemark: { frontmatter: { date: DESC } } }
      ) {
        edges {
          node {
            id
            childMarkdownRemark {
              id
              wordCount {
                words
              }
              frontmatter {
                title
                summary
                date(formatString: "dddd, MMMM D yyyy")
                slug
              }
              timeToRead
            }
          }
        }
      }
    }
  `);

  return (
    <PageLayout title={'Blog'} location={location}>
      {data.allFile.edges.map(renderPostLink)}
    </PageLayout>
  )
}

function renderPostLink({ node }) {
  const {
    frontmatter,
    timeToRead,
    wordCount,
  } = node.childMarkdownRemark
  return (
    <article className={styles.postLink} key={frontmatter.slug}>
      <Link to={`/blog/${frontmatter.slug}/`}>
        <h2>{frontmatter.title}</h2>
      </Link>
      <p className={styles.postLinkDate}>
        {frontmatter.date} - {wordCount.words.toLocaleString()} words ({timeToRead} minutes)
      </p>
      <p>{frontmatter.summary}</p>
    </article>
  )
}
