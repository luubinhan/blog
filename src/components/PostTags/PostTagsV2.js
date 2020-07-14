import React from "react";
import Link from "gatsby-link";

import "./PostTagsV2.scss";

export default function PostTags({ list = [] }) {
  return (
    <ul className="tag-list-2">
      {React.Children.toArray(list.map(tag => (
        <li>
          <Link to={`/tags/${tag.key}`}>{tag.name}</Link>
        </li>
      )))}
    </ul>
  );
}
