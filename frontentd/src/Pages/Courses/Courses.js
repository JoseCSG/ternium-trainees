import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import Card from '../../Components/Card/Card'
import '../Courses/Courses.css'

const Courses = () => {

  const [courses, setCourses] = useState([])

  //Recuperamos los cursos de la api de la base de datos
  const loadCourses = async () => {
    try
    {
        const response = await fetch('http://localhost:4000/cursos')
        
        //La parseamos a JSON y lo asignamos a la variable de cursos
        const jsonData = await response.json()
        setCourses(jsonData)
    }
    catch(error)
    {
      console.log(error.message);
    }
  }

  //La neta no se bien que hace esto, pero es necesario ajjasj
  useEffect(() => {
    loadCourses()
  }, [])

  return (
    <div className='page'>
      <Header name= "Cursos" />
      <h1>Cursos a realizar</h1>
      <br></br>
      <div className='container'>
        {/* Iteramos en el arreglo de cursos, y por cada elemento de cursos
            renderizamos una tarjeta con su información */}
        {courses.map((course) => {
          return <Card nombre= {course.nombre} img = {course.img}/>;
        })}
      </div>
    </div>
  )
}

export default Courses