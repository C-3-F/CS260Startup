const { MongoClient } = require('mongodb');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('pyxel');
const pyxelCollection = db.collection('pyxelData');
const userCollection = db.collection('userData');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function createPyxel(pyxel) {
  if ((await getPyxel(pyxel.id)).length === 0) {
    const result = await pyxelCollection.insertOne(pyxel);
    return result;
  } else {
    throw new Error('Pyxel already exists');
  }
}

async function updatePyxel(pyxel) {
  const query = { id: pyxel.id };
  const newValues = {
    $set: {
      locationX: pyxel.locationX,
      locationY: pyxel.locationY,
      color: pyxel.color,
      price: pyxel.price,
      owner: pyxel.owner,
    },
  };
  const result = await pyxelCollection.updateOne(query, newValues);
  return result;
}

async function getPyxels() {
  const cursor = pyxelCollection.find();
  const array = await cursor.toArray();
  return array;
}

async function getPyxel(id) {
  const query = { id: id };
  const cursor = pyxelCollection.find(query);
  const array = await cursor.toArray();
  if (array.length === 0) {
    return null;
  } else {
    return array[0];
  }
}

async function getPyxelsByOwner(owner) {
  const query = { owner: owner };
  const cursor = pyxelCollection.find(query);
  return await cursor.toArray();
}

async function getPyxelsByLocation(locationX, locationY) {
  const query = { locationX: locationX, locationY: locationY };
  const cursor = pyxelCollection.find(query);
  return await cursor.toArray();
}

// User functions
async function createUser(email, password) {
const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  const result = await userCollection.insertOne(user);
  return result;
}

async function getUser(email) {
  const query = { email: email };
  const cursor = userCollection.find(query);
  const array = await cursor.toArray();
  if (array.length === 0) {
    return null;
  } else {
    return array[0];
  }
}

async function getUserByToken(token) {
  const query = { token: token };
  const cursor = userCollection.find(query);
  const array = await cursor.toArray();
  if (array.length === 0) {
    return null;
  } else {
    return array[0];
  }
}

module.exports = { createPyxel, updatePyxel, getPyxel, getPyxels, getPyxelsByOwner, getPyxelsByLocation, createUser, getUser, getUserByToken };
