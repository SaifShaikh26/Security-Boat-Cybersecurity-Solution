function register() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
  
    if (name && email && password) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.some(user => user.email === email);
  
      if (userExists) {
        alert('User already exists with this email.');
      } else {
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! Please login.');
        showLogin();
      }
    } else {
      alert('Please fill out all fields.');
    }
  }
  
  function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
  
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      showWelcome(user.name);
    } else {
      alert('Invalid email or password.');
    }
  }
  
  function showWelcome(name) {
    document.getElementById('welcome-name').innerText = name;
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('welcome-message').classList.remove('hidden');
  }
  
  function showRegister() {
    document.getElementById('register-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('welcome-message').classList.add('hidden');
  }
  
  function showLogin() {
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('welcome-message').classList.add('hidden');
  }
  
  function logout() {
    localStorage.removeItem('currentUser');
    showLogin();
  }
  
  window.onload = function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      showWelcome(currentUser.name);
    } else {
      showLogin();
    }
  }
  