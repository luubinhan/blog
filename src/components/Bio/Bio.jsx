import React from "react"


import './Bio.scss'

export default function Bio({img = '',href ='', name='', desc=''}){
 
    return (
      <div className="bio">
        <a href={href} className="bio-wrapper">
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
        </a>
      </div>
    )
 
}