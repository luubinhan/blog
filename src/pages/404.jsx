import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from "gatsby-link"

class NotFound extends Component {

  render() {   
    return (
			<div className="fourzerofour">
        <div className="inner">
			    <h1>404. Whoops!</h1>	    
			    <p>Internet quá rộng lớn, đừng để lạc mất nhau!</p>            
          <Link to="/" className="btn btn-light">
			    	<i className="ion-arrow-left-c"></i> Quay lại trang chủ
          </Link>          
        </div>
			</div>
    )
  }
}
export default NotFound;