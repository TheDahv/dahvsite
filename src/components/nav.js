import React from 'react'
import { Link } from 'gatsby'

import * as styles from './nav.module.css'

export function MainNav() {
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
    </nav>
  )
}
