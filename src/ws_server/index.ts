import http from 'http';
import { WebSocketServer } from 'ws';
import { getMousePosition, updateMousePosition } from '../drawing/mouse';
import { drawRectangle, drawSquare } from '../drawing/drawFigures';
import {
  DIRECTIONS,
  DRAW_COMMANDS,
  MOUSE_COMMANDS,
} from '../drawing/constants';

const wsServer = http.createServer();

const wss = new WebSocketServer({ server: wsServer });

wss.on('connection', function connection(ws, req) {
  const ip = req.socket.remoteAddress;
  console.log(`A client with ip ${ip} connected`);

  ws.on('message', async function message(data) {
    console.log('received: %s', data);
    const command = data.toString().trim();
    if (command.startsWith('mouse')) {
      const operation = command.split(' ')[0];
      let step = 0;
      switch (operation) {
        case MOUSE_COMMANDS.POSITION:
          const answer = await getMousePosition();
          ws.send(answer);
          console.log('sent: ', answer);
          break;
        case MOUSE_COMMANDS.UP:
          step = Number(command.split(' ')[1]);
          updateMousePosition(DIRECTIONS.UP, step);
          break;
        case MOUSE_COMMANDS.DOWN:
          step = Number(command.split(' ')[1]);
          updateMousePosition(DIRECTIONS.DOWN, step);
          break;
        case MOUSE_COMMANDS.RIGHT:
          step = Number(command.split(' ')[1]);
          updateMousePosition(DIRECTIONS.RIGHT, step);
          break;
        case MOUSE_COMMANDS.LEFT:
          step = Number(command.split(' ')[1]);
          updateMousePosition(DIRECTIONS.LEFT, step);
          break;
      }
    } else if (command.startsWith('draw')) {
      const operation = command.split(' ')[0];
      switch (operation) {
        case DRAW_COMMANDS.RECTANGLE:
          const width = Number(command.split(' ')[1]);
          const height = Number(command.split(' ')[2]);
          await drawRectangle(width, height);
          break;
        case DRAW_COMMANDS.SQUARE:
          const side = Number(command.split(' ')[1]);
          await drawSquare(side);
          break;
      }
    }
  });
});

export default wsServer;
