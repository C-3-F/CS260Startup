const db = require('./database.js');

//FUll Image
// for (let i = 0; i < 1280; i++) {
//     for (let j = 0; j < 720; j++) {
//         const pyxel = {
//             id: `${i}-${j}`,
//             locationX: i,
//             locationY: j,
//             color: "#FF0000",
//             owner: ''
//         };
//         db.createPyxel(pyxel);
//     }
// }

let idIterator = 0;

//Top Left Corner
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const pyxel = {
      id: idIterator,
      locationX: i,
      locationY: j,
      color: `#FF0000`,
      owner: '',
    };
    db.createPyxel(pyxel);
    idIterator++;
    console.log('Created pyxel with id ' + pyxel.id);
  }
}
