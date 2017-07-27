import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import Navigation from '../Navigation'

import './Header.scss'

class Header extends React.Component{ 
	
	static propTypes ={

		/*
		current location
		*/
		location: PropTypes.object.isRequired,  

		/*
		link items
		*/
		items: PropTypes.array,

		/*
		Logo link
		 */
		logo: PropTypes.string,

		siteName: PropTypes.string,
	}

	static defaultProps = {
	  logo: '',	  
	  siteName: '',	  
	}

	constructor(props) {
		super(props);
		this.state = {
			navigationItems: this.props.items,
		}			
	}
	
	componentDidMount() {
	
	}

	render() {
		return(
			<div id="header" className="componentHeader">
				<header className="header">
					<div className="header-inner">	
						<nav className="navbar navbar-default main-nav-wrap navbar-static-top">
							<div className="container">	
								<div className="container-inner">
										<div className="navbar-header">
											<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
												<div className="hamburger hamburger-1">
													<span className="line"></span>
													<span className="line"></span>
													<span className="line"></span>
												</div>
											</button>
										
											<Link to={'/'} className="navbar-brand">
												<img src={this.props.logo} alt={this.props.siteName}/>
											</Link>
										</div>
										{
											this.state.navigationItems.length !== 0 &&
											<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
												<Navigation items={this.state.navigationItems} cssClass="navbar-nav primary-menu navbar-right" />
											</div>
										}										
								</div>
							</div>
						</nav>
					</div>
				</header>
			</div>
		)
	}
}

export default Header;