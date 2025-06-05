import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export default function DenunciaForm({ ubicacion, onClose, onDenunciaEnviada }) {
  const { user } = useContext(UserContext);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [direccion, setDireccion] = useState("");
  const [cargandoDireccion, setCargandoDireccion] = useState(false);
  const [anonimo, setAnonimo] = useState(!user); // Por defecto, es anónimo si no hay usuario

  useEffect(() => {
    const getDireccion = async (lat, lng) => {
      setCargandoDireccion(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await res.json();
        // Construir dirección corta
        const addr = data.address || {};
        const partes = [
          addr.road,
          addr.neighbourhood || addr.suburb,
          addr.city || addr.town || addr.village,
          addr.state,
          addr.country
        ].filter(Boolean);
        setDireccion(partes.join(", ") || data.display_name || "No se encontró dirección");
      } catch (err) {
        setDireccion("No se pudo obtener dirección");
      } finally {
        setCargandoDireccion(false);
      }
    };
    if (ubicacion) {
      getDireccion(ubicacion.lat, ubicacion.lng);
    }
  }, [ubicacion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('ubicacion', JSON.stringify(ubicacion));
    formData.append('anonimo', anonimo);
    if (user && !anonimo) formData.append('usuario', user.nombre); // 👈 Solo si no es anónimo
    if (imagen) formData.append('imagen', imagen);

    try {
      const res = await fetch('http://localhost:3000/api/denuncias', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        onDenunciaEnviada(); // 👈 Refresca el mapa
        onClose();
      } else {
        alert("Error al enviar denuncia");
      }
    } catch (err) {
      alert("Error al enviar denuncia");
      console.error(err);
    }
  };

  return (
    <div style={estilos.fondo}>
      <form onSubmit={handleSubmit} style={estilos.formulario}>
        <h3 style={estilos.titulo}>Crear denuncia</h3>
        <p style={estilos.ubicacion}>
          {cargandoDireccion ? "Buscando dirección..." : direccion}
        </p>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título"
          required
        />
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          required
        />
        <input type="file" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} />
        <div>
          <label style={{ color: "#111" }}>
            <input
              type="checkbox"
              checked={anonimo}
              onChange={e => setAnonimo(e.target.checked)}
            />
            Enviar como anónimo (si está desmarcado, se mostrará tu usuario)
          </label>
        </div>
        <button type="submit">Enviar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
}

const estilos = {
  fondo: {
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    zIndex: 1000,
  },
  formulario: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
  },
  titulo: {
    color: "#222",
    margin: 0
  },
  ubicacion: {
    color: "#222",
    margin: 0
  }
};
