let estadoJogo = 'INICIO';
let resultado = '';
let jogJogou = 0 ;
let pcJogou = 0 ;
let dificuldade = 'FACIL' ;

celulas = document.querySelectorAll('.celula');
for (let i = 0; i < celulas.length; i++) {               
    celulas[i].addEventListener('click', jogadaJogador);
}

const casa0 = document.querySelector('[data-casa="0"]');
const casa1 = document.querySelector('[data-casa="1"]');
const casa2 = document.querySelector('[data-casa="2"]');
const casa3 = document.querySelector('[data-casa="3"]');
const casa4 = document.querySelector('[data-casa="4"]');
const casa5 = document.querySelector('[data-casa="5"]');
const casa6 = document.querySelector('[data-casa="6"]');
const casa7 = document.querySelector('[data-casa="7"]');
const casa8 = document.querySelector('[data-casa="8"]');

const casas = document.querySelectorAll('[data-casa]');
for (let i = 0; i < casas.length; i++) {
    if (casas[i].innerText == ''){
        casas[i].value = 0 ;
    } else if (casas[i].innerText == 'X'){
        casas[i].value = -1 ;
    } else if (casas[i].innerText == 'O'){
        casas[i].value = 1 ;
    } 
    
}

const simBut = document.querySelector('.butSim');
simBut.addEventListener('click', jogadorInicia);
const naoBut = document.querySelector('.butNao');
naoBut.addEventListener('click', computadorInicia);

const resetBut = document.querySelector('.reset');
resetBut.addEventListener('click', reset);

function jogadorInicia() {
    estadoJogo = 'JOGADOR'
    document.querySelector('.butSim').classList.add('butEscuro');
    document.querySelector('.butNao').classList.add('butEscuro');
}

function computadorInicia() {
    estadoJogo = 'COMPUTADOR';
    document.querySelector('.butSim').classList.add('butEscuro');
    document.querySelector('.butNao').classList.add('butEscuro');
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
        espacoClicado.classList.remove('vazio');
    }
    jogJogou++ ;
    checaProximoPasso();
}
function jogadaComputador(){
    if(dificuldade == 'FACIL'){
        jogadaComputadorFacil();
    } else if(dificuldade == 'MEDIO'){
        jogadaComputadorMedio();
    } else {
        jogadaComputadorDificil();
    }
}
function jogadaComputadorFacil(){
    const vazios = document.querySelectorAll('.vazio');
    const aleatorio = Math.floor(Math.random() * vazios.length);
    console.info(aleatorio);
    vazios[aleatorio].innerText = 'O';
    vazios[aleatorio].classList.add('O');
    vazios[aleatorio].classList.remove('vazio');
    checaProximoPasso();
}

// function jogadaComputadorMedio(){
//     const linha1 = document.querySelectorAll('[data-l="1"]');
//     if ( i=0 , i < linha1.length , i++ ){

//     }
//     else {
//     const vazios = document.querySelectorAll('.vazio');
//     const aleatorio = Math.floor(Math.random() * vazios.length);
//     console.info(aleatorio);
//     vazios[aleatorio].innerText = 'O';
//     vazios[aleatorio].classList.add('O');
//     vazios[aleatorio].classList.remove('vazio');
//     }
//     checaProximoPasso();
// }

