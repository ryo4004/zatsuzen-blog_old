import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import './404.scss'

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="ページがみつかりません" />
        <div className='not-found'>
          <h1>ページがみつかりません</h1>
          <div className='status-code'>404</div>
          <div className='status-message'>Not Found</div>
          <p><Link to='/'>Home</Link></p>
        </div>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
