// Get elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render todos
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item' + (todo.completed ? ' completed' : '');
        
        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;
        span.onclick = () => toggleTodo(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.onclick = () => deleteTodo(index);

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

// Add new todo
todoForm.onsubmit = function(e) {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text !== '') {
        todos.push({ text, completed: false });
        todoInput.value = '';
        saveAndRender();
    }
};

// Toggle completed state
function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveAndRender();
}

// Delete todo
function deleteTodo(index) {
    todos.splice(index, 1);
    saveAndRender();
}

// Save to localStorage and render
function saveAndRender() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

// Initial render
renderTodos();