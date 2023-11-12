const express = require('express');
const mockDb = require('./src/mockPyxelDBData')
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
apiRouter.get('/pyxels', (_req, res) => {
  res.json(mockDb.getPyxels());
});

apiRouter.get('/pyxels/:id', (req, res) => {
  const pyxel = mockDb.getPyxel(req.params.id);
  if (pyxel) {
    res.json(pyxel);
  } else {
    res.status(404).send();
  }
});

apiRouter.get('/pyxels/owner/:owner', (req, res) => {
  res.json(mockDb.getPyxelsByOwner(req.params.owner));
});

apiRouter.get('/pyxels/location/:locationX/:locationY', (req, res) => {
  res.json(mockDb.getPyxelsByLocation(req.params.locationX, req.params.locationY));
});

apiRouter.post('/pyxels', (req, res) => {
  const pyxel = req.body;
  mockDb.setPyxel(pyxel);
  res.status(201).send();
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });