import React from 'react'
import Tabs from '../Tabs/Tabs'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
        <Link to= "/" className='Link'>
          <Tabs text = "Inicio" />
        </Link>

        <Link to= "/courses" className='Link'>
          <Tabs text = "Cursos" />
        </Link>

        <Link to= "/profile" className='Link'>
          <Tabs text = "Perfil" />
        </Link>
    </div>
  )
}

export default Header