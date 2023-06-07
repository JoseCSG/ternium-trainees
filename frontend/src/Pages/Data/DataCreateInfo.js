import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIdEmpleado, nuevoEmpleadoInfo } from '../../api/auth';
import { getAreas } from '../../api/auth';

const DataCreateInfo = () => {
  const navigator = useNavigate();
  const [usuarioInfo, setUsuarioInfo] = useState({
    idempleado: "",
    nombre: "",
    apellidopaterno: "",
    apellidomaterno: "",
    genero: "Masculino",
    pais: "",
    fechanacimiento: "",
    fechagraduacion: "",
    idarea: 1,
    idJefe: ""
  });
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    loadAreas();
  }, []);

  const loadAreas = async () => {
    const { data } = await getAreas();
    setAreas(data);
  };

  const handleInput = (e) => {
    e.persist();
    setUsuarioInfo({ ...usuarioInfo, [e.target.name]: e.target.value });
  };

  const handleAreaSelection = (e) => {
    const area = areas.find((area) => area.nombre === e.target.value);
    setUsuarioInfo({ ...usuarioInfo, idarea: area.idArea });
  };

  const handleGenderSelection = (e) => {
    setUsuarioInfo({ ...usuarioInfo, genero: e.target.value });
  };

  const creaInfoUsuario = async (e) => {
    e.preventDefault();
    try {
      const {data} = await getIdEmpleado({ correo: localStorage.getItem("correo") });
      const updatedUsuarioInfo = { ...usuarioInfo, idempleado: data.idEmpleado };
      await nuevoEmpleadoInfo(updatedUsuarioInfo);
      navigator("/data");
    } catch (error) {
      console.log(error);
    }
  };

    return (
    <div className='container mt-5'>
        <div className='row'>
            <div className='col-md-12'>
                <div className='card'>
                    <div className='card-header'>
                        <h4> Agrega Informacion Usuario
                            {/*<Link to="/nuevousuario" className='btn btn-primary float-end'>Agrega Usuario</Link>*/}
                        </h4>
                    </div>

                    <div className='card-body'>
                        <form>
                            <div className="mb-3">
                                <label>Nombre</label>
                                <input type="text" name="nombre" value={usuarioInfo.nombre} onChange={handleInput} className="form-control" required/>
                            </div>

                            <div className="mb-3">
                                <label>Apellido Paterno</label>
                                <input tEstadoype="text" name="apellidopaterno" value={usuarioInfo.apellidopaterno} onChange={handleInput} className="form-control" required/>
                            </div>

                            <div className="mb-3">
                                <label>Apellido Materno</label>
                                <input tEstadoype="text" name="apellidomaterno" value={usuarioInfo.apellidomaterno} onChange={handleInput} className="form-control" required/>
                            </div>

                            <div className="mb-3">
                                <label>Genero</label>
                                <select type="text" name="genero" value={usuarioInfo.genero} onChange={handleGenderSelection} className="form-control">
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Otro">Otro</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label>Fecha Nacimiento</label>
                                <input type="date" name="fechanacimiento" value={usuarioInfo.fechanacimiento} onChange={handleInput} className="form-control" required/>
                            </div>
                            <div className="mb-3">
                                <label>Pais</label>
                                <input tEstadoype="text" name="pais" value={usuarioInfo.pais} onChange={handleInput} className="form-control" required/>
                            </div>

                            <div className="mb-3">
                                <label>Area</label>
                                <select type="number" name="idarea" value={usuarioInfo.idArea} onChange={handleAreaSelection} className="form-control">
                                        {areas.map((area) => (
                                            <option key={area.idArea} value={area.nombre}>{area.nombre}</option>
                                        ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label>Fecha Graduacion</label>
                                <input type="date" name="fechagraduacion" value={usuarioInfo.fechagraduacion} onChange={handleInput} className="form-control" required/>
                            </div>
                            <div className="mb-3">
                                <label>Jefe</label>
                                <input type="number" name="idJefe" value={usuarioInfo.idJefe} onChange={handleInput} className="form-control" required/>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary"  onClick={creaInfoUsuario}>Agregar Info Usuario</button>
                            </div>
                        </form>
                                
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DataCreateInfo