import React from 'react'
import { Link } from 'gatsby'

import styles from './nav.module.css'

export function MainNav () {
  return (
    <nav className={styles.homeNav}>
      <Link to='/' className='accent-background'>
        <span>Home</span>
      </Link>
      <Link to='/blog/' className='accent-background'>
        <span>Blog</span>
      </Link>
      <Link to='/work/' className='accent-background'>
        <span>Work</span>
      </Link>
      <Link to='/projects/' className='accent-background'>
        <span>Projects</span>
      </Link>
    </nav>
  )
}
