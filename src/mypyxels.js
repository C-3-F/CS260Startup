function getPyxelsByOwner(owner) {
  return JSON.parse(localStorage.getItem('initialPyxelData')).filter((pyxel) => pyxel.owner === owner);
}

function setPyxel(pyxel) {
  const pyxelData = JSON.parse(localStorage.getItem('initialPyxelData'));
  pyxelData[pyxel.id - 1] = pyxel;
  localStorage.setItem('initialPyxelData', JSON.stringify(pyxelData));
}

function getPyxel(id) {
  return JSON.parse(localStorage.getItem('initialPyxelData'))[id - 1];
}

function updatePyxelColor(id, color) {
  const pyxel = getPyxel(id);
  pyxel.color = color;
  setPyxel(pyxel);
}

window.onload = function () {
  if (!localStorage.getItem('username')) {
    window.location.href = 'index.html';
  }
  const username = localStorage.getItem('username');
  const userPyxels = getPyxelsByOwner(username);
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
