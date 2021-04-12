import React from 'react'
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

import HomeLayout from '../layouts/home'
import SEO from '../components/seo'
import styles from './index.module.css'

const IndexPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      talapusRiver: file(relativePath: { eq: "talapus-river-rocks.jpg" }) {
        id
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
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

      recentPosts: allFile(
        filter: { sourceInstanceName: { eq: "posts" } }
        sort: { fields: childMarkdownRemark___frontmatter___date, order: DESC }
        limit: 5
      ) {
        edges {
          node {
            id
            childMarkdownRemark {
              frontmatter {
                title
                slug
              }
            }
          }
        }
      }
    }
  `)

  const { face, recentPosts, talapusRiver } = data
  return (
    <HomeLayout>
      <SEO title='Home' location={location} />
      <div className={styles.main}>
        <BackgroundImage
          Tag='section'
          className={styles.header}
          fluid={talapusRiver.childImageSharp.fluid}
          backgroundColor={'#040e18'}
        >
          <div className={styles.headerContents}>
            <h1>
              Hi, my name is <nobr>David Pierce</nobr>
            </h1>
            <h2>
              I'm a <nobr>technical product manager</nobr> and{' '}
              <nobr>software engineer</nobr> who thinks you should enjoy{' '}
              <nobr>your software</nobr>
            </h2>
            <img
              src={face.childImageSharp.fixed.src}
              alt='Profile of David Pierce'
            />
          </div>
        </BackgroundImage>
        <div className={styles.profileContainer}>
          <div className={styles.profile}>
            <div className={styles.profileCopy}>
              <h3>Husband - Father - Friend - Nerd</h3>
              <p>
                I love building and creating solutions for real problems in the
                best way possible. For me, it is about context &amp; craft.
                Context means I like to be passionate about my work and mission.
                Craft means I am committed to doing things the right way with
                talented people.
              </p>
              <p>
                If you'd like to know more about me, feel free to glance at my{' '}
                <Link to='/resume/'>resume</Link>, my{' '}
                <Link to='/work/'>past work</Link>, or any{' '}
                <Link to='/projects/'>side-projects</Link> I happen to be
                working on. Otherwise, you can check out my{' '}
                <Link to='/blog/'>blog</Link> where I write about programming,
                project management, software I like, and life in general.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.blogSample}>
        <h3>Latest Posts</h3>
        <ul>{recentPosts.edges.map(renderRecentPost)}</ul>
      </div>
      <div className={styles.profileContainer}>
        <p>
          Thanks to{' '}
          <a
            href='https://www.soundrootsphotography.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Sound Roots Photography
          </a>
          , to whom the credit belongs for my profile photo.
        </p>
      </div>
    </HomeLayout>
  )
}

function renderRecentPost ({ node }) {
  const { slug, title } = node.childMarkdownRemark.frontmatter
  return (
    <li key={node.id}>
      <Link to={`/blog/${slug}/`}>{title}</Link>
    </li>
  )
}

export default IndexPage
