import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

import './blog-post.scss'
import './markdown.scss'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const subTitle = this.props.data.site.siteMetadata.subtitle
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle} subtitle={subTitle} post={post.frontmatter}>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <article className='post-contents'>
          <section className='markdown-body' dangerouslySetInnerHTML={{ __html: post.html }} />
          <footer>
            <Bio />
          </footer>
        </article>

        <nav className='navigation'>
          <ul>
            <li className='prev'>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  <span>前の記事</span>
                  <span>{previous.frontmatter.title}</span>
                </Link>
              )}
            </li>
            <li className='next'>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  <span>次の記事</span>
                  <span>{next.frontmatter.title}</span>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        tags
      }
    }
  }
`
