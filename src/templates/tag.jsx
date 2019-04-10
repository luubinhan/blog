import React from "react";
import Helmet from "react-helmet";
import { random } from "lodash";
import PostListing from "../components/PostListing/PostListing";
import config from "../../data/SiteConfig";

export default class TagTemplate extends React.Component {
  render() {
    const { tag } = this.props.pathContext;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <div className="master">
        <Helmet>
          <title>{`Kiến thức ${tag} | ${config.siteTitle} | ${config.siteDescription}`}</title>
          <meta name="description" content="Nơi mình chia sẽ kiến thức frontend, css, html, javascript, các framework như React, Vuejs, React Native" />
        </Helmet>
        <div className="inner">
          <PostListing postEdges={postEdges} />
        </div>
        <div className="aside">
          <div className="company-info tag">
            <div className="company-name">TAGS</div>
          </div>
        </div>
      </div>
    );
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
`;
