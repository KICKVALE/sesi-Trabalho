document.addEventListener("DOMContentLoaded", () => {
    // Função para carregar os usuários no select de usuários
    function loadUsers() {
        const users = [
            { id: 1, name: "João" },
            { id: 2, name: "Maria" },
            { id: 3, name: "Pedro" }
        ];

        const userSelect = document.getElementById("user");
        users.forEach(user => {
            const option = document.createElement("option");
            option.value = user.id;
            option.textContent = user.name;
            userSelect.appendChild(option);
        });
    }

    loadUsers();

    // Função para validar o formulário
    function validateForm(event) {
        event.preventDefault();
        const form = event.target;
        const inputs = [
            { id: "name", errorMsg: "O campo Nome é obrigatório.", validate: value => value.trim() !== '' },
            { id: "email", errorMsg: "O campo Email é obrigatório.", validate: value => /\S+@\S+\.\S+/.test(value) },
            { id: "description", errorMsg: "O campo Descrição é obrigatório.", validate: value => value.trim() !== '' },
            { id: "sector", errorMsg: "O campo Setor é obrigatório.", validate: value => value.trim() !== '' },
            { id: "user", errorMsg: "Selecione um usuário.", validate: value => value !== "" }
        ];

        let isValid = true;

        // Loop para validar todos os campos
        inputs.forEach(input => {
            const element = form.querySelector(`#${input.id}`);
            const errorElement = document.getElementById(`${input.id}Error`);
            if (element && !input.validate(element.value)) {
                errorElement.textContent = input.errorMsg;
                errorElement.style.display = "block";
                isValid = false;
            } else if (element) {
                errorElement.style.display = "none";
            }
        });

        // Exibe mensagem de sucesso se o formulário estiver válido
        if (isValid) {
            alert("Formulário enviado com sucesso!");
            form.reset();
        }
    }

    // Adiciona o evento de submit aos formulários
    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", validateForm);
    });

    // Dados simulados de tarefas para exibição inicial
    const tasks = [
        { id: 1, description: 'Tarefa de Alta Prioridade', sector: 'TI', priority: 'Alta', user: 'João', status: 'A Fazer' },
        { id: 2, description: 'Tarefa de Baixa Prioridade', sector: 'Financeiro', priority: 'Baixa', user: 'Maria', status: 'Fazendo' },
        { id: 3, description: 'Tarefa Concluída', sector: 'Vendas', priority: 'Média', user: 'Pedro', status: 'Pronto' }
    ];

    // Função para renderizar as tarefas
    function renderTasks() {
        const columns = {
            "A Fazer": document.getElementById("todo-list"),
            "Fazendo": document.getElementById("inprogress-list"),
            "Pronto": document.getElementById("done-list")
        };

        // Limpa as listas atuais
        Object.values(columns).forEach(col => col.innerHTML = '');

        tasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = 'task-card';
            taskCard.innerHTML = `
                <h3>${task.description}</h3>
                <p><strong>Setor:</strong> ${task.sector}</p>
                <p><strong>Prioridade:</strong> ${task.priority}</p>
                <p><strong>Vinculado a:</strong> ${task.user}</p>
                <div class="task-actions">
                    <button class="edit-btn" onclick="editTask(${task.id})">Editar</button>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">Excluir</button>
                    <select onchange="changeStatus(${task.id}, this.value)">
                        <option value="A Fazer" ${task.status === 'A Fazer' ? 'selected' : ''}>A Fazer</option>
                        <option value="Fazendo" ${task.status === 'Fazendo' ? 'selected' : ''}>Fazendo</option>
                        <option value="Pronto" ${task.status === 'Pronto' ? 'selected' : ''}>Pronto</option>
                    </select>
                </div>
            `;
            columns[task.status].appendChild(taskCard);
        });
    }

    // Funções de manipulação de tarefas
    function editTask(id) {
        alert(`Editar tarefa com ID: ${id}`);
    }

    function deleteTask(id) {
        if (confirm('Tem certeza de que deseja excluir esta tarefa?')) {
            const taskIndex = tasks.findIndex(task => task.id === id);
            if (taskIndex > -1) tasks.splice(taskIndex, 1);
            renderTasks();
        }
    }

    function changeStatus(id, status) {
        const task = tasks.find(task => task.id === id);
        if (task) task.status = status;
    }

   
    function showDeleteModal(taskId) {
        const modal = document.getElementById("deleteModal");
        const confirmDeleteButton = document.getElementById("confirmDelete");
        const cancelDeleteButton = document.getElementById("cancelDelete");

        modal.style.display = "flex";

        
        confirmDeleteButton.onclick = () => {
            const taskIndex = tasks.findIndex(t => t.id === taskId);
            if (taskIndex > -1) tasks.splice(taskIndex, 1);
            modal.style.display = "none";
            renderTasks();
        };

        
        cancelDeleteButton.onclick = () => {
            modal.style.display = "none";
        };
    }

   
    renderTasks();
});

document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let isValid = true;

  
    function validateField(fieldId, errorId, errorMessage) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(errorId);
        if (field.value.trim() === '') {
            errorElement.textContent = errorMessage;
            field.classList.add('invalid');
            isValid = false;
        } else {
            errorElement.textContent = '';
            field.classList.remove('invalid');
        }
    }

    
    validateField('description', 'descriptionError', 'O campo Descrição é obrigatório.');
    validateField('sector', 'sectorError', 'O campo Setor é obrigatório.');
    validateField('user', 'userError', 'Selecione um usuário.');

 
    if (isValid) {
        alert('Tarefa cadastrada com sucesso!');
       
    }
});

document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let isValid = true;

    function validateField(fieldId, errorId, errorMessage) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(errorId);
        if (field.value.trim() === '') {
            errorElement.textContent = errorMessage;
            field.classList.add('invalid');
            isValid = false;
        } else {
            errorElement.textContent = '';
            field.classList.remove('invalid');
        }
    }

    // Validação do nome
    validateField('name', 'nameError', 'Este campo é obrigatório.');

    // Validação do email
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email.value)) {
        emailError.textContent = 'Por favor, insira um email válido.';
        email.classList.add('invalid');
        isValid = false;
    } else {
        emailError.textContent = '';
        email.classList.remove('invalid');
    }

    // Se for válido, submeter
    if (isValid) {
        alert('Usuário cadastrado com sucesso!');
        // Lógica de cadastro de usuário seria implementada aqui
    }
});
