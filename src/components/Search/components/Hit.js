import React from 'react';
import { Highlight, Snippet } from "react-instantsearch-dom";
import Link from "gatsby-link";
import styled from 'styled-components';
import PostTags from '../../PostTags';

const StyledHit = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px dashed rgba(0,0,0,.1);
`;

const Hit = ({
  hit
}) => {
  return (
    <StyledHit>
      <Link to={hit.fields.slug}>
        <h3>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </h3>
      </Link>
      <div style={{ display: 'flex' }}>
        <Highlight attribute="date" hit={hit} tagName="mark" />
        <div style={{ paddingLeft: 10 }}>
          <PostTags list={hit.tags} />
        </div>
      </div>
      <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </StyledHit>
  );
};

export default Hit;
