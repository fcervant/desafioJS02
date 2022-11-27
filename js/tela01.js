// JS

// https://freesound.org/search/?q=slot+machine
// fcervant@gmail.com / sobeque

console.log("Hello JS");

const inputText = document.querySelector("#nome");
const btnJogar = document.querySelector("#btnJogar");
const btnPlay = document.querySelector("#btnPlay");
const nomeJogador = document.querySelector("#user");
const numberID = document.querySelector("#numbers");
const nrSorteio = 3;
var maxTentativas = 10;
//const qtdTentativas = 10;
var qtdPontos = 0;
var qtPontosWinner = 2;

let arrayJogos = ["?", "?", "?"];

function showHide(obj, action) {
  document.querySelector(obj).classList[action]("hide");
  document.querySelector(
    "#resAnterior"
  ).innerHTML = `${arrayJogos[0]} - ${arrayJogos[1]} - ${arrayJogos[2]}`;
  document.querySelector(
    "#tentativas"
  ).innerHTML = `${maxTentativas} tentativas!`;
}

function myFunction() {
  document.getElementById("myDialog").showModal();
}

// btnJogar.onclick= () => { alert(inputText.value) }

// btnJogar.onclick = function(){ alert(inputText.value)}

btnJogar.addEventListener("click", () => {
  // alert(inputText.value)
  // document.getElementById("#user").innerText = inputText.value;
  // nomeJogador.textContent = inputText.value;
  console.log(`jogar - ${maxTentativas}`);
  // ternário
  inputText !== "" ? localStorage.setItem("jogador", inputText.value) : null;
  let nomePlayer = localStorage.getItem("jogador");
  // document.querySelector("#user").textContent = `${nomePlayer}`;
  document.querySelector("#user").innerHTML = `<b>${nomePlayer}</>, boa sorte!`;
  showHide("#telaJogo", "remove");
  showHide("#telaInicial", "add");
  showHide("#btnNewGame", "add");
});

btnPlay.addEventListener("click", () => {
  if (this.maxTentativas > 0) {
    sorteioArray();
  } else {
    let nomePlayer = localStorage.getItem("jogador");
    document.querySelector(
      "#user"
    ).innerHTML = `<b>${nomePlayer}</>, lamento - fim de jogo!`;

    if (qtdPontos == qtPontosWinner) {
      console.log("Vencedor");
      // vencedor!
      let msg2 = `Você chegou aos ${qtPontosWinner} pontos!!! Parabéns`;
      $("#modalGanhou").modal("show");
      $("#modalGanhou img").attr("src", "./images/winner.png");
      $("#modalGanhou h3").text(`Foram ${qtdPontos} pontos !!!! ${msg2}`);
      showHide("#btnNewGame", "remove");
    } else {
      // perdedor...
      console.log("Looser");
      let msg2 = "Para ganhar tinha que ter 3 pontos...PERDEU!";
      $("#modalGanhou").modal("show");
      $("#modalGanhou img").attr("src", "./images/looser.jpg");
      $("#modalGanhou h3").text(`Foram ${qtdPontos} pontos...${msg2}`);
      showHide("#btnNewGame", "remove");
    }
  }
});

btnNewGame.addEventListener("click", () => {
  window.location.reload();
});

// a solução do Roque...
// pega quantidade de imagens

function sorteioArray() {
  document.querySelector(
    "#resAnterior"
  ).innerHTML = `${arrayJogos[0]} - ${arrayJogos[1]} - ${arrayJogos[2]}`;
  let combo = [];
  let imgs = document.querySelectorAll("#numbers img");
  // document.getElementById("number1").src = "./images/question.png";
  // document.getElementById("number2").src = "./images/question.png";
  // document.getElementById("number3").src = "./images/question.png";
  imgs.forEach((el, index) => {
    combo.push(parseInt(Math.random() * 3) + 1);
    // retorna "?" para as imagens, do meu jeito!
    document.getElementById(`number${index + 1}`).src = "./images/question.png";

    el.addEventListener("click", (e) => {
      e.target.src = `./images/number_${combo[index]}.png`;
    });

    //pauseClick(1000);
    document.getElementById(`number${index + 1}`).click();
  });
  // imgs.forEach((el, index) => {
  //   pauseClick(200);
  //   el.click();
  // });
  // verifica se combo tem o mesmo nr nas 3 posições
  let comboStr = combo.toString();
  let qtNumber = comboStr.split(combo[0]).length - 1;
  let msg = "vez";

  // verifica se os 3 números são identicos - um ponto
  if (qtNumber == 3) {
    // ganhou!!
    qtdPontos = qtdPontos + 1;
    qtdPontos > 1 ? (msg = "vezes") : null;
    $("#modalGanhou").modal("show");
    $("#modalGanhou h3").text(`Acertou ${qtdPontos} ${msg} !!!`);
  } else {
    console.log("qtNumber");
  }
  // verifica se combo anterior é igual ao combo atual - mais x pontos
  // arrayJogos = combo;

  // e verifica se os numeros são identicos à ultima jogada = um ponto
  if (combo == arrayJogos) {
    qtdPontos = qtdPontos + 1;
    msg = "Sorteou os mesmos números que antes!! Ganhou 1 ponto!";
    $("#modalGanhou").modal("show");
    $("#modalGanhou h3").text(msg);
  }
  arrayJogos = combo;

  if (qtdPontos == qtPontosWinner) {
    console.log(qtdPontos, qtPontosWinner, maxTentativas);
    maxTentativas = 0;
  } else {
    maxTentativas--;
    console.log(qtdPontos, qtPontosWinner, maxTentativas);
  }

  document.querySelector("#tentativas").innerHTML = maxTentativas;
  document.querySelector("#pontuacao").innerHTML = qtdPontos;

  // // força atualização do numero sorteado após 5 segundos...
  // pauseClick(5000);
  // document.getElementById("number1").click();
  // document.getElementById("number2").click();
  // document.getElementById("number3").click();
}

function pauseClick(millis) {
  var date = Date.now();
  var curDate = null;
  do {
    curDate = Date.now();
  } while (curDate - date < millis);
}

// minha primeira solução....
// function sorteioArray() {
//   for (let i = 0; i <= 2; i++) {
//     var rnd = Math.floor(Math.random() * nrSorteio) + 1;
//     arrayJogos[i] = rnd;
//     //document.querySelector(`#number${i + 1}.setAttributes = "src='./images/number_1.png'"`);
//     document.getElementById(
//       `number${i + 1}`
//     ).src = `./images/number_${rnd}.png`;
//   }
//   console.log(arrayJogos);
// }

// só para checar os dados iniciais
// console.log(length);
// let n1 = parseInt(Math.random() * 3) + 1;
// let n2 = parseInt(Math.random() * 3) + 1;
// let n3 = parseInt(Math.random() * 3) + 1;

// # criar array para receber 3 numeros - 1, 2 e 3 aleatoriamente - Math.random
// let nome= "Roque"
// console.log(`Olá ${nome}`)
// console.log('Olá' + nome)
