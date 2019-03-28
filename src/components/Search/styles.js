import styled, { css } from "styled-components";

export const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
`;

export const SearchIcon = styled.div`
  width: 20px;
  position: absolute;
  left: 12px;
  top: 9px;
  pointer-events: none;
  svg {
    font-size: 20px;
  }
`;

const focussed = css`
  background: ${props => props.theme.white};
  color: ${props => props.theme.darkBlue};
  cursor: text;
  width: 5em;
  + ${SearchIcon} {
    color: ${props => props.theme.darkBlue};
    margin: 0.3em;
  }
`;

export const Input = styled.input`
  font-size: 1em;
  padding: 12px 20px;
  padding-left: 40px;
  font-size: 1.3em;
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #eee;
  opacity: .8;
  border-radius: 3px;
  &:focus {
    opacity: 1;
    outline: none;
    -webkit-box-shadow: 0 0 0 2px #27c5c3;
    box-shadow: 0 0 0 2px #27c5c3;
    border-color: #27c5c3;
  }
`;

export const Form = styled.div`
  position: relative;
`;

const list = css`
  position: absolute;
  right: 0;
  top: 100%;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 0 5px rgba(0,0,0,.2);
  padding: 20px 20px 0;
  ul {
    display: inline-flex;
  }
`;

const grid = css`
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
    grid-gap: 1em;
    li {
      padding: 0.3em 0.5em;
      background: ${props => props.theme.veryLightGray};
      border-radius: ${props => props.theme.smallBorderRadius};
    }
  }
`;

export const HitsWrapper = styled.div`
  display: ${props => (props.show ? `block` : `none`)};
  max-height: 80vh;
  overflow-y: auto;
  z-index: 9999;
  position: relative;
  background: #fff;
  left: 0;
  &::-webkit-scrollbar {
    width: 20px;
    height: 20px;
  }
  &::-webkit-scrollbar-track {
    background: #f0f0f0;
  }
  &::-webkit-scrollbar-corner {
    background: #000; 
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: #13c4c1;
    background: -moz-linear-gradient(top, #13c4c1 0%, #3cc4c2 40%, #27c5c3 100%);
    background: -webkit-linear-gradient(top, #13c4c1 0%,#3cc4c2 40%,#27c5c3 100%);
    background: linear-gradient(to bottom, #13c4c1 0%,#3cc4c2 40%,#27c5c3 100%);
    -webkit-box-shadow:inset 0 0 2px 2px rgba(0,0,0,.1);
    box-shadow:inset 0 0 2px 2px rgba(0,0,0,.1);
  }
  ${props => (props.hitsAsGrid ? grid : list)};
  ul {
    list-style: none;
  }
  mark {
    color: ${props => props.theme.lightBlue};
    background: ${props => props.theme.darkBlue};
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3em;
    h3 {
      color: ${props => props.theme.white};
      background: ${props => props.theme.gray};
      padding: 0.1em 0.4em;
      border-radius: ${props => props.theme.smallBorderRadius};
    }
  }
  h3 {
    margin: 0 0 0.5em;
  }
  h4 {
    margin-bottom: 0.3em;
  }
`;

export const By = styled.div`
  font-size: 0.7em;
  text-align: right;
  padding: 0;
  background: #fafafa;
  padding: 9px 15px;
  margin-top: 30px;
  margin-left: -20px;
  margin-right: -20px;
`;
