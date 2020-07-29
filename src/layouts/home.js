import React from 'react'
import PropTypes from 'prop-types'

export default function HomeLayout ({ children }) {
  return (
    <div id='home'>
      {children}
    </div>
  )
}

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired
}
