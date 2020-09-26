var express = require("express");
var router = express.Router();
const alunoController = require('../controllers/AlunoController');
const professorController = require('../controllers/ProfessorController');
const disciplinaController = require('../controllers/DisciplinaController');
const materiaController = require('../controllers/MateriaController');

router.get("/", function(req, res, next) {
    res.send("API is working properly");
});

router.get("/alunos", alunoController.getAll);
router.get("/professores", professorController.getAll);
router.get("/alunos/:id", alunoController.getOne);
router.get("/disciplinas", disciplinaController.getAll);
router.get("/disciplinas/:id", disciplinaController.getOne);
router.get("/materias", materiaController.getAll);

router.post("/adicionar/nota", disciplinaController.criar);

router.post("/atualizar/nota", disciplinaController.atualizar);

router.post("/excluir/nota", disciplinaController.excluir);

router.post("/alunos/criar", alunoController.criar);

module.exports = router;