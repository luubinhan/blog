import React from "react"
import Link from "gatsby-link"
import Helmet from 'react-helmet'

import "../styles/main.scss"
import Header from "../components/Header"
import Footer from "../components/Footer"
import {SITE_CONFIG} from '../config'
import {PRIMARY_NAVIGATION} from '../data/data'

import logo from '../pages/images/logo.png'

require('../css/prism.css')

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.checkActive = this.checkActive.bind(this);
  }

  componentDidMount() {    
        
    this.checkActive(location.pathname);   
  }
  componentWillReceiveProps(nextProps) {
    this.checkActive(nextProps.location.pathname);
  }
  
  checkActive(path){
    // Update primary navigation
    PRIMARY_NAVIGATION.forEach( function(objectItem){      
      
      if (objectItem.href === location.pathname) {
        
        objectItem.isActive = true;
      } else {
        objectItem.isActive = false;
      }
    });
  }

  render() {
    const { location, children } = this.props    
    return (     
      <div>     
        <Helmet
            title="About luckyluu | FrontEnd Developer live in Ho Chi Minh City"
            meta={[
              { name: 'description', content: 'luckyluu FrontEnd Developer live in Ho Chi Minh City' },
              { name: 'keywords', content: 'frontend,developer,wordpress,react,hochiminh,web-developer' },
            ]}
        />
          
        <Header location={this.props.location} items={PRIMARY_NAVIGATION} logo={logo}  />
           
        {children()}
            
        
        <Footer email={SITE_CONFIG.email} phone={SITE_CONFIG.phone} companyName={SITE_CONFIG.companyName} showSiteMap={false} />
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