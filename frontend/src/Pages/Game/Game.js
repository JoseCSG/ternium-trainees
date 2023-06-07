import React, { useState, useRef, useEffect, useCallback } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { getInfoEmpleado, getInfoJuego, getAvatars, setPuntaje, setCursos, addAvatar } from '../../api/auth';

const Game = () => {
  // WebGL build loader de Unity
  const { unityProvider, isLoaded, sendMessage, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "build/game.loader.js",
    dataUrl: "build/game.data.unityweb",
    frameworkUrl: "build/game.framework.js.unityweb",
    codeUrl: "build/game.wasm.unityweb",
  });

  const idEmpleado = useRef(localStorage.getItem('idEmpleado'));
  const idJSON = useRef({ "idempleado": idEmpleado.current });
  const [infoJuego, setInfoJuego] = useState({});
  const effectUsed = useRef(false);

  // Carga el nombre del usuario desde la base de datos
  const cargaInfoEmpleado = useCallback(async () => {
    const {data} = await getInfoEmpleado(idJSON.current);
    console.log("Enviando nombre", data.nombre);
    sendMessage("GameController", "despliegaNombre", data.nombre);
  }, [sendMessage]);

  // Carga el puntaje alto y los cursos completados del usuario desde la base de datos
  const cargaInfoJuego = useCallback(async () => {
    const {data} = await getInfoJuego(idJSON.current);
    setInfoJuego(data);
    console.log("Enviando puntaje", data.puntaje);
    console.log("Enviando tokens", data.cursos);
    sendMessage("GameController", "despliegaPuntaje", data.puntaje);
    sendMessage("GameController", "despliegaTokens", data.cursos);
  }, [sendMessage]);

  // Carga los avatars del usuario desde la base de datos
  const cargaAvatars = useCallback(async () => {
    const {data} = await getAvatars(idJSON.current);
    const avatars = data.map(avatar => avatar.idavatar);
    console.log("Enviando avatars", avatars.toString());
    sendMessage("GameController", "avatarsUsuario", avatars.toString());
  }, [sendMessage]);

  // Actualiza los cursos completados
  const usaTokens = useCallback((tokens) => {
    const subeCursos = async () => {
      const cursosJSON = {
        "cursoscompletados": tokens,
        "idempleado": idEmpleado.current
      };
      try {
        console.log("Actualizando tokens:", tokens);
        await setCursos(cursosJSON);
        cargaInfoJuego();
      } catch (error) {
        console.log(error.message);
      }
    };
    subeCursos();
  }, [cargaInfoJuego]);

  // Desbloquea nuevo avatar para el usuario
  const desbloqueaAvatar = useCallback((idavatar) => {
    const agregaAvatar = async () => {
      const avatarJSON = {
        "idavatar": idavatar,
        "idempleado": idEmpleado.current
      };
      try {
        console.log("Desbloqueando avatar:", idavatar);
        await addAvatar(avatarJSON);
        cargaAvatars();
      } catch (error) {
        console.log(error.message);
      }
    };
    agregaAvatar();
  }, [cargaAvatars]);

  // Realiza cambios necesarios cuando sucede un GameOver
  const handleGameOver = useCallback((puntaje) => {
    // Actualiza el puntaje más alto
    const subePuntaje = async () => {
      const puntajeJSON = {
        "puntajealto": puntaje,
        "idempleado": idEmpleado.current
      };
      try {
        await setPuntaje(puntajeJSON);
        cargaInfoJuego();
      } catch (error) {
        console.log(error.message);
      }
    }
    if (puntaje > infoJuego.puntaje) {
      console.log("Actualizando puntaje alto:", puntaje);
      subePuntaje();
    }
  }, [cargaInfoJuego, infoJuego]);
  
  // Inicialización del juego
  useEffect(() => {
    // Cuando el juego termina de cargar
    if (!effectUsed.current && isLoaded) {
      // Solo ejecuta el código una vez
      effectUsed.current = true;
      console.log("Iniciando juego");
      cargaInfoEmpleado();
      cargaInfoJuego();
      cargaAvatars();
    }
  }, [isLoaded, cargaInfoEmpleado, cargaInfoJuego, cargaAvatars]);

   // Detecta cuando comienzan los eventos useTokens, unlockAvatar, o GameOver
   useEffect(() => {
    addEventListener("useTokens", usaTokens);
    addEventListener("unlockAvatar", desbloqueaAvatar);
    addEventListener("GameOver", handleGameOver);

    return () => {
      removeEventListener("useTokens", usaTokens);
      removeEventListener("unlockAvatar", desbloqueaAvatar);
      removeEventListener("GameOver", handleGameOver);
    };
  }, [addEventListener, removeEventListener, usaTokens, desbloqueaAvatar, handleGameOver]);

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