import React from "react";
import Link from "gatsby-link";

import "./PostTags.scss";

export default function PostTags({ list = [] }) {
  return (
    <ul className="tag-list">
      {React.Children.toArray(list.map(tag => (
        <li key={tag}>
          <Link to={`/tags/${tag}`}>{tag.name ? tag.name : tag}</Link>
        </li>
      )))}
    </ul>
  );
}
