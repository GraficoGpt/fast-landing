const { Client } = require('@hubspot/api-client');

console.log("Cargando token de HubSpot:", process.env.HUBSPOT_ACCESS_TOKEN);

const hubspotClient = new Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
});

console.log("HubSpot client inicializado correctamente.");
module.exports = hubspotClient;
