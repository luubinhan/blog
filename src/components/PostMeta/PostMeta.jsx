import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Link from "gatsby-link"

import './PostMeta.scss';

class PostMeta extends Component{

	static propTypes = {
		datetime: PropTypes.string,
		tags: PropTypes.array,
	}
	static defaultProps = {
	  datetime: '',	  
	};

	constructor(props) {
		super(props);
	}

	render(){
		let {datetime, tags} = this.props;
		return(			
			<div className="post-meta">
				{datetime !== '' && 
				    <div className="post-date">        
				        <time className="dateline" dateTime={datetime} itemProp="dateModified" content={datetime}>{datetime}</time>
				    </div>	
			    }
			    { tags.length &&
				    <div className="post-category">
					    {
					    	tags.map( tag =>{
					    		return <Link key={tag} to={`/tags/${tag}`}>{tag}</Link>   
					    	})
					    }
				    </div>
			    }	    			    
			</div>	
		);
	}
}

export default PostMeta;