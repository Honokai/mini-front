const pool = require('../modelos/conexao');
const url = require('url');

exports.getAll = (req, res) => {
    pool.getConnection().then(conexao => {
        conexao.query("select * from materias order by id").then((resposta) => {
            res.json(resposta)
        }).catch(erro => {
            res.json(erro)
        })
    }).catch(erro => {
        res.status(404).send(erro)
    })
}