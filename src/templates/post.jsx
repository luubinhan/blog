import React from "react";
import Helmet from "react-helmet";
import { random } from "lodash";
import { Comments, FacebookProvider } from "react-facebook";

import Bio from "../components/Bio";
import Link from "../components/Link";
import Disqus from "../components/Disqus/Disqus";
import PostTags from "../components/PostTags/PostTags";
import SocialLinks from "../components/SocialLinks/SocialLinks.jsx";
import SEO from "../components/SEO.jsx";
import config from "../../data/SiteConfig";

export default class PostTemplate extends React.Component {
  render() {
    const { slug, next, prev } = this.props.pathContext;
    const postNode = this.props.data.markdownRemark;
    const post = postNode.frontmatter;
    if (!post.id) {
      post.id = slug;
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID;
    }
    return (
      <div className="master">
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle} | ${config.siteDescription}`}</title>
          <meta name="description" content={`${post.desc} || ${post.title} || ${config.siteDescription}`} />
          <meta
            name="keywords"
            content="frontend,developer,javascript,wordpress,react,hochiminh,web-developer"
          />
        </Helmet>
        <div className="inner">
          <SEO postPath={slug} postNode={postNode} postSEO />
          <div className="single-post">
            <div className="single-post-container">
              <article>
                <header>
                  <h1 className="single-post-title">{post.title}</h1>
                </header>
                <div className="post-excert">{post.desc}</div>
                {post.cover && (
                  <figure
                    className="the-post-thumbnail"
                    aria-label="media"
                    role="group"
                    itemProp="associatedMedia"
                    itemID={post.cover}
                    itemType="http://schema.org/ImageObject"
                  >
                    <img
                      src={post.cover}
                      alt={post.title}
                      itemProp="thumbnailUrl"
                    />
                  </figure>
                )}
                <div className="blog-post">
                  <div
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: postNode.html }}
                  />
                </div>
              </article>
              <PostTags list={post.tags || []} />

              <Bio
                name={config.siteTitle}
                desc={config.siteTitleAlt}
                href="about"
              />
              <div className="post-meta">
                <SocialLinks postPath={slug} postNode={postNode} />
              </div>
            </div>
            <div id="post-comments" className='fb-comments'>
              <FacebookProvider appId={config.siteFBAppID}>
                <Comments
                  href={`${config.siteUrl}/blog${slug}`}
                  width="100%"
                />
              </FacebookProvider>
            </div>
            <Disqus postNode={postNode} />
            <div className="section section-below-post">
              <div className="inner">
                <div id="disqus_thread" />
                <div className="read-next">
                  {next && (
                    <Link className="read-next-story" to={next.fields.slug}>
                      <section className="post">
                        <span className="read-this-next">Đọc Tiếp</span>
                        <h2>{next.frontmatter.title}</h2>
                      </section>
                    </Link>
                  )}

                  {prev && (
                    <Link
                      className="read-next-story prev"
                      to={prev.fields.slug}
                    >
                      <section className="post">
                        <span className="you-might-enjoy">Đọc Tiếp</span>
                        <h2>{prev.frontmatter.title}</h2>
                      </section>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="aside">
          <div className="beatiful-post-name" data-text-shadow={post.title}>
            {post.title}
          </div>
        </div>
      </div>
    );
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
`;
