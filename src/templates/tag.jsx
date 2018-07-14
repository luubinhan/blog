import React from 'react'
import Helmet from 'react-helmet'
import {random} from 'lodash'
import PostListing from '../components/PostListing/PostListing'
import config from '../../data/SiteConfig'
import {bgSidebar} from '../../data'

export default class TagTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBg: bgSidebar[random(bgSidebar.length-1)]
    }
  }
  
  render() {
    const {tag} = this.props.pathContext;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <div className="master">
        <Helmet title={`Posts tagged as "${tag}" | ${config.siteTitle}`} />
        <div className="inner">
          <PostListing postEdges={postEdges} />
        </div>
        <div className="aside" style={{backgroundImage: `url(${this.state.sideBg})`}}>
          <div className="company-info tag">
            <div className="company-name">
              TAGS
            </div>             
          </div>
        </div>
      </div>
    )
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
            desc
          }
        }
      }
    }
  }
`
