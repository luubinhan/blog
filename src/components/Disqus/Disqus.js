import React, { Component } from "react";
import ReactDisqus from 'disqus-react';
import config from "../../../data/SiteConfig";

class Disqus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toasts: []
    };
    this.notifyAboutComment = this.notifyAboutComment.bind(this);
    this.onSnackbarDismiss = this.onSnackbarDismiss.bind(this);
  }

  onSnackbarDismiss() {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  }
  notifyAboutComment() {
    const toasts = this.state.toasts.slice();
    toasts.push({ text: "New comment available!" });
    this.setState({ toasts });
  }
  doNothing = () => {};
  render() {
    const { postNode } = this.props;
    const post = postNode.frontmatter;
    const url = config.siteUrl + config.pathPrefix + postNode.fields.slug;
    const disqusConfig = {
      url: url,
      identifier: post.id,
      title: post.title
    };
    return (
      <ReactDisqus.DiscussionEmbed shortname={config.disqusShortname} config={disqusConfig} />
    );
  }
}

export default Disqus;
