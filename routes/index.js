var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Início' });
});

router.get("/login", function(req, res) {
  res.render('login', {title: 'Login'})
})

router.get("/registrar", function(req, res) {
  res.render('registrar', {title: 'Registro'})
})

router.get("/dashboard", function(req, res) {
  res.render('dashboard', {title: 'Dashboard'})
})

router.get("/gerenciarnotas", function(req, res) {
  res.render('gerenciarnotas', {title: 'Gerenciamento de Notas', erro: req.flash('erro') , sucesso: req.flash('sucesso') })
})

router.get("/visualizarnotas", function(req, res) {
  res.render('visualizarnotas', {title: 'Visualização de Notas', erro: req.flash('erro') , sucesso: req.flash('sucesso') })
})

module.exports = router;
