function setPyxel(pyxel) {
  const pyxelData = JSON.parse(localStorage.getItem('initialPyxelData'));
  pyxelData[pyxel.id - 1] = pyxel;
  localStorage.setItem('initialPyxelData', JSON.stringify(pyxelData));
}

function getPyxels() {
  return JSON.parse(localStorage.getItem('initialPyxelData'));
}

function getPyxel(id) {
  return JSON.parse(localStorage.getItem('initialPyxelData'))[id - 1];
}

function buy(id) {
  console.log('buy');
  const pyxel = getPyxel(id);
  const username = localStorage.getItem('username');
  if (username) {
    pyxel.owner = username;
    setPyxel(pyxel);
    window.location.href = 'mypyxels.html';
  }
}

window.onload = function () {
  const storeTableBodyElement = document.querySelector('#store-table-body');
  const pyxels = getPyxels().filter((pyxel) => pyxel.owner === null);
  pyxels.forEach((pyxel) => {
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
