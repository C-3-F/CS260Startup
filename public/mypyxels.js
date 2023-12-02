const socket = configureWebSocket();

async function getPyxelsByOwner() {
  const response = await fetch('/api/mypyxels');
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
  broadcastChange('PyxelUpdateEvent', id, color);
}

window.onload = async function () {
  const userPyxels = await getPyxelsByOwner();
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

function configureWebSocket() {
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  return socket;
}

function broadcastChange(type, id, color) {
  const msg = JSON.stringify({ type: type, id: id, color: color });
  socket.send(msg);
}
