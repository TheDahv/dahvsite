import Img from 'gatsby-image'
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import PageLayout from '../layouts/page'
import styles from './projects.module.css'

export default function Projects ({ location }) {
  const data = useStaticQuery(graphql`
    query ProjectsIndex {
      allFile(filter: {sourceInstanceName: {eq: "projects"}}) {
        edges {
          node {
            id
            childMarkdownRemark {
              html
              frontmatter {
                title
                demo
                github
                screenshotUrl {
                  childImageSharp {
                    fluid(maxWidth: 1200) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                id
              }
            }
          }
        }
      }
    }
  `)

  return (
    <PageLayout title={'Projects'} location={location} wideLayout>
      {data.allFile.edges.map(renderProject)}
    </PageLayout>
  )
}

function renderProject ({ node }) {
  const { html, frontmatter } = node.childMarkdownRemark
  const { fluid } = frontmatter.screenshotUrl.childImageSharp

  return (
    <section className="project" key={node.id}>
      <h2>
        <a href={frontmatter.demo || frontmatter.github}>
          {frontmatter.title}
        </a>
      </h2>
      <hr />
      <div className={styles.information}>
        <div className={styles.screenshot}>
          <a href={frontmatter.demo || frontmatter.github}>
            <Img fluid={fluid} alt={frontmatter.title} />
          </a>
        </div>
        <div className={styles.description}>
          <div className={styles.links}>
            {frontmatter.demo ? <a href={frontmatter.demo}>[Demo]</a> : null}
            {frontmatter.github ? <a href={frontmatter.github}>[GitHub]</a> : null}
          </div>
          <div dangerouslySetInnerHTML={{ __html: html }}>
          </div>
        </div>
      </div>
    </section>
  )
}
