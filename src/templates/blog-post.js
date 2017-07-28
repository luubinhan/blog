import React from 'react'
import Helmet from 'react-helmet'

import Link from '../components/Link'
import PostTags from '../components/PostTags'
import SocialShare from '../components/SocialShare'
import Bio from '../components/Bio'

import {PRIMARY_NAVIGATION} from '../data/data'
import profileImg from '../pages/images/profile.jpg'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import logo from "../pages/images/logo.png"

export default function Template({ data, pathContext }) {
  const { markdownRemark: post } = data;
  const { next, prev } = pathContext;  
  let navigationList = PRIMARY_NAVIGATION.map(item => {
    if (item.href === '/blog') {
      item.isActive = true;
    }
    return item;
  })
  return (
    <div className="single-post">   
      <Helmet
        title={`Blog - ${post.frontmatter.title}`}           
      />
      <Header logo={logo}>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <Navigation items={navigationList} cssClass="navbar-nav primary-menu navbar-right" />
        </div>
      </Header>  

      <div className="single-post-container">       
        
        <h1 className="single-post-title">
          {post.frontmatter.title}     
        </h1>
        <div className="social-media-bar">
          <SocialShare href={post.frontmatter.path} title={post.frontmatter.title} excerpt={post.frontmatter.desc}  />
        </div>
        <div className="blog-post">
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />        
        </div>
        <PostTags list={post.frontmatter.tags || []} />
        <Bio name="LuckyLuu" desc="Front-End Developer live in Ho Chi Minh City, a photography geek, and a music lover" href="anluu.com" img={profileImg} />

      </div>
      <div className="section section-below-post">
        <div className="inner">
          <div className="container">
            <div className="read-next">       
              
              {next &&
              <Link className="read-next-story" to={next.frontmatter.path}>
                  <section className="post">
                      <span className="read-this-next">Read this next</span>
                      <h2>{next.frontmatter.title}</h2>
                  </section>
              </Link>
              }
              
              {prev &&
              <Link className="read-next-story prev" to={prev.frontmatter.path}>
                  <section className="post">
                      <span className="you-might-enjoy">You might enjoy</span>
                      <h2>{prev.frontmatter.title}</h2>
                  </section>
              </Link>
              }
                   
            </div> 
          </div>
        </div>
      </div>
          
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        title
        desc
      }
    }
  }
`;
