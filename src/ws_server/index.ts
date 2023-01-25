import http from 'http';
import { createWebSocketStream, WebSocketServer } from 'ws';
import { getMousePosition, updateMousePosition } from '../drawing/mouse';
import { drawCircle, drawRectangle, drawSquare } from '../drawing/drawFigures';
import {
  DIRECTIONS,
  DRAW_COMMANDS,
  ERROR_MESSAGES,
  MOUSE_COMMANDS,
} from '../drawing/constants';
import { parseIp } from '../utils';

const wsServer = http.createServer();

const wss = new WebSocketServer({ server: wsServer });

wss.on('connection', function connection(ws, req) {
  const ip = parseIp();
  console.log(`A client with ip ${ip} connected`);

  const stream = createWebSocketStream(ws, {
    encoding: 'utf8',
    decodeStrings: false,
  });

  stream.on('data', async function message(data) {
    console.log('received: %s', data);
    const command = data.toString().trim();
    if (command.startsWith('mouse')) {
      const operation = command.split(' ')[0];
      let step = 0;
      let answer: string;
      switch (operation) {
        case MOUSE_COMMANDS.POSITION:
          answer = await getMousePosition();
          stream.write(answer, () => {
            console.log('sent: ', answer);
          });
          break;
        case MOUSE_COMMANDS.UP:
          step = Number(command.split(' ')[1]);
          await updateMousePosition(DIRECTIONS.UP, step);
          answer = `${MOUSE_COMMANDS.UP}_${step}`;
          stream.write(answer, () => {
            console.log('sent: ', answer);
          });
          break;
        case MOUSE_COMMANDS.DOWN:
          step = Number(command.split(' ')[1]);
          await updateMousePosition(DIRECTIONS.DOWN, step);
          answer = `${MOUSE_COMMANDS.DOWN}_${step}`;
          stream.write(answer, () => {
            console.log('sent: ', answer);
          });
          break;
        case MOUSE_COMMANDS.RIGHT:
          step = Number(command.split(' ')[1]);
          await updateMousePosition(DIRECTIONS.RIGHT, step);
          answer = `${MOUSE_COMMANDS.RIGHT}_${step}`;
          stream.write(answer, () => {
            console.log('sent: ', answer);
          });
          break;
        case MOUSE_COMMANDS.LEFT:
          step = Number(command.split(' ')[1]);
          await updateMousePosition(DIRECTIONS.LEFT, step);
          answer = `${MOUSE_COMMANDS.LEFT}_${step}`;
          stream.write(answer, () => {
            console.log('sent: ', answer);
          });
          break;
      }
    } else if (command.startsWith('draw')) {
      const operation = command.split(' ')[0];
      let answer: string;
      switch (operation) {
        case DRAW_COMMANDS.RECTANGLE:
          const width = Number(command.split(' ')[1]);
          const height = Number(command.split(' ')[2]);
          if (width > 1000 || height > 500) {
            answer = `${DRAW_COMMANDS.RECTANGLE}_error`;
            stream.write(answer, () => {
              console.log(`Error: ${ERROR_MESSAGES.RECTANGLE_MSG}`);
            });
          } else {
            await drawRectangle(width, height);
            answer = `${DRAW_COMMANDS.RECTANGLE}_${width}_${height}`;
            stream.write(answer, () => {
              console.log('sent: ', answer);
            });
          }
          break;
        case DRAW_COMMANDS.SQUARE:
          const side = Number(command.split(' ')[1]);
          if (side === 0 || side > 500) {
            answer = `${DRAW_COMMANDS.SQUARE}_error`;
            stream.write(answer, () => {
              console.log(`Error: ${answer}`);
            });
          } else {
            await drawSquare(side);
            answer = `${DRAW_COMMANDS.SQUARE}_${side}`;
            stream.write(answer, () => {
              console.log('sent: ', answer);
            });
          }
          break;
        case DRAW_COMMANDS.CIRCLE:
          const radius = Number(command.split(' ')[1]);
          if (radius > 240 || radius === 0) {
            answer = `${DRAW_COMMANDS.CIRCLE}_error`;
            stream.write(answer, () => {
              console.log(`Error: ${answer}`);
            });
          } else {
            await drawCircle(radius);
            answer = `${DRAW_COMMANDS.CIRCLE}_${radius}`;
            stream.write(answer, () => {
              console.log('sent: ', answer);
            });
          }
          break;
      }
    }
  });
});

export default wsServer;
