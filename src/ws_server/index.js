import http from 'http';
import { WebSocketServer } from 'ws';

const wsServer = http.createServer();

const wss = new WebSocketServer({ server: wsServer });

wss.on('connection', function connection(ws, req) {
  const ip = req.socket.remoteAddress;
  console.log(`A client with ip ${ip} connected`);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });
});

export default wsServer;
