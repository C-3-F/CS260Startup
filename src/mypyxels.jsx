import React, { useEffect } from 'react';

const MyPyxels = () => {
  const [myPyxels, setMyPyxels] = React.useState([]);
  const [socket, setSocket] = React.useState(null);

  useEffect(() => {
    configureWebSocket();
    getPyxelsByOwner();
  }, []);

  function getPyxelsByOwner() {
    const response = fetch('/api/mypyxels').then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setMyPyxels(data);
        });
      }
    });
  }

  function setPyxel(pyxel) {
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
    pyxel.color = color;
    const updatedPyxels = myPyxels.map((pyxel) => (pyxel.id === id ? { ...pyxel, color: color } : pyxel));
    setMyPyxels(updatedPyxels);
    setPyxel(pyxel);
    broadcastChange('PyxelUpdateEvent', id, color);
  }

  function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    setSocket(socket);
  }

  function broadcastChange(type, id, color) {
    const msg = JSON.stringify({ type: type, id: id, color: color });
    socket.send(msg);
  }

  function buildPyxelTable() {
    let table = [];
    myPyxels.forEach((pyxel) => {
      table.push(
        <tr>
          <td>{pyxel.id}</td>
          <td>
            {pyxel.locationX}, {pyxel.locationY}
          </td>
          <td>
            <input type="color" id={pyxel.id} name="PyXel Color" value={pyxel.color} onChange={(e) => updatePyxelColor(pyxel.id, e.target.value)} />
            <br />
            <br />
          </td>
        </tr>
      );
    });
    return table;
  }

  return (
    <main>
      <div className="container-fluid">
        <div className="row align-items-center justify-content-center my-3">
          <div className="col-10">
            <h1>My PyXels</h1>
          </div>
        </div>
        <div className="row align-items-center justify-content-center mt-5">
          <div className="col-10">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Location</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody id="user-pyxels-table-body">{buildPyxelTable()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyPyxels;
