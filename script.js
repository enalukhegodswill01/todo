// Select DOM Elements
const todoInput = document.getElementById('todo-input');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Function to render the list
function renderTodos() {
    todoList.innerHTML = ''; // Clear existing list

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', todo.completed);

        li.innerHTML = `
            <span>${todo.text}</span>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        
        li.addEventListener('click', () => toggleComplete(index));

        todoList.appendChild(li);
    });
}

// Add a new todo
todoForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const newTodo = todoInput.value.trim();
    if (newTodo) {
        todos.push({ text: newTodo, completed: false });
        saveTodos();
        renderTodos();
        todoInput.value = '';
    }
});

// Toggle complete
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

// Delete todo
todoList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }
});

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Initial render
renderTodos();
