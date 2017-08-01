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

    let navigationList = PRIMARY_NAVIGATION.map(item => {
      if (item.href === '/home') {
        item.isActive = true;
      }
      return item;
    });
    
    
    /*posts.forEach(post => {
      if (post.node.path !== "/404/") {
        const title = get(post, "node.frontmatter.title") || post.node.path
        pageLinks.push(
          <li
            key={post.node.frontmatter.path}            
          >
            <Link to={post.node.frontmatter.path}>
              {post.node.frontmatter.title}
            </Link>
          </li>
        )
      }
    })*/

    return (
      <div className="pageIndex">

        <Helmet 
          title={get(this, "props.data.site.siteMetadata.title")} 
          meta={[
                { name: 'description', content: 'luckyluu FrontEnd Developer live in Ho Chi Minh City' },
                { name: 'keywords', content: 'frontend,developer,wordpress,react,hochiminh,web-developer' },
              ]}
        />
        <Header logo={logo} navigationList={navigationList}>
          
        </Header>  
        <div className="container">
            
          <div className="row">
            <div className="col-md-8">
              
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