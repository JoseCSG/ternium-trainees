import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

const Card = ({nombre, img}) => {
  return (
    <Link to={'https://www.google.com/'} className='Link'>
      <article className= 'tarjeta'>
        <img src= {img} alt= {nombre} className='imagen'></img>
        <p>{nombre}</p>
      </article>
    </Link>
  )
}

export default Card