import React, { Component, createRef } from "react";
import styled from 'styled-components';
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Index,
  Hits,
  connectStateResults
} from "react-instantsearch-dom";

import { Root, HitsWrapper, By } from "./styles";
import Input from "./Input";
import PostHit from './PostHit';
import * as hitComps from "./hits";

const events = ["mousedown", "touchstart"];

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) => {
    console.log(res);
    return res && res.nbHits ? children : `No results for ${state.query}`;
  }
);

const Stats = connectStateResults(
  ({ searchResults: res }) =>
    res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
);

const StyledSearch = styled.div`
  position: relative;
  z-index: 9999;
  background: #fff;
`;

class Search extends Component {
  state = { query: ``, focussed: false, ref: createRef() }

  componentDidMount() {
    events.forEach(event =>
      document.addEventListener(event, this.handleClickOutside)
    );
  }

  componentWillUnmount() {
    events.forEach(event =>
      document.removeEventListener(event, this.handleClickOutside)
    );
  }

  searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )

  updateState = state => this.setState(state)

  focus = () => {
    this.setState({ focussed: true });
  }

  disableHits = () => {
    this.setState({ focussed: false });
  }

  handleClickOutside = event => {
    /* if (!this.state.ref.current.contains(event.target)) {
      this.setState({ focussed: false });
    } */
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
                    {title && <h2>{title}</h2>}
                    <Stats />
                  </header>
                  <Results>
                    <Hits hitComponent={PostHit} />
                  </Results>
                </Index>
              );
            })}
            <By>
              Powered by{" "}
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
