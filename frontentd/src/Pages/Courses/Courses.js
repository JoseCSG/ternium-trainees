import './Courses.css';
import CardCourse from '../../Components/Card/CardCourse';
import { useState, useEffect } from 'react';
import { getCursosEmpleado } from '../../api/auth';
import ProgressBar from '../../Components/ProgressBar';

const Courses =() => {
  const [cursosCompletados, setCursosCompletados] = useState([])
  const [cursosEnProceso, setCursosEnProceso] = useState([])
  const [porcentaje, setPorcentaje] = useState(0)	

  const loadCourses = async () => {
    const idJSON = {
      "idempleado": localStorage.getItem('idEmpleado')
    }
    const {data} = await getCursosEmpleado(idJSON)
    const cursosCompletados = data.filter((curso) => curso.estado === true)
    const cursosEnProceso = data.filter((curso) => curso.estado === false)
    console.log(cursosCompletados)
    console.log(cursosEnProceso)

    setCursosCompletados(cursosCompletados)
    setCursosEnProceso(cursosEnProceso)
  }
  const calcularPorcentaje = () => {
    const cursosCompletos = cursosCompletados.length
    const cursosProceso = cursosEnProceso.length
    const totalCursos = cursosCompletos + cursosProceso
    if(totalCursos > 0){
      const total = cursosCompletos/totalCursos * 100
      setPorcentaje(Math.round(total))
    }
    else {
      setPorcentaje(0)
    }
  }

  useEffect(() => {
    loadCourses();
  }, []) 

  useEffect(() => {
    calcularPorcentaje();
  }, [cursosCompletados, cursosEnProceso]);

  return(
    <div>
      <h1 className='text-center my-5'>Cursos</h1>
      <div className='container' style={{backgroundColor: 'rgb(212, 212, 212)'}}>
        <ProgressBar porcentaje={porcentaje}/>
        {/*PRIMERA FILA */}
        <div className='row'>
          <h3 className='text-center my-3'>{porcentaje}%</h3>

          {
            cursosEnProceso.map((course) => {
              return <CardCourse nombre= {course.nombre} img = {course.imagenURL} status = {course.estado}/>;
            })
          }
          {
            cursosCompletados.map((course) => {
              return <CardCourse nombre= {course.nombre} img = {course.imagenURL} status = {course.estado}/>;
            })
          }
        </div>
      </div>
    </div>

  );
}

export default Courses