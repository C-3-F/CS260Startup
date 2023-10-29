let initialPyxelData = [
  {
    id: 1,
    locationX: 1,
    locationY: 1,
    color: '#FF0000',
    price: 1.0,
    owner: null,
  },
  {
    id: 2,
    locationX: 2,
    locationY: 1,
    color: '#FF0000',
    price: 1.0,
    owner: null,
  },
  {
    id: 3,
    locationX: 3,
    locationY: 1,
    color: '#FF0000',
    price: 1.0,
    owner: null,
  },
  {
    id: 4,
    locationX: 4,
    locationY: 1,
    color: '#FF0000',
    price: 1.0,
    owner: null,
  },
  {
    id: 5,
    locationX: 5,
    locationY: 1,
    color: '#FF0000',
    price: 1.0,
    owner: null,
  },
];

window.onload = function () {
  if (!localStorage.getItem('initialPyxelData')) {
    saveInitialPyxelData();
  }
};

function saveInitialPyxelData() {
  localStorage.setItem('initialPyxelData', JSON.stringify(initialPyxelData));
}

function setPyxel(pyxel) {
  const pyxelData = JSON.parse(localStorage.getItem('initialPyxelData'));
  pyxelData[pyxel.id - 1] = pyxel;
  localStorage.setItem('initialPyxelData', JSON.stringify(pyxelData));
}

function getPyxel(id) {
  return JSON.parse(localStorage.getItem('initialPyxelData'))[id - 1];
}

function getPyxels() {
  return JSON.parse(localStorage.getItem('initialPyxelData'));
}

function getPyxelsByOwner(owner) {
  return JSON.parse(localStorage.getItem('initialPyxelData')).filter((pyxel) => pyxel.owner === owner);
}

function getPyxelsByLocation(locationX, locationY) {
  return JSON.parse(localStorage.getItem('initialPyxelData')).filter((pyxel) => pyxel.locationX === locationX && pyxel.locationY === locationY);
}
