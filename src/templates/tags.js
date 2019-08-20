import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import './tags.scss'

class Tags extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const subTitle = this.props.data.site.siteMetadata.subtitle
    const { posts, tagName } = this.props.pageContext

    if (posts) {
      const count = posts.length
      return (
        <Layout location={this.props.location} title={siteTitle} subtitle={subTitle}>
          <SEO title={tagName} description={tagName} />
          <div className='tag'>
            <div className='tag-title'>
              <span><Link to={'/tags'}>タグ一覧</Link></span>
              <span><Link to={'/tags'}>{tagName}</Link></span>
              <span><Link to={'/tags'}>{count}</Link></span>
            </div>
            <ul>
              {posts.map((each, i) => {
                const tagList = each.frontmatter.tags ? each.frontmatter.tags.map((tag, j) => {
                  const className = tag === tagName ? 'active' : ''
                  return <li key={'tag' + j} className={className}>{tag}</li>
                }) : false
                return (
                  <li key={'post' + i} className='tag'>
                    <Link to={each.fields.slug}>
                      {each.frontmatter.title}
                      {each.frontmatter.date}
                      {tagList ? <ul>{tagList}</ul> : false}
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
}

export default Tags

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
