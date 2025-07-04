import React from 'react'

import Layout from '../components/layout'
import Seo from '../components/seo'

const NotFoundPage = ({ location }) => (
  <Layout>
    <Seo title='404: Not found' location={location} />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage
