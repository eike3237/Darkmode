const html = document.querySelector("html");
const checkbox = document.querySelector("input[name=theme]"); //input de name = theme

// Função pra pegar a estilização la do html
const getStyle = (element, style) =>
    window
        .getComputedStyle(element)
        .getPropertyValue(style); // Esse window é como pegaremos este estilo do body, pegamos 1 especifico, declaremos da onde (html) e qual o estilo (background ou etc)

//Pegando as cores e definindo-as, initial pega as cores iniciais do html
const initialColors = { // Objeto com as cores iniciais
    bg: getStyle(html, "--bg"),//background. pegar esse estilo do css
    bgPanel: getStyle(html, "--bg-panel"),
    colorHeadings: getStyle(html, "--color-headings"),
    colorText: getStyle(html, "--color-text"),
}

const darkMode = { // Objeto com as cores darkmode
    bg: "#333333",
    bgPanel: "#434343",
    colorHeadings: "#3664FF",
    colorText: "#B5B5B5",
}

// Colocando no HTML
//Arrow function que vai receber uma chave e vai retornar a ideia de alterar
//ali dentro da expressão regular que é essa substituição de "bgPanel" por --bg-panel por ex.
//key.replace(/([A-Z])/) - Nessa chave, procure tudo que for letra Maiúscula de A-Z 
//tudo q ta achando ali, ta colocando no lugar do $1 e antes dele 1 traço, dps jogando pra minusculo, pra ficar igual as variaveis css
const transformKey = key => 
    "--" + key.replace(/([A-Z])/g, "-$1").toLowerCase(); // "/g" faz com que formate em todas as ocorrencias

const changeColors = (colors) => { 
    //Primeiro definir cada item "bg" em "--bg" e etc para mandar pro html
    Object.keys(colors).map(key => { // Mapiando os objeto keys, pegando as keys, as cores e mapeando
        html.style.setProperty(transformKey(key), colors[key])
    }) // de dentro de cada color (itens dos objects darkMode e initialColors) pegando a chave, que é a cor em si
} // qnd tiver checked vai ser o darkMode e qnd nao vai ser o Initial colors

checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors);
}) /* Adiciona um listener no checkbox importado do html, vai ouvir um "change" que é um evento 
    que acontece neste tipo de input
    quando o acionador "target" for checked (Caracteristica do input type="checkbox" no html) 
    ele define a cor */

/** Sintaxe Listeners
 *  alvo.addEventListener(type,listener[, options]);
 *  alvo.addEventListener(type,listener[, useCapture, wantUntrusted  ]); // Gecko/Mozilla only
 */

/** ====== Salvar o modo de vizualização no localStorage */
const isExistLocalStorage = (key) => 
  localStorage.getItem(key) != null

const createOrEditLocalStorage = (key, value) => 
  localStorage.setItem(key, JSON.stringify(value))

const getValeuLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key))

checkbox.addEventListener("change", ({target}) => {
  if (target.checked) {
    changeColors(darkMode) 
    createOrEditLocalStorage('modo','darkMode')
  } else {
    changeColors(initialColors)
    createOrEditLocalStorage('modo','initialColors')
  }
})

if(!isExistLocalStorage('modo'))
  createOrEditLocalStorage('modo', 'initialColors')


if (getValeuLocalStorage('modo') === "initialColors") {
  checkbox.removeAttribute('checked')
  changeColors(initialColors);
} else {
  checkbox.setAttribute('checked', "")
  changeColors(darkMode);
}