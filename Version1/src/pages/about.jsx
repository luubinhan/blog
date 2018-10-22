import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from "react-helmet"
import get from "lodash/get"
import {Nav,NavItem} from 'react-bootstrap'

import ProfileHero from "../components/ProfileHero"

import ContentPost from '../components/ContentPost'
import Card from '../components/Card'
import Header from '../components/Header'
import Navigation from '../components/Navigation'

import profileImg from "../pages/images/profile.jpg"

import {BG_SIDEBAR,SITE_CONFIG} from '../data'

class About extends Component {
	constructor(props) {
		super(props);
		this.state ={
			selectedTab: 1,
		};

		this._handleSelect = this._handleSelect.bind(this);
	}
	_handleSelect(selectedKey) {
		this.setState({
			selectedTab: selectedKey
		})	  
	}
	render() {  		
		return (
			<div className="master">
				<div className="inner">
					<div className="page-about">
						<Helmet
				          title={`About ${SITE_CONFIG.companyName} | ${SITE_CONFIG.tagLine}`}
				          meta={[
				            { name: 'description', content: `${SITE_CONFIG.companyName} ${SITE_CONFIG.tagLine}` },
				            { name: 'keywords', content: 'frontend,developer,wordpress,react,hochiminh,web-developer' },
				          ]}
		      			/>

						
		        	<div className="about-header">
								<ProfileHero>
										<table className="reset">
											<tbody>
												<tr>
													<td>
														<div className="pr-30">
															<a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer"><i className="ion-social-linkedin-outline"></i><span className="pl-10 ">LinkedIn</span></a>
														</div>
													</td>
													<td><a href={SITE_CONFIG.twitter} target="_blank" rel="noopener noreferrer"><i className="ion-social-twitter-outline"></i><span className="pl-10 ">Twitter</span></a></td>
												</tr>
											</tbody>
										</table>
								</ProfileHero>

								<Nav bsStyle="pills" activeKey={this.state.selectedTab} onSelect={this._handleSelect}>
								    <NavItem eventKey={1}>
								    	Vietnamese
								    </NavItem>
								    <NavItem eventKey={2}>
								    	English
								    </NavItem>						    
							  	</Nav>
							
						</div>
						<div className="about-body">
							<div className="single-post-container">
								{this.state.selectedTab === 1 &&
									<div className="post-content">
										<article>
											<blockquote>											
												Không phải mẫu người thành công, đơn giản chỉ muốn làm gì đó để thấy mình có ích
											</blockquote>
											<h2>
												Phòng vấn toàn thất bại
											</h2>
											<p>
												Sau khi tốt nghiệp đại học Hoa Sen năm 2017, bước chân vào những lần phỏng vấn thất bại liên tiếp. Xin vào ví trí thiết kế web cho một công ty bán nữ trang, với vốn liếng HTML/CSS góp nhặt từ <a target="_blank" href="http://www.izwebz.com">izwebz.com</a> và một vài dự án nhỏ làm trong trường, "mai mắn" được nhận trong ngày phỏng vấn và bị từ chối ngay hôm sau vì "anh cần người biết vẽ tay".
											</p>
											<p>
												Luôn bị mắc lỗi phát âm tiếng anh, mình đâm đơn vào các công ty nước ngoài nơi có phỏng vấn tiếng anh để thử sức. Công ty đầu tiên làm game ở ETown, chị HR mới hỏi mấy câu đơn giản tên tuổi, quê quán, mình lóng nga lóng ngóng không biết trả lời sau, thấy bí quá chị nói "thôi để chị hỏi tiếng Việt"
											</p>
											<p>
												Mới gần đây, cùng với cơn sốt React trong ngành, mình cũng "đua đòi" đi xin vào vị trí React mà trong đầu chẳng có tí ti gì là component, state, props, đến nói lúc được Single Page App là gì mình cũng không thể nào định nghĩa nổi.
											</p>
										</article>
									</div>
								}
								{this.state.selectedTab === 2 &&
									
										<div className="post-content">
											<article>
												<blockquote>											
													Not yet a successfull man, not try to be, just want to become a value man
												</blockquote>
												<p>
													I moved to the largest city in vietnam, formerly named saigon in 2007 and became a web tailor since 2011, working on tons of projects, I believe that what makes a great website is fascinating message, together with an immediate understanding, original content and easily traceable information.
												</p>
											</article>
										</div>
								}						
							</div>
						</div>
					</div>
				</div>
				<div className="aside" style={{backgroundImage: `url(${BG_SIDEBAR[7]})`}}>
					<div className="company-info">
            <div className="company-name">
            	{SITE_CONFIG.companyName}
            </div>
            <div className="company-tagline">
            	{SITE_CONFIG.tagLine}
            </div>
          </div>
        </div>
			</div>
		)
	}
}


export default About;