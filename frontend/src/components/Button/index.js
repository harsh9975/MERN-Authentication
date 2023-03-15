import React from 'react'
import './button.css'

export const PrimaryButton = ({label,onClick,style}) => {
  return (
    <div className='button-container'>
        <button className='primary-button' style={style} onClick={onClick}>{label}</button>
    </div>
  )
}

export const SecondaryButton = ({label,onClick,style}) => {
    return (
      <div className='button-container'>
          <button className='secondary-button' style={style} onClick={onClick}>{label}</button>
      </div>
    )
  }