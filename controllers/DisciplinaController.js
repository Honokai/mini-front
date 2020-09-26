const pool = require('../modelos/conexao');

exports.getAll = (req, res, next) => {
    let consulta = `SELECT d.disciplina,d.av1,d.av2,d.av3,d.aps1,d.aps2,a.nome aluno,p.professor as professor 
    FROM disciplina d INNER JOIN aluno a on d.aluno_id=a.id
    INNER JOIN professor p on d.professor_id = p.id`
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
    let consulta = `SELECT d.disciplina,d.av1,d.av2,d.av3,d.aps1,d.aps2,a.nome as aluno,p.professor as professor
                    FROM disciplina d 
                    INNER JOIN aluno a on d.aluno_id = a.id
                    INNER JOIN professor p on d.professor_id = p.id
                    where d.aluno_id=${req.params.id}`;
    pool.getConnection().then(conexao => {
        conexao.query(consulta).then((row) => {
            res.json(row);
        }).then(conexao.end())
        .catch(erro => {console.log(erro)}).then({'Erro':'Parece que tivemos um erro'})
    }).catch(erro => {
        return res.json(erro);
    });   
}

exports.criar = (req, res, next) => {
    let consulta = `select * from disciplina where disciplina = '${req.body.disciplina}' and aluno_id=${req.body.selectaluno}`;
    pool.getConnection().then(conexao => {
        conexao.query(consulta).then((row) => {
            if(row != '') {
                req.flash('erro','Descrição do erro: registro duplicado, escolha atualizar.')
                res.redirect('back')
            } else {
                consulta = `INSERT INTO disciplina(disciplina, ${req.body.avaliacao}, aluno_id, professor_id) 
                values ('${req.body.disciplina}', ${req.body.nota},'${req.body.selectaluno}','${req.body.professor}')`;
                pool.getConnection().then(conexao => {
                    conexao.query(consulta).then((row) => {
                        req.flash('sucesso','Nota adicionada')
                        res.redirect('back')
                    }).then(conexao.end())
                    .catch((erro) => {
                        console.log(erro)
                        req.flash('erro','Descrição do erro: '+erro.code)
                        res.redirect('back')
                    }).then({'Erro':'Parece que tivemos um erro'})
                }).catch(erro => {
                    return res.json(erro);
                });   
            }
        }).then(conexao.end())
        .catch((erro) => {
            console.log(erro)
            req.flash('erro','Descrição do erro: '+erro.code)
            res.redirect('back')
        }).then({'Erro':'Parece que tivemos um erro'})
    }).catch(erro => {
        return res.json(erro);
    });
}


exports.atualizar = (req, res) => {
    let consulta = `select * from disciplina where disciplina = 
    '${req.body.disciplina}' and aluno_id=${req.body.selectaluno} and professor_id=${req.body.professor}`;
    
    pool.getConnection().then(conexao => {
        conexao.query(consulta).then((row) => {
            if(row != '') {
                consulta = `update disciplina set ${req.body.avaliacao}=${req.body.nota} where 
                disciplina = '${req.body.disciplina}' and aluno_id=${req.body.selectaluno} and professor_id=${req.body.professor}`;

                pool.getConnection().then(conexao1 => {
                    conexao1.query(consulta).then((row) => {
                        req.flash('sucesso','Atualização de nota realizada')
                        res.redirect('back')
                    }).then(conexao1.end())
                    .catch((erro) => {
                        console.log(erro)
                        req.flash('erro','Descrição do erro: '+erro.code)
                        res.redirect('back')
                    }).then({'Erro':'Parece que tivemos um erro'})
                }).catch(erro => {
                    return res.json(erro);
                });   
            } else {
                req.flash('erro',`Descrição do erro: registro para a disciplina <strong>${req.body.disciplina}</strong> não existente, escolha adicionar.`)
                res.redirect('back')
            }
        }).then(conexao.end())
        .catch((erro) => {
            console.log(erro)
            req.flash('erro','Descrição do erro: '+erro.code)
            res.redirect('back')
        }).then({'Erro':'Parece que tivemos um erro'})
    }).catch(erro => {
        return res.json(erro);
    });
}


exports.excluir = (req, res) => {
    let consulta = `select * from disciplina where disciplina='${req.body.disciplina}' 
    and aluno_id=${req.body.selectaluno} and professor_id=${req.body.professor}`
    console.log(consulta)
    pool.getConnection().then(conexao => {
        conexao.query(consulta).then((row) => {
            if(row != '') {
                consulta = `delete from disciplina where 
                disciplina = '${req.body.disciplina}' and aluno_id=${req.body.selectaluno} and professor_id=${req.body.professor}`

                pool.getConnection().then(conexao => {
                    conexao.query(consulta).then((row) => {
                        req.flash('sucesso','Exclusão de registro efetuada')
                        res.redirect('back')
                    }).then(conexao.end())
                    .catch((erro) => {
                        console.log(erro)
                        req.flash('erro','Descrição do erro: '+erro.code)
                        res.redirect('back')
                    }).then({'Erro':'Parece que tivemos um erro'})
                }).catch(erro => {
                    return res.json(erro);
                });   
            } else {
                req.flash('erro',`Descrição do erro: exclusão do registro não efetuada pois o mesmo não existe, tome cuidado.`)
                res.redirect('back')
            }
        }).then(conexao.end())
        .catch((erro) => {
            console.log(erro)
            req.flash('erro','Descrição do erro: '+erro.code)
            res.redirect('back')
        }).then({'Erro':'Parece que tivemos um erro'})
    }).catch(erro => {
        return res.json(erro);
    });
}