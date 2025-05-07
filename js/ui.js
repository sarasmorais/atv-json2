import { criarUsuarios, listarUsuarios, editarUsuarios, deletarUsuario} from './crud.js';

export function setupUI() {
    document.getElementById('btnCriar').addEventListener('click', () => {
        
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();

        if (!nome || !email) {
            mensagem.innerHTML = 'Preencher todos os campos';
            mensagem.style.display = 'flex';

            setTimeout(() => {
                mensagem.style.display = 'none';
                mensagem.innerHTML = '';
            }, 3000);

            return;
        }

        criarUsuarios(nome, email);
        renderLista();
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
    });
    renderLista();
};

function renderLista() {
    const lista = document.getElementById('listaUsuarios');
    lista.innerHTML = '';

    listarUsuarios(usuarios => {
        usuarios.forEach(usuario => {
            const li = document.createElement('li');
            li.textContent = `${usuario.nome} (${usuario.email})`;

            
            const btnEditar = document.createElement('button');
            btnEditar.id = `editar-${usuario.id}`;
            btnEditar.textContent = 'Editar';
            li.appendChild(btnEditar);

            const btnExcluir = document.createElement('button');
            btnExcluir.id = `excluir-${usuario.id}`;
            btnExcluir.textContent = 'Excluir';
            li.appendChild(btnExcluir);

            lista.appendChild(li);

            document.getElementById(`editar-${usuario.id}`).addEventListener('click', () => editar(usuario.id));
            document.getElementById(`excluir-${usuario.id}`).addEventListener('click', () => excluir(usuario.id));
        });
    });
}


window.editar = (id) => {
    const novoNome = prompt("Novo Nome");
    const novoEmail = prompt("Novo Email");

    if (novoNome && novoEmail) {
        editarUsuarios(id, novoNome, novoEmail);
        renderLista();
    }
}

window.excluir = (id) => {
    if (confirm("Tu tem certeza?")){
        deletarUsuario(id);
        renderLista();
    }
}