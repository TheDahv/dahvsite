import React from 'react'
import { Helmet } from 'react-helmet'

import typography, { resumeTypography } from '../utils/typography'


export default function Typography() {
  return (
    <Helmet>
      <link href="//fonts.googleapis.com/css?family=Playfair+Display:400,400i,700|Roboto:400,400i,500,500i" rel="stylesheet" type="text/css"></link>
      <style type="text/css">{typography.createStyles()}</style>
    </Helmet>
  )
}

export function ResumeTypography() {
  return (
    <Helmet>
      <link href="//fonts.googleapis.com/css?family=Playfair+Display:400,400i,700|Roboto:400,400i,500,500i" rel="stylesheet" type="text/css"></link>
      <style type="text/css">{resumeTypography.createStyles()}</style>
    </Helmet>
  )
}
