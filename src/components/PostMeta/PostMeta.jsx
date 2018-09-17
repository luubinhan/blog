import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Link from "gatsby-link"
import {isEmpty} from 'lodash'

import './PostMeta.scss';

class PostMeta extends Component {
	render(){
		let {datetime, tags} = this.props;
		return (			
			<div className="post-meta">
				{datetime !== '' && 
				    <div className="post-date">        
				        <time className="dateline" dateTime={datetime} itemProp="dateModified" content={datetime}>{datetime}</time>
				    </div>	
			    }
			    {!isEmpty(tags) &&
				    <div className="post-category">
					    {
					    	tags.map( tag => {
					    		return <Link activeClassName="active" key={tag} to={`/tags/${tag}`}>{tag}</Link>   
					    	})
					    }
				    </div>
			    }	    			    
			</div>	
		);
	}
}
PostMeta.propTypes = {
	datetime: PropTypes.string,
	tags: PropTypes.any
}
PostMeta.defaultProps = {
	datetime: '',
	tags: []
}
export default PostMeta;