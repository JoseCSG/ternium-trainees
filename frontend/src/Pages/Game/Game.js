import React, { useState, useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { getInfoJuego } from '../../api/auth';
import axios from "axios";

const Game = () => {
  // WebGL build loader de Unity
  const { unityProvider, sendMessage , addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "build/game.loader.js",
    dataUrl: "build/game.data.unityweb",
    frameworkUrl: "build/game.framework.js.unityweb",
    codeUrl: "build/game.wasm.unityweb",
  });

  // Carga el puntaje más alto y los cursos completados de la base de datos
  const [infoJuego, setInfoJuego] = useState({})
  const cargaInfoJuego =  async () => {
    const idJSON = {
      "idempleado": localStorage.getItem('idEmpleado')
    }
    const {data}  = await getInfoJuego(idJSON)
    setInfoJuego(data)
  }
  cargaInfoJuego();

  // Despliega el puntaje máximo actual en el juego
  sendMessage("GameController", "despliegaPuntaje", infoJuego.puntaje);

  // Actualiza el puntaje más alto en la base de datos cuando sucede un GameOver
  const handleGameOver = useCallback((puntaje) => {
    subePuntaje(puntaje);
  }, []);

  // Detecta cuando comienza el evento GameOver
  useEffect(() => {
    addEventListener("GameOver", handleGameOver);
    return () => {
      removeEventListener("GameOver", handleGameOver);
    };
  }, [addEventListener, removeEventListener, handleGameOver]);

  const subePuntaje = (puntaje) => {
    const puntajeJSON = {
      "puntajealto": puntaje,
      "idempleado": localStorage.getItem('idEmpleado')
    };
    axios.post('http://localhost:4000/api/subePuntaje', puntajeJSON)
    .catch (function(error){
        console.error(error)
    })
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>
      <Unity
        unityProvider={unityProvider}
        style={{ height: 600, width: 1080 }}
      />
    </div>
  );
}

export default Game;