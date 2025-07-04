import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'gatsby'

import * as styles from './header.module.css'
import { MainNav } from '../components/nav'

const Header = ({ siteTitle = '' }) => (
  <header>
    <div className={styles.title}>
      <h1>
        <Link to='/'>
          <span>{siteTitle}</span>
          <span className={styles.titleTag}> Technical Product Manager</span>
        </Link>
      </h1>
    </div>
    <MainNav />
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

export default Header
