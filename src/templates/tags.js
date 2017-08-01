import React from 'react';
import GatsbyLink from 'gatsby-link';
import HomeIcon from 'react-icons/lib/fa/home';
import TagsIcon from 'react-icons/lib/fa/tags';
import Helmet from "react-helmet"

import PageHero from '../components/PageHero'
import Link from '../components/Link';
import ContentPost from '../components/ContentPost';
import PostTags from '../components/PostTags';
import Widget from '../components/Widget';

import {PRIMARY_NAVIGATION} from '../data/data'
import logo from "../pages/images/logo.png"
import Navigation from '../components/Navigation'
import Header from '../components/Header'

export default function Tags({ pathContext }) {
  const { posts, post, tag } = pathContext;
  
  if (tag) {
    let tagsArray = Object.keys(posts).map( tagName => {
      return tagName;
    });
   
    return (
      <div className="page-tags">
        <Helmet 
          title="Blog | FrontEnd Developer live in Ho Chi Minh City" 
          meta={[
                { name: 'description', content: 'luckyluu FrontEnd Developer live in Ho Chi Minh City' },
                { name: 'keywords', content: 'frontend,developer,wordpress,react,hochiminh,web-developer' },
              ]}
        />
        <Header logo={logo} navigationList={PRIMARY_NAVIGATION}>
          
        </Header>  
        <div className="master">
          <div className="master-inner">
            <div className="container">
    
           
                  <ul>
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
                  </ul>
               
            
            </div>
          </div>
        </div>
        
      </div>
    );
  }
  return (
    <div>
      <h1>Tags</h1>
      <ul className="tags">
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
      <Link to="/">
        <HomeIcon /> All posts
      </Link>
    </div>
  );
}
