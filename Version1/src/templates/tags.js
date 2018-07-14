import React from 'react';
import GatsbyLink from 'gatsby-link';
import HomeIcon from 'react-icons/lib/fa/home';
import TagsIcon from 'react-icons/lib/fa/tags';
import Helmet from "react-helmet"

import {BG_SIDEBAR,SITE_CONFIG} from '../data'
import PageHero from '../components/PageHero'
import Link from '../components/Link';
import ContentPost from '../components/ContentPost';
import PostTags from '../components/PostTags';
import Widget from '../components/Widget';

export default class Tags extends React.Component {
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
    const { posts, post, tag } = this.props.pathContext;
  
    if (tag) {
      return (
        <div className="master">
          <div className="inner">
            <div className="page-tags">
              <Helmet 
                title="Blog | FrontEnd Developer live in Ho Chi Minh City" 
                meta={[
                      { name: 'description', content: 'luckyluu FrontEnd Developer live in Ho Chi Minh City' },
                      { name: 'keywords', content: 'frontend,developer,wordpress,react,hochiminh,web-developer' },
                    ]}
              />
            
              
                 
                
                  {post.map(({ id, frontmatter, excerpt }) => {
                    return (
                      <ContentPost key={id} 
                                title={frontmatter.title} 
                                desc={excerpt} 
                                data={frontmatter.date}
                                tags={frontmatter.tags}
                                href={frontmatter.path}
                                
                                />                       
                    );
                  })}
                
            </div>
            
          </div>
          <div className="aside" style={{backgroundImage: `url(${this.state.sideBg})`}}>
            <div className="company-info tag">
              <div className="company-name ">
                {tag}
              </div>             
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="master">
        <div className="inner">
         <Helmet 
            title="Tags | FrontEnd Developer live in Ho Chi Minh City" 
            meta={[
                  { name: 'description', content: 'luckyluu FrontEnd Developer live in Ho Chi Minh City' },
                  { name: 'keywords', content: 'frontend,developer,wordpress,react,hochiminh,web-developer' },
                ]}
          />
          <div className="single-post-container">       
            <h1 className="single-post-title">Tags</h1>
            <ul className="tagsUl">
              {Object.keys(posts).map(tagName => {
                const tags = posts[tagName];
                return (
                  <li key={tagName}>
                    <GatsbyLink to={`/tags/${tagName}`}>
                      {tagName}
                    </GatsbyLink>
                  </li>
                );
              })}
            </ul>    
          </div>
        
          
        </div>
        <div className="aside" style={{backgroundImage: `url(${this.state.sideBg})`}}>
          <div className="company-info tag">
            <div className="company-name ">
              TAGS
            </div>             
          </div>
        </div>
      </div>
    );
  }
  
}
