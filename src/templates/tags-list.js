import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import './tags-list.scss'

class TagsList extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const subTitle = this.props.data.site.siteMetadata.subtitle
    const { tags } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle} subtitle={subTitle}>
        <SEO title={'タグ一覧'} description={'タグ一覧ページ'} />
        <div className='tags-list'>
          <ul>
            {tags.map((tag, i) => {
              return (
                <li key={'tag' + i}>
                  <Link to={'/tags/' + tag}>
                    {tag}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </Layout>
    )
  }
}

export default TagsList

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
  }
`
