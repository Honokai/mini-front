const pool = require('../modelos/conexao');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.entrar = (req, res, next) => {
    
}

exports.registro = (req, res) => {
    bcrypt.hash(req.body.senha, saltRounds, function(err, hashed) {
        let consulta = `INSERT INTO usuarios(email,senha,nivel) values ('${req.body.email}','${hashed}',${req.body.nivel})`;
        pool.getConnection().then(conexao => {
            conexao.query(consulta).then((row) => {
                res.status(200).json('Usuário criado com sucesso');
            }).then(conexao.end())
            .catch(erro => {
                console.log(erro);
                res.status(301).json({"Erro": "Entre em contato com a administração"})
                console.log(res.status);
            })
        }).catch(erro => {
            return res.json(erro);
        });
    });
}