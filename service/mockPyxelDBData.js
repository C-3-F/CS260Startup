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

function setPyxel(pyxel) {
  initialPyxelData[pyxel.id - 1] = pyxel;
}

function getPyxel(id) {
  return initialPyxelData[id - 1];
}

function getPyxels() {
  return initialPyxelData;
}

function getPyxelsByOwner(owner) {
  return initialPyxelData.filter((pyxel) => pyxel.owner === owner);
}

function getPyxelsByLocation(locationX, locationY) {
  return initialPyxelData.filter((pyxel) => pyxel.locationX === locationX && pyxel.locationY === locationY);
}

module.exports = { setPyxel, getPyxel, getPyxels, getPyxelsByOwner, getPyxelsByLocation };