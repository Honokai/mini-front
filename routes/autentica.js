var express = require('express');
var router = express.Router();
var autenticacaoController = require('../controllers/AutenticacaoController');

router.post("/entrar", autenticacaoController.entrar);

//router.post("/registrar", autenticacaoController.registro);

module.exports = router;