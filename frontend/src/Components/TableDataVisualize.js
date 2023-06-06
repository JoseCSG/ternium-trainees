import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRotaciones } from "../api/auth";

const TableDataVisualize = () =>
{
    let {idempleadoinfo} = useParams();
    const[rotaciones,setRotaciones]=useState([]);
    const loadRotaciones = async () => 
    {
      try {
        console.log(idempleadoinfo)
        const res = await axios.get(`http://localhost:4000/api/data/getRotaciones/${idempleadoinfo}`)
        console.log(res)
        setRotaciones(res.data)
      } catch (error) {
        console.log(error.message)
      }
      //getRotaciones(id)

      //setRotaciones(res.data)

      }
    useEffect (() => {
    },[idempleadoinfo]);
    loadRotaciones()

    var detallesRotaciones="";
  detallesRotaciones=rotaciones.map((item,index)=> {
    return (
      <tr key={index}>
          <td>{item.idrotacion}</td>
          <td>{item.idempleado}</td>
          <td>{item.idarea}</td>
          <td>{item.fechainicio}</td>
          <td>{item.fechafin}</td>
      </tr>
    );

  });

    return(
        <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='card'>
            <div className='card-header'>
              <h4> Historial de Rotacion
              </h4>
            </div>

            <div className='card-body'>
              <table className='table table-stripped'>
                <thead>
                  <tr>
                    <th>ID ROTACION</th>
                    <th>ID EMPLEADO</th>
                    <th>ID AREA</th>
                    <th>FECHA INICIO</th>
                    <th>FECHA FIN</th>
                  </tr>
                </thead>
                <tbody>
                    {detallesRotaciones}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default TableDataVisualize