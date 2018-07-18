import React, { Component } from 'react'
import {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  FacebookShareCount,
  GooglePlusShareCount,
  TwitterIcon,
  FacebookIcon,
  GooglePlusIcon
} from 'react-share'
import config from '../../../data/SiteConfig'
import './SocialLinks.css'

class SocialLinks extends Component {
  render() {
    const { postNode, postPath, mobile } = this.props
    const post = postNode.frontmatter
    const url = config.siteUrl + config.pathPrefix + postPath

    const iconSize = mobile ? 36 : 48
    const filter = count => (count > 0 ? count : '')

    return (
      <div className="social-links">
        <TwitterShareButton url={url} title={post.title}>
          <TwitterIcon round size={iconSize} />
        </TwitterShareButton>
        <GooglePlusShareButton url={url}>
          <GooglePlusIcon round size={iconSize} />
          <GooglePlusShareCount url={url}>
            {count => <div className="share-count">{filter(count)}</div>}
          </GooglePlusShareCount>
        </GooglePlusShareButton>
        <FacebookShareButton
          url={url}
          quote={post.title}
        >
          <FacebookIcon round size={iconSize} />
          <FacebookShareCount url={url}>
            {count => <div className="share-count">{filter(count)}</div>}
          </FacebookShareCount>
        </FacebookShareButton>
      </div>
    )
  }
}

export default SocialLinks
