import React, { Fragment } from "react";
import { Highlight, Snippet } from "react-instantsearch-dom";
import Link from "gatsby-link";

const PostHit = clickHandler => ({ hit }) => (
  <div>
    <Link to={`/blog/` + hit.slug} onClick={clickHandler}>
      <h3>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h3>
    </Link>
    <div>
      &nbsp;
      <Highlight attribute="date" hit={hit} tagName="mark" />
      &emsp;
      &nbsp;
      {hit.tags.map((tag, index) => (
        <Fragment key={tag}>
          {index > 0 && ", "}
          <Link to={`blog/` + tag.toLowerCase().replace(` `, `-`)}>{tag}</Link>
        </Fragment>
      ))}
    </div>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
);

export default PostHit;
