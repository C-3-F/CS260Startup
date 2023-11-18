const express = require('express');
const db = require('./src/database')
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Mock database routes
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

apiRouter.get('/pyxels/owner/:owner', async (req, res) => {
  res.json(await db.getPyxelsByOwner(req.params.owner));
});

apiRouter.get('/pyxels/location/:locationX/:locationY', async (req, res) => {
  const locationX = parseInt(req.params.locationX);
  const locationY = parseInt(req.params.locationY);
  res.json(await db.getPyxelsByLocation(locationX, locationY));
});

apiRouter.post('/pyxels', async (req, res) => {
  const pyxel = req.body;
  await db.updatePyxel(pyxel);
  res.status(201).send();
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });