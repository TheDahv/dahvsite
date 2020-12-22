import React from 'react'

import SEO from '../components/seo'
import Typography from '../components/Typography'
import styles from './resume.module.css'

export default function Resume ({ location }) {
  return (
    <>
      <Typography />
      <SEO title='Home' location={location} />
      <div className={styles.main}>
        <h1>Resume</h1>
      </div>
    </>
  )
}
