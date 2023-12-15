import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const Login = (props) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  

  useEffect(() => {
    if (props.isAuthenticated) {
      redirect();
    }
  }, [props.isAuthenticated]);

  function redirect() {
    console.log('redirecting');
    navigate('/home');
  }

  function loginUser() {
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          props.onAuthChange(true);
          redirect();
        });
      } else {
        alert('Invalid username or password');
      }
    });
  }

  function createAccount() {
    fetch('/api/auth/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.onAuthChange(true);
        redirect();
      });
  }

  return (

    

    <main className="d-flex align-items-center vh-100">
      <div className="container my-auto justify-content-center align-items-center">
        <div className="row text-center">
          <div className="col-12">
            <h1 className="display-1">PyXel</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-6">
            <form>
              <div className="form-group mb-3">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" onChange={(e) => setUsername(e.target.value)} value={username} />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
              </div>
              <div className="form-group mb-1 text-center">
                <Button onClick={loginUser} type="Button" className="btn btn-primary">
                  Sign In
                </Button>
              </div>
              <div className="form-group text-center">
                <Button onClick={createAccount} type="button" className="btn btn-secondary">
                  Create Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
