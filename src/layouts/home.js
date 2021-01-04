import React from 'react'
import PropTypes from 'prop-types'

import Footer from '../components/footer'
import Typography from '../components/Typography'

export default function HomeLayout ({ children }) {
  return (
    <>
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
