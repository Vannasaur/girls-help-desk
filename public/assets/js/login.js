// This JS file will handle the login form submit behavior.

//  This JS file needs to be referenced in 'login.handlebars'

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  };
  

//  Listen for submit events on the loginForm element. When the submit event occurs, capture the form field data and POST to /api/user


  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  

//log out button 

const logout = async () => {
    const response = await fetch('/api/users/', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log out.');
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);







