import { conectaApi } from "./conectaAPI.js";
import constroiCard from "./mostrarVideos.js";

async function buscarVideo(evento) {
    evento.preventDefault();
    const dadosDePesquisa = document.querySelector("[data-pesquisa]").value;
    const busca = await conectaApi.buscaVideo(dadosDePesquisa);

    const lista = document.querySelector("[data-lista]");

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    busca.forEach(elemento => lista.appendChild(
        constroiCard(elemento.titulo, elemento.descricao, elemento.url, elemento.imagem)))

    if (busca.length == 0) {
        lista.innerHTML = `<h2 class="mensagem__titulo">Não existem videos com este termo</h2>`
    }
}

const inputSearch = document.getElementById('search');
const botaoDePesquisa = document.querySelector("[data-botao-pesquisa]");

inputSearch.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        buscarVideo(event);
    }
});

botaoDePesquisa.addEventListener("click", evento => buscarVideo(evento));