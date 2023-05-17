import React from 'react'
import Tab from '../Tab/Tab'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = ({name}) => {

  return (
    <div className='header'>
        <Link to= "/" className='Link'>
          <Tab text = "Inicio" page = {name} />
        </Link>

        <Link to= "/courses" className='Link'>
          <Tab text = "Cursos" page = {name}/>
        </Link>

        <Link to= "/profile" className='Link'>
          <Tab text = "Perfil" page = {name}/>
        </Link>
    </div>
  )
}

export default Header