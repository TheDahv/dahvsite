import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import PageLayout from '../layouts/page'
import * as styles from './work.module.css'

export default function Work({ location }) {
  const data = useStaticQuery(graphql`query WorkIndex {
  allFile(filter: {sourceInstanceName: {eq: "work"}}, sort: {name: ASC}) {
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
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }
  }
}`)

  return (
    <PageLayout title={'Work'} location={location} wideLayout>
      {data.allFile.edges.map(renderWork)}
    </PageLayout>
  )
}

function renderWork({ node }) {
  const { html, frontmatter: work } = node.childMarkdownRemark
  const { gatsbyImageData } = work.screenshotUrl.childImageSharp

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
            <GatsbyImage image={gatsbyImageData} />
          </a>
        </div>
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: html }}>
        </div>
      </div>
    </section>
  )
}
