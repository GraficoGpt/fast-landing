const express = require('express');
const router = express.Router();
const formularioController = require('../controllers/formularioController');

router.post('/', formularioController.enviarFormulario);

module.exports = router;
