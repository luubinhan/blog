import React,{Component} from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import PostMeta from '../PostMeta'
import './ContentPost.scss'

class ContentPost extends Component{
	static propTypes = {
		/*
		Title
		 */
		title: PropTypes.string.isRequired,

		/*
		Description
		 */
		desc: PropTypes.string,
		
		/*
		Link to post
		 */
		href: PropTypes.string.isRequired,		

		/*
		Image src
		 */
		img: PropTypes.string,

		/*
		Date
		*/
		date: PropTypes.string,
		
		/*
		Tags
		 */
		tags: PropTypes.array,
	}
	static defaultProps = {
		desc: '',
		date: '',
		img: ''
	};

	constructor(props) {
		super(props);
	}

	render(){
		let {id,title,desc,href,img, date,tags} = this.props;		
		return(
		    <div className="mystyle-item-post">
		      <article className="item-post clearfix " itemType="http://schema.org/NewsArticle">
					{img &&
					<figure className="the-post-thumbnail" aria-label="media" role="group" itemProp="associatedMedia" itemID={img} itemType="http://schema.org/ImageObject">
						<Link to={href}><img src={img} alt={title} itemProp="thumbnailUrl" /></Link>
					</figure> 
		          	}
	          		<section className="the-post-content">
			          	<PostMeta datetime={date} tags={tags} />	          

		              	<header className="heading-post" itemProp="headline"><Link to={href}>{title}</Link></header>
		              	
		              	{desc !=='' &&
		              	<footer className="post-excert" itemProp="description">
		                  {desc}
		              	</footer>
		              	}
		              
	          		</section>
		      	</article>
		  	</div>
			
		)
	}
}

export default ContentPost; 