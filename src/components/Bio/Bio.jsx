import React from "react"
import GatsbyLink from 'gatsby-link';


import './Bio.scss'

export default function Bio({img = '',href ='', name='', desc=''}){
 
    return (
      <div className="bio">
        <GatsbyLink to={href} className="bio-wrapper">
          <div className="bio-img">
            <img src={img} alt={name} />
          </div>
          <div className="bio-content">
            <div className="bio-name">
              {name}
            </div>
            <div className="bio-desc">
              {desc}
            </div>
          </div>
        </GatsbyLink>
      </div>
    )
 
}