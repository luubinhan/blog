import React from 'react';
import PropTypes from 'prop-types';
import Link from "gatsby-link"

class Li extends React.Component{
	static propTypes = {
		href: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		hasChildren: PropTypes.bool,
		isActive: PropTypes.bool,
	}
	static defaultProps = {
		hasChildren: false
	}
	constructor(props) {
		super(props);
	}
		
	render(){
		let {href,name,hasChildren, isActive} = this.props;
		let classLi = hasChildren ? 'dropdown':'';
		if (isActive) {
			classLi = classLi + ' current-menu-item';
		}		 
		return(
			<li className={classLi}>
				
				{ hasChildren ? 
					<a href={href} className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
						{name}
						<span className="caret"></span>
					</a>
					:
					<Link to={href}>
						{name}			
					</Link>	
				}
				
			</li>		
		);
	}
}

export default Li;