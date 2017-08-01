import React from 'react';
import PropTypes from 'prop-types'
import Link from "gatsby-link"
import camelCase from 'lodash/camelCase'

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
		let {href,name,hasChildren, isActive, icon} = this.props;
		let classLi = hasChildren ? 'dropdown':'';
		if (isActive) {
			classLi = classLi + ' current-menu-item';
		}		 
		return(
			<li className={camelCase(name)}>
				
				{ hasChildren ? 
					<a href={href} className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
						{name}
						<span className="caret"></span>
					</a>
					:
					<Link to={href} activeClassName="active" >
						{	icon !== '' &&
							<i className={icon}></i>
						}
						{name}			
						
					</Link>	
				}
				
			</li>		
		);
	}
}

export default Li;