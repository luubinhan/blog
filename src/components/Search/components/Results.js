import React from 'react';
import {
  connectStateResults
} from "react-instantsearch-dom";
import Hit from './Hit';

const Results = connectStateResults(
  ({ searchState, searchResults }) => {
    if (!searchResults || !searchResults.nbHits) {
      return <div>Không tìm thấy kết quả cho ${searchState.query}</div>;
    }
    const listResult = searchResults && searchResults.hits && searchResults.hits.map((item, index) => (
      <Hit key={index} hit={item} />
    ));
    return (
      <div>
        {listResult}
      </div>
    );
  }
);

export default Results;
