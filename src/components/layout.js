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
          <div>
            <div className='logo'></div>
            <h1><Link to={`/`}>{title}</Link></h1>
          </div>
        </header>
      )
    } else {
      header = (
        <header className='header-blog-post'>
          <div>
            <div className='logo'></div>
            <h3><Link to={`/`}>{title}</Link></h3>
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
            &copy; {new Date().getFullYear()} Akane
          </small>
        </footer>
      </div>
    )
  }
}

export default Layout
