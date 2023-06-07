import React from "react";
import { useState,useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";


function DataEdit ()
{
    const navigate = useNavigate();
    let {idempleadoinfo} = useParams();

    const [usuario,setUsuario]=useState({
        nombre: "",
        apellidopaterno: "",
        apellidomaterno: "",
        genero: "",
        fechanacimiento: "",
        pais: "",
        idempleado: "",
        idarea: ""
    });

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`http://localhost:4000/api/data/get/${idempleadoinfo}`);
            setUsuario(data[0]);
          } catch (error) {
            console.log(error);
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
                idarea:usuario.idarea
            }
            console.log("Antes del post")
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
                                        <input tEstadoype="text" name="apellidopaterno" value={usuario.apellidopaterno} onChange={handleInput2} className="form-control"/>
                                    </div>

                                    <div className="mb-3">
                                        <label>Apellido Materno</label>
                                        <input tEstadoype="text" name="apellidomaterno" value={usuario.apellidomaterno} onChange={handleInput2} className="form-control"/>
                                    </div>

                                    <div className="mb-3">
                                        <label>Genero</label>
                                        <input tEstadoype="text" name="genero" value={usuario.genero} onChange={handleInput2} className="form-control"/>
                                    </div>

                                    <div className="mb-3">
                                        <label>Fecha Nacimiento</label>
                                        <input type="date" name="fechanacimiento" value={usuario.fechanacimiento} onChange={handleInput2} className="form-control"/>
                                    </div>

                                    <div className="mb-3">
                                        <label>Pais</label>
                                        <input tEstadoype="text" name="pais" value={usuario.pais} onChange={handleInput2} className="form-control"/>
                                    </div>

                                    <div className="mb-3">
                                        <label>Area</label>
                                        <input type="number" name="idarea" value={usuario.idarea} onChange={handleInput2} className="form-control"/>
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

export default DataEdit