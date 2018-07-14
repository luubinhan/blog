import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './Badge.scss'

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
		id: PropTypes.string,
	}

	_onClick = (event) => {
		if (this.props.onItemClick !== null && this.props.onItemClick !== undefined ) {
			this.props.onItemClick(event,this.props.id)	
		}		
	}

	constructor(props) {
		super(props);
	}

	render() {
		let {type} = this.props;
		return (			
			<div className={"badge badge-" + type.trim().toLowerCase().replace(' ','-')}  onClick={this._onClick}>
				{this.props.children}
			</div>
		);
	}
}

export default Badge