import React, { Component } from 'react';
import Link from "gatsby-link";

import "./Search.scss";

// Search component
class Search extends Component {
  state = {
    query: '',
    results: []
  }
  getSearchResults(query) {
    var index = window.__FLEXSEARCH__.vi.index;
    var store = window.__FLEXSEARCH__.vi.store;
    if (!query || !index) {
      return [];
    } else {
      var results = [];
      Object.keys(index).forEach(idx => {
        results.push(...index[idx].values.search(query));
      });

      results = Array.from(new Set(results));

      var nodes = store
        .filter(node => (results.includes(node.id) ? node : null))
        .map(node => node.node);

      return nodes;
    }
  }

  search = event => {
    const query = event.target.value;
    if (this.state.query.length > 2) {
      const results = this.getSearchResults(query);
      this.setState({ results: results, query: query });
    } else {
      this.setState({ results: [], query: query });
    }
  }

  handleClear = () => {
    this.setState({ results: [], query: '' });
  }

  render() {
    const ResultList = () => {
      if (this.state.results.length > 0) {
        return this.state.results.map((page, i) => (
          <div className="item-search" key={i}>
            <h4><Link to={page.url} className="link">{page.title} </Link></h4>
          </div>
        ));
      } else if (this.state.query.length > 2) {
        return <div className="item-search">Không có kết quả nào cho  {this.state.query}</div>;
      } else if (
        this.state.results.length === 0 &&
        this.state.query.length > 0
      ) {
        return <div className="item-search">Bạn nhập ít nhất 3 ký tự nhé</div>;
      } else {
        return '';
      }
    };

    return (
      <div className={`search__container ${this.props.classNames}`}>
        <input
          className="search__input"
          type="text"
          onChange={this.search}
          placeholder={'Tìm bài viết'}
        />
        {this.state.query !== '' && (
          <button className="search_clear" onClick={this.handleClear}>X</button>
        )}
        <div className="search__list">
          <ResultList />
        </div>
      </div>
    );
  }
}

export default Search;
