import React from 'react'
import "./card.css"

const Cards = ({children,style}) => {
  return (
    <div style={style} className="card-container">{children}</div>
  )
}

export default Cards