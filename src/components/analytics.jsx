import React from 'react'
import { Helmet } from 'react-helmet'

const ga = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-9JL78Q8D3E');
`;

export function GoogleAnalytics () {
  return (
    <Helmet>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-9JL78Q8D3E" />
      <script>{ga}</script>
    </Helmet>
  )
}
