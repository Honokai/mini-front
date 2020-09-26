window.addEventListener('load', function() {
    let aluno = new XMLHttpRequest()
    let selectaluno = document.getElementById('selectaluno')
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
    document.getElementById('formulario').addEventListener('submit', (event) => {
        event.preventDefault()
        let request = new XMLHttpRequest()
        request.open("GET", "http://localhost:9000/api/disciplinas/"+document.getElementById('selectaluno').value)
        request.send()
        request.addEventListener('load', () => {
            let resposta = JSON.parse(request.responseText)
            if(resposta.length > 0) {
                document.getElementById('notas').className = 'card'
                document.getElementById('notas').innerHTML = ""
                insereNotas(document.getElementById('notas'),resposta)
            } else { 
                document.getElementById('notas').innerHTML = ""
                document.getElementById('notas').className = ''
            }
        })
    })
})


function insereNotas(div, array = {}) {
    div.innerHTML += 
        `<div class="row">
            <div class="col-3 titulo-header">Aluno</div>
            <div class="col-2 titulo-header">Professor</div>
            <div class="col-2 titulo-header">Disciplina</div>
            <div class="col-1 titulo-header">Av1</div>
            <div class="col-1 titulo-header">Av2</div>
            <div class="col-1 titulo-header">Av3</div>
            <div class="col-1 titulo-header">Aps1</div>
            <div class="col-1 titulo-header">Aps2</div>
        </div>`
    for (let index = 0; index < array.length; index++) {
        div.innerHTML += 
        `<div class="row">
            <div class="col-3">${array[index].aluno}</div>
            <div class="col-2">${array[index].professor}</div>
            <div class="col-2">${array[index].disciplina}</div>
            <div class="col-1">${array[index].av1} </div>
            <div class="col-1">${array[index].av2}</div>
            <div class="col-1">${array[index].av3}</div>
            <div class="col-1">${array[index].aps1} </div>
            <div class="col-1">${array[index].aps2} </div>
        </div>
        ` 
    }
}