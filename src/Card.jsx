import React from 'react'
import './Card.css'

const Card = ({title, flag, capital, cca3}) => {
    //flag, title, capital, cca2
  return (
    <div className="card__wrapper">
        <img className="card__flag" src={flag} alt="flag" />
        <div className="card__text">
            <div className='card__title'>{title}</div>
            <div className="card__capital">{capital}</div>
            <div className="card__ccn3">
                <p>{cca3}</p>
            </div>
        </div>
    </div>
  )
}

export default Card