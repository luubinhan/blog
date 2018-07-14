import React from 'react'
import Helmet from 'react-helmet'
import {random, isEmpty} from 'lodash'

import PostListing from '../components/PostListing/PostListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'

import {bgSidebar} from '../../data'

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBg: bgSidebar[random(bgSidebar.length-1)]
    }
  }
  render() {
    const allSEOMarkdown = this.props.data.allMarkdown.edges;
    return (
      <div className="master">
        <Helmet title={config.siteTitle} />
        <SEO postEdges={allSEOMarkdown} />
        <main className="inner">
          { !isEmpty(allSEOMarkdown) && 
            <PostListing postEdges={allSEOMarkdown} />
            
          }
        </main>
        <div className="aside" style={{backgroundImage: `url(${this.state.sideBg})`}} />
      </div>
    )
  }
}

export default Index

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdown: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
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
            cover
            date
            desc
          }
        }
      }
    }
  }
`
