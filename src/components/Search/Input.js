import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import {
  IoIosSearchStrong
} from "react-icons/lib/io";
import styled from 'styled-components';

export const SearchClear = styled.button`
  position: absolute;
  right: 12px;
  top: 12px;
  cursor: pointer;
  background: #33c4c2;
  color: #fff;
  font-weight: bold;
  border-radius: 2px;
  border: none;
  padding: 4px 10px;
  z-index: 9;
  svg {
    font-size: 20px;
  }
`;

import { SearchIcon, Form, Input } from "./styles";

export default connectSearchBox(({ refine, ...rest }) => {
  return (
    <Form>
      <Input
        type="text"
        placeholder="Tìm bài viết"
        aria-label="Search"
        onChange={e => refine(e.target.value)}
        {...rest}
      />
      <SearchIcon>
        <IoIosSearchStrong />
      </SearchIcon>
      {rest.currentRefinement && (
        <SearchClear onClick={e => refine('')}>
          XÓA
        </SearchClear>
      )}
    </Form>
  );
});
