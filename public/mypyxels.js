async function getPyxelsByOwner(owner) {
  const response = await fetch(`/api/pyxels/owner/${owner}`);
  return response.json();
}

async function setPyxel(pyxel) {
  return fetch('/api/pyxels', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pyxel),
  });
}

async function getPyxel(id) {
  const response = await fetch(`/api/pyxels/${id}`);
  return response.json();
}

async function updatePyxelColor(id, color) {
  const pyxel = await getPyxel(id);
  console.log(color);
  pyxel.color = color;
  await setPyxel(pyxel);
}

window.onload = async function () {
  if (!localStorage.getItem('username')) {
    window.location.href = 'index.html';
  }
  const username = localStorage.getItem('username');
  const userPyxels = await getPyxelsByOwner(username);
  const userPyxelsTableBodyElement = document.querySelector('#user-pyxels-table-body');
  userPyxels.forEach((pyxel) => {
    const pyxelRow = document.createElement('tr');
    pyxelRow.innerHTML = `
                  <td>${pyxel.id}</td>
                  <td>${pyxel.locationX}, ${pyxel.locationY}</td>
                  <td><input type="color" id="${pyxel.id}" name="PyXel Color" value="${pyxel.color}" /><br /><br /></td>
              `;
    const colorInput = pyxelRow.querySelector(`input[type="color"]`);
    colorInput.addEventListener('input', function () {
      updatePyxelColor(pyxel.id, this.value);
    });
    userPyxelsTableBodyElement.appendChild(pyxelRow);
  });
};
