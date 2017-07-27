import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import PostMeta from '../PostMeta'

import './Card.scss';

class Card extends Component{

	static propTypes = {
		title: PropTypes.string,
		desc: PropTypes.string,
        imgUrl: PropTypes.string,
        href: PropTypes.string,
        tags: PropTypes.string
	}
	static defaultProps = {
	  title: '',
	  desc: '',
      imgUrl: '',
      tags: '',
      href: '#',
	};

	constructor(props) {
		super(props);
	}


	render(){
		let {title, desc, imgUrl, href, tags} = this.props;

		return(			
			<div className="card-block">
                <article>
                    <div className="inner">
                        {imgUrl !== '' &&
                            <div className="card-figure">
                                <Link to={href}>
                                    <img src={imgUrl} alt={ title + "-" + desc } title={desc} />
                                </Link>
                            </div>
                        }

                        <div className="card-body">
                            {title !== '' &&
                                <header className="card-title">
                                    <h3>
                                        <Link to={href}>{title}</Link>
                                    </h3>
                                </header>      
                            }
                            {desc !== '' &&
                                <div className="card-desc">
                                {desc}
                                </div>
                            }                            
                            {this.props.children}
                        </div>
                        
						
                        <footer className="card-footer clearfix">
                            <PostMeta tags={tags} />
                        </footer>
                        
                    </div>
                </article>
            </div>
		);
	}
}

export default Card;