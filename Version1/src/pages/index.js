import React from "react"
import Link from "gatsby-link"
import get from "lodash/get"
import Helmet from "react-helmet"

import HomeHero from "../components/HomeHero"
import Widget from "../components/Widget"
import ContentPost from "../components/ContentPost"
import PostTags from "../components/PostTags"

import heroImage from "../pages/images/cover3.jpg"

import {PRIMARY_NAVIGATION, BG_SIDEBAR, SITE_CONFIG} from '../data'
import logo from "../pages/images/logo.png"
import Navigation from '../components/Navigation'
import Header from '../components/Header'



class BlogIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBg: ''
    }
  }
  getRandomArbitrary(max) {
    return Math.floor((Math.random() * max) + 1);
  }
  componentWillMount() {
    let checkNumber = this.getRandomArbitrary(BG_SIDEBAR.length-1);    
    let newBg = BG_SIDEBAR[checkNumber];    
    this.setState({
      sideBg: newBg
    })   
  }
  render() {
    
    const pageLinks = [];
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const posts = get(this, "props.data.allMarkdownRemark.edges");
    
    return (

      <div className="master">
        <div className="inner">  
          <div className="page page-home">
            <Helmet 
              title={`Home ${SITE_CONFIG.companyName} | ${SITE_CONFIG.tagLine}`}
              meta={[
                    { name: 'description', content: `${SITE_CONFIG.companyName} ${SITE_CONFIG.tagLine}` },
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
        </div>
        <div className="aside" style={{backgroundImage: `url(${this.state.sideBg})`}}>
            
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
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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