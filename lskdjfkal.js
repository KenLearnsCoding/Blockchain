const redis = require('redis');

console.log('Creating Redis client');
const client = redis.createClient();

client.on('connect', () => {
  console.log('Connected to Redis server');
});

client.on('error', (err) => {
  console.error(`Error connecting to Redis server: ${err}`);
});

console.log('Redis client created');

// Rest of your code

// lskdjfkal.js