<<<<<<< HEAD
// public/javascripts/app.js
=======
﻿// public/javascripts/app.js
>>>>>>> d725e53 (Add task-api)
const API = '/api/tasks';
const taskList = document.getElementById('taskList');
const form = document.getElementById('newTaskForm');
const input = document.getElementById('titleInput');
<<<<<<< HEAD

// --- 1. LOAD all tasks (GET) --- 
async function loadTasks() {
    try {
        const res = await fetch(API);
        if (!res.ok) throw new Error('Failed to load'); const tasks = await res.json();
        render(tasks);
    } catch (err) {
        console.error(err);
        taskList.innerHTML = '<li>Could not load tasks.</li>';
    }
}

function render(tasks) {
    taskList.innerHTML = ''; tasks.forEach(t => {
        const li = document.createElement('li');
        if (t.done)
            li.classList.add('done');
        li.innerHTML = `<span>${escapeHTML(t.title)}</span>
                        <span>
                            <button onclick="toggleTask('${t._id}', ${!t.done})">
                                ${t.done ? 'Undo' : 'Done'}
                            </button>
                            <button class="del" onclick="deleteTask('${t._id}')">Delete</button>
                        </span>`; taskList.appendChild(li);
    });
}

// preventing XSS (Cross-Site Scripting) attacks
// <script>alert('Hack')</script> => &lt;script&gt;alert('Hack')&lt;/script&gt;
function escapeHTML(s) {
    return s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

// --- 2. CREATE (POST) ---
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = input.value.trim(); if (!title) return;
    try {
        const res = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title })
        });
        if (!res.ok) throw new Error('Create failed'); input.value = '';
        loadTasks();
    } catch (err) {
        alert(err.message);
    }
});

// --- 3. UPDATE (PUT) ---
async function toggleTask(id, done) {
    await fetch(`${API}/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done })
    });
    loadTasks();
}

// --- 4. DELETE ---
async function deleteTask(id) {
    if (!confirm('Delete this task?')) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' }); loadTasks();
}
// Initial load 
=======
const logoutBtn = document.getElementById('logoutBtn');
const userEmail = document.getElementById('userEmail');

const token = localStorage.getItem('token');
const savedEmail = localStorage.getItem('userEmail');

if (!token) {
  window.location.href = '/login.html';
}

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
}

function handleAuthError(response) {
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    window.location.href = '/login.html';
    return true;
  }
  return false;
}

async function fetchWithAuth(url, options = {}) {
  options.headers = { ...options.headers, ...getHeaders() };
  const res = await fetch(url, options);
  if (handleAuthError(res)) return null;
  return res;
}

if (savedEmail) {
  userEmail.textContent = `Signed in as ${savedEmail}`;
}

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
  window.location.href = '/login.html';
});

async function loadTasks() {
  try {
    const res = await fetchWithAuth(API);
    if (!res) return;
    if (!res.ok) throw new Error('Failed to load tasks');
    const tasks = await res.json();
    render(tasks);
  } catch (err) {
    console.error(err);
    taskList.innerHTML = '<li>Could not load tasks.</li>';
  }
}

function render(tasks) {
  taskList.innerHTML = '';
  tasks.forEach(t => {
    const li = document.createElement('li');
    if (t.done) li.classList.add('done');
    li.innerHTML = `<span>${escapeHTML(t.title)}</span>
      <span>
        <button onclick="toggleTask('${t._id}', ${!t.done})">
          ${t.done ? 'Undo' : 'Done'}
        </button>
        <button class="del" onclick="deleteTask('${t._id}')">Delete</button>
      </span>`;
    taskList.appendChild(li);
  });
}

function escapeHTML(s) {
  return s.replace(/[&<>\"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;

  try {
    const res = await fetchWithAuth(API, {
      method: 'POST',
      body: JSON.stringify({ title })
    });
    if (!res) return;
    if (!res.ok) throw new Error('Create failed');
    input.value = '';
    loadTasks();
  } catch (err) {
    alert(err.message);
  }
});

async function toggleTask(id, done) {
  try {
    const res = await fetchWithAuth(`${API}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ done })
    });
    if (!res) return;
    if (!res.ok) throw new Error('Update failed');
    loadTasks();
  } catch (err) {
    alert(err.message);
  }
}

async function deleteTask(id) {
  if (!confirm('Delete this task?')) return;

  try {
    const res = await fetchWithAuth(`${API}/${id}`, { method: 'DELETE' });
    if (!res) return;
    if (!res.ok) throw new Error('Delete failed');
    loadTasks();
  } catch (err) {
    alert(err.message);
  }
}

>>>>>>> d725e53 (Add task-api)
loadTasks();
