import React from "react";
import GatsbyLink from "gatsby-link";

import "./Bio.scss";

export default function Bio({ img = "", href = "", name = "", desc = "" }) {
  return (
    <div className="bio">
      <GatsbyLink to={href} className="bio-wrapper">
        <div className="bio-img">
          <img src="/blog/images/my-image.jpg" alt={name} />
        </div>
        <div className="bio-content">
          <div className="bio-name">{name}</div>
          <div className="bio-desc">{desc}</div>
        </div>
      </GatsbyLink>
      <a className="btn btn-primary mt-10" style={{color: '#fff', fontWeight: 'bold'}} href="http://luubinhan.github.io/blog/donate" rel="noopener noreferrer" target="_blank">Hỗ trợ bằng Zalo Pay</a>
    </div>
  );
}
