import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getAreas } from '../../api/auth'


const CursoCreate = () => {
    const navigate = useNavigate()

    const [areas, setAreas] = useState([])
    const[cursoInfo,setCursoInfo]=useState({
        nombre: "",
        idarea: "",

    })

    const handleInput = (e) => {
        e.persist();
        setCursoInfo({...cursoInfo,[e.target.name]:e.target.value})
    }
    const handleAreaSelection = (e) => {
        const selectedArea = areas.find((area) => area.idArea === parseInt(e.target.value));
        setCursoInfo({ ...cursoInfo, idarea: selectedArea.idArea });
      };

    const creaCurso = async (e) => {
        e.preventDefault();
        try {
            const data ={
                nombre: cursoInfo.nombre,
                idarea: cursoInfo.idarea,
            }
            const response = await axios.post(`http://localhost:4000/api/addcurso`,data)
            console.log(response)
            navigate("/data")
        } catch (error) {
            console.log(error.message)
        }
    }
    const loadAreas = async () => {
        try {
            const {data} = await getAreas();
            setAreas(data)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect (() => {
        loadAreas();
    },[]);

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
                                    <label>Area</label>
                                    <select type="number" name="idarea" value={cursoInfo.idarea} onChange={handleAreaSelection} className="form-control">
                                        {areas.map((area) => (
                                            <option value={area.idArea}>{area.nombre}</option>
                                        ))}
                                    </select>
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