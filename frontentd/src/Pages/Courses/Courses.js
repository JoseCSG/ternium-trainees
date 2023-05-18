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
    <div>
      <Header name="Cursos" />
      <div className='container'>
        {courses.map((course) => {
          return <Card name={course.name}/>;
        })}
      </div>
    </div>
  )
}

export default Courses