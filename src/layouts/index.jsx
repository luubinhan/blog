import React from 'react'
import Helmet from 'react-helmet'
import Link from "gatsby-link"
import {camelCase, isEmpty} from 'lodash'
import {IoSocialNodejs, IoSocialJavascript, IoSocialWordpress, IoSocialHtml5, IoAndroidCompass, IoAndroidSend} from 'react-icons/lib/io'

import config from '../../data/SiteConfig'
import {PrimaryNav} from '../../data'
import '../styles/main.scss'
import '../styles/primaryMenu.scss'
import './css/footer.scss'

import logo from '../../static/logos/logo.png'


export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /*
      Collapse state of menu for SP
       */
      collapsed: true 
    }
    this.onClickNavbar = this.onClickNavbar.bind(this)
    this.handleNavClick = this.handleNavClick.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps)) {
      this.setState({collapsed: true})
    }
  }
  /*
  Toggle menu for SP
   */
  onClickNavbar(){
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  getLocalTitle() {
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
    const pathPrefix = config.pathPrefix ? config.pathPrefix : '/'
    const currentPath = this.props.location.pathname
      .replace(pathPrefix, '')
      .replace('/', '')
    let title = ''
    if (currentPath === '') {
      title = 'Trang Chủ'
    } else if (currentPath === 'tags/') {
      title = 'Thẻ'
    } else if (currentPath === 'categories/') {
      title = 'Danh mục'
    } else if (currentPath === 'about/') {
      title = 'Giới thiệu'
    } else if (currentPath.includes('posts')) {
      title = 'Bài viết'
    } else if (currentPath.includes('tags/')) {
      const tag = currentPath
        .replace('tags/', '')
        .replace('/', '')
        .replace('-', ' ')
      title = `Được gắn thẻ ${capitalize(tag)}`
    } else if (currentPath.includes('categories/')) {
      const category = currentPath
        .replace('categories/', '')
        .replace('/', '')
        .replace('-', ' ')
      title = `${capitalize(category)}`
    }
    return title
  }
  /*
  Hide menu when click on link for SP
   */
  handleNavClick(){
    this.setState({
      collapsed: !this.state.collapsed
    })  
  }
  renderIcon = (name) => {
    switch (name) {
      case 'nodejs':
        return <IoSocialNodejs />;
      case 'javascript':
        return <IoSocialJavascript />;
      case 'wordpress':
        return <IoSocialWordpress />
      case 'html5':
        return <IoSocialHtml5 />
      case 'compass':
        return <IoAndroidCompass />
      case 'send':
        return <IoAndroidSend />
      default:
        return null;
    }
  }
  render() {
    const { children } = this.props;
    const {collapsed} = this.state;
    const primaryNav = PrimaryNav.map((item) => (
      <li key={item.name} className={camelCase(item.name)}>
        <Link to={item.href} activeClassName="active">
          {item.icon !== '' &&
            this.renderIcon(item.icon)
          }
          {item.name}
        </Link>	
      </li>
    ));
    return (
      <div className="layout-blog">
        <Helmet>
          <title>{`${config.siteTitle} |  ${this.getLocalTitle()}`}</title>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        <div className="sidebar">
          <div className="inner">
            <Link to={'/'} className="go-home">
              <img src={logo} alt={config.siteTitleAlt} />
            </Link>
            <button
              type="button"
              aria-expanded="false"
              className={`navbar-toggle ${collapsed ? "collapsed" : ''}`}
              onClick={this.handleNavClick}
              aria-label='nav'
            >
              <div className="hamburger hamburger-1">
                <span className="line" />
                <span className="line" />
                <span className="line" />
              </div>
            </button>
            <div className="navigation-component">
              <ul className={`nav primary-menu ${collapsed ? "collapsed" : ''}`}>
                {primaryNav}
              </ul>
            </div>
          </div>
          <div id="footer">
            <footer className="footer">
              <section className="footer-inner">
                <div className="credit">
                  {config.copyright}
                  <div>
                    picture credit <a href="https://unsplash.com" rel='noopener noreferrer' target="_blank">unsplash.com</a>
                  </div>
                </div>
              </section>
            </footer>
          </div>
        </div>
        {children()}
      </div>
    )
  }
}
