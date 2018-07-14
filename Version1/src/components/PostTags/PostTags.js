import React from 'react';
import Link from 'gatsby-link';

import './PostTags.scss';

export default function PostTags({ list = [] }) {
  return (
    <ul className="tag-list">
      {list.map(tag =>
        <li key={tag}>
          <Link to={`/tags/${tag}`}>
            {tag}
          </Link>
        </li>
      )}
    </ul>
  );
}