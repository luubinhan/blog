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

import {PRIMARY_NAVIGATION} from '../data/data'
import profileImg from "../pages/images/profile.jpg"
import logo from "../pages/images/logo.png"

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
		const posts = get(this, "props.data.allMarkdownRemark.edges");  
		let navigationList = PRIMARY_NAVIGATION.map(item => {
			if (item.href === '/about') {
				item.isActive = true;
			}
			return item;
		})
		return (
			<div className="page-about">
				<Helmet
		          title="About luckyluu | FrontEnd Developer live in Ho Chi Minh City"
		          meta={[
		            { name: 'description', content: 'luckyluu FrontEnd Developer live in Ho Chi Minh City' },
		            { name: 'keywords', content: 'frontend,developer,wordpress,react,hochiminh,web-developer' },
		          ]}
	        	/>

				<Header location={this.props.location} logo={logo}>
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<Navigation items={navigationList} cssClass="navbar-nav primary-menu navbar-right" />
					</div>
				</Header>
	        	

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
					
					<div className="container">
						{this.state.selectedTab === 1 &&
							<div>
								Profile
							</div>
						}
						{this.state.selectedTab === 2 &&
							<div class="row">
								<div className="col-md-10 col-md-offset-1">
									<div className="tab-posts">
										
										{ posts.length && 
											<div className="card-list">
												{
													posts.map( (post, index) => {
												      if (post.node.path !== "/404/") {
												        const title = get(post, "node.frontmatter.title") || post.node.path;
												        return <Card key={index}
												        	title={title}
												        	desc={post.node.frontmatter.desc}
												        	href={post.node.frontmatter.path}
												        	tags={post.node.frontmatter.tags}
												        />							        
												      }
												    })
												}
											</div>
										}
										
									</div>
								</div>
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

export const aboutQuery = graphql`
  query aboutQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 3 ) {
      edges {
        node {          
          frontmatter {
          	path
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            desc
          }
        }
      }
    }
  }
`