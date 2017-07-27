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
        <div className="master">
          <div className="master-inner">
            <div className="container">
              <PageHero title={`${post.length} bài viết trong chuyên mục ${tag}`}/>    
              <div className="row">
                <div className="col-md-8">
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
                <div className="col-md-4">
                  <Widget title="Chuyên mục">
                    <PostTags list={tagsArray} />
                  </Widget>
                </div>
              </div>
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
