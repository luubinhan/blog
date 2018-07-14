import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import './PageHero.scss';

class PageHero extends Component{

	static propTypes = {
		title: PropTypes.string,
		desc: PropTypes.string,
	}
	static defaultProps = {
	  title: '',
	  desc: '',
	};

	constructor(props) {
		super(props);
	}


	render(){
		let {title, desc} = this.props;
		return(			
			<div className={"page-hero hero-" + title }>
			
				{title!=='' &&
	            <h3 className="hero-title">
	            	<span>               
	            	{title}
	            	</span>     
	            </h3> 
	            }
				{this.props.children}
	            {desc!=='' &&
	            	<div className="hero-description">
	              		{desc}
	            	</div>
	            }
	            
			</div>		
		);
	}
}

export default PageHero;