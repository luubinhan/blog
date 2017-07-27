import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './badge.scss'

class Badge extends Component {
	static propTypes = {
		/*
		
		 */
		onItemClick: PropTypes.func,

		/*
		
		 */
		type: PropTypes.string,

		/*
		
		 */
		isTooltipShow: PropTypes.boolean,
	}

	_onClick = (event) => {
		if (this.props.onItemClick !== null && this.props.onItemClick !== undefined ) {
			this.props.onItemClick(event,this.props.item)	
		}		
	}

	constructor(props) {
		super(props);
	}

	render() {
		let {type} = this.props;
		return (			
			<div className={"badge " + type.trim().toLowerCase().replace(' ','-')}  onClick={this._onClick}>
				{this.props.children}
			</div>
		);
	}
}

export default Badge