function jogadaComputadorDificil(){
    const aleatorio = Math.floor(Math.random() * 4);
    console.info(aleatorio);

    if(jogJogou == 0 && pcJogou == 0){
        const conjDeCasas = [casa0 , casa2 , casa6 , casa8];
        conjDeCasas[aleatorio].innerText = 'O' ;
        conjDeCasas[aleatorio].classList.add('O');

    } else if (jogJogou == 1 && pcJogou == 1){
        if( (casa2.innerText == 'O' || casa6.innerText == 'O' )&& ( casa5.innerText == 'X' || casa8.innerText == 'X' || casa7.innerText == 'X' )){
            casa0.innerText = 'O';
            casa0.classList.add('O').remove('vazio');
        } else if( (casa2.innerText == 'O'|| casa6.innerText == 'O' ) && ( casa1.innerText == 'X' || casa0.innerText == 'X' || casa3.innerText == 'X' )){
            casa8.innerText = 'O';
            casa8.classList.add('O').remove('vazio');
        }else if( (casa0.innerText == 'O'|| casa8.innerText == 'O' ) && ( casa1.innerText == 'X' || casa2.innerText == 'X' || casa5.innerText == 'X' )){
            casa6.innerText = 'O';
            casa6.classList.add('O').remove('vazio');
        }else if( (casa0.innerText == 'O'|| casa8.innerText == 'O' ) && ( casa3.innerText == 'X' || casa6.innerText == 'X' || casa7.innerText == 'X' )){
            casa2.innerText = 'O';
            casa2.classList.add('O').remove('vazio');
        }else { 
             const aleatorio = Math.floor(Math.random() * 2);
             console.info(aleatorio + 'de 2');
        
            if (casa0.innerText == 'O' && casa8.innerText == 'X' ){
                conjDeCasas = [casa2 , casa6];
                conjDeCasas[aleatorio].innerText = 'O' ;
            } else if (casa8.innerText == 'O' && casa0.innerText == 'X' ){
                conjDeCasas = [casa2 , casa6];
                conjDeCasas[aleatorio].innerText = 'O' ;
            } else if (casa2.innerText == 'O' && casa6.innerText == 'X' ){
                conjDeCasas = [casa0 , casa8];
                conjDeCasas[aleatorio].innerText = 'O' ;
            }
            else if (casa6.innerText == 'O' && casa2.innerText == 'X' ){
                conjDeCasas = [casa0 , casa8];
                conjDeCasas[aleatorio].innerText = 'O' ;
            }
            conjDeCasas[aleatorio].classList.add('O').remove('vazio');
        }
    }

    pcJogou++ ;
    checaProximoPasso();
}

function checaProximoPasso() {
  
    if (verificaIguais(casa0, casa1, casa2)) {  marcaResultado(casa0);  }
    if (verificaIguais(casa3, casa4, casa5)) {  marcaResultado(casa3);  }
    if (verificaIguais(casa6, casa7, casa8)) {  marcaResultado(casa6);  }

    if (verificaIguais(casa0, casa3, casa6)) {  marcaResultado(casa0);  }
    if (verificaIguais(casa1, casa4, casa7)) {  marcaResultado(casa1);  }
    if (verificaIguais(casa2, casa5, casa8)) {  marcaResultado(casa2);  }
   
    if (verificaIguais(casa0, casa4, casa8)) {  marcaResultado(casa0);  }
    if (verificaIguais(casa2, casa4, casa6)) {  marcaResultado(casa2);  }
   

    if (estadoJogo == 'COMPUTADOR') {
        estadoJogo = 'JOGADOR';
    } else  if (estadoJogo == 'JOGADOR') {
        estadoJogo = 'COMPUTADOR';
        jogadaComputador();
    } else  if (estadoJogo == 'FINAL') {
        document.querySelector('.resultado').innerText = resultado ;
        document.querySelector('.textoResultado').classList.remove('some');
    }
}
function verificaIguais(casa1, casa2, casa3) {
    return casa1.innerText == casa2.innerText && casa2.innerText == casa3.innerText && casa1.innerText !='';
}
function marcaResultado(casa1) {
    if (casa1.innerText == 'X'){
        resultado = 'Ganhou';
        estadoJogo = 'FINAL'
    }
    if (casa1.innerText == 'O'){
        resultado = 'Perdeu';
        estadoJogo = 'FINAL'
    }
}
function reset(){
    const casas = document.querySelectorAll('[data-casa]');
    for (let i = 0; i < casas.length; i++) {
        casas[i].innerText = '';
        casas[i].classList.add('vazio');
        casas[i].classList.remove('X');
        casas[i].classList.remove('O');
    }
    document.querySelector('.textoResultado').classList.add('some');
    document.querySelector('.butSim').classList.remove('butEscuro');
    document.querySelector('.butNao').classList.remove('butEscuro');
}
