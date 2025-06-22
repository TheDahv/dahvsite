import React from 'react'
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import HomeLayout from '../layouts/home'
import Seo from '../components/seo'
import * as styles from './index.module.css'

const IndexPage = ({ location }) => {
  const data = useStaticQuery(graphql`{
  talapusRiver: file(relativePath: {eq: "talapus-river-rocks.jpg"}) {
    id
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }
  face: file(relativePath: {eq: "face-lincoln-park.png"}) {
    id
    childImageSharp {
      gatsbyImageData(width: 200, placeholder: BLURRED, layout: FIXED)
    }
  }
  recentPosts: allFile(
    filter: {sourceInstanceName: {eq: "posts"}}
    sort: {childMarkdownRemark: {frontmatter: {date: DESC}}}
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
}`)


  const { face, recentPosts, talapusRiver } = data
  return (
    <HomeLayout>
      <Seo title='Home' location={location} />
      <div>
        <div className={styles.hero}>
          <GatsbyImage image={talapusRiver.childImageSharp.gatsbyImageData}
            backgroundColor={'#040e18'}
            alt="A river with rocks in the foreground and trees in the background"
            style={{ gridArea: "1/1", maxHeight: "30vh" }}
          />
          <div className={styles.headerContents}>
            <h1>
              Hi, my name is <nobr>David Pierce</nobr>
            </h1>
            <GatsbyImage
              image={face.childImageSharp.gatsbyImageData}
              alt='Profile of David Pierce'
            />
          </div>
        </div>
        <div className={styles.profileContainer}>
          <div>
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
  );
}

function renderRecentPost({ node }) {
  const { slug, title } = node.childMarkdownRemark.frontmatter
  return (
    <li key={node.id}>
      <Link to={`/blog/${slug}/`}>{title}</Link>
    </li>
  )
}

export default IndexPage
