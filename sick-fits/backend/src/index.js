// lets go!
const cookieParser = require('cookie-parser')
require('dotenv').config({ path: 'variables.env' });

const createServer = require('./createServer');

const db = require('./db');

const server = createServer();

server.express.use(cookieParser());

//TODO Handle current user w/ middleware

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
