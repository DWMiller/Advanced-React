// lets go!

require('dotenv').config({ path: 'variables.env' });

const createServer = require('./createServer');

const db = require('./db');

const server = createServer();

// Handle cookies w/ middleware

// Handle current user w/ middleware

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  deets => {
    console.log(`Running on http://localhost:${deets.port}`);
  }
);
