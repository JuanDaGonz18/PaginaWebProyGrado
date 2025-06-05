import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Inicio() {
  const navigate = useNavigate();

  const irADenunciar = (anonimo) => {
    navigate('/formulario', { state: { anonimo } });
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Bienvenido al Sistema de Denuncias</h1>
      <p>¿Cómo deseas continuar?</p>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => irADenunciar(false)} style={estiloBoton}>
          Ingresar con datos
        </button>
        <button onClick={() => irADenunciar(true)} style={{ ...estiloBoton, marginLeft: '1rem' }}>
          Denunciar como anónimo
        </button>
      </div>
    </div>
  );
}

const estiloBoton = {
  padding: '1rem 2rem',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '8px'
};
