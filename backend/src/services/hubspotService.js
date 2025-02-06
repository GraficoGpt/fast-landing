const hubspotClient = require('../config/hubspotClient');

async function enviarLeadHubSpot(data) {
  console.log("Preparando envío de lead a HubSpot con los siguientes datos:", data);

  const contacto = {
    properties: {
      firstname: data.nombres,
      lastname: data.apellidos,
      email: data.correo,
      phone: data.telefono,
      city: data.ciudad,
      // Agrega otros campos personalizados si lo deseas:
      // cedula: data.cedula,
      // terminos: data.terminos ? 'true' : 'false'
    },
  };

  try {
    console.log("Enviando lead a HubSpot...");
    const response = await hubspotClient.crm.contacts.basicApi.create(contacto);
    console.log("Lead creado en HubSpot:", response.body);
    return response;
  } catch (error) {
    console.error("Error al enviar lead a HubSpot:", error.response ? error.response.body : error.message);
    throw error;
  }
}

module.exports = enviarLeadHubSpot;
