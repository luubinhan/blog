import React, { Component } from 'react'
import PropTypes from 'prop-types'
import get from "lodash/get"
import Helmet from "react-helmet"
import Link from "gatsby-link"


import PageHero from '../components/PageHero'
import ContentPost from '../components/ContentPost'
import Widget from '../components/Widget'
import PostTags from '../components/PostTags'

import {PRIMARY_NAVIGATION} from '../data/data'
import logo from "../pages/images/logo.png"
import Navigation from '../components/Navigation'
import Header from '../components/Header'

class Blog extends Component {

	render() {    
		const posts = get(this, "props.data.allMarkdownRemark.edges");
		
		return (
			<div className="page-blog">
				<Helmet 
					title="Blog | Frontend Developer live in Ho Chi Minh City" 
					meta={[
			          { name: 'description', content: 'luckyluu FrontEnd Developer live in Ho Chi Minh City' },
			          { name: 'keywords', content: 'frontend,developer,wordpress,react,hochiminh,web-developer' },
			        ]}
				/>
				<Header logo={logo} navigationList={PRIMARY_NAVIGATION}>
				</Header>

				<div className="container">
					<PageHero title="Blog"/>				
					<div className="row">
						<div className="col-md-8">
							{ posts.length && 
								<div className="posts-list">
									{
										posts.map( (post, index) => {
									      if (post.node.path !== "/404/") {
									        const title = get(post, "node.frontmatter.title") || post.node.path;
									        
									        return <ContentPost key={index} 
									        				title={title} 
									        				desc={post.node.frontmatter.desc} 
									        				date={post.node.frontmatter.date} 
									        				href={post.node.frontmatter.path}
									        				tags={post.node.frontmatter.tags}
									        				/>
									      }
									    })
									}
								</div>
							}
						</div>
						<div className="col-md-4">
							<Widget title="Chuyên mục">
								<PostTags list={tagsArray} />
							</Widget>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Blog.propTypes = {
  route: React.PropTypes.object,
}

export default Blog;

export const pageQuery = graphql`
  query BlogQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {          
          frontmatter {
          	path
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            desc
          }
        }
      }
    }
  }
`