const form = document.getElementById('signupForm');
const errorEl = document.getElementById('error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorEl.textContent = '';

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      errorEl.textContent = data.error || 'Sign up failed';
      return;
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('userEmail', data.user.email);
    window.location.href = '/';
  } catch (err) {
    errorEl.textContent = 'Unable to sign up. Try again.';
  }
});
