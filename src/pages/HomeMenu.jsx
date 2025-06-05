// src/components/HomeMenu.jsx
import React from "react";

export default function HomeMenu({ onChoose }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e1b4b, #3f3cbb)",
        padding: "1rem",
        color: "white",
        boxSizing: "border-box",
      }}
    >
      {/* Menú principal arriba */}
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2.5rem",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem", textAlign: "center" }}>
          Bienvenido al Sistema de Denuncias CUCIO
        </h1>
        <div style={{ fontSize: "1.2rem", marginBottom: "1.5rem", textAlign: "center" }}>
          Cota Unida Contra las Irregularidades en Obras
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          <button
            onClick={() => onChoose("login")}
            style={{
              backgroundColor: "#6366f1",
              color: "white",
              padding: "1rem 2rem",
              fontSize: "1.25rem",
              border: "none",
              borderRadius: "0.75rem",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseOver={e => (e.target.style.backgroundColor = "#4f46e5")}
            onMouseOut={e => (e.target.style.backgroundColor = "#6366f1")}
          >
            Iniciar sesión / Registrarse
          </button>
          <button
            onClick={() => onChoose("anonimo")}
            style={{
              backgroundColor: "#8b5cf6",
              color: "white",
              padding: "1rem 2rem",
              fontSize: "1.25rem",
              border: "none",
              borderRadius: "0.75rem",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseOver={e => (e.target.style.backgroundColor = "#7c3aed")}
            onMouseOut={e => (e.target.style.backgroundColor = "#8b5cf6")}
          >
            Mantenerme Anónimo
          </button>
        </div>
      </div>

      {/* Footer fijo abajo */}
      <footer
        style={{
          backgroundColor: "#0f172a",
          padding: "1.5rem 1rem 1rem 1rem",
          fontSize: "0.95rem",
          textAlign: "center",
          borderTop: "2px solid #334155",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem", fontSize: "1.2rem" }}>
          ¿Quiénes somos?
        </h2>
        <p style={{ maxWidth: "500px", margin: "0 auto 0.5rem auto" }}>
          Soy un estudiante de 11 grado que para su proyecto de graduación realizó una investigación sobre un caso de negligencia estatal, debido a esto surgió la iniciativa de poder reportar las obras irregulares con el propósito de unir a los habitantes afectados y fomentar la participación ciudadana. Esta página web es, precisamente esto, un espacio seguro y abierto donde los ciudadanos pueden reportar las falencias en obras públicas que afectan a su comunidad. Si la ciudadanía no se une, es muy difícil alzar la voz, “nada cambia, si nada cambia”.
        </p>
        <a
          href="https://docs.google.com/document/d/1FZErYnjUGNztDgFjNB89reOBvcFAkCLuuIVEYBfQT2A/edit?tab=t.0"
          style={{ color: "#38bdf8", textDecoration: "underline" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver documento del proyecto
        </a>
        <div style={{ marginTop: "0.5rem" }}>
          <img
            src="/qr-documento.png"
            alt="QR al documento"
            style={{ width: "100px", height: "100px", margin: "0 auto" }}
          />
        </div>
      </footer>
    </div>
  );
}
