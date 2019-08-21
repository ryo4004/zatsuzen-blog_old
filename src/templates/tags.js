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
              <span className='tag-name'><Link to={'/tags/' + tagName}>{tagName}</Link></span>
              <span className='count'>{count}件</span>
              <span className='link'><Link to={'/tags'}>タグ一覧</Link></span>
            </div>
            <ul>
              {posts.map((each, i) => {
                const tagList = each.frontmatter.tags ? each.frontmatter.tags.map((tag, j) => {
                  const className = tag === tagName ? 'active' : ''
                  return <li key={'tag' + j} className={className}><Link to={'/tags/' + tag}>{tag}</Link></li>
                }) : false
                return (
                  <li key={'post' + i} className='tag'>
                    <Link to={each.fields.slug}>
                      <h3>{each.frontmatter.title}</h3>
                      <small>{each.frontmatter.date}</small>
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
