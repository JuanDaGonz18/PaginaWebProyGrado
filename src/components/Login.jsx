// src/components/Login.jsx
import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Login({ onLogin, onSalir }) {
  const { login } = useContext(UserContext);
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    edad: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);
    if (onLogin) onLogin();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1f1b2e",
        color: "#f0f0f0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        padding: "20px",
        position: "relative"
      }}
    >
      <button
        onClick={onSalir}
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          background: "#6366f1",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "8px 18px",
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
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#2d2540",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
          maxWidth: "400px"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Iniciar sesión / Registrarse
        </h2>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre completo"
          required
          style={inputStyle}
        />
        <input
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          required
          style={inputStyle}
        />
        <input
          name="edad"
          type="number"
          value={form.edad}
          onChange={handleChange}
          placeholder="Edad"
          required
          style={inputStyle}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#6d28d9",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s ease"
          }}
          onMouseOver={e => (e.target.style.backgroundColor = "#5b21b6")}
          onMouseOut={e => (e.target.style.backgroundColor = "#6d28d9")}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #444",
  backgroundColor: "#1a162c",
  color: "#fff"
};
