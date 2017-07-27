import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import Navigation from '../Navigation';
import './Toolbar.scss'
import {SITE_CONFIG} from '../../config'

class Toolbar extends React.Component{
	render(){
		return(
			
			<div id="toolbar" className="toolbarComponent hidden-xs">
				<nav className="toolbar" >
				  <div className="toolbar-inner">
				    <div className="container">
				      <div className="row">
				        <div className="col-md-6 col-sm-6 col-xs-12 col-lg-4">
				          <div className="topnote">
				            {SITE_CONFIG.phone} - {SITE_CONFIG.email}
				          </div>
				        </div>
				        <div className="col-md-6 col-sm-6 col-xs-12 col-lg-8">
				          <ul className="nav navbar-nav top-nav">
				            <li className="active"><a href="3-page.html">Trending</a></li>
				            <li><a href="3-page.html">Join</a></li>
				            <li><a href="3-page.html">Sign In</a></li>
				            <li className="dropdown">
				              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">My Account<span className="caret"></span></a>
				              <ul className="dropdown-menu">
				                <li className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--dashboard is-active">
				                    <a href="/my-account/">Dashboard</a>
				                </li>
				                <li className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--orders">
				                    <a href="/my-account/orders/">Orders</a>
				                </li>
				                <li className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--downloads">
				                    <a href="/my-account/downloads/">Downloads</a>
				                </li>
				                <li className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--edit-address">
				                    <a href="/my-account/edit-address/">Addresses</a>
				                </li>
				                <li className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--edit-account">
				                    <a href="/my-account/edit-account/">Account Details</a>
				                </li>
				                <li className="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--customer-logout">
				                    <a href="/my-account/customer-logout/">Logout</a>
				                </li>
				              </ul>              
				            </li>
				          </ul>
				        </div>
				      </div>
				    </div>
				  </div>
				</nav>
			</div>
		);
	}
}

export default Toolbar;