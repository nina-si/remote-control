import http from 'http';
import { WebSocketServer } from 'ws';
import { getMousePosition } from '../drawing/mouse';

const wsServer = http.createServer();

const wss = new WebSocketServer({ server: wsServer });

wss.on('connection', function connection(ws, req) {
  const ip = req.socket.remoteAddress;
  console.log(`A client with ip ${ip} connected`);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
    const command = data.toString();
    if (command.startsWith('mouse_position')) {
      const answer = getMousePosition();
      ws.send(answer);
      console.log('sent: ', answer);
    }
  });
});

export default wsServer;
