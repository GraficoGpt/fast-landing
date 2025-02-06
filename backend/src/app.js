require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware para habilitar CORS
app.use(cors());

app.use(express.json());
console.log("Middleware JSON configurado correctamente.");

//!SECTION Responder algo en el root "/"
app.get('/', (req, res) => {
    res.send('Api supabase y hubspot arriba')
    console.log("Ruta '/' configurada correctamente.");
  })

// Importar y registrar la ruta del formulario
const formularioRoutes = require('./routes/formulario');
app.use('/formulario', formularioRoutes);
console.log("Ruta '/formulario' configurada correctamente.");

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
