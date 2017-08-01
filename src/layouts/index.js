import React from "react"
import Link from "gatsby-link"
import Helmet from 'react-helmet'

import "../styles/main.scss"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Navigation from "../components/Navigation"
import {SITE_CONFIG} from '../config'
import {PRIMARY_NAVIGATION} from '../data/data'

import logo from '../pages/images/logo.png'
const sideBg = "http://demo.stylishthemes.co/graceunderpressure/fashion/wp-content/uploads/sites/5/2015/07/1-UoXkeOANslPv43IXpClomw.jpeg";

require('../css/prism.css')

class Template extends React.Component {
  constructor(props) {
    super(props);
  
  }

  componentDidMount() {    
    
  }
  componentWillReceiveProps(nextProps) {

  }

  render() {
    const { location, children } = this.props    
    return (     
      <div className="layout-blog">     
        <Helmet
            title="About luckyluu | FrontEnd Developer live in Ho Chi Minh City"
            meta={[
              { name: 'description', content: 'luckyluu FrontEnd Developer live in Ho Chi Minh City' },
              { name: 'keywords', content: 'frontend,developer,wordpress,react,hochiminh,web-developer' },
            ]}
        />
          
       
          <div className="sidebar">
            <div className="inner">
              <Link to={'/'} className="go-home">
                <img src={logo} alt={SITE_CONFIG.companyName}/>
              </Link>
              <Navigation items={PRIMARY_NAVIGATION} cssClass="primary-menu" />              
            </div>
            <Footer email={SITE_CONFIG.email} phone={SITE_CONFIG.phone} companyName={SITE_CONFIG.companyName} showSiteMap={false} />
          </div>
          <div className="master">
            <div className="inner">
              {children()}
            </div>
          </div>
          <div className="aside" style={{backgroundImage: `url(${sideBg})`}}>
            <div className="inner">
              
            </div>
          </div>
      </div>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.function,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template