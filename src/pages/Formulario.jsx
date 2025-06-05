import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Formulario() {
  const location = useLocation();
  const navigate = useNavigate();

  const anonimo = location.state?.anonimo || false;

  // Campos formulario
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  
  // Datos usuario (solo si NO es anónimo)
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [edad, setEdad] = useState('');
  const [descripcionUsuario, setDescripcionUsuario] = useState('');
  const [foto, setFoto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí prepararemos el objeto para enviar al backend
    const denuncia = {
      titulo,
      descripcion,
      ubicacion: { lat: parseFloat(lat), lng: parseFloat(lng) },
      anonimo,
      usuario: anonimo
        ? null
        : { nombre, telefono, edad: Number(edad), descripcion: descripcionUsuario, foto },
      comentarios: []
    };

    console.log('Denuncia a enviar:', denuncia);

    // Aquí vendrá la llamada fetch al backend (más adelante)
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>{anonimo ? 'Denunciar como Anónimo' : 'Denunciar con Cuenta'}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label><br />
          <input
            required
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            placeholder="Título de la denuncia"
          />
        </div>

        <div>
          <label>Descripción:</label><br />
          <textarea
            required
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            placeholder="Descripción detallada"
            rows={4}
          />
        </div>

        <div>
          <label>Latitud:</label><br />
          <input
            required
            type="number"
            step="any"
            value={lat}
            onChange={e => setLat(e.target.value)}
            placeholder="Ejemplo: 4.809"
          />
        </div>

        <div>
          <label>Longitud:</label><br />
          <input
            required
            type="number"
            step="any"
            value={lng}
            onChange={e => setLng(e.target.value)}
            placeholder="Ejemplo: -74.1"
          />
        </div>

        {!anonimo && (
          <>
            <h3>Datos de usuario</h3>

            <div>
              <label>Nombre completo:</label><br />
              <input
                required
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Nombre completo"
              />
            </div>

            <div>
              <label>Teléfono:</label><br />
              <input
                required
                type="tel"
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
                placeholder="Teléfono"
              />
            </div>

            <div>
              <label>Edad:</label><br />
              <input
                required
                type="number"
                value={edad}
                onChange={e => setEdad(e.target.value)}
                placeholder="Edad"
                min="1"
              />
            </div>

            <div>
              <label>Descripción personal:</label><br />
              <textarea
                value={descripcionUsuario}
                onChange={e => setDescripcionUsuario(e.target.value)}
                placeholder="Descripción personal (opcional)"
                rows={2}
              />
            </div>

            <div>
              <label>Foto (URL):</label><br />
              <input
                type="url"
                value={foto}
                onChange={e => setFoto(e.target.value)}
                placeholder="URL de la foto"
              />
            </div>
          </>
        )}

        <button type="submit" style={{ marginTop: '1rem', padding: '0.7rem 1.5rem' }}>
          Enviar denuncia
        </button>
      </form>
    </div>
  );
}
