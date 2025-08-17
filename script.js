// Seleciona elementos do HTML
const inputMeta = document.getElementById('nova-meta');
const btnAdicionarMeta = document.getElementById('adicionar-meta');
const listaMetas = document.getElementById('metas');

// Função para adicionar meta
function adicionarMeta() {
    const metaTexto = inputMeta.value.trim(); // pega o valor e remove espaços

    if (metaTexto === '') { // verifica se o campo está vazio
        alert('Por favor, digite uma meta.');
        return;
    }

    // Cria um novo <li>
    const li = document.createElement('li');

    // Cria checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Cria span para o texto da meta
    const span = document.createElement('span');
    span.textContent = metaTexto;

    // Risca o texto quando marcado
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            span.style.textDecoration = 'line-through';
            span.style.color = '#7f8c8d'; 
        } else {
            span.style.textDecoration = 'none';
            span.style.color = 'black';
        }
    });

    // Botão para remover meta
    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.style.marginLeft = '10px';
    btnRemover.addEventListener('click', () => {
        listaMetas.removeChild(li);
    });

    // Monta o <li> com checkbox, texto e botão
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnRemover);

    // Adiciona o item na lista
    listaMetas.appendChild(li);

    // Limpa o input
    inputMeta.value = '';
}

// Evento de click no botão
btnAdicionarMeta.addEventListener('click', adicionarMeta);

// Evento de Enter no input 
inputMeta.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        adicionarMeta();
    }
});