import React, { useState, useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { getInfoJuego, setPuntaje, setCursos, addAvatar } from '../../api/auth';

const Game = () => {
  // WebGL build loader de Unity
  const { unityProvider, sendMessage , addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "build/game.loader.js",
    dataUrl: "build/game.data.unityweb",
    frameworkUrl: "build/game.framework.js.unityweb",
    codeUrl: "build/game.wasm.unityweb",
  });

  // Carga el puntaje más alto y los cursos completados de la base de datos
  const idEmpleado = localStorage.getItem('idEmpleado');
  const [infoJuego, setInfoJuego] = useState({});
  const cargaInfoJuego = async () => {
    const idJSON = {
      "idempleado": idEmpleado
    };
    const {data}  = await getInfoJuego(idJSON);
    setInfoJuego(data);
  };
  cargaInfoJuego();

  // Despliega el puntaje máximo actual en el juego
  sendMessage("GameController", "despliegaPuntaje", infoJuego.puntaje);

  // Realiza cambios necesarios en la base de datos cuando sucede un GameOver
  const handleGameOver = useCallback((puntaje) => {
    // Actualiza el puntaje más alto
    const subePuntaje = async () => {
      const puntajeJSON = {
        "puntajealto": puntaje,
        "idempleado": idEmpleado
      };
      try {
        await setPuntaje(puntajeJSON);
      } catch (error) {
        console.log(error.message);
      }
    }
    if (puntaje > infoJuego.puntaje) {
      subePuntaje();
    }
  }, [infoJuego, idEmpleado]);

  // Detecta cuando comienza el evento GameOver
  useEffect(() => {
    addEventListener("GameOver", handleGameOver);
    return () => {
      removeEventListener("GameOver", handleGameOver);
    };
  }, [addEventListener, removeEventListener, handleGameOver]);

  // Actualiza los cursos completados
  const subeCursos = async (cursos) => {
    const cursosJSON = {
      "cursoscompletados": cursos,
      "idempleado": idEmpleado
    };
    try {
      await setCursos(cursosJSON);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Desbloquea nuevo avatar para el usuario
  const agregaAvatar = async (idavatar) => {
    const avatarJSON = {
      "idavatar": idavatar,
      "idempleado": idEmpleado
    };
    try {
      await addAvatar(avatarJSON);
    } catch (error) {
      console.log(error.message);
    }
  };

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