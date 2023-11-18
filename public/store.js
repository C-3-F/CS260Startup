async function setPyxel(pyxel) {
  return fetch('/api/pyxels', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pyxel),
  });
}

async function getPyxels() {
  const response = await fetch('/api/pyxels');
  return response.json();
}

async function getPyxel(id) {
  const response = await fetch(`/api/pyxels/${id}`);
  return response.json();
}

async function buy(id) {
  console.log('buy');
  const pyxel = await getPyxel(id);
  console.log('Pyxel to buy:');
  console.log(pyxel);
  const username = localStorage.getItem('username');
  if (username) {
    pyxel.owner = username;
    await setPyxel(pyxel);
    window.location.href = 'mypyxels.html';
  }
}

window.onload = async function () {
  const storeTableBodyElement = document.querySelector('#store-table-body');
  const pyxels = await getPyxels();
  const filteredPyxels = pyxels.filter((pyxel) => pyxel.owner === null || pyxel.owner === '');
  filteredPyxels.forEach((pyxel) => {
    const pyxelRow = document.createElement('tr');
    pyxelRow.innerHTML = `
                  <th scope="row">${pyxel.id}</td>
                  <td>(${pyxel.locationX}, ${pyxel.locationY})</td>
                  <td>$${pyxel.price}</td>
                  <td>
                      <button class="btn btn-primary" onclick="buy(${pyxel.id})">Buy →</button>
                  </td>
              `;
    storeTableBodyElement.appendChild(pyxelRow);
  });
};
