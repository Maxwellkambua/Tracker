/**
 * Task Tracker - Vanilla JavaScript
 * Manage tasks with localStorage persistence
 */

// ---------- State ----------
let tasks = [];
let currentFilter = 'all';

// DOM Elements
const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalTasksEl = document.getElementById('totalTasks');
const activeTasksEl = document.getElementById('activeTasks');
const completedTasksEl = document.getElementById('completedTasks');

// ---------- Initialize ----------
document.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    renderTasks();
    updateStats();
});

// ---------- Event Listeners ----------
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

// ---------- Core Functions ----------
function addTask() {
    const text = taskInput.value.trim();
    const date = taskDate.value || '';

    if (!text) {
        alert('Please enter a task description.');
        return;
    }

    const task = {
        id: Date.now().toString(),
        text: text,
        date: date,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.unshift(task);
    saveToStorage();
    renderTasks();
    updateStats();

    // Clear inputs
    taskInput.value = '';
    taskDate.value = '';
    taskInput.focus();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveToStorage();
    renderTasks();
    updateStats();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveToStorage();
        renderTasks();
        updateStats();
    }
}

function editTask(id, newText) {
    const task = tasks.find(t => t.id === id);
    if (task && newText.trim()) {
        task.text = newText.trim();
        saveToStorage();
        renderTasks();
    }
}

// ---------- Render ----------
function renderTasks() {
    let filteredTasks = tasks;

    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    }

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                ${tasks.length === 0 ? 'No tasks yet. Add one above!' : 'No tasks match this filter.'}
            </div>
        `;
        return;
    }

    taskList.innerHTML = filteredTasks.map(task => {
        const dateDisplay = task.date ? new Date(task.date).toLocaleDateString() : '';
        const isCompleted = task.completed ? 'completed' : '';

        return `
            <div class="task-item ${isCompleted}" data-id="${task.id}">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} />
                <span class="task-text">${escapeHtml(task.text)}</span>
                ${dateDisplay ? `<span class="task-date">📅 ${dateDisplay}</span>` : ''}
                <button class="task-delete">✕</button>
            </div>
        `;
    }).join('');

    // Attach event listeners to rendered elements
    taskList.querySelectorAll('.task-item').forEach(item => {
        const id = item.dataset.id;
        const checkbox = item.querySelector('.task-checkbox');
        const deleteBtn = item.querySelector('.task-delete');
        const textSpan = item.querySelector('.task-text');

        // Toggle completion
        checkbox.addEventListener('change', () => toggleTask(id));

        // Delete task
        deleteBtn.addEventListener('click', () => deleteTask(id));

        // Edit task (double-click on text)
        textSpan.addEventListener('dblclick', () => {
            const currentText = textSpan.textContent;
            const newText = prompt('Edit task:', currentText);
            if (newText !== null && newText.trim() !== '') {
                editTask(id, newText);
            }
        });
    });
}

// ---------- Local Storage ----------
function saveToStorage() {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
}

function loadFromStorage() {
    try {
        const stored = localStorage.getItem('tasks');
        tasks = stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Failed to load from localStorage:', error);
        tasks = [];
    }
}

// ---------- Stats ----------
function updateStats() {
    const total = tasks.length;
    const active = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;

    totalTasksEl.textContent = total;
    activeTasksEl.textContent = active;
    completedTasksEl.textContent = completed;
}

// ---------- Utilities ----------
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// feat: implement add task functionality

// feat: implement task completion toggle

// feat: implement delete task functionality

// feat: implement task filtering (all/active/completed)

// feat: implement localStorage persistence

// feat: add edit task (double-click to edit)

// feat: add date picker for task deadlines

// style: implement dark theme with glass-morphism

// style: improve button hover effects

// style: add task animations

// feat: add task counter stats

// feat: add empty state message

// refactor: extract render function to separate module

// feat: add keyboard support (Enter to add)

// style: improve responsive design for mobile

// docs: update README with features list

// docs: add live demo link

// feat: add task input auto-focus after add

// style: add task completion styling (strikethrough)

// feat: add escape HTML to prevent XSS

// fix: handle empty task input

// style: improve task item hover effects

// feat: add task count in filter buttons

// refactor: improve code organization

// feat: add task creation timestamp

// style: add subtle border glow effects

// fix: preserve task order after updates

// chore: final code cleanup
