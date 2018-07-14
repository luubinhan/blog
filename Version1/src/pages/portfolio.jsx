import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from "react-helmet"

import PageHero from '../components/PageHero'
import CardPortfolio from '../components/CardPortfolio'

import {PRIMARY_NAVIGATION} from '../data'
import logo from "../pages/images/logo.png"
import Navigation from '../components/Navigation'
import Header from '../components/Header'
import Badge from '../components/Badge'

import 'animate.css'


const PORTFOLIO = [
  {
    id: 1,
    name: 'Play Sai Gon',
    imgUrl: 'http://placehold.it/550x320',
    desc: '',
    href: '#',
    tags: ['html','wordpress','web']
  },
  {
    id: 2,
    name: 'Glow Bar',
    imgUrl: 'http://placehold.it/550x320',
    desc: '',
    href: '#',
    tags: ['html','wordpress','web']
  },
  {
    id: 3,
    name: 'Ensure',
    imgUrl: 'http://placehold.it/550x320',
    desc: '',
    href: '#',
    tags: ['html','wordpress','web','2016']
  },
  {
    id: 4,
    name: '7 Up Vintage',
    imgUrl: 'http://placehold.it/550x320',
    desc: '',
    href: '#',
    tags: ['html','wordpress','web','2015']
  },
  {
    id: 5,
    name: 'Sting Tet 2017',
    imgUrl: 'http://placehold.it/550x320',
    desc: '',
    href: '#',
    tags: ['html','wordpress','web','2014']
  },
  {
    id: 6,
    name: 'Pepsi',
    imgUrl: 'http://placehold.it/550x320',
    desc: '',
    href: '#',
    tags: ['html','wordpress','web','2013']
  }
]

/*
Script to insert after component did mount
 */
let scriptToInsert = [ 
    {
   
      src: 'https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js',
      async: true,
    },
    {
   
      src: '/imagesloaded.pkgd.min.js',
      async: true,
    },
    {
   
      src: '/masonry.pkgd.min.js',
      async: true,
    },
    {   
      src: '/main.js',
      async: true,
    }
]

//let evt = new CustomEvent('portfolioChange');

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFilters: [
        {
          slug: 'wordpress',
          name: 'Wordpress',          
          selected: false,
        },
        {
          slug: 'html',
          name: 'HTML-CSS-Javascript',
          selected: false,
        },
        {
          slug: 'website',
          name: 'Website',
          selected: false,
        },
        {
          slug: 'mobile',
          name: 'Mobile App',
          selected: false,
        },
        {
          slug: '2013',
          name: '2013',
          selected: false,
        }
      ],
      allPortfolio: PORTFOLIO,  
     
    }

    this._onFilterClick = this._onFilterClick.bind(this);
  }
  componentDidMount() {

    /** NOT FOR NOW  **/
    for (var i = 0, len = scriptToInsert.length; i < len; i++) {
      
      const script = document.createElement("script");

      script.src = scriptToInsert[i].src;
      script.async = scriptToInsert[i].async;
      //let title = document.head.querySelector("title");
      document.head.insertBefore(script,document.head.firstChild);
      
      //document.head.appendChild(script);
    }
    
    //const test = __PATH_PREFIX__ + '/main.js';
    
  }
  componentDidUpdate(prevProps, prevState) {    
   
  }
 
  _onFilterClick(e, slug){    
    let newAllPortfolio = PORTFOLIO.filter( item => {
      // found this
      return item.tags.indexOf(slug) !== -1;
    })
    this.setState({allPortfolio: newAllPortfolio});
  }
  render() { 
    let navigationList = PRIMARY_NAVIGATION.map(item => {
      if (item.href === '/portfolio') {
        item.isActive = true;
      }
      return item;
    })  
    let {allFilters, allPortfolio} = this.state;
  
    return (
		<div className="page-portfolio">		
      <div className="inner">
        <Helmet
          title="Portfolio | FrontEnd Developer live in Ho Chi Minh City"
          meta={[
            { name: 'description', content: 'luckyluu FrontEnd Developer live in Ho Chi Minh City' },
            { name: 'keywords', content: 'frontend,developer,wordpress,react,hochiminh,web-developer,javascript,html,css,responsive,design' },
          ]}
        />	
        <Header logo={logo} navigationList={navigationList}>
                      
          
        </Header>  
        <div className="master">
          <div className="master-inner">
      			<div className="container">
                <div className="sweat-logan">
                  My blood-sweat-tears and cheers
                </div>
                <div className="filter-block">
                    {allFilters.map( (item,index) => {
                      return <Badge key={index} id={item.slug} onItemClick={this._onFilterClick} type="filter">{item.name}</Badge>
                    })}        
                </div>
                        
                <div className="portfolio-list">
                  
                    { allPortfolio.length !== 0 ?
                      <div>
                        
                        <div className="grid">                          
                          <div className="grid__sizer"></div>
                          {
                            allPortfolio.map( p => {                              
                              return(                                
                                <CardPortfolio key={p.id} key={p.id}  title={p.name} imgUrl={p.imgUrl} href={p.href} tags={p.tags} />     
                              )
                            })
                          }                         
                          
                        </div>                    
                        <div className="align-center">
                          <span className="btn btn-primary">Load More</span>
                        </div>
                      </div>
                      :
                      <div className="not-found-container">
                        <div className="not-found-block">
                          <div>...maybe in the feature...</div>
                          <i className="ion-happy-outline"></i>
                        </div>
                      </div>
                    }
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