const supabase = require('../config/supabaseClient');
const enviarLeadHubSpot = require('../services/hubspotService');

exports.enviarFormulario = async (req, res) => {
  console.log("Recibiendo datos del formulario:", req.body);
  const { nombres, apellidos, cedula, correo, telefono, ciudad, terminos } = req.body;

  // Validación básica de campos obligatorios
  if (!nombres || !apellidos || !cedula || !correo) {
    console.error("Error: Faltan datos obligatorios.");
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  console.log("Insertando datos en Supabase...");
  const { data, error } = await supabase
    .from('formulario')
    .insert([{ nombres, apellidos, cedula, correo, telefono, ciudad, terminos }]);

  if (error) {
    console.error("Error al insertar en Supabase:", error.message);
    return res.status(500).json({ error: error.message });
  }

  console.log("Datos insertados en Supabase correctamente:", data);

  // Enviar el lead a HubSpot
  try {
    console.log("Procediendo a enviar lead a HubSpot...");
    const hubspotResponse = await enviarLeadHubSpot({ nombres, apellidos, correo, telefono, ciudad });
    res.status(201).json({
      message: 'Datos insertados y lead enviado a HubSpot',
      data,
      hubspotResponse: hubspotResponse.body,
    });
  } catch (err) {
    console.error("Error al enviar lead a HubSpot:", err.message);
    res.status(201).json({
      message: 'Datos insertados, pero error al enviar lead a HubSpot',
      data,
      errorHubspot: err.message,
    });
  }
};
