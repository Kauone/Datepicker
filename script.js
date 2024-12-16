const calendario = document.querySelector(".calendario");
const seletordata = document.getElementById("seletordata");
const cancelarb = document.querySelector(".cancelar");
const confirmarb = document.querySelector(".confirmar");
const datas = document.querySelector(".datas");

let dataSelecionada = new Date();
let ano = dataSelecionada.getFullYear();
let mes = dataSelecionada.getMonth();

//mostrar calendário
seletordata.addEventListener("click", () => {
    calendario.hidden = false;
});

const clickData = (e) => {
    const button = e.target;

    // remove a classe "selecionado" dos outros botões
    const selecionado = datas.querySelector(".selecionado");
    selecionado && selecionado.classList.remove("selecionado");

    //adiciona a classe "selecionado" para o botão atual
    button.classList.add("selecionado");

    // define a data selecionada 
    dataSelecionada = new Date(ano, mes, parseInt(button.textContent));
};

//esconder calendário
cancelarb.addEventListener("click", () => {
    calendario.hidden = true; 
});

//click event confirmar button 
confirmarb.addEventListener("click", () => {
// setar o evento do botão depois 
    calendario.hidden = true; 
})

//renderizar as datas na interface do calendário
const mostrarDatas = () => {
//limpar as datas
datas.innerHTML = "";

//mostrar a última semana do mês anterior 

//mostrar a úktima data do mês anterior
const ultimaDoMesAnterior = new Date(ano, mes, 0 );

for (let i = 0; i <= ultimaDoMesAnterior.getDay(); i++) {

    const text = ultimaDoMesAnterior.getDate() - ultimaDoMesAnterior.getDay() + i;
    const button = createButton(text, true, false);
    datas.appendChild(button);
}
//mostrar o mês atual 

//pegar a última data do mês
const ultimoDoMes = new Date(ano, mes +1, 0);

for(let i = 1; i <= ultimoDoMes.getDate(); i++) {

    const eHoje = dataSelecionada.getDate() === i && dataSelecionada.getFullYear() === ano && dataSelecionada.getMonth() === mes;

    const button = createButton (i, false, eHoje);
    button.addEventListener("click", clickData);
    datas.appendChild(button);
}

//mostrar a primeira semana do mês seguinte

const primeiraDoProximomes = new Date(ano, mes, + 1, 1);

for (let i = primeiraDoProximomes.getDay(); i < 4; i++) {
    const text = primeiraDoProximomes.getDate() - primeiraDoProximomes.getDay() + i;
    const button = createButton(text, true, false);
    datas.appendChild(button);
}

};

const createButton = (text, isDisabled = false, eHoje = false) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.disabled = isDisabled;
    button.classList.toggle("hoje", eHoje);
    return button;
}

mostrarDatas();