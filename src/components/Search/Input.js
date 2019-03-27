import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";

import { SearchIcon, Form, Input } from "./styles";

export default connectSearchBox(({ refine, ...rest }) => (
  <Form>
    <input
      type="text"
      placeholder="Search"
      aria-label="Search"
      onChange={e => refine(e.target.value)}
      {...rest}
    />
    <SearchIcon />
  </Form>
))
;
