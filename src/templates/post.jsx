import React from 'react'
import Helmet from 'react-helmet'
import {random} from 'lodash'

import Bio from '../components/Bio'
import Disqus from '../components/Disqus/Disqus'
import PostTags from '../components/PostTags/PostTags'
import SocialLinks from '../components/SocialLinks/SocialLinks'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import {bgSidebar} from '../../data'

export default class PostTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBg: bgSidebar[random(bgSidebar.length-1)]
    }
  }
  render() {
    const { slug} = this.props.pathContext
    const postNode = this.props.data.markdownRemark
    const post = postNode.frontmatter
    if (!post.id) {
      post.id = slug
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID
    }
    return (
      <div className="master">
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <div className="inner">
          <SEO postPath={slug} postNode={postNode} postSEO />
          <div className="single-post">
            <div className="single-post-container">    
              <article>
                <header>
                  <h1 className="single-post-title">{post.title}</h1>
                </header>
                <div className="post-excert">
                  {post.desc}
                </div>
                <div className="blog-post">
                  <div className="post-content" dangerouslySetInnerHTML={{ __html: postNode.html }} />
                </div>
                
              </article>
              <PostTags list={post.tags || []} />
              <Bio name={config.siteTitle} desc={config.siteTitleAlt} href="about" img={config.userAvatar} />
              <div className="post-meta">
                <SocialLinks postPath={slug} postNode={postNode} />
              </div>
            </div>
            <Disqus postNode={postNode} />
          </div>
        </div>
        <div className="aside" style={{backgroundImage: `url(${this.state.sideBg})`}}>
          <div className="beatiful-post-name" data-text-shadow={post.title}>
            {post.title}     
          </div>
        </div>
      </div>
    )
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        category
        tags
        desc
      }
      fields {
        slug
      }
    }
  }
`
