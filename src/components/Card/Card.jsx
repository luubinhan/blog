import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import './Card.scss';

class Card extends Component{

	static propTypes = {
		name: PropTypes.string,
		desc: PropTypes.string,
        imgUrl: PropTypes.string,
        link: PropTypes.string,
	}
	static defaultProps = {
	  name: '',
	  desc: '',
      imgUrl: '',
      link: '#',
	};

	constructor(props) {
		super(props);
	}


	render(){
		let {name, desc, imgUrl, link} = this.props;
		return(			
			<div className="card-block">
                <article>
                    <div className="inner">
                        {imgUrl !== '' &&
                            <div className="card-figure">
                                <Link to={link}>
                                    <img src={imgUrl} alt={ name + "-" + desc } title={desc} />
                                </Link>
                            </div>
                        }

                        <div className="card-body">
                            {name !== '' &&
                                <header className="card-title">
                                    <h3>
                                        <Link to={link}>{name}</Link>
                                    </h3>
                                </header>      
                            }
                            {desc !== '' &&
                                <div className="card-desc">
                                {desc}
                                </div>
                            }
                        </div>
                        
                        <footer className="card-footer clearfix">
                            <div className="grid-50">
                                1 week agos
                            </div>
                            <div className="grid-50">
                                442 comments
                            </div>
                        </footer>
                    </div>
                </article>
            </div>
		);
	}
}

export default Card;