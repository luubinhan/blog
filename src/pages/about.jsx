import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from "react-helmet"
import get from "lodash/get"
import {Nav,NavItem} from 'react-bootstrap'

import ProfileHero from "../components/ProfileHero"

import ContentPost from '../components/ContentPost'
import Card from '../components/Card'
import Header from '../components/Header'
import Navigation from '../components/Navigation'

import profileImg from "../pages/images/profile.jpg"

import {SITE_CONFIG} from '../config'

class About extends Component {
	constructor(props) {
		super(props);
		this.state ={
			selectedTab: 1,
		};

		this._handleSelect = this._handleSelect.bind(this);
	}
	_handleSelect(selectedKey) {
		this.setState({
			selectedTab: selectedKey
		})	  
	}
	render() {  		
		return (
			<div className="page-about">
				<Helmet
		          title="About luckyluu | FrontEnd Developer live in Ho Chi Minh City"
		          meta={[
		            { name: 'description', content: 'luckyluu FrontEnd Developer live in Ho Chi Minh City' },
		            { name: 'keywords', content: 'frontend,developer,wordpress,react,hochiminh,web-developer' },
		          ]}
      			/>

				
        		<div className="about-header">					
					<div className="medium-container">
						<ProfileHero name={SITE_CONFIG.companyName} position={SITE_CONFIG.tagLine} img={profileImg}>
							
								<br/>
								<table className="reset">
									<tr>
										<td>
											<div className="pr-30">
												<a href={SITE_CONFIG.linkedin} target="_blank"><i className="ion-social-linkedin-outline"></i><span className="pl-10 ">LinkedIn</span></a>
											</div>
										</td>
										<td><a href={SITE_CONFIG.twitter} target="_blank"><i className="ion-social-twitter-outline"></i><span className="pl-10 ">Twitter</span></a></td>
									</tr>
								</table>
								
						</ProfileHero>

						<Nav bsStyle="pills" activeKey={this.state.selectedTab} onSelect={this._handleSelect}>
						    <NavItem eventKey={1}>
						    	Vietnamese
						    </NavItem>
						    <NavItem eventKey={2}>
						    	English
						    </NavItem>						    
					  	</Nav>
					</div>			
				</div>
				<div className="about-body">
					
					<div className="container-fluid">
						{this.state.selectedTab === 1 &&
							<div>
								Profile
							</div>
						}
						{this.state.selectedTab === 2 &&
							<div>
								Not yet a successfull man, not try to be, just want to become a value man
							</div>
						}						
					</div>
				</div>
			</div>
		)
	}
}


export default About;