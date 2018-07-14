import React from "react"
import Link from "gatsby-link"
import Helmet from 'react-helmet'

import "../styles/main.scss"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Navigation from "../components/Navigation"

import {PRIMARY_NAVIGATION, SITE_CONFIG} from '../data'

import logo from '../pages/images/logo.png'

class Template extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      /*
      Collapse state of menu for SP
       */
      collapsed: true 
    } 
    this._onClickNavbar = this._onClickNavbar.bind(this)
    this._handleNavClick = this._handleNavClick.bind(this)
  }
  
  /*
  Toggle menu for SP
   */
  _onClickNavbar(){
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  
  /*
  Hide menu when click on link for SP
   */
  _handleNavClick(){
    this.setState({
      collapsed: !this.state.collapsed
    })  
  }

  render() {
    let {collapsed} = this.state;    
    const {location,children} = this.props;
    return (     
      <div className="layout-blog">     
        <Helmet
            title={`About ${SITE_CONFIG.companyName} | ${SITE_CONFIG.tagLine}`}
            meta={[
              { name: 'description', content: `${SITE_CONFIG.companyName} ${SITE_CONFIG.tagLine}` },
              { name: 'keywords', content: 'frontend,developer,wordpress,react,hochiminh,web-developer' },
            ]}
        />
          
       
          <div className="sidebar">
            <div className="inner">

              <Link to={'/'} className="go-home">
                <img src={logo} alt={SITE_CONFIG.companyName}/>
              </Link>
              <button type="button" className={"navbar-toggle " + (collapsed ? "collapsed" : "") } onClick={this._onClickNavbar} aria-expanded="false">
                <div className="hamburger hamburger-1">
                  <span className="line"></span>
                  <span className="line"></span>
                  <span className="line"></span>
                </div>
              </button>
              <Navigation handleClick={this._handleNavClick} items={PRIMARY_NAVIGATION} cssClass={"primary-menu " + (collapsed ? "collapsed" : "") } />              
            </div>
            <Footer email={SITE_CONFIG.email} phone={SITE_CONFIG.phone} companyName={SITE_CONFIG.companyName} showSiteMap={false} />
          </div>
          
              {children()}
            
      </div>
    )
  }
}

Template.propTypes = {  
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template