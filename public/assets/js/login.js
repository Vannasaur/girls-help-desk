// This JS file will handle the login form submit behavior.

//  This JS file needs to be referenced in 'login.handlebars'

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/user', {
        method: 'PUT',
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


  const submitFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-submit').value.trim();
    const email = document.querySelector('#email-submit').value.trim();
    const password = document.querySelector('#password-submit').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);



//log out button 

const logout = async () => {
    const response = await fetch('/api/user/', {
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







