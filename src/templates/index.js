import React from "react";
import Helmet from "react-helmet";
import { random, isEmpty } from "lodash";
import Link from "gatsby-link";

import PostListing from "../components/PostListing/PostListing";
import config from "../../data/SiteConfig";

const NavLink = props => {
  if (!props.test) {
    return (
      <Link className="btn btn-light" to={`/${props.url}`}>
        {props.text}
      </Link>
    );
  }
  return <span className="btn btn-light disabled">{props.text}</span>;
};

class IndexPage extends React.Component {
  render() {
    const { data, pathContext } = this.props;
    const { group, index, first, last, pageCount } = pathContext;
    const previousUrl = (index - 1 === 1) ? "" : (index - 1).toString();
    const nextUrl = (index + 1).toString();
    return (
      <div className="master">
        <Helmet>
          <title>{config.siteTitle + ' - ' + config.siteDescription}</title>
          <meta name="description" content="Nơi mình chia sẽ kiến thức frontend, css, html, javascript, các framework như React, Vuejs, React Native" />
        </Helmet>
        <main className="inner">
          <h1 style={{display: "none"}}>{config.siteTitle + ' - ' + config.siteDescription}</h1>
          
          {!isEmpty(group) && <PostListing postEdges={group} />}
          <div className="pagination">
            <NavLink test={first} url={previousUrl} text="Trang Trước" />
            <NavLink test={last} url={nextUrl} text="Trang Sau" />
          </div>
        </main>
        <div className="aside"/>
      </div>
    );
  }
}

export default IndexPage;
