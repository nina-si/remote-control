import http from 'http';
import { WebSocketServer } from 'ws';
import { getMousePosition, updateMousePosition } from '../drawing/mouse';

const wsServer = http.createServer();

const wss = new WebSocketServer({ server: wsServer });

wss.on('connection', function connection(ws, req) {
  const ip = req.socket.remoteAddress;
  console.log(`A client with ip ${ip} connected`);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
    const command = data.toString().trim();
    if (command.startsWith('mouse')) {
      const operation = command.split(' ')[0];
      let step = 0;
      switch (operation) {
        case 'mouse_position':
          const answer = getMousePosition();
          ws.send(answer);
          console.log('sent: ', answer);
          break;
        case 'mouse_up':
          step = Number(command.split(' ')[1]);
          updateMousePosition('up', step);
          break;
        case 'mouse_down':
          step = Number(command.split(' ')[1]);
          updateMousePosition('down', step);
          break;
        case 'mouse_right':
          step = Number(command.split(' ')[1]);
          updateMousePosition('right', step);
          break;
        case 'mouse_left':
          step = Number(command.split(' ')[1]);
          updateMousePosition('left', step);
          break;
      }
    }
  });
});

export default wsServer;
