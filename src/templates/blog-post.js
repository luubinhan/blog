import React from 'react'
import Helmet from 'react-helmet'

import Link from '../components/Link'
import PostTags from '../components/PostTags'
import SocialShare from '../components/SocialShare'
import Bio from '../components/Bio'

import {BG_SIDEBAR, SITE_CONFIG} from '../data'
import profileImg from '../pages/images/profile.jpg'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import logo from "../pages/images/logo.png"


export default class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBg: ''
    }
  }
  componentDidMount() {
    var d = document, s = d.createElement('script');
    s.src = 'https://luckyluu-blog.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  }
  getRandomArbitrary(max) {
    return Math.floor((Math.random() * max) + 1);
  }
  
  componentWillMount(nextProps, nextState) {
    let checkNumber = this.getRandomArbitrary(BG_SIDEBAR.length-1);    
    let newBg = BG_SIDEBAR[checkNumber];    
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
              <article>
                <header>
                  <h1 className="single-post-title">
                    {post.frontmatter.title}     
                  </h1>
                </header>
                <div className="post-excert">
                  {post.frontmatter.desc}
                </div>
                <aside>
                  <div className="social-media-bar">
                    <SocialShare href={post.frontmatter.path} title={post.frontmatter.title} excerpt={post.frontmatter.desc}  />
                  </div>
                </aside>
                <div className="blog-post">
                  <div
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: post.html }}
                  />        
                </div>
              </article>
              <PostTags list={post.frontmatter.tags || []} />
              <Bio name={SITE_CONFIG.companyName} desc={SITE_CONFIG.tagLine} href="about" img={profileImg} />
              
            </div>
            <div className="section section-below-post">
              <div className="inner">
                  <div id="disqus_thread"></div>
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
        <div className="aside" style={{backgroundImage: `url(${this.state.sideBg})`}}>
          <div className="beatiful-post-name" data-text-shadow={post.frontmatter.title}>
            {post.frontmatter.title}     
          </div>
        </div>
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
