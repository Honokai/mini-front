const pool = require('../modelos/conexao');
const url = require('url');

exports.getAll = (req, res, next) => {
    let consulta = "SELECT * FROM professor";
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
