import React from "react"
import { Link } from "gatsby"

import './reset.scss'
import './layout.scss'

class Layout extends React.Component {
  render() {
    const { location, title, subtitle, post, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <header className='header'>
          <div className='header-index'>
            <h1><Link to={`/`}>{title}</Link></h1>
            <h2>{subtitle}</h2>
          </div>
        </header>
      )
    } else if (post) {
      const tagList = post.tags ? <ul className='tags'>{post.tags.map((tag, i) => <li key={'tag' + i}>{tag}</li>)}</ul> : false
      header = (
        <header className='header'>
          <div className='header-blog-post'>
            <h3><Link to={`/`}>{title}</Link></h3>
            {/* <h4>{subtitle}</h4> */}
            <h1>{post.title}</h1>
            <div className='post-date'>{post.date}</div>
            {tagList}
          </div>
        </header>
      )
    }
    return (
      <div className='layout'>
        <header>{header}</header>
        <main className='contents'>{children}</main>
        <footer>
          <small>
            &copy; <a href='https://zatsuzen.com'>{new Date().getFullYear()} Akane</a>
          </small>
        </footer>
      </div>
    )
  }
}

export default Layout
