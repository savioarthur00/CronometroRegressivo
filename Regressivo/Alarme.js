var display = document.getElementById('display');
var minutos = document.getElementById('minutos');
var segundos = document.getElementById('segundos');
var comecar = document.getElementById('comecar');
var parar = document.getElementById('parar');
var container = document.querySelector('.timer');
var cronometro = document.querySelector('h3');
var minutoAtual;
var segundoAtual;
var interval;

for (var i = 0; i <= 60; i++) {
    minutos.innerHTML += '<option value=' + i + '>' + i + '</option>';
}

for (var i = 0; i <= 60; i++) {
    segundos.innerHTML += '<option value=' + i + '>' + i + '</option>';
}

function formatTime(minutos, segundos) {
    var formattedMinutos = (minutos < 0 ? '-' : '') + Math.abs(minutos);
    var formattedSegundos = Math.abs(segundos);
    return formattedMinutos + ': ' + formattedSegundos;
}

comecar.addEventListener('click', function () {
    minutoAtual = parseInt(minutos.value);
    segundoAtual = parseInt(segundos.value);
    display.childNodes[1].innerHTML = formatTime(minutoAtual, segundoAtual);

    interval = setInterval(function () {
        container.style.display = 'none';
        segundoAtual--;

        if (segundoAtual < 0) {
            if (minutoAtual > 0) {
                minutoAtual--;
                segundoAtual = 59;
            } else if (minutoAtual === 0 && segundoAtual === -60) {
                // Quando chegar a -0:60, vira -1:00
                minutoAtual = -1;
                segundoAtual = 0;
            } else if (minutoAtual < 0 && segundoAtual === -60) {
                // A cada 60 segundos negativos, incrementa um minuto negativo
                minutoAtual--;
                segundoAtual = 0;
            }
            
            // Adiciona a classe 'negativo' ao elemento h3 quando o tempo é negativo
            cronometro.classList.add('negativo');
        }

        display.childNodes[1].innerHTML = formatTime(minutoAtual, segundoAtual);
    }, 1000);
});

parar.addEventListener('click', function () {
    clearInterval(interval);
});
