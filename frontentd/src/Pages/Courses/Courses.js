import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


/*const Courses = () => {

  const [courses, setCourses] = useState([])

  const loadCourses = () => {
    fetch('http://localhost:4000/courses')
    .then(res => res.json())
    .then(data => {setCourses(data)})
    .catch(error => {console.error(error)})
  //Recuperamos los cursos de la api de la base de datos
  const loadCourses = async () => {
    try
    {
        const response = await fetch('http://localhost:4000/api/cursos')
        
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
  
  console.log(courses)
  return (
    <div>
      {courses.map(course => {
        return (
          <h1>{course.name}</h1>
        )
      })}


  return (
    <div className='page'>
      <Header name= "Cursos" />
      <h1>Cursos a realizar</h1>
      <br></br>
      <div className='container'>
        {/* Iteramos en el arreglo de cursos, y por cada elemento de cursos
            renderizamos una tarjeta con su información 
        {courses.map((course) => {
          return <Card nombre= {course.nombre} img = {course.img}/>;
        })}
      </div>
    </div>
  )
}*/

const Courses =() => 
{

  //const [nombre, setNombre] = useState("");

  /*const getCurso = () => {
    fetch('http://localhost:4000/getCourse',{method: "get",body:JSON.stringify({nombre}),
    headers: {
        'Content-Type': 'application/json'
    }})
    .then(res => res.json())
    .catch(error => {console.error(error)})
  }*/

  return(
    <div>
      <h1 className='text-center my-5'>Courses</h1>
      <div className='container'>
        {/*PRIMERA FILA */}
        <div className='row'>

          {/*TARJETA 1 ROW 1 */}
          <div className='col-md-3'>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://www.eleconomista.com.mx/__export/1676426202807/sites/eleconomista/img/2023/02/14/ternium_plantas_mexico_nl_cortesia.png_1902800913.png" />
            <Card.Body>
              <Card.Title>curso 1</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          </div>

          {/*TARJETA 2 ROW 1 */}
          <div className='col-md-3'>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://www.eleconomista.com.mx/__export/1676426202807/sites/eleconomista/img/2023/02/14/ternium_plantas_mexico_nl_cortesia.png_1902800913.png" />
            <Card.Body>
              <Card.Title>curso 2</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          </div>

          {/*TARJETA 3 ROW 1 */}
          <div className='col-md-3'>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://www.eleconomista.com.mx/__export/1676426202807/sites/eleconomista/img/2023/02/14/ternium_plantas_mexico_nl_cortesia.png_1902800913.png" />
            <Card.Body>
              <Card.Title>curso 3</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          </div>

          {/*TARJETA 4 ROW 1 */}
          <div className='col-md-3'>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://www.eleconomista.com.mx/__export/1676426202807/sites/eleconomista/img/2023/02/14/ternium_plantas_mexico_nl_cortesia.png_1902800913.png" />
            <Card.Body>
              <Card.Title>curso 4</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          </div>

        </div>

      </div>
    </div>

  );
}

export default Courses