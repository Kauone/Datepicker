const calendario = document.querySelector(".calendario");
const seletorData = document.getElementById("seletordata");
const seletorMes = document.getElementById("seletormes");
const seletorAno = document.getElementById("seletorano");
const cancelarb = document.querySelector(".cancelar");
const confirmarb = document.querySelector(".confirmar");
const prevb = document.querySelector(".prev");
const nextb = document.querySelector(".next");
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

    // remover a classe "selecionado" dos outros buttons 
    const selecionado = datas.querySelector(".selecionado");
    selecionado && selecionado.classList.remove("selecionado");

    //adiciona a classe "selecionado" para o button atual
    button.classList.add("selecionado");

    // define a data selecionada 
    dataSelecionada = new Date(ano, mes, parseInt(button.textContent));
};

//esconder calendário
cancelarb.addEventListener("click", () => {
    calendario.hidden = true; 
});

//click event próximo mês e ano (button)
nextb.addEventListener("click", () => {
    if (mes === 11) ano++;
    mes = (mes + 1) % 12; 
    mostrarDatas();
});

prevb.addEventListener("click", () => {
    if (mes === 0) ano--;
    mes = (mes - 1 + 12) % 12; 
    mostrarDatas();
});

//lidar com o click event do próximo mês
seletorMes.addEventListener("change" , () => {
    mes = seletorMes.selectedIndex;
    mostrarDatas();
});

//lidar com o click event do próximo ano
seletorAno.addEventListener("change" , () => {
    ano = seletorAno.value;
    mostrarDatas();
});

const updateMesAno = () => {
    seletorMes.selectedIndex = mes;
    seletorAno.value = ano;
};

//click event confirmar button 
confirmarb.addEventListener("click", () => {
// setar a data selecionada 
    seletorData.value = dataSelecionada.toLocaleDateString ("pt-BR", {
        ano: "numeric",
        mes: "2-digit",
        dia: "2-digit",
    });

    //esconder calendário
    calendario.hidden = true
});

//renderizar as datas na interface do calendário
const mostrarDatas = () => {
    //update ano e mes todas as vezes que as datas forem mudadas
    updateMesAno();
//limpar as datas
datas.innerHTML = "";

//mostrar a última semana do mês anterior 

//mostrar a úktima data do mês anterior
const ultimaDoMesAnterior = new Date(ano, mes, 0 );

for (let i = 0; i <= ultimaDoMesAnterior.getDay(); i++) {

    const text = ultimaDoMesAnterior.getDate() - ultimaDoMesAnterior.getDay() + i;
    const button = createButton(text, true);
    datas.appendChild(button);
}
//mostrar o mês atual 

//pegar a última data do mês
const ultimoDoMes = new Date(ano, mes +1, 0);

for(let i = 1; i <= ultimoDoMes.getDate(); i++) {

    

    const button = createButton (i, false);
    button.addEventListener("click", clickData);
    datas.appendChild(button);
}

//mostrar a primeira semana do mês seguinte

const primeiraDoProximomes = new Date(ano, mes, + 1, 1);

for (let i = primeiraDoProximomes.getDay(); i < 0; i++) {
    const text = primeiraDoProximomes.getDate() - primeiraDoProximomes.getDay() + i;
    const button = createButton(text, true);
    datas.appendChild(button);
}

};

const createButton = (text, isDisabled = false) => {

    const dataAtual = new Date();

    // checar se o button é o dia de hoje 
    const eHoje = dataAtual.getDate() === text && dataAtual.getFullYear() === ano && dataAtual.getMonth() === mes;

    // checar se o button está selecionado 
    const selecionado = dataSelecionada.getDate() === text && dataSelecionada.getFullYear() === ano && dataSelecionada.getMonth() === mes;

    const button = document.createElement("button");
    button.textContent = text;
    button.disabled = isDisabled;
    button.classList.toggle("hoje", eHoje);
    return button;
}

mostrarDatas();