import React,{Component} from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import './Footer.scss'

class Footer extends Component{
	static propTypes = {
		email: PropTypes.string,
		phone: PropTypes.string,
		companyName: PropTypes.string,
		showSiteMap: PropTypes.bool,

		showContactInfo: PropTypes.bool,
	}
	static defaultProps = {
	  email: '',
	  phone: '',
      companyName: '',
      showSiteMap: true,
      showContactInfo: false,
	};

	constructor(props) {
		super(props);
	}

	render(){
		let {email, phone, companyName, showSiteMap, showContactInfo} = this.props;
		let dateNow = new Date();
		return(
			<div id="footer">
				<footer className="footer">
					<section className="footer-inner">
						
							{showContactInfo &&
								<div className="copyright">
									Contact : <a href={"tel:" + phone}>{phone}</a> - Email: <a href={"mailto:" + email}>{email}</a>
								</div>
							}
							<div className="credit">
								© Copyright {dateNow.getFullYear()} {companyName}
								
								{showSiteMap &&
								 <span className="sitemap-link"> | <Link to="/sitemap">Sitemap</Link></span>
								}	
								<div>
									picture credit <a href="https://unsplash.com" target="_blank">unsplash.com</a>
								</div>
							</div>
						
					</section>
				</footer>
			</div>
		)
	}
}

export default Footer; 