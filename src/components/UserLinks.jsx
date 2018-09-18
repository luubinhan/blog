import React, { Component } from "react";
import { FaGithubAlt, FaTwitter } from "react-icons/lib/fa";
import { MdMessage, MdEmail } from "react-icons/lib/md";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 100%;
`;

const UserIcon = styled.a`
  margin-left: 25px;
  color: white;
  &:hover {
    color: rgba(0, 0, 0, 0.2);
    border-bottom: none;
  }
`;

const iconStyle = {
  width: "20px",
  height: "20px"
};

class UserLinks extends Component {
  render() {
    return (
      <Container className="user-links">
        <FaGithubAlt style={iconStyle} />
        <FaTwitter style={iconStyle} />
        <MdMessage style={iconStyle} />
        <MdEmail style={iconStyle} />
      </Container>
    );
  }
}

export default UserLinks;
