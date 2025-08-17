//pegando os elementos do html para usar no js
const inputMeta = document.getElementById('nova-meta');
const btnAdicionarMeta = document.getElementById('adicionar-meta');
const listaMetas = document.getElementById('metas');

//adicionando o evento de click no botao
function adicionarMeta() {
    const metaTexto = inputMeta.value.trim(); //pega o que foi digitado 
    if (metaTexto === '') { //verifica se o campo esta vazio
        alert('Por favor, digite uma meta.');
        return;
    }

    // cria um novo elemento de lista
    const li = document.createElement('li');

    // cria um checkbox para marcar a meta como concluída
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    //cria o texto da meta
    const span = document.createElement('span');
    span.textContent = metaTexto;

    //quando o checkbox for marcado, a meta sera riscada
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            span.style.textDecoration = 'line-through';//risca o texto
            span.style.color = 'gray'; //muda a cor do texto riscado
        } else {
            span.style.textDecoration = 'none'; //remove o risco do texto
            span.style.color = 'black'; //volta a cor original do texto
        }
    });    

    //botão para remover a meta
    const btnRemover = document.createElement('button');