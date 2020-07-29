import React from 'react'
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from 'gatsby'

import HomeLayout from '../layouts/home'
import SEO from '../components/seo'
import styles from './index.module.css'
import { HomeNav } from '../components/nav'


const IndexPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      bannerProfile: file(relativePath: {eq: "banner-left.jpg"}) {
        id
        childImageSharp {
          fluid(maxHeight: 400, quality: 100) {
            ...GatsbyImageSharpFluid
            ...GatsbyImageSharpFluidLimitPresentationSize
          }
          fixed(height: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }

      recentPosts: allFile(
        filter: {sourceInstanceName: {eq: "posts"}},
        sort: {
          fields: childMarkdownRemark___frontmatter___date,
          order: DESC
        },
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

  const { recentPosts } = data
  return (
    <HomeLayout>
      <SEO title='Home' location={location} />
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerContents}>
            <h1>David Pierce</h1>
            <h2>Technical Product Manager</h2>
          </div>
        </div>
        <div className={styles.profileContainer}>
          <div className={styles.profile}>
            <div className={styles.profileImg}>
              <img
                src={data.bannerProfile.childImageSharp.fluid.src}
                alt='Profile of David Pierce'
              />
            </div>
            <div className={styles.profileCopy}>
              <h3>
                Husband - Father - Friend - Nerd
              </h3>
              <p className={`${styles.introStatement} accent-color display-font`}>
                I am a product manager and senior software engineer who thinks
                you should enjoy your software.
              </p>
              <p>
                I love building and creating solutions for real problems in the best
                way possible. For me, it is about context &amp; craft. Context means I
                like to be passionate about my work and mission. Craft means I am
                committed to doing things the right way with talented people.
              </p>
              <p>
                If you'd like to know more about me, feel free to glance at my{' '}
                <a href='/about/resume/'>resume</a>, my <a href='/work/'>past work</a>
                , or any <a href='/projects/'>side-projects</a> I happen to be working
                on. Otherwise, you can check out my <a href='/blog/'>blog</a> where I
                write about programming, project management, software I like, and life
                in general.
              </p>
            </div>
          </div>
          <HomeNav />
        </div>
      </div>
      <div className={styles.blogSample}>
        <h2>Latest Posts</h2>
        <ul>
          {recentPosts.edges.map(renderRecentPost)}
        </ul>
      </div>
    </HomeLayout>
  )
}

function renderRecentPost ({ node }) {
  const { slug, title } = node.childMarkdownRemark.frontmatter
  return (
    <li key={node.id}>
      <Link to={`/blog/${slug}`}>{title}</Link>
    </li>
  )
}

export default IndexPage
