function createImageFromArray(pyxelArray) {
  // Create a canvas element with the appropriate size
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');

//  // Draw each pyxel on the canvas
//   for (let i = 0; i < pyxelArray.length; i++) {
//     const pyxel = pyxelArray[i];
//     ctx.fillStyle = pyxel.color;
//     console.log('color: ' + pyxel.color);
//     ctx.fillRect(pyxel.x, pyxel.y, 1, 1);
//   }

    //Test Image
    for (let i = 0; i < 1280; i++) {
      for (let j = 0; j < 720; j++) {
        ctx.fillStyle = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        ctx.fillRect(i, j, 1, 1);
      }
    }

  // Convert the canvas to an image and return it
  const image = new Image();
  image.src = canvas.toDataURL();
  return image;
}

window.onload = function () {
  const pyxels = JSON.parse(localStorage.getItem('initialPyxelData'));
  console.log('pyxels: ' + JSON.stringify(pyxels));
  const pyxelImage = createImageFromArray(pyxels);
  pyxelImage.setAttribute('id', 'pyxel-board-image');
  pyxelImage.setAttribute('width', '100%');
  pyxelImage.setAttribute('class', 'img-fluid');
  pyxelImage.setAttribute('alt', 'Pyxel Board');
  console.log(pyxelImage);

  const pyxelImageContainerElement = document.querySelector('#pyxel-board-container');
  pyxelImageContainerElement.appendChild(pyxelImage);
};
