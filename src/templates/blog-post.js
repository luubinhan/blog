import React from 'react'
import Helmet from 'react-helmet'

import Link from '../components/Link'
import PostTags from '../components/PostTags'
import SocialShare from '../components/SocialShare'
import Bio from '../components/Bio'

import {SITE_CONFIG} from '../config'
import profileImg from '../pages/images/profile.jpg'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import logo from "../pages/images/logo.png"

const bgArray = [
  'https://luubinhan.github.io/blog/static/bg1.e2f287dd.jpg',
  'https://luubinhan.github.io/blog/static/bg2.cc2e32a4.jpg',
  'https://luubinhan.github.io/blog/static/bg3.6fe2f053.jpg',
  'https://luubinhan.github.io/blog/static/bg4.37a1ef2b.jpg',
  'https://luubinhan.github.io/blog/static/bg5.ea05aa74.jpg',

]

export default class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBg: ''
    }
  }
  getRandomArbitrary(max) {
    return Math.floor((Math.random() * max) + 1);
  }
  
  componentWillMount(nextProps, nextState) {
    let checkNumber = this.getRandomArbitrary(4);    
    let newBg = bgArray[checkNumber];    
    this.setState({
      sideBg: newBg
    })   
  }
  render(){
    const { markdownRemark: post } = this.props.data;
    const { next, prev } = this.props.pathContext;  
    
    return (
      <div className="master">
        <div className="inner">
          <div className="single-post">   
            <Helmet
              title={`Blog - ${post.frontmatter.title}`}   
              meta={[
                    { name: 'description', content: `Blog - ${post.frontmatter.desc}` },
                    { name: 'keywords', content: 'frontend,developer,javascript,wordpress,react,hochiminh,web-developer' },
                  ]}        
            
            />
       
            <div className="single-post-container">       
              
              <h1 className="single-post-title">
                {post.frontmatter.title}     
              </h1>
              <div className="post-excert">
                {post.frontmatter.desc}
              </div>
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
              <Bio name={SITE_CONFIG.companyName} desc={SITE_CONFIG.tagLine} href="#" img={profileImg} />

            </div>
            <div className="section section-below-post">
              <div className="inner">
              
                  <div className="read-next">       
                    
                    {next &&
                    <Link className="read-next-story" to={next.frontmatter.path}>
                        <section className="post">
                            <span className="read-this-next">Đọc Tiếp</span>
                            <h2>{next.frontmatter.title}</h2>
                        </section>
                    </Link>
                    }
                    
                    {prev &&
                    <Link className="read-next-story prev" to={prev.frontmatter.path}>
                        <section className="post">
                            <span className="you-might-enjoy">Đọc Tiếp</span>
                            <h2>{prev.frontmatter.title}</h2>
                        </section>
                    </Link>
                    }
                         
                  </div> 
               
              </div>
            </div>
                
          </div>
        </div>
        <div className="aside" style={{backgroundImage: `url(${this.state.sideBg})`}}></div>
      </div>
    );
  }
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
