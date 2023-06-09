import React, { useRef, useEffect, useCallback } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { getInfoEmpleado, getInfoJuego, getAvatars, setPuntaje, setMonedas, addAvatar } from '../../api/auth';

const Game = () => {
  // WebGL build loader de Unity
  const { unityProvider, isLoaded, sendMessage, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "build/game.loader.js",
    dataUrl: "build/game.data.unityweb",
    frameworkUrl: "build/game.framework.js.unityweb",
    codeUrl: "build/game.wasm.unityweb",
  });

  const idEmpleado = useRef(localStorage.getItem('idEmpleado'));
  const idJSON = useRef({"idempleado": idEmpleado.current});
  const effectUsed = useRef(false);

  // Carga el nombre del usuario desde la base de datos
  const cargaInfoEmpleado = useCallback(async () => {
    const {data} = await getInfoEmpleado(idJSON.current);
    console.log("Enviando nombre", data.nombre);
    try {
      sendMessage("Game Manager", "getNombre", data.nombre);
    } catch (error) {
      console.log(error.message);
    }
  }, [sendMessage]);

  // Carga el puntaje alto y los cursos completados del usuario desde la base de datos
  const cargaInfoJuego = useCallback(async () => {
    const {data} = await getInfoJuego(idJSON.current);
    console.log("Enviando puntaje", data.puntaje);
    console.log("Enviando tokens", data.monedas);
    try {
      sendMessage("Game Manager", "setHighScore", data.puntaje);
    } catch (error) {
      console.log(error.message);
    }
    try {
      sendMessage("Game Manager", "getTokens", data.monedas);
    } catch (error) {
      console.log(error.message);
    }
  }, [sendMessage]);

  // Carga los avatars del usuario desde la base de datos
  const cargaAvatars = useCallback(async () => {
    const {data} = await getAvatars(idJSON.current);
    const avatars = data ? data.map(avatar => avatar.idavatar) : [];
    console.log("Enviando avatars", avatars.toString());
    try {
      sendMessage("Game Manager", "userAvatars", avatars.toString());
    } catch (error) {
      console.log(error.message);
    }
  }, [sendMessage]);

  // Actualiza los cursos completados
  const usaMonedas = useCallback((tokens) => {
    const subeMonedas = async () => {
      const monedasJSON = {
        "monedas": tokens,
        "idempleado": idEmpleado.current
      };
      try {
        console.log("Actualizando tokens:", tokens);
        await setMonedas(monedasJSON);
        cargaInfoJuego();
      } catch (error) {
        console.log(error.message);
      }
    };
    subeMonedas();
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
        console.log("Actualizando puntaje alto:", puntaje);
        await setPuntaje(puntajeJSON);
        cargaInfoJuego();
      } catch (error) {
        console.log(error.message);
      }
    }
    subePuntaje();
  }, [cargaInfoJuego]);
  
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
    addEventListener("useTokens", usaMonedas);
    addEventListener("unlockAvatar", desbloqueaAvatar);
    addEventListener("GameOver", handleGameOver);

    return () => {
      removeEventListener("useTokens", usaMonedas);
      removeEventListener("unlockAvatar", desbloqueaAvatar);
      removeEventListener("GameOver", handleGameOver);
    };
  }, [addEventListener, removeEventListener, usaMonedas, desbloqueaAvatar, handleGameOver]);

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