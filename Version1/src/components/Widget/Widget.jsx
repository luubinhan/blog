import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Link from "gatsby-link"

import './Widget.scss'

class Widget extends Component {
	static propTypes = {		
		
		/*
		Show a control to toggle the widget body
		 */
		showToggle: PropTypes.bool,

		/*
		Widget's title
		 */
		title: PropTypes.string,

		/*
		Widget's link
		 */
		href: PropTypes.string,
		
	}

	static defaultProps = {
		showToggle: false,		
		href: '',
	}	

	constructor(props) {
		super(props);
		this.state = {
			/*
			Show the body part of widget
			 */
			isCollapsed: false,
		}
		this._changeCollapse = this._changeCollapse.bind(this);
	}

	/**
	 * Toggle show/hide widget body
	 */
	_changeCollapse() {		
		this.setState({ isCollapsed: !this.state.isCollapsed});
	}

	componentWillMount() {		
		
		this.setState({
			activeState: this.props.active
		})	
	}	

	render() {
		let {title, showToggle, href} = this.props;
		let {isCollapsed} = this.state;	
		return (			
			<div className={'widget-container widget-' + title.trim().toLowerCase().replace(' ','-')}>
				<div className='inner'>

					{ title && (
						<h3 className='widget-title'>
							{ href !== '' ?
								<Link to={href}>{title}</Link>
								:
								<span>
									{title}
								</span>
							}
							

							{ showToggle && (
								<span className={"wiget-toggle-control " +(isCollapsed ? 'collapsed' : "") } onClick={this._changeCollapse}>
									<i className="ms-Icon ms-Icon--ChevronUp"></i>
								</span>
							)}
						</h3>
					)}

					{ !isCollapsed && (
						<div className='widget-body'>
							{this.props.children}
						</div>
					)}
				</div>
			</div>
		);
	}
}
export default Widget