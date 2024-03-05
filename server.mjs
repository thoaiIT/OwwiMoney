// const { createServer } = require('http');
// const { parse } = require('url');
// const next = require('next');
// const { Server } = require('socket.io');
// const { sendMessage } = require('./actions/chat/lmao.js');
import { createServer } from 'http';
import next from 'next';
import { Server } from 'socket.io';
import { parse } from 'url';
import { sendMessage } from './actions/chat/lmao.mjs';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
let httpServer;
let io;

app.prepare().then(() => {
  httpServer = createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === '/a') {
        await app.render(req, res, '/a', query);
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  io = new Server(httpServer, {
    cors: { origin: '*', methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELELE'] },
  });
  io.on('connection', async (socket) => {
    console.log('connected socket');

    socket.on('chat', (data) => {
      sendMessage(socket, data);
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
  // exports.io = io;
});

// export const io = io;
