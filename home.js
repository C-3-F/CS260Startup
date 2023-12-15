let pyxelArray;

function createImageFromArray(pyxelArray) {
  // Create a canvas element with the appropriate size
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');

  //Blank Canvas Background
  ctx.rect(0, 0, 1280, 720);
  ctx.fillStyle = '#808080';
  ctx.fill();

  //Test Image
  // for (let i = 0; i < 1280; i++) {
  //   for (let j = 0; j < 720; j++) {
  //     ctx.fillStyle = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
  //     ctx.fillRect(i, j, 1, 1);
  //   }
  // }

  // Draw each pyxel on the canvas
  for (let i = 0; i < pyxelArray.length; i++) {
    const pyxel = pyxelArray[i];
    // console.log(pyxel);
    ctx.fillStyle = pyxel.color;
    // console.log('color: ' + pyxel.color);
    ctx.fillRect(pyxel.locationX, pyxel.locationY, 1, 1);
  }

  // Convert the canvas to an image and return it
  const image = new Image();
  image.src = canvas.toDataURL();
  return image;
}

function displayQuote(data) {
  fetch('https://api.quotable.io/random')
    .then((response) => response.json())
    .then((data) => {
      const containerEl = document.querySelector('#quote');

      const quoteEl = document.createElement('p');
      quoteEl.classList.add('quote');
      const authorEl = document.createElement('p');
      authorEl.classList.add('author');

      quoteEl.textContent = data.content;
      authorEl.textContent = data.author;

      containerEl.appendChild(quoteEl);
      containerEl.appendChild(authorEl);
    });
}

window.onload = async function () {
  // const pyxels = JSON.parse(localStorage.getItem('initialPyxelData'));
  configureWebSocket();
  const response = await fetch('/api/pyxels');
  pyxelArray = await response.json();
  const pyxelImage = createImageFromArray(pyxelArray);
  pyxelImage.setAttribute('id', 'pyxel-board-image');
  pyxelImage.setAttribute('width', '100%');
  pyxelImage.setAttribute('class', 'img-fluid');
  pyxelImage.setAttribute('alt', 'Pyxel Board');
  displayQuote();
  updatePyxelImage(pyxelImage);
};

function configureWebSocket() {
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  socket.onopen = (event) => {
    updateConnectionStatus('connected');
  };
  socket.onclose = (event) => {
    updateConnectionStatus('disconnected');
  };
  socket.onmessage = async (event) => {
    const msg = JSON.parse(await event.data.text());
    console.log(msg);
    if (msg.type === 'PyxelUpdateEvent') {
      handlePyxelChange(msg);
    }
  };
}

function updateConnectionStatus(status) {
  const statusEl = document.querySelector('#connection-status');
  statusEl.innerHTML = status;
  if (status === 'connected') {
    statusEl.classList.remove('text-danger');
    statusEl.classList.add('text-success');
  } else {
    statusEl.classList.remove('text-success');
    statusEl.classList.add('text-danger');
  }
}

function handlePyxelChange(pyxelData) {
  // console.log('pyxelData: ' + pyxelData);
  pyxelArray.forEach((element) => {
    if (element.id === pyxelData.id) {
      element.color = pyxelData.color;
    }
  });

  const pyxelImage = createImageFromArray(pyxelArray);
  updatePyxelImage(pyxelImage);
}

function updatePyxelImage(image) {
  const pyxelImageContainerElement = document.querySelector('#pyxel-board-container');
  pyxelImageContainerElement.replaceChildren(image);
}