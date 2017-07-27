import React,{Component} from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import './HomeHero.scss'

class HomeHero extends Component{
	static propTypes = {
		/*
		Title
		 */
		title: PropTypes.string.isRequired,

		/*
		Description
		 */
		desc: PropTypes.string,

		/*
		Link href
		 */
		linkTo: PropTypes.string,

		/*
		Link title
		 */
		linkTitle: PropTypes.string,

		/*
		Action href
		 */
		actionTo: PropTypes.string,

		/*
		Action title
		 */
		actionTitle: PropTypes.string,		

		/*
		Image src
		 */
		img: PropTypes.string,
	}
	static defaultProps = {
		desc: '',
		linkTo: '',
		linkTitle: '',
		actionTo: '',
		actionTitle: '',
		img: null
	};

	constructor(props) {
		super(props);
	}

	render(){
		let {title, desc, linkTo, linkTitle, actionTo, actionTitle, img} = this.props;		
		return(
			<div className={"section home-hero hero-" + title.toLowerCase().trim().replace(' ','-') }>
			    <div className="inner">
			        <div className="js-height-full" style={{backgroundImage:`url(${img})`}}>			        	
		                <div className="home-text">
		                    <div className="home-wrap">
		                        <h1 className="hero-title">
		                            {title}
		                        </h1>

		                        {desc !== '' &&
			                        <div className="hero-desc">
			                            {desc}
			                        </div>
		                        }

		                        <div className="local-scroll">
		                        	{linkTo !== '' &&
		                            	<a href={linkTo} className="btn btn-primary">{linkTitle}</a>
		                            }

		                            {actionTo !== '' &&
		                            	<a href={actionTo} className="btn btn-default" target="_blank">{actionTitle}</a>
		                            }
		                        </div>
		                    </div>
		                </div>        
			        </div>
			    </div>
			</div>
		)
	}
}

export default HomeHero; 