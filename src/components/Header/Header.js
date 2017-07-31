import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import 'animate.css'

import Navigation from '../Navigation'

import './Header.scss'

class Header extends React.Component{ 
	
	static propTypes ={		

		/*
		Logo link
		 */
		logo: PropTypes.string,

		siteName: PropTypes.string,

		navigationList: PropTypes.array,
	}

	static defaultProps = {
	  logo: '',	  
	  siteName: '',	  
	  navigationList: null
	}

	constructor(props) {
		super(props);	
		this.state = {
			collapsed: true	
		}		
		this._onClickNavbar = this._onClickNavbar.bind(this)
	}
	
	componentDidMount() {
	
	}
	_onClickNavbar(){
		this.setState({
			collapsed: !this.state.collapsed
		})
	}

	render() {
		let {collapsed} = this.state;
		let {navigationList} = this.props;

		return(
			<div id="header" className="componentHeader">
				<header className="header">
					<div className="header-inner">	
						<nav className="navbar navbar-default main-nav-wrap navbar-static-top">
							<div className="container">	
								<div className="container-inner">
										<div className="navbar-header">
											<button type="button" className={"navbar-toggle " + (collapsed ? "collapsed" : "") } onClick={this._onClickNavbar} data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
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

										{navigationList &&
											<div className={"collapse navbar-collapse animated " + (collapsed ? "": "in fadeIn") } id="bs-example-navbar-collapse-1" >
												<Navigation items={navigationList} cssClass="navbar-nav primary-menu navbar-right" />
											</div>
										}
										{this.props.children}										
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