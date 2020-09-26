const pool = require('../modelos/conexao');
const url = require('url');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.registrar = (req, res, next) => {
    try {
        let consulta = `select * from usuarios where email='${req.body.email}'`;

        let hash = bcrypt.hash(req.body.senha, saltRounds, (erro, hashed) => {
            if(erro) { res.json(erro)}
            return hashed
        })

        let insercao = `insert into usuarios(email,senha,nivel) values ('${req.body.email}','${hash}','${req.body.nivel}')`
        let existe = () => {
            pool.getConnection().then(conexao => conexao.query(consulta)
                .then((resultado) => {
                    if(resultado[0].email == null){
                        console.log(resultado[0])
                        return true   
                    }
                }).catch(erro => {
                        res.json(erro)
                })
            ).catch(error => res.json(error))
            return 0
        }
        if(existe() != 0){
            try{
                pool.getConnection().then(conexao => conexao.query(insercao)
                    .then(
                        res.json("Usuario criado com sucesso")
                    ).catch(erro => {
                        res.json(erro)
                    })
                )
            } catch (erro) {
                console.log(erro)
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
    
}