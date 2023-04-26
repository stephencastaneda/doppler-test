const express = require('express');
const redis = require('redis');
const util = require('util');

const app = express();

// Create a Redis client and promisify the get and set methods
const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});

client.on('connect', () => {
  console.log('Redis client connected');
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

const setValue = util.promisify(client.set).bind(client);
const getValue = util.promisify(client.get).bind(client);

app.get('/', async (req, res) => {
  try {
    await setValue('test', 'Hello World!');
    const value = await getValue('test');
    res.send(value);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while retrieving the value from Redis.');
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
