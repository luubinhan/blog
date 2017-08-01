import React from "react"
import Link from "gatsby-link"
import get from "lodash/get"
import Helmet from "react-helmet"

import HomeHero from "../components/HomeHero"
import Widget from "../components/Widget"
import ContentPost from "../components/ContentPost"
import PostTags from "../components/PostTags"
import {getAllTags} from '../helpers'
import {SITE_CONFIG} from '../config'
import heroImage from "../pages/images/cover3.jpg"

import {PRIMARY_NAVIGATION} from '../data/data'
import logo from "../pages/images/logo.png"
import Navigation from '../components/Navigation'
import Header from '../components/Header'

class BlogIndex extends React.Component {
  render() {
    
    const pageLinks = [];
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const posts = get(this, "props.data.allMarkdownRemark.edges");
    const allTags = getAllTags(posts);
    let tagsArray = Object.keys(allTags).map( tagName => {
      return tagName;
    });
   
    return (
      <div className="pageIndex">

        <Helmet 
          title={get(this, "props.data.site.siteMetadata.title")} 
          meta={[
                { name: 'description', content: 'luckyluu FrontEnd Developer live in Ho Chi Minh City' },
                { name: 'keywords', content: 'frontend,developer,wordpress,react,hochiminh,web-developer' },
              ]}
        />
            
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
     
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
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