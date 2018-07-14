import React,{Component} from 'react';
import PropTypes from 'prop-types';

import PostMeta from '../PostMeta'

import './CardPortfolio.scss';

class CardPortfolio extends Component{

	static propTypes = {
		title: PropTypes.string,
		desc: PropTypes.string,
    imgUrl: PropTypes.string,
    href: PropTypes.string,
    tags: PropTypes.array,
    className: PropTypes.string,
	}
	static defaultProps = {
		title: '',
		desc: '',
		imgUrl: '',
		tags: [],
		href: '',
	};

	constructor(props) {
		super(props);
	}

	render(){
		let {title, desc, imgUrl, href, tags} = this.props;

		return(			
			<div className={"grid__item " }>
          <div className="grid__link">
              
                  {imgUrl !== '' &&
                  <img className="grid__img" src={imgUrl} alt={ title + "-" + desc } title={desc} />
                  }

                  <div className="card-portfolio-body">
                      {title !== '' &&
                          <header className="card-portfolio-title">
                              
                            <a href={href} target="_blank">{title}<i className="ion-android-open"></i></a> 
                              
                          </header>      
                      }
                      {desc !== '' &&
                          <div className="card-portfolio-desc">
                          {desc}
                          </div>
                      }                            
                      {this.props.children}
                  </div>
                  
			
                  <footer className="card-portfolio-footer clearfix">
                      <PostMeta tags={tags} />
                  </footer>
                  
              
          </div>
      </div>
		);
	}
}

export default CardPortfolio;