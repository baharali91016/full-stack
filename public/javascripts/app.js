// public/javascripts/app.js
const API = '/api/tasks';
const taskList = document.getElementById('taskList');
const form = document.getElementById('newTaskForm');
const input = document.getElementById('titleInput');

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
loadTasks();
