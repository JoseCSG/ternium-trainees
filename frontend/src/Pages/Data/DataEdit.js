import React from "react";
import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function DataEdit ()
{
    let {id} = useParams();
    const [usuario,setUsuario]=useState({})

    useEffect(()=>{
        axios.get(`http://localhost:4000/api/data/${id}/edit`)
        .then(res=> {
            console.log(res)
            setUsuario(res.data.usuario)
        })
    })

    return (
        <h3>editar</h3>
    )

}

export default DataEdit