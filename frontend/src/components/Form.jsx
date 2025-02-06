// src/components/Form.jsx
import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);

const Form = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    cedula: '',
    correo: '',
    telefono: '',
    ciudad: '',
    terminos: false,
  });
  const [mensaje, setMensaje] = useState('');

  // Actualizar el estado según el input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Enviar datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos a enviar:", formData);

    try {
      const response = await fetch(`${API_URL}/formulario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Respuesta del backend:", data);

      if (!response.ok) {
        // Si la respuesta no es OK, mostramos el mensaje de error
        console.error("Error en la respuesta del backend:", data);
        setMensaje(`Error: ${data.error || data.message || 'No se pudo enviar el formulario'}`);
      } else {
        setMensaje(data.message);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setMensaje(`Error al enviar el formulario: ${error.message}`);
    }
  };


  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombres"
          placeholder="Nombres"
          value={formData.nombres}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="cedula"
          placeholder="Cédula"
          value={formData.cedula}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono móvil"
          value={formData.telefono}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="ciudad"
          placeholder="Ciudad"
          value={formData.ciudad}
          onChange={handleChange}
        />
        <br />
        <label>
          <input
            type="checkbox"
            name="terminos"
            checked={formData.terminos}
            onChange={handleChange}
          />
          Acepto los términos
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Form;
