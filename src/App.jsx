import React, { useContext, useState } from "react";
import { UserContext } from "./context/UserContext";
import HomeMenu from "./pages/HomeMenu";
import Login from "./components/Login";
import MapaPrincipal from "./components/MapaPrincipal"; // tu componente con el mapa y denuncias

const App = () => {
  const { user, anonimo, entrarAnonimo } = useContext(UserContext); // Agrega entrarAnonimo
  const [stage, setStage] = useState("menu"); // "menu", "login" o "mapa"

  const handleChoose = (option) => {
    if (option === "login") {
      setStage("login");
    } else if (option === "anonimo") {
      entrarAnonimo(); // <-- esta es la línea clave
      setStage("mapa");
    }
  };

  // Si hay usuario loggeado o es anónimo, mostrar mapa principal
  if (user || anonimo) {
    return <MapaPrincipal />;
  }

  // Si estamos en la pantalla de login
  if (stage === "login") {
    return <Login onLogin={() => setStage("mapa")} onSalir={() => setStage("menu")} />;
  }

  // Por defecto, mostrar el menú inicial
  return <HomeMenu onChoose={handleChoose} />;
};

export default App;
