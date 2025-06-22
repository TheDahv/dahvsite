import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import * as styles from './footer.module.css'

export default function Footer() {
  const data = useStaticQuery(graphql`
    query {
      icons: allFile(
        filter: {
          sourceInstanceName: {eq: "images"},
          extension: {eq: "svg"},
          relativeDirectory: {eq: "icons"}
        }
      ) {
        nodes {
          id
          name
          publicURL
        }
      }
    }
  `);

  const icons = data.icons.nodes.reduce((memo, { name, publicURL }) => ({
    ...memo,
    [name]: publicURL,
  }), {})

  return (
    <footer className={styles.root}>
      <div className={styles.social}>
        <a href="https://twitter.com/thedahv">
          <img src={icons.twitter} alt="Twitter logo" />
        </a>
        <a href="https://instagram.com/thedahv">
          <img src={icons.instagram} alt="Instagram logo" />
        </a>
        <a href="https://github.com/thedahv">
          <img src={icons.github} alt="GitHub logo" />
        </a>
        <a href="http://gitlab.com/thedahv">
          <img src={icons.gitlab} alt="Gitlab logo" />
        </a>
      </div>
      <p>David Pierce</p>
      <p>Copyright {new Date().getFullYear()}. All rights reserved.</p>
    </footer>
  );
}
