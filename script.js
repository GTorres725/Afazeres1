const body = document.querySelector("body");
const button_Mode = document.querySelector("#button_Mode");
//
//Data e Hora
//
let diaDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
let data;
definirData = () => {
  let dia = data.getDate();
  if (dia <= 9) {
    //Poderia fazer com length e toString, mas quero assim ;)
    dia = `0${dia}`;
  }
  let mes = data.getMonth() + 1;
  if (mes <= 9) {
    mes = `0${mes}`;
  }
  let ano = data.getFullYear();
  let diaSemana = diaDaSemana[data.getDay()];
  return `${dia} ${mes} ${ano} ${diaSemana}`;
};

definirHora = () => {
  let hora = data.getHours();
  if (hora <= 9) {
    hora = `0${hora}`;
  }
  let minuto = data.getMinutes();
  if (minuto <= 9) {
    minuto = `0${minuto}`;
  }
  let segundo = data.getSeconds();
  if (segundo <= 9) {
    segundo = `0${segundo}`;
  }
  return `${hora}:${minuto}:${segundo}`;
};

atualizarDataHora = () => {
  data = new Date();
  document.querySelector("#date").innerHTML = definirData();
  document.querySelector("#hour").innerHTML = definirHora();
};

atualizarDataHora(); // Chamando a função aqui apenas para n iniciar o primeiro segundo sem nenhuma informação
setInterval(atualizarDataHora, 1000); //Chamando a função a cada segundo para atualizala
//
//Modo Dark/Light
//
button_Mode.addEventListener("click", () => {
  if (body.classList.contains("back-dark")) {
    body.classList.replace("back-dark", "back-light");
    button_Mode.classList.replace("fa-sun", "fa-moon");
    button_Mode.style.backgroundColor = "#9176ff";
  } else {
    body.classList.replace("back-light", "back-dark");
    button_Mode.classList.replace("fa-moon", "fa-sun");
    button_Mode.style.backgroundColor = "#ffde59";
  }
});
//
//Setar Data Afazer
//
// let dataAfazeres = document.querySelector('.afazeres h3').value;
// DefinirDataAfazeres = () => {
// }
//
// Afazeres principal
//
let botaoEnviarAfazer = document.querySelector(".enviar");
let conteudoAfazer = document.querySelector(".popup_Conteudo");
const botSubtopicos = document.querySelector(".subtopicos");

