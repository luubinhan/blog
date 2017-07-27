import React from "react"
import Link from "gatsby-link"
import get from "lodash/get"
import Helmet from "react-helmet"

import HomeHero from "../components/HomeHero"
import Widget from "../components/Widget"


import {PRIMARY_NAVIGATION} from '../data/data'
import {SITE_CONFIG} from '../config'
import heroImage from "../pages/images/cover3.jpg"

class BlogIndex extends React.Component {
  render() {
    // console.log("props", this.props)
    const pageLinks = []
    const siteTitle = get(this, "props.data.site.siteMetadata.title")
    const posts = get(this, "props.data.allMarkdownRemark.edges")
    posts.forEach(post => {
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
    })

    return (
      <div className="pageIndex">
        <Helmet 
          title={get(this, "props.data.site.siteMetadata.title")} 
          meta={[
                { name: 'description', content: 'luckyluu FrontEnd Developer live in Ho Chi Minh City' },
                { name: 'keywords', content: 'frontend,developer,wordpress,react,hochiminh,web-developer' },
              ]}
        />
        <div className="pattern">
          <div className="container">
          <HomeHero title="Home to unique ideas from the world’s smart minds."
                    desc="Hear directly from the people who know it best. From tech to politics to creativity and more — whatever your interest, we’ve got you covered."
                    linkTo="#about"
                    linkTitle="Get started"
                    img={heroImage}
          />
          </div>
        </div>
        <div className="container">
          
          <div className="row">
            <div className="col-md-4">
              <Widget title="Latest blog post" href="/blog">
                <ul className="style1">
                  {pageLinks}
                </ul>
              </Widget>    
            </div>
            <div className="col-md-4">
              <Widget title="Latest work" href="/portfolio">
                <ul className="style1">
                  
                </ul>
              </Widget>    
            </div>
            <div className="col-md-4">
              <Widget title="Connect with me" href="/about">
                <ul className="style1">
                  <li>
                    <a href={SITE_CONFIG.linkedin} target="_blank" title="Linkin luu binh an" class=""><i className="ion-social-linkedin-outline"></i>LinkedIn</a>
                  </li>
                  <li>
                    <a href={SITE_CONFIG.twitter} target="_blank" title="Twitter luu binh an" class=""><i className="ion-social-twitter-outline"></i>Twitter</a>
                  </li>
                </ul>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            path
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
