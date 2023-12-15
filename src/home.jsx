import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [pyxelArray, setPyxelArray] = React.useState([]);
  const [pyxelImage, setPyxelImage] = React.useState('');
  const [connectionStatus, setConnectionStatus] = React.useState('disconnected');

  useEffect(() => {
    configureWebSocket();
    renderInitialPyxels();
  }, []);

  useEffect(() => {
    renderImage();
  }, [pyxelArray]);

  function renderImage() {
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
    setPyxelImage(canvas.toDataURL());
  }

  function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = (event) => {
      setConnectionStatus('connected');
    };
    socket.onclose = (event) => {
      setConnectionStatus('disconnected');
    };
    socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      console.log(msg);
      if (msg.type === 'PyxelUpdateEvent') {
        handlePyxelChange(msg);
      }
    };
  }

  function renderInitialPyxels() {
    fetch('/api/pyxels').then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setPyxelArray(data);
        });
      }
    });
  }

  function handlePyxelChange(pyxelData) {
    // console.log('pyxelData: ' + pyxelData);
    pyxelArray.forEach((element) => {
      if (element.id === pyxelData.id) {
        element.color = pyxelData.color;
      }
    });
    setPyxelArray(pyxelArray);
  }

  return (
    <main>
      <div className="container-fluid">
        <div className="row align-items-center justify-content-center mt-5">
          <div className="col-8" id="pyxel-board-container">
            <img src={pyxelImage} width="100%" className="img-fluid" alt="Pyxel Board" id="pyxel-board-image"></img>
          </div>
          <div className="container col-8 justify-content-center">
            <div className={'col-6 mt-2 ' + (connectionStatus == 'connected' ? 'text-success' : 'text-danger')} id="connection-status">
              {connectionStatus}
            </div>
          </div>
          <div className="col-6 justify-content-center mt-5" id="quote"></div>
        </div>
      </div>
    </main>
  );
};

export default Home;
