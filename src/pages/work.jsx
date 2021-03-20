import Img from 'gatsby-image'
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import PageLayout from '../layouts/page'
import styles from './work.module.css'

export default function Work ({ location }) {
  const data = useStaticQuery(graphql`
    query WorkIndex {
      allFile(
        filter: {sourceInstanceName: {eq: "work"}},
        sort: {fields: name} 
      ) {
        edges {
          node {
            id
            childMarkdownRemark {
              html
              frontmatter {
                title
                linkUrl
                id
                screenshotUrl {
                  childImageSharp {
                    fluid(maxWidth: 1200) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <PageLayout title={'Work'} location={location} wideLayout>
      {data.allFile.edges.map(renderWork)}
    </PageLayout>
  )
}

function renderWork ({ node }) {
  const { html, frontmatter: work } = node.childMarkdownRemark
  const { fluid } = work.screenshotUrl.childImageSharp

  return (
    <section key={node.id}>
      <h2>
        <a href={work.linkUrl} target="_blank" rel="noreferrer">
          {work.title}
        </a>
      </h2>
      <hr />
      <div className={styles.information}>
        <div className={styles.screenshot}>
          <a href={work.linkUrl} target="_blank" rel="noreferrer">
            <Img fluid={fluid} alt={work.title} />
          </a>
        </div>
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: html }}>
        </div>
      </div>
    </section>
  )
}
