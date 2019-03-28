import React, { Component, createRef } from "react";
import styled from 'styled-components';
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Index,
  connectStateResults
} from "react-instantsearch-dom";

import { Root, HitsWrapper, By } from "./styles";
import Input from "./Input";
import Results from './components/Results';

const Stats = connectStateResults(
  ({ searchResults: res }) =>
    res && res.nbHits > 0 && `${res.nbHits} kết quả`
);

const StyledSearch = styled.div`
  position: relative;
  z-index: 9999;
  background: #fff;
`;

class Search extends Component {
  state = {
    query: '',
    focussed: false,
    page: 0,
    ref: createRef()
  }

  searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )

  updateState = state => {
    this.setState(state);
  }

  focus = () => {
    this.setState({ focussed: true });
  }

  render() {
    const { query, focussed, ref } = this.state;
    const { hitsAsGrid, indices } = this.props;
    return (
      <StyledSearch>
        <InstantSearch
          indexName={indices[0].name}
          searchClient={this.searchClient}
          onSearchStateChange={this.updateState}
          root={{ Root, props: { ref } }}
        >
          <Input onFocus={this.focus} {...{ focussed }} />
          <HitsWrapper
            show={query.length > 0 && focussed}
            hitsAsGrid={hitsAsGrid}
          >
            {indices.map(({ name, title }) => {
              return (
                <Index key={name} indexName={name}>
                  <header>
                    {title && <strong>{title}</strong>}
                    <Stats />
                  </header>
                  <Results />
                </Index>
              );
            })}
            <By>
              Dịch vụ tìm kiếm của{" "}
              <a href="https://www.algolia.com">
                Algolia
              </a>
            </By>
          </HitsWrapper>
        </InstantSearch>
      </StyledSearch>
    );
  }
}

export default Search;
