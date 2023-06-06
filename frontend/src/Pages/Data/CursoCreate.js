import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


const CursoCreate = () => {
    //const navigator = useNavigate()

    const[cursoInfo,setCursoInfo]=useState({
        nombre: "",
        idarea: "",

    })

    const handleInput = (e) => {
        e.persist();
        setCursoInfo({...cursoInfo,[e.target.name]:e.target.value})
    }

    const creaCurso = async (e) => {
        e.preventDefault();
        const data ={
            nombre: cursoInfo.nombre,
            idarea: cursoInfo.idarea,

        }

        axios.post(`http://localhost:4000/api/addcurso`,data)
        .then (res=> {
            alert(res.data.message)
        })
        //navigator("/data")
        .catch (function(error){
            console.error(error)
        })

    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4> Agrega Curso
                                <Link to="/data" className='btn btn-danger float-end'>Back</Link>
                            </h4>
                        </div>
                        <div className='card-body'>
                            <form>
                                <div className="mb-3">
                                    <label>Nombre</label>
                                    <input type="text" name="nombre" value={cursoInfo.nombre} onChange={handleInput} className="form-control"/>
                                </div>
                                        
                                <div className="mb-3">
                                    <label>ID Area</label>
                                    <input type="text" name="idarea" value={cursoInfo.idarea} onChange={handleInput} className="form-control"/>
                                </div>

    
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary"  onClick={creaCurso}>Agregar Curso</button>
                                </div>
                            </form>                
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
}

export default CursoCreate