function login() {
  const usernameElement = document.querySelector('#username');
  const passwordElement = document.querySelector('#password');
  fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: usernameElement.value,
      password: passwordElement.value
    })
  }).then(response => {
    if (response.status === 200) {
      response.json().then(data => {
    window.location.href = 'home.html';
      });
    } else {
      alert("Invalid username or password");
    }; 
  });
}

function createAccount() {
  const usernameElement = document.querySelector('#username');
  const passwordElement = document.querySelector('#password');
  fetch('/api/auth/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: usernameElement.value,
      password: passwordElement.value
    })
  }).then(response => response.json()).then(data => {
    window.location.href = 'home.html';
  });
}
