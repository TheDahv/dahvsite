import React from 'react'
import { Helmet } from 'react-helmet'
import { TypographyStyle, GoogleFont } from 'react-typography'

import typography, { resumeTypography } from '../utils/typography'

export default function Typography () {
  return (
    <Helmet>
      <TypographyStyle typography={typography} />
      <GoogleFont typography={typography} />
    </Helmet>
  )
}

export function ResumeTypography () {
  return (
    <Helmet>
      <TypographyStyle typography={resumeTypography} />
      <GoogleFont typography={resumeTypography} />
    </Helmet>
  )
}
