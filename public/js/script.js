window.addEventListener('load', () => {
    
    let divAv1 = document.getElementById('av1')
    let divAv2 = document.getElementById('av2')
    let divAv3 = document.getElementById('av3')
    let divD1 = document.getElementById('desvioav1')
    let divD2 = document.getElementById('desvioav2')
    let divD3 = document.getElementById('desvioav3')
    let divNotas = document.getElementById('notas')
    let request = new XMLHttpRequest()
    let medias = {"av1":[],"av2":[],"av3":[]} 
    let desviopadrao = {"av1":[],"av2":[],"av3":[]}
    let desvio = {}
    let av1 = 0
    let av2 = 0
    let av3 = 0
    request.open("GET", "http://localhost:9000/api/disciplinas")
    request.send()
    request.addEventListener('load', () => {
        let resposta = JSON.parse(request.responseText)
        insereNotas(divNotas,resposta)
        console.log(resposta)
        grafico(resposta)
        grafico2(resposta)
        grafico3(resposta)
        for (let index = 0; index < resposta.length; index++) {
            desviopadrao.av1.push(resposta[index].av1)
            desviopadrao.av2.push(resposta[index].av2)
            desviopadrao.av3.push(resposta[index].av3)
            av1 += resposta[index].av1
            av2 += resposta[index].av2
            av3 += resposta[index].av3
        }
        medias.av1.push(media(av1, resposta.length))
        medias.av2.push(media(av2, resposta.length))
        medias.av3.push(media(av3, resposta.length))
        desvio = variacao(desviopadrao,medias)
        if(medias.av1[0] < 5){
            divAv1.style.backgroundColor = 'orange'
        } else {
            divAv1.style.backgroundColor = '#36e164'
        }
        if(medias.av2[0] < 5){
            divAv2.style.backgroundColor = 'orange'
        } else {
            divAv2.style.backgroundColor = '#36e164'
        }
        if(medias.av3[0] < 5){
            divAv3.style.backgroundColor = 'orange'
        } else {
            divAv3.style.backgroundColor = '#36e164'
        }
        console.log(desviopadrao.av1.sort()[0])
        divAv1.innerHTML = `<p style="font-weight: bolder">Média AV1</p>${medias.av1[0]}`
        divAv2.innerHTML = `<p style="font-weight: bolder">Média AV2</p>${medias.av2[0]}`
        divAv3.innerHTML = `<p style="font-weight: bolder">Média AV3</p>${medias.av3[0]}`
        divD1.innerHTML = `<p style="font-weight: bolder;">Desvio AV1</p>${desvio.av1[0]}`
        divD2.innerHTML = `<p style="font-weight: bolder;">Desvio AV2</p>${desvio.av2[0]}`
        divD3.innerHTML = `<p style="font-weight: bolder;">Desvio AV3</p>${desvio.av3[0]}`
        document.getElementById('maiorav1').innerHTML = `<p style="font-weight: bolder;">Maior AV1</p>${desviopadrao.av1.sort().reverse()[0]}`
        document.getElementById('menorav1').innerHTML = `<p style="font-weight: bolder">Menor AV1</p>${desviopadrao.av1.sort()[0]}`
        document.getElementById('maiorav2').innerHTML = `<p style="font-weight: bolder">Maior AV2</p>${desviopadrao.av2.sort().reverse()[0]}`
        document.getElementById('menorav2').innerHTML = `<p style="font-weight: bolder">Menor AV2</p>${desviopadrao.av2.sort()[0]}`
        document.getElementById('maiorav3').innerHTML = `<p style="font-weight: bolder">Maior AV3</p>${desviopadrao.av3.sort().reverse()[0]}`
        document.getElementById('menorav3').innerHTML = `<p style="font-weight: bolder">Menor AV3</p>${desviopadrao.av3.sort()[0]}`
    })
})

function media(soma, quantidade) {
    return  (soma/quantidade).toFixed(2)
}

function insereNotas(div, array = {}) {
    div.innerHTML += 
        `<div class="row">
            <div class="col-3 titulo-header">Aluno</div>
            <div class="col-3 titulo-header">Professor</div>
            <div class="col-1 titulo-header">Disciplina</div>
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
            <div class="col-3">${array[index].professor}</div>
            <div class="col-1">${array[index].disciplina}</div>
            <div class="col-1">${array[index].av1}</div>
            <div class="col-1">${array[index].av2}</div>
            <div class="col-1">${array[index].av3}</div>
            <div class="col-1">${array[index].aps1}</div>
            <div class="col-1">${array[index].aps2}</div>
        </div>
        ` 
    }
}

function variacao(array, media) {
    let resposta = {"av1":[],"av2":[],"av3":[]}
    let variacao1 = 0
    let variacao2 = 0
    let variacao3 = 0

    for (let i = 0;i < array.av1.length; i++) {        
        variacao1 += (media.av1[0] - array.av1[i]) * (media.av1[0] - array.av1[i]);
        variacao2 += (media.av2[0] - array.av2[i]) * (media.av2[0] - array.av2[i]);
        variacao3 += (media.av3[0] - array.av3[i]) * (media.av3[0] - array.av3[i]);
    }
    resposta.av1.push(Math.sqrt(variacao1).toFixed(2));
    resposta.av2.push(Math.sqrt(variacao2).toFixed(2));
    resposta.av3.push(Math.sqrt(variacao3).toFixed(2));
    return resposta
    
}

async function grafico(array) {
    let data = {"label":[], "av1":[]}

    for (let index = 0; index < array.length; index++) {
        data.label.push(array[index].aluno + "(" + array[index].disciplina+")");
        data.av1.push(array[index].av1);
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.label,
            datasets: [{
                label: 'nota AV1',
                data: data.av1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

async function grafico2(array) {
    let data = {"label":[], "av2":[]}

    for (let index = 0; index < array.length; index++) {
        data.label.push(array[index].aluno + "(" + array[index].disciplina+")");
        data.av2.push(array[index].av2);
    }
    var ctx = document.getElementById('myChart2').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.label,
            datasets: [{
                label: 'nota AV2',
                data: data.av2,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

async function grafico3(array) {
    let data = {"label":[], "av3":[]}

    for (let index = 0; index < array.length; index++) {
        data.label.push(array[index].aluno + "(" + array[index].disciplina+")");
        data.av3.push(array[index].av3);
    }
    var ctx = document.getElementById('myChart3').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.label,
            datasets: [{
                label: 'nota AV3',
                data: data.av3,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}