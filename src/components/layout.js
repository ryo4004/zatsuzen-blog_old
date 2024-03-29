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
      // index page
      header = (
        <header className='header'>
          <div className='header-index'>
            <h1><Link to={`/`}>{title}</Link></h1>
            <h2>{subtitle}</h2>
          </div>
        </header>
      )
    } else if (post) {
      // post page
      const date = post.update ? post.update : post.date
      const tagList = post.tags ? <ul className='tags'>{post.tags.map((tag, i) => <li key={'tag' + i}><Link to={'/tags/' + tag}>{tag}</Link></li>)}</ul> : false
      header = (
        <header className='header'>
          <div className='header-blog-post'>
            <h3><Link to={`/`}>{title}</Link></h3>
            <h1>{post.title}</h1>
            <div className='post-date'>{date}</div>
            {tagList}
          </div>
        </header>
      )
    } else {
      // tag page
      header = (
        <header className='header'>
          <div className='header-tags'>
            <h1><Link to={`/`}>{title}</Link></h1>
            <h2>{subtitle}</h2>
          </div>
        </header>
      )
    }
    return (
      <div className='layout'>
        <header>{header}</header>
        <main className='contents'>{children}</main>
        <footer>
          <div>
            <div className='home'><Link to='/'>{title}</Link></div>
            <small>
              &copy; <a href='https://zatsuzen.com'>{new Date().getFullYear()} Akane</a>
            </small>
          </div>
        </footer>
      </div>
    )
  }
}

export default Layout
