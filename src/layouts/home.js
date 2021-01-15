import React from 'react'
import PropTypes from 'prop-types'

import Footer from '../components/footer'
import Typography from '../components/Typography'
import { GoogleAnalytics } from '../components/analytics'

export default function HomeLayout ({ children }) {
  return (
    <>
      <GoogleAnalytics />
      <Typography />
      <div id='home'>
        {children}
      </div>
      <Footer />
    </>
  )
}

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired
}
