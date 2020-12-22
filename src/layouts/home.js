import React from 'react'
import PropTypes from 'prop-types'

import Typography from '../components/Typography'

export default function HomeLayout ({ children }) {
  return (
    <>
      <Typography />
      <div id='home'>
        {children}
      </div>
    </>
  )
}

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired
}
