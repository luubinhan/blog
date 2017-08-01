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

import bg1 from '../pages/images/bg1.jpg'
import bg4 from '../pages/images/bg4.jpg'


require('../css/prism.css')

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBg: ''
    }
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  componentDidMount() {
    let checkNumber = this.getRandomArbitrary(0,1);
    let bgArray = [];
    let newBg = bgArray[checkNumber];

    this.setState({
      sideBg: newBg
    })
  }
  componentWillReceiveProps(nextProps) {

  }

  render() {
    const { location,children,sideBg } = this.props    
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
          <div className="aside" style={{backgroundImage: `url(${bg4})`}}>
            <div className="inner">
              
            </div>
          </div>
      </div>
    )
  }
}

Template.propTypes = {  
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template