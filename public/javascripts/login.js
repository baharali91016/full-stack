const form = document.getElementById('loginForm');
const errorEl = document.getElementById('error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorEl.textContent = '';

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      errorEl.textContent = data.error || 'Login failed';
      return;
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('userEmail', data.user.email);
    window.location.href = '/';
  } catch (err) {
    errorEl.textContent = 'Unable to login. Try again.';
  }
});
