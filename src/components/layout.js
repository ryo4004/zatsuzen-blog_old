import React from "react"
import { Link } from "gatsby"

import './reset.scss'
import './layout.scss'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <header className='header-index'>
          <h1><Link to={`/`}>{title}</Link></h1>
        </header>
      )
    } else {
      header = (
        <header className='header-blog-post'>
          <h3><Link to={`/`}>{title}</Link></h3>
        </header>
      )
    }
    return (
      <div className='layout'>
        <header>{header}</header>
        <main className='contents'>{children}</main>
        <footer>
          &copy; {new Date().getFullYear()} Akane
        </footer>
      </div>
    )
  }
}

export default Layout
