var express = require('express');
var router = express.Router();
const usuarioController = require('../controllers/UsuarioController');

/* GET users listing. */
router.post('/criar', usuarioController.registrar);

module.exports = router;
