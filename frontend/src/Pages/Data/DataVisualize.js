import React from "react";
import '../../Components/TableDataVisualize';
import TableDataVisualize from "../../Components/TableDataVisualize";
import '../Data/DataVisualize.css';
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function DataVisualize ()
{
    let {idempleadoinfo} = useParams();

    const [usuario,setUsuario]=useState({
        nombre: "",
        apellidopaterno: "",
        apellidomaterno: "",
        genero: "",
        fechanacimiento: "",
        pais: "",
        idempleado: "",
        idarea: "",
        fotoperfil: "",
        fechagraduacion: "",
        idjefe: ""
    });

    useEffect(()=>{
        axios.get(`http://localhost:4000/api/data/get/${idempleadoinfo}`) ///aqui tiene que ir un get
        .then(res=> {
            console.log(res)
            setUsuario(res.data[0])
        });
    },[idempleadoinfo]);

    const[areasInteres, setAreasInteres]=useState({});

    useEffect(()=> {
        axios.get(`http://localhost:4000/api/data/getAreasInteres/${idempleadoinfo}`)
        .then(res=> {
            console.log(res)
            setAreasInteres(res.data)
        });
    },[idempleadoinfo])

    

    return(
    <div>
        <TableDataVisualize/>
        <div className="container">
            <div className="row">
                {/*tarjeta de info usuario */}
                <div className="cardprofile">
                    <div className="cardprofile_title">{usuario.nombre} {usuario.apellidopaterno} {usuario.apellidomaterno}</div>
                    <div className="cardprofile_body">
                        Género: {usuario.genero}<br/>
                        Fecha de Nacimiento: {usuario.fechanacimiento.split('T')[0]}<br/>
                        Pais: {usuario.pais}<br/>
                        <div className="card_image"></div>
                    </div>
                </div>

                {/*tarjeta de areas de interes*/}
                <div className="cardareas">
                    <div className="cardprofile_title">ÁREAS DE INTERÉS</div>
                        <div className="cardprofile_body">
                            {Array.isArray(areasInteres) && areasInteres.length > 0 ? (
                                <React.Fragment>
                                    Areas:
                                    {areasInteres.map((area) => (
                                    <React.Fragment key={area.idareainteres}>
                                        {area.nombre}
                                        <br />
                                    </React.Fragment>
                                    ))}
                                </React.Fragment>
                                ) : (
                                <p>No se encontraron áreas de interés.</p>
                                )}
                            <div className="card_image"></div>
                        </div>
                    </div>


                {/*tarjeta de info juego*/}
                <div className="cardareas">
                    <div className="cardprofile_title">INFO JUEFO</div>
                        <div className="cardprofile_body">
                            Puntaje alto:
                            Monedas:
                            <div className="card_image"></div>
                        </div>
                    </div>


            </div>

                

        
        </div>
    </div>

    )
}

export default DataVisualize