import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from "react-helmet"
import {Nav,NavItem} from 'react-bootstrap'

import ProfileHero from "../components/ProfileHero"
import profileImg from "../pages/images/profile.jpg"

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
						<ProfileHero name="LuckyLuu" position="FrontEnd Developer living in Ho Chi Minh City" desc="" img={profileImg}>
							Not yet a successfull man, not try to be, just want to become a value man
						</ProfileHero>

						<Nav bsStyle="pills" activeKey={this.state.selectedTab} onSelect={this._handleSelect}>
						    <NavItem eventKey={1}>
						    	Profile
						    </NavItem>
						    <NavItem eventKey={2}>
						    	Blog
						    </NavItem>
						    <NavItem eventKey={3}>
						    	Interested in working with me?
						    </NavItem>
					  	</Nav>
					</div>			
				</div>
				<div className="about-body">
					<div className="medium-container">					

						{this.state.selectedTab === 1 &&
							<div>
								Profile
							</div>
						}
						{this.state.selectedTab === 2 &&
							<div>
								Posts
							</div>
						}
						{this.state.selectedTab === 3 &&
							<div>
								Contact
							</div>
						}
					</div>
				</div>
			</div>
		)
	}
}


export default About;