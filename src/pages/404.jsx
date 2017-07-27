import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from "gatsby-link"

class NotFound extends Component {

  render() {   
    return (
			<div className="fourzerofour">
			    <h1>404. Whoops!</h1>	    
			    <p>We could not find the page you were looking for.</p>            
          <Link to="/" className="btn btn-primary">
			    	<i className="ion-arrow-left-c"></i> Back to home
          </Link>          
			</div>
    )
  }
}


export default NotFound;