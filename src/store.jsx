import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const Store = () => {
  const [pyxels, setPyxels] = React.useState([]);

  useEffect(() => {
    renderPyxels();
  }, []);

  const navigate = useNavigate();

  async function setPyxel(pyxel) {
    return fetch(`/api/pyxels/buy/${pyxel.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  function renderPyxels() {
    fetch('/api/pyxels').then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setPyxels(data);
        });
      }
    });
  }

  async function getPyxel(id) {
    const response = await fetch(`/api/pyxels/${id}`);
    return response.json();
  }

  function buy(id) {
    getPyxel(id).then((pyxel) => {
      console.log('Pyxel to buy:');
      console.log(pyxel);
      setPyxel(pyxel).then(() => {
        navigate('/mypyxels');
      });
    });
  }

  function renderTable() {
    let table = [];
    pyxels.forEach((pyxel) => {
      table.push(
        <tr key={pyxel.id}>
          <td>{pyxel.id}</td>
          <td>
            {pyxel.locationX}, {pyxel.locationY}
          </td>
          <td>{pyxel.price}</td>
          <td>
            <Button className="btn btn-primary" onClick={() => buy(pyxel.id)}>
              Buy →
            </Button>
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
            <h1>Store</h1>
          </div>
        </div>
        <div className="row align-items-center justify-content-center mt-5">
          <div className="col-10">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="store-table-body">{renderTable()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Store;
