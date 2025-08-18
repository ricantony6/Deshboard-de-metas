// Seleciona elementos do HTML
const inputMeta = document.getElementById('nova-meta');
const btnAdicionarMeta = document.getElementById('adicionar-meta');
const listaMetas = document.getElementById('metas');
const barraPreenchida = document.getElementById('barra-preenchida');
const percentual = document.getElementById('percentual');
const btnDarkMode = document.getElementById('toggle-darkmode');

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
    checkbox.checked = concluida; // agora funciona

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
            listaMetas.appendChild(li); // move para o final
        } else {
            span.style.textDecoration = 'none';
            span.style.color = 'black';
            listaMetas.insertBefore(li, listaMetas.firstChild); // move para o começo
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
    inputMeta.focus();

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

// Filtros de metas
document.getElementById('filtrar-todas').addEventListener('click', () => {
    listaMetas.querySelectorAll('li').forEach(li => li.style.display = 'flex');
});

document.getElementById('filtrar-concluidas').addEventListener('click', () => {
    listaMetas.querySelectorAll('li').forEach(li => {
        li.style.display = li.querySelector('input').checked ? 'flex' : 'none';
    });
});

document.getElementById('filtrar-pendentes').addEventListener('click', () => {
    listaMetas.querySelectorAll('li').forEach(li => {
        li.style.display = !li.querySelector('input').checked ? 'flex' : 'none';
    });
});

// Dark Mode
btnDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')) {
        localStorage.setItem('tema', 'dark');
    } else {
        localStorage.setItem('tema', 'light');
    }
});

// Carregar preferências e metas ao iniciar
window.addEventListener('load', () => {
    carregarMetas();
    if(localStorage.getItem('tema') === 'dark') {
        document.body.classList.add('dark-mode');
    }
});