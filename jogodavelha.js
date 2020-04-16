let estadoJogo = 'INICIO';

celulas = document.querySelectorAll('.celula');
for (let i = 0; i < celulas.length; i++) {               
    celulas[i].addEventListener('click', jogadaJogador, false);
}

const simBut = document.querySelector('.butSim');
simBut.addEventListener('click', jogadorInicia);
const naoBut = document.querySelector('.butNao');
naoBut.addEventListener('click', computadorInicia);


function jogadorInicia() {
    estadoJogo = 'JOGADOR'
}

function computadorInicia() {
    estadoJogo = 'COMPUTADOR';
    jogadaComputador();
}

function jogadaJogador(event){
    if (estadoJogo !== 'JOGADOR') {
        return;
    }
    console.info('ENTROU JOG') ;
    const espacoClicado = event.target;
    console.info( espacoClicado) ;
    if (espacoClicado.classList.contains('vazio')) {
        espacoClicado.innerText = 'X' ;
        espacoClicado.classList.add('X');
    }
    checaProximoPasso();
}

function jogadaComputador(event){
    // Faz codigo loco
    checaProximoPasso();
}


function checaProximoPasso() {

    const casa0 = document.querySelector('[data-casa="0"]');
    const casa1 = document.querySelector('[data-casa="1"]');
    const casa2 = document.querySelector('[data-casa="2"]');
    const casa3 = document.querySelector('[data-casa="3"]');
    const casa4 = document.querySelector('[data-casa="4"]');
    const casa5 = document.querySelector('[data-casa="5"]');
    const casa6 = document.querySelector('[data-casa="6"]');
    const casa7 = document.querySelector('[data-casa="7"]');
    const casa8 = document.querySelector('[data-casa="8"]');
  
    if (verificaIguais(casa0, casa1, casa2)) {  marcaResultado(casa0, casa1, casa2);  }
    if (verificaIguais(casa3, casa4, casa5)) {  marcaResultado(casa3, casa4, casa5);  }
    if (verificaIguais(casa6, casa7, casa8)) {  marcaResultado(casa6, casa7, casa8);  }

    if (verificaIguais(casa0, casa3, casa6)) {   marcaResultado(casa0, casa3, casa6);  }
    if (verificaIguais(casa1, casa4, casa7)) {   marcaResultado(casa1, casa4, casa7);  }
    if (verificaIguais(casa2, casa5, casa8)) {   marcaResultado(casa2, casa5, casa8);  }
   
    if (verificaIguais(casa0, casa4, casa8)) {   marcaResultado(casa0, casa4, casa8);  }
    if (verificaIguais(casa2, casa4, casa6)) {   marcaResultado(casa2, casa4, casa6);  }
   




    if (estadoJogo == 'COMPUTADOR') {
        estadoJogo = 'JOGADOR';
    } else  if (estadoJogo == 'JOGADOR') {
        estadoJogo = 'COMPUTADOR';
        jogadaComputador();
    } else  if (estadoJogo == 'FINAL') {
        
        //resultadooo
    }
}

function verificaIguais(casa1, casa2, casa3) {
    return casa1.innerText == casa2.innerText && casa2.innerText == casa3.innerText && casa1.innerText !='';
}

function marcaResultado(casa1, casa2, casa3) {
    if (casa1.innerText == 'X'){
        console.info('Voce Ganhou');
        estadoJogo = 'FINAL'
    }
    if (casa1.innerText == 'O'){
        console.info('Voce Perdeu');
        estadoJogo = 'FINAL'
    }
}