let btnSub = document.getElementById("btnSub");
let btnClose = document.getElementById("btnClose");
let inputText = document.querySelector("#texto");
let selectedDivLinha = null;
botaoEnviarAfazer.addEventListener("click", () => {
  let divTextoCheckbox = document.createElement("div");
  let checkbox = document.createElement("input");
  let label = document.createElement("label");
  let divLixeiraHora = document.createElement("div");
  let divHora = document.createElement("div");
  let lixeira = document.createElement("button");
  let hInicial = document.createElement("input");
  let hFinal = document.createElement("input");
  let iClock = document.createElement("i");
  let divLinha = document.createElement("div");
  divLinha.classList.add("div_Linha");
  divTextoCheckbox.classList.add("div_Texto_Checkbox");
  divLixeiraHora.classList.add("div_Lixeira_Hora");
  checkbox.classList.add("checkbox");
  checkbox.style.display = "none";
  checkbox.type = "checkbox";
  label.textContent = inputText.value;
  label.style.paddingLeft = "2%";
  hInicial.type = "time";
  hInicial.style.height = "65%"; //Aplicado o estilo aqui, pois no css só estava pegando o estilo na primeira linha
  hFinal.type = "time";
  hFinal.style.height = "65%"; //Aplicado o estilo aqui, pois no css só estava pegando o estilo na primeira linha
  lixeira.classList.add("excluir_Linha", "fa-solid", "fa-trash-can");
  iClock.classList.add("fa-solid", "fa-stopwatch", "i_Clock");
  divHora.classList.add("div_Hora");

  //sub
  botSubtopicos.addEventListener("click", () => {
    let topicoSub = conteudoAfazer.lastElementChild;
    let divSubtopico = document.createElement("div");
    if (
      topicoSub.style.backgroundColor === "gray" &&
      botSubtopicos.style.backgroundColor === "gray"
    ) {
      topicoSub.style.backgroundColor = "";
      botSubtopicos.style.backgroundColor = "";
    } else {
      topicoSub.style.backgroundColor = "gray";
      botSubtopicos.style.backgroundColor = "gray";
    }
  });

  //Normal

  if (inputText.value === "") {
    alert("Insira uma tarefa!");
  } else if (botSubtopicos.style.backgroundColor === "gray") {
  } else {
    conteudoAfazer.appendChild(divLinha);
    divLinha.appendChild(divTextoCheckbox);
    divLinha.appendChild(divLixeiraHora);
    divTextoCheckbox.appendChild(checkbox);
    divTextoCheckbox.appendChild(label);
    divLixeiraHora.appendChild(divHora);
    divHora.appendChild(hInicial);
    divHora.appendChild(iClock);
    divHora.appendChild(hFinal);
    divLixeiraHora.appendChild(lixeira);

    inputText.value = "";
  }

  lixeira.addEventListener("click", () => {
    divLinha.remove();
  });

  // Criei uma função de click para a divLinha, pra quando você clicar nela, ele PEGA A QUE VOCÊ clicou
  // pra fazer todo o fluxo
  divLinha.addEventListener("click", function () {
    // Remove a classe de seleção do elemento anteriormente selecionado
    if (selectedDivLinha && selectedDivLinha !== this) {
      selectedDivLinha.classList.remove("selected");
      selectedDivLinha.style.backgroundColor = ""; // Resetando a cor de fundo
    }

    // Marca o novo elemento como selecionado
    selectedDivLinha = this;
    selectedDivLinha.classList.add("selected");
    selectedDivLinha.style.backgroundColor = "gray";

    inputText.placeholder = "Digite um subtópico...";
    inputText.setAttribute("id", "subAddTexto");
    btnSub.style.display = "flex";
    btnClose.style.display = "flex";
    botaoEnviarAfazer.style.display = "none";

    // Adiciona evento ao botão de adicionar subtópico
    btnSub.addEventListener("click", function () {
      if (inputText.getAttribute("id") === "subAddTexto") {
        let list = selectedDivLinha.querySelector("ul");
        if (!list) {
          list = document.createElement("ul");
          selectedDivLinha.appendChild(list);
        }
        let li = document.createElement("li");
        list.appendChild(li);
        li.textContent = inputText.value;

        // Depois que ele adiciona e cria o Li com o conteudo ele vai resetar o botão para poder inserir
        // outra tarefa
        btnSub.style.display = "none";
        btnClose.style.display = "none";
        botaoEnviarAfazer.style.display = "flex";

        selectedDivLinha.style.backgroundColor = "";
        inputText.setAttribute("id", "texto");
        inputText.placeholder = "Insira sua próxima tarefa...";
        inputText.value = "";
        selectedDivLinha = null;
      }
    });

    // Aqui é um botão que basicamente reseta, pra caso a pessoa clique sem querer e não queria
    // adicionar subtopicos
    btnClose.addEventListener("click", function () {
      if (inputText.getAttribute("id") === "subAddTexto") {
        selectedDivLinha.style.backgroundColor = "";
        inputText.placeholder = "Insira sua próxima tarefa...";
        inputText.setAttribute("id", "texto");
        btnSub.style.display = "none";
        btnClose.style.display = "none";
        botaoEnviarAfazer.style.display = "flex";
      }
    });
  });
});

const Botadicionar = document.querySelector(".adicionar");

//
// Botao Mais
//
const popup = document.querySelector(".popup");
//popup.style.display = 'none';
let botaoCentral = document.querySelector(".botao_Central button i");
document
  .querySelector(".botao_Central button")
  .addEventListener("click", () => {
    if (popup.style.display === "none") {
      popup.style.display = "";
      botaoCentral.classList.replace("fa-plus", "fa-minus");
    } else {
      popup.style.display = "none";
      botaoCentral.classList.replace("fa-minus", "fa-plus");
    }
  });
