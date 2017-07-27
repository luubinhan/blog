import React,{Component} from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'

import './ProfileHero.scss';

class ProfileHero extends Component {
  static propTypes = {
    name: PropTypes.string,
    img: PropTypes.string,
    position: PropTypes.string,
  }
  static defaultProps = {
    name: '',
    img: '',
    position: '',
  }

  constructor(props) {
    super(props);    
  }
  render(){
    let {img,name,position} = this.props;
    return (
      <div className="hero-profile">
        <div className="hero-avatar">
          <img src={img} alt="" />
        </div>
        <header className="profile-block">
          <div className="profile-name">
            {name}
          </div>
          <div className="profile-position">
            {position}
          </div>
          <div className="profile-desc">
            {this.props.children}
          </div>
        </header>
      </div>
    );  
  }
  
}
export default ProfileHero