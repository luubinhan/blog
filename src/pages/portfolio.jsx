import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from "react-helmet"

import PageHero from '../components/PageHero';
import Card from '../components/Card';

const PORTFOLIO = [
  {
    id: 1,
    name: 'Play Sai Gon',
    imgUrl: 'http://placehold.it/400x300',
    desc: '',
  },
  {
    id: 2,
    name: 'Glow Bar',
    imgUrl: 'http://placehold.it/400x300',
    desc: '',
  },
  {
    id: 3,
    name: 'Ensure',
    imgUrl: 'http://placehold.it/400x300',
    desc: '',
  },
  {
    id: 4,
    name: '7 Up Vintage',
    imgUrl: 'http://placehold.it/400x300',
    desc: '',
  },
  {
    id: 5,
    name: 'Sting Tet 2017',
    imgUrl: 'http://placehold.it/400x300',
    desc: '',
  },
  {
    id: 6,
    name: 'Pepsi',
    imgUrl: 'http://placehold.it/400x300',
    desc: '',
  }
]

class Portfolio extends Component {

  render() {    
    return (
		<div className="page-portfolio">		
      <Helmet
        title="Portfolio | FrontEnd Developer live in Ho Chi Minh City"
        meta={[
          { name: 'description', content: 'luckyluu FrontEnd Developer live in Ho Chi Minh City' },
          { name: 'keywords', content: 'frontend,developer,wordpress,react,hochiminh,web-developer' },
        ]}
      />	
      <div className="master">
        <div className="master-inner">
    			<div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-3">
                <PageHero title="Portfolio" desc="My blood-sweat-tears and cheers." />
              </div>
              <div className="col-md-9 col-sm-9">
                <div className="row">
                  {
                    PORTFOLIO.map( item => {
                      return <div className="col-md-4 col-sm-6"><Card {...item} /></div>
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>			
      </div>
		</div>
    )
  }
}


export default Portfolio;