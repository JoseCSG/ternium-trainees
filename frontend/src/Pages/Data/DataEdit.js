import React from "react";
import { useState,useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import RotacionForm from "../../Components/RotacionForm";
import Button from 'react-bootstrap/Button';
import RemuneracionForm from "../../Components/RemuneracionForm";
import {format} from 'date-fns';

function DataEdit ()
{
    const navigate = useNavigate();
    let {idempleadoinfo} = useParams();
    const [showRotacion, setShowRotacion] = useState(false);
    const [showRemuneracion, setShowRemuneracion] = useState(false);

    const [usuario,setUsuario]=useState({
        nombre: "",
        apellidopaterno: "",
        apellidomaterno: "",
        genero: "",
        fechanacimiento: "",
        pais: "",
        idempleado: "",
        fotoperfil: "",
        fechainicio: "",
        fechagraduacion: "",
        idjefe: ""
    });

    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log(idempleadoinfo)
            const { data } = await axios.get(`http://localhost:4000/api/data/get/${idempleadoinfo}`);
            const formattedDate = format(new Date(data[0].fechanacimiento), 'yyyy-MM-dd');
            setUsuario({...data[0], fechanacimiento: formattedDate});
          } catch (error) {
            alert("Error al cargar el usuario");
          }
        };
      
        fetchData();
      }, [idempleadoinfo]);
      
    const handleInput2 = (e) => {
       // e.persist();
        //setUsuario({...usuario,[e.target.name]:e.target.value})
        setUsuario((prevUsuario)=> ({
            ...prevUsuario,
            [e.target.name]:e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                nombre: usuario.nombre,
                apellidopaterno: usuario.apellidopaterno,
                apellidomaterno: usuario.apellidomaterno,
                genero: usuario.genero,
                fechanacimiento:usuario.fechanacimiento,
                pais:usuario.pais,
                idempleado:usuario.idempleado,
                fotoperfil:usuario.fotoperfil,
                fechainicio:usuario.fechainicio,
                fechagraduacion:usuario.fechagraduacion,
                idjefe:usuario.idjefe,
            }
            console.log(data)
            await axios.put(`http://localhost:4000/api/data/edit/${usuario.idempleado}`,data) //aqui tiene que ir un put
            navigate('/data')
        } catch (error) {
            console.log(error)
            alert("Error al editar el usuario")
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4> Editar Usuario
                                <Link to='/data' className="btn btn-danger float-end">
                                    Back
                                </Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label>Nombre</label>
                                    <input type="text" name="nombre" value={usuario.nombre} onChange={handleInput2} className="form-control"/>
                                </div>

                                <div className="mb-3">
                                    <label>Apellido Paterno</label>
                                    <input type="text" name="apellidopaterno" value={usuario.apellidopaterno} onChange={handleInput2} className="form-control"/>
                                </div>

                                <div className="mb-3">
                                    <label>Apellido Materno</label>
                                    <input type="text" name="apellidomaterno" value={usuario.apellidomaterno} onChange={handleInput2} className="form-control"/>
                                </div>

                                <div className="mb-3">
                                    <label>Genero</label>
                                    <input type="text" name="genero" value={usuario.genero} onChange={handleInput2} className="form-control"/>
                                </div>

                                <div className="mb-3">
                                    <label>Fecha Nacimiento</label>
                                    <input type="date" name="fechanacimiento" value={usuario.fechanacimiento} onChange={handleInput2} className="form-control"/>
                                </div>

                                <div className="mb-3">
                                    <label>Pais</label>
                                    <input type="text" name="pais" value={usuario.pais} onChange={handleInput2} className="form-control"/>
                                </div>

                                <div className="mb-3">
                                        <Button variant="primary" onClick={()=> {setShowRotacion(true)}}>
                                            Cambiar Rotacion
                                        </Button>
                                        <span style={{ marginLeft: '10px' }}></span> {/* Add a span for spacing */}

                                        <Button variant="primary" onClick={()=> {setShowRemuneracion(true)}}>
                                            Cambiar Remuneracion
                                        </Button>

                                    <RotacionForm show = {showRotacion} handleClose={()=> {setShowRotacion(false)}} idArea = {usuario.idarea} id = {idempleadoinfo}/>
                                    <RemuneracionForm show = {showRemuneracion} handleClose={()=> {setShowRemuneracion(false)}} id = {idempleadoinfo}/>
                                </div>

                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary">Actualizar Usuario</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default DataEdit;