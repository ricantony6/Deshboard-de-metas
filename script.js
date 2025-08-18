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
function adicionarMeta(metaTexto = inputMeta.value.trim(), concluida = false) {
    if (metaTexto === '') {
        alert('Por favor, digite uma meta.');
        return;
    }

    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = concluida; // Define se a meta está concluída

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
        salvarMetas(); // Salva no localStorage
    });

    // Evento do botão remover
    btnRemover.addEventListener('click', () => {
        listaMetas.removeChild(li);
        atualizarBarraProgresso();
        salvarMetas(); // Atualiza no localStorage
    });

    // Monta o <li>
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnRemover);
    listaMetas.appendChild(li);

    // Limpa o input
    inputMeta.value = '';

    // Atualiza barra e salva
    atualizarBarraProgresso();
    salvarMetas();
}

// Eventos
btnAdicionarMeta.addEventListener('click', () => adicionarMeta());
inputMeta.addEventListener('keydown', event => {
    if (event.key === 'Enter') adicionarMeta();
});

// Salvar metas no localStorage
function salvarMetas() {
    const metas = [];
    const lista = listaMetas.querySelectorAll('li');
    lista.forEach(li => {
        const checkbox = li.querySelector('input[type="checkbox"]');
        metas.push({
            texto: li.querySelector('span').textContent,
            concluida: checkbox.checked
        });
    });
    localStorage.setItem('metas', JSON.stringify(metas));
}

// Carregar metas do localStorage
function carregarMetas() {
    const metasSalvas = JSON.parse(localStorage.getItem('metas')) || [];
    metasSalvas.forEach(meta => {
        adicionarMeta(meta.texto, meta.concluida);
    });
}

// Carregar as metas salvas quando a página é carregada
window.addEventListener('load', carregarMetas);