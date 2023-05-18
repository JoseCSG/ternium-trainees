import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'

const Courses = () => {

  const [courses, setCourses] = useState([])

  const loadCourses = () => {
    fetch('http://localhost:4000/cursos')
    .then(res => res.json())
    .then(data => {setCourses(data)})
    .catch(error => {console.error(error)})
  }
  useEffect(() => {
    loadCourses()
  }, [])
  console.log(courses)
  return (
    <div>
      <Header name= "Cursos"/>
      {courses.map(course => {
        return (
          <h1>{course.name}</h1>
        )
      })}

    </div>
  )
}

export default Courses