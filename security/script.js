document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login');
    const loginContainer = document.getElementById('login-form');
    const protectedContent = document.getElementById('protected-content');
    const logoutButton = document.getElementById('logout');
    const userNameSpan = document.getElementById('user-name');

    // Simulated user data (in a real project, this would come from a server)
    const userData = {
        username: 'user',
        password: 'password'
    };

    // Function to show protected content
    function showProtectedContent(username) {
        userNameSpan.textContent = username;
        loginContainer.classList.add('hidden');
        protectedContent.classList.remove('hidden');
    }

    // Function to handle login
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        // Simple authentication (in a real project, use secure server-side authentication)
        if (username === userData.username && password === userData.password) {
            // Protect against XSS
            const safeUsername = username.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            showProtectedContent(safeUsername);
        } else {
            alert('Invalid credentials');
        }
    });

    // Function to handle logout
    logoutButton.addEventListener('click', () => {
        loginContainer.classList.remove('hidden');
        protectedContent.classList.add('hidden');
    });

    // CSRF protection (example using a simple token)
    const csrfToken = '1234567890abcdef';
    // Include this token in any AJAX requests to the server
});
