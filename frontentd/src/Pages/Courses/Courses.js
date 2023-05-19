import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import Card from '../../Components/Card/Card'
import '../Courses/Courses.css'

const Courses = () => {

  const [courses, setCourses] = useState([])

  const loadCourses = async () => {
    try
    {
        const response = await fetch('http://localhost:4000/cursos')
        const jsonData = await response.json()

        console.log(jsonData)
        setCourses(jsonData)
    }
    catch(error)
    {
      console.log(error.message);
    }
  }

  useEffect(() => {
    loadCourses()
  }, [])
  return (
    <div className='page'>
      <Header name= "Cursos" />
      <h1>Cursos a realizar</h1>
      <br></br>
      <div className='container'>
        {courses.map((course) => {
          return <Card nombre= {course.nombre} img = {course.img}/>;
        })}
      </div>
    </div>
  )
}

export default Courses