import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

import './index.scss'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const subTitle = data.site.siteMetadata.subtitle
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle} subtitle={subTitle}>
        <SEO title="Home" />
        <div className='index'>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <article key={node.fields.slug} className='each-post'>
                <Link to={node.fields.slug}>
                  <h3>{title}</h3>
                  <section>
                    <p dangerouslySetInnerHTML={{__html: node.excerpt}} />
                  </section>
                  <small>{node.frontmatter.date}</small>
                  {node.frontmatter.tags ? <ul>{node.frontmatter.tags.map((tag, i) => <li key={'tag' + i}>{tag}</li>)}</ul> : false}
                </Link>
              </article>
            )
          })}
          <Bio />
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY/MM/DD")
            title
            tags
          }
        }
      }
    }
  }
`
