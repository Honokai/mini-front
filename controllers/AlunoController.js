const pool = require('../modelos/conexao');
const url = require('url');

/**
 * Recebe um get e retorna lista de alunos matriculados na instituicao
 * @param {Request} req 
 * @param {Response} res 
 * @param {*} next 
 */
exports.getAll = (req, res, next) => {
    let consulta = "SELECT * FROM aluno";
    pool.getConnection().then(conexao => {
        conexao.query(consulta).then((row) => {
            res.json(row);
        }).then(conexao.end()).catch(error => {
            res.json(error);
        })
    }).catch(erro => {
        return res.send(erro);
    });
}

exports.getOne = (req, res, next) => {
    let consulta = `SELECT * FROM aluno where id=${req.params.id}`;
    pool.getConnection().then(conexao => {
        conexao.query(consulta).then((row) => {
            res.json(row);
        }).then(conexao.end())
        .catch(erro => console.log(erro)).then({'Erro':'Parece que tivemos um erro'})
    }).catch(erro => {
        return res.json(erro);
    });   
}

exports.criar = (req, res, next) => {
    console.log(req.body);
    let itens = url.parse(req.url, true).query;
    let consulta = `INSERT INTO aluno(nome,curso_id) values ('${itens.nome}',${itens.cursoid})`;
    pool.getConnection().then(conexao => {
        conexao.query(consulta).then((row) => {
            res.json(row);
        }).then(conexao.end())
        .catch(erro => console.log(erro)).then({'Erro':'Parece que tivemos um erro'})
    }).catch(erro => {
        return res.json(erro);
    });
}