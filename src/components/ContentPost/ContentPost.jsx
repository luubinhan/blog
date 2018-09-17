import React,{Component} from 'react'
import PropTypes from 'prop-types'
import GatsbyLink from 'gatsby-link'

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
	render(){
		let {id,title,desc,href,img, date,tags} = this.props;		
		console.log('dev', date);
		return(
		    <div className="mystyle-item-post">
		      <article className="item-post clearfix " itemType="http://schema.org/NewsArticle">
					{img &&
					<figure className="the-post-thumbnail" aria-label="media" role="group" itemProp="associatedMedia" itemID={img} itemType="http://schema.org/ImageObject">
						<GatsbyLink to={href}><img src={img} alt={title} itemProp="thumbnailUrl" /></GatsbyLink>
					</figure> 
		      }
	          		<section className="the-post-content">
		              	<header className="heading-post" itemProp="headline"><GatsbyLink to={href}>{title}</GatsbyLink></header>
		              	
		              	{desc !=='' &&
		              	<footer className="post-excert" itemProp="description">
		                  {desc}
		              	</footer>
		              	}
		              	<PostMeta datetime={date} tags={tags} />
	          		</section>
		      	</article>
		  	</div>
		)
	}
}

export default ContentPost; 