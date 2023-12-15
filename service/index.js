const express = require('express');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const db = require('./database');
const { websocket } = require('./websocket');
const app = express();

// The name of the cookie used for authentication
const authCookieName = 'token';

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//PUBLIC routes

apiRouter.get('/pyxels', async (_req, res) => {
  res.json(await db.getPyxels());
});

apiRouter.get('/pyxels/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const pyxel = await db.getPyxel(id);
  if (pyxel) {
    res.json(pyxel);
  } else {
    res.status(404).send();
  }
});

apiRouter.post('/auth/create', async (req, res) => {
  if (await db.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await db.createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({
      id: user._id,
    });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await db.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.clearCookie(authCookieName);
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

app.get('/user/me', async (req, res) => {
  authToken = req.cookies['token'];
  const user = await db.getUserByToken(authToken);
  if (user) {
    res.send({ email: user.email });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

//SECURE routes

var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);
secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await db.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

secureApiRouter.get('/mypyxels', async (req, res) => {
  const user = await db.getUserByToken(req.cookies[authCookieName]);
  res.json(await db.getPyxelsByOwner(user.email));
});

secureApiRouter.get('/pyxels/location/:locationX/:locationY', async (req, res) => {
  const locationX = parseInt(req.params.locationX);
  const locationY = parseInt(req.params.locationY);
  res.json(await db.getPyxelsByLocation(locationX, locationY));
});

secureApiRouter.post('/pyxels', async (req, res) => {
  const pyxel = req.body;
  await db.updatePyxel(pyxel);
  res.status(201).send();
});

secureApiRouter.post('/pyxels/buy/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const pyxel = await db.getPyxel(id);
  if (pyxel) {
    const user = await db.getUserByToken(req.cookies[authCookieName]);
    if (user) {
      if (pyxel.owner === null || pyxel.owner === '') {
        pyxel.owner = user.email;
        await db.updatePyxel(pyxel);
        res.status(201).send();
        return;
      }
    }
  }
  res.status(404).send();
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

const serverInstance = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Middleware

function setAuthCookie(res, authToken) {
  res.cookie('token', authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Websocket
websocket(serverInstance);
