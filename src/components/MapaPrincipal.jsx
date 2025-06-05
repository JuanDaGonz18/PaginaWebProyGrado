import React, { useEffect, useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DenunciaForm from "./DenunciaForm";
import { UserContext } from "../context/UserContext";

export default function MapaPrincipal({ onSalir = () => {} }) {
  const { logout, user } = useContext(UserContext);
  const [posicionSeleccionada, setPosicionSeleccionada] = useState(null);
  const [denuncias, setDenuncias] = useState([]);
  const center = [4.8099, -74.1018];

  const ManejadorClick = () => {
    useMapEvents({
      click(e) {
        setPosicionSeleccionada(e.latlng);
      },
    });
    return null;
  };

  // Obtener denuncias del backend
  const fetchDenuncias = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/denuncias");
      const data = await res.json();
      setDenuncias(Array.isArray(data) ? data : []);
    } catch (error) {
      setDenuncias([]);
      console.error("Error al obtener denuncias:", error);
    }
  };

  useEffect(() => {
    fetchDenuncias();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1f1b2e",
        color: "#fff",
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <button
        onClick={() => { logout(); onSalir(); }}
        style={{
          alignSelf: "flex-end",
          marginBottom: "20px",
          background: "#6366f1",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "10px 22px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          transition: "background 0.3s"
        }}
        onMouseOver={e => (e.target.style.background = "#4f46e5")}
        onMouseOut={e => (e.target.style.background = "#6366f1")}
      >
        Salir al menú
      </button>
      <h1
        style={{
          fontSize: "2rem",
          marginBottom: "20px",
          color: "#d6bcfa",
          textAlign: "center"
        }}
      >
        Sistema de Denuncias Ciudadanas
      </h1>
      <div
        style={{
          width: "90%",
          maxWidth: "800px",
          height: "500px",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
          marginBottom: "20px"
        }}
      >
        <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <ManejadorClick />
          {posicionSeleccionada && <Marker position={posicionSeleccionada} />}
          {denuncias
            .filter(
              denuncia =>
                denuncia.ubicacion &&
                typeof denuncia.ubicacion.lat === "number" &&
                typeof denuncia.ubicacion.lng === "number"
            )
            .map((denuncia, i) => (
              <Marker key={i} position={[denuncia.ubicacion.lat, denuncia.ubicacion.lng]}>
                <Popup>
                  <h4>{denuncia.titulo}</h4>
                  <p>{denuncia.descripcion}</p>
                  <p>
                    <strong>Reportado por:</strong>{" "}
                    {denuncia.usuario
                      ? typeof denuncia.usuario === "string"
                        ? denuncia.usuario
                        : denuncia.usuario.nombre || "Anónimo"
                      : "Anónimo"}
                  </p>
                  {denuncia.imagen ? (
                    <img
                      src={`http://localhost:3000/uploads/${encodeURIComponent(denuncia.imagen)}`}
                      alt="Imagen de la denuncia"
                      style={{ width: "100px", maxHeight: "100px", objectFit: "cover" }}
                    />
                  ) : (
                    <p>No hay imagen adjunta</p>
                  )}
                  {denuncia.comentarios && denuncia.comentarios.length > 0 && (
                    <div>
                      <strong>Comentarios:</strong>
                      {denuncia.comentarios.map((c, idx) => (
                        <p key={idx}>
                          {typeof c === "string"
                            ? c
                            : (<><strong>{c.usuario}:</strong> {c.texto}</>)}
                        </p>
                      ))}
                    </div>
                  )}
                  {user && (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const texto = e.target.comentario.value;
                        if (!texto) return;
                        await fetch(`http://localhost:3000/api/denuncias/${denuncia._id}/comentarios`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ texto, usuario: user.nombre }),
                        });
                        e.target.comentario.value = "";
                        fetchDenuncias(); // Refresca comentarios
                      }}
                      style={{ marginTop: 8 }}
                    >
                      <input
                        type="text"
                        name="comentario"
                        placeholder="Agregar comentario"
                        style={{ width: "80%" }}
                      />
                      <button type="submit">Comentar</button>
                    </form>
                  )}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
      {posicionSeleccionada && (
        <DenunciaForm
          ubicacion={posicionSeleccionada}
          onClose={() => setPosicionSeleccionada(null)}
          onDenunciaEnviada={fetchDenuncias}
        />
      )}
    </div>
  );
}
