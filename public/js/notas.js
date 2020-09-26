window.addEventListener('load', () => {
    document.getElementById('formulario').addEventListener('submit', function(event) {
        if(event.submitter.id == 'apagar') {
            let resposta = excluir()
            if(resposta == false) {
                event.preventDefault()
                Swal.fire({
                    title: 'Eita!',
                    html: 'Verifique os campos <strong>Aluno, Disciplina e Professor</strong> eles são necessários.',
                    icon: 'error',
                    confirmButtonText: 'Verificar'
                })
            }
        } else {
            let resposta = submit()
            if(resposta == false) {
                event.preventDefault()
                Swal.fire({
                    title: 'Eita!',
                    text: 'Parece que algum campo está vazio, verifique e tente novamente',
                    icon: 'error',
                    confirmButtonText: 'Verificar'
                })
            }
        }
    })

    let aluno = new XMLHttpRequest()
    let selectaluno = document.getElementById('selectaluno')
    let selectdisciplina = document.getElementById('disciplina')
    let selectprofessor = document.getElementById('professor')
    aluno.open("GET","http://localhost:9000/api/alunos")
    aluno.send()
    aluno.addEventListener('load', () => {
        let resposta = JSON.parse(aluno.responseText)
        for (let index = 0; index < resposta.length; index++) {
            let elemento = document.createElement('option')
            elemento.value = resposta[index].id
            elemento.innerHTML = ''+resposta[index].nome+''
            selectaluno.add(elemento)
        }
    })
    let disciplina = new XMLHttpRequest()
    disciplina.open("GET","http://localhost:9000/api/materias")
    disciplina.send()
    disciplina.addEventListener('load', () => {
        let resposta = JSON.parse(disciplina.responseText)
        for (let index = 0; index < resposta.length; index++) {
            let elemento = document.createElement('option')
            elemento.value = resposta[index].materia
            elemento.innerHTML = ''+resposta[index].materia+''
            selectdisciplina.add(elemento)
        }
    })
    let professor = new XMLHttpRequest()
    professor.open("GET","http://localhost:9000/api/professores")
    professor.send()
    professor.addEventListener('load', () => {
        let resposta = JSON.parse(professor.responseText)
        for (let index = 0; index < resposta.length; index++) {
            let elemento = document.createElement('option')
            elemento.value = resposta[index].id
            elemento.innerHTML = ''+resposta[index].professor+''
            selectprofessor.add(elemento)
        }
    })
})

function submit(){
    let selectaluno = document.getElementById('selectaluno').value
    let selectdisciplina = document.getElementById('disciplina').value
    let professor = document.getElementById('professor').value
    let nota = document.getElementById('nota').value
    let selectacao = document.getElementById('acao').value
    let selectava = document.getElementById('avaliacao').value

    if((selectacao && selectaluno && nota && selectava && selectdisciplina && professor) != '') {
        if(selectacao == "adicionar"){
            document.getElementById('formulario').setAttribute('action','http://localhost:9000/api/adicionar/nota')
        } else {
            document.getElementById('formulario').setAttribute('action','http://localhost:9000/api/atualizar/nota')
        }
        return true
    } else {
        return false
    }
}

function excluir(){
    let selectaluno = document.getElementById('selectaluno').value
    let selectdisciplina = document.getElementById('disciplina').value
    let professor = document.getElementById('professor').value

    if((selectaluno && selectdisciplina && professor) != '') {
        document.getElementById('formulario').setAttribute('action','http://localhost:9000/api/excluir/nota')
        return true
    } else {
        return false
    }
}