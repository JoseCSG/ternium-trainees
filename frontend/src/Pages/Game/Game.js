import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const Game = () => {
  const { unityProvider } = useUnityContext({
    loaderUrl: "build/game.loader.js",
    dataUrl: "build/game.data.unityweb",
    frameworkUrl: "build/game.framework.js.unityweb",
    codeUrl: "build/game.wasm.unityweb",
  });

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