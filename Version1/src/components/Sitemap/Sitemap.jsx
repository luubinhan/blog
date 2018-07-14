import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import './Sitemap.scss';

class Sitemap extends Component{

	static propTypes = {
		name: PropTypes.string,
		desc: PropTypes.string,
	}
	static defaultProps = {
	  name: '',
	  desc: '',
	};

	constructor(props) {
		super(props);
	}


	render(){
		let {name, desc} = this.props;
		return(			
			<div className="page-hero">
			
				{name!=='' &&
	            <h3 className="hero-title">                
	            	{name}    
	            </h3> 
	            }

	            {desc!=='' &&
	            	<div className="hero-description">
	              		{desc}
	            	</div>
	            }
			</div>		
		);
	}
}

export default Sitemap;