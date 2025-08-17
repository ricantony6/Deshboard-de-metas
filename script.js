// Seleciona elementos do HTML
const inputMeta = document.getElementById('nova-meta');
const btnAdicionarMeta = document.getElementById('adicionar-meta');
const listaMetas = document.getElementById('metas');
const barraPreenchida = document.getElementById('barra-preenchida');
const percentual = document.getElementById('percentual');

// Função para atualizar a barra de progresso
function atualizarBarraProgresso() {
    const metas = listaMetas.querySelectorAll('li');

    if (metas.length === 0) {
        barraPreenchida.style.width = '0%';
        percentual.textContent = '0%';
        return;
    }

    let metasConcluidas = 0;
    metas.forEach(li => {
        const checkbox = li.querySelector('input[type="checkbox"]');
        if (checkbox.checked) metasConcluidas++;
    });

    const percentagem = Math.round((metasConcluidas / metas.length) * 100);
    barraPreenchida.style.width = percentagem + '%';
    percentual.textContent = percentagem + '%';
}

// Função para adicionar meta
function adicionarMeta() {
    const metaTexto = inputMeta.value.trim();

    if (metaTexto === '') {
        alert('Por favor, digite uma meta.');
        return;
    }

    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const span = document.createElement('span');
    span.textContent = metaTexto;

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.style.marginLeft = '10px';

    // Evento do checkbox: risca texto e atualiza barra
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            span.style.textDecoration = 'line-through';
            span.style.color = '#7f8c8d';
        } else {
            span.style.textDecoration = 'none';
            span.style.color = 'black';
        }
        atualizarBarraProgresso();
    });

    // Evento do botão remover
    btnRemover.addEventListener('click', () => {
        listaMetas.removeChild(li);
        atualizarBarraProgresso();
    });

    // Monta o <li>
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnRemover);
    listaMetas.appendChild(li);

    // Limpa o input
    inputMeta.value = '';

    // Atualiza a barra ao adicionar
    atualizarBarraProgresso();
}

// Eventos
btnAdicionarMeta.addEventListener('click', adicionarMeta);
inputMeta.addEventListener('keydown', event => {
    if (event.key === 'Enter') adicionarMeta();
});