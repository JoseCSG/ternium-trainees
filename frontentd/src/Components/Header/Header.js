import React from 'react'
import Tabs from '../Tabs/Tabs'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <Tabs text = "Inicio"/>
        <Tabs text = "Cursos"/>
        <Tabs text = "Perfil"/>

    </div>
  )
}

export default Header