import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PageHero from '../components/PageHero'
import Widget from '../components/Widget'
import Navigation from '../components/Navigation'

const MENU1 = [
	{
		name: 'Blog',
		href: '/blog'
	},
	{
		name: 'About Us',
		href: '/about'
	},
]

const MENU2 = [
	{
		name: 'Blog',
		href: '/blog'
	},
	{
		name: 'About Us',
		href: '/about'
	},
]

class Sitemap extends Component {

  render() {    
    return (
		<div className="page-sitemap">			
			<PageHero name="Sitemap" />
			
			<div className="row">
				<div className="col-md-4">
					<Widget title="Home" href="/">
						<Navigation items={MENU1} />
					</Widget>					
				</div>
				<div className="col-md-4">
					<Widget title="Portfolio" href="/portfolio">
						menu
					</Widget>
				</div>
				<div className="col-md-4">
					<Widget title="Services" href="/services">
						menu
					</Widget>
				</div>			
			</div>
		</div>
    )
  }
}

export default Sitemap;