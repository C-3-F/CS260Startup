function login() {
  const usernameElement = document.querySelector('#username');
  localStorage.setItem('username', usernameElement.value);
  window.location.href = 'home.html';
}
