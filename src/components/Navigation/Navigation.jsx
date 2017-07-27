import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import Li from '../Li'

class Navigation extends React.Component{
	static propTypes ={
		items: PropTypes.array.isRequired,  
		cssClass: PropTypes.string,
	}
	static defaultProps= {
		cssClass: ''
	}
	constructor(props) {
		super(props);			
	}
			
	render(){
		const {items,cssClass } = this.props;		
		return(
			<div className="navigation-component">
				<ul className={"nav " + cssClass}>					
					{

						this.props.items.map( (item,index) => <Li key={index} href={item.href} name={item.name} isActive={item.isActive} />)
					}						
				</ul>
			</div>
		);
	}
}

/*
items [{href,name,isActive}]
*/

export default Navigation;