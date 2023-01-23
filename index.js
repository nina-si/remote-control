import { mouse } from '@nut-tree/nut-js';

const HTTP_PORT = 8181;

import { WebSocketServer } from 'ws';

export const wss = new WebSocketServer({ port: HTTP_PORT });

wss.on('connection', (ws) => {
  ws.on('message', (data) => console.log(data));

  ws.send('hello');
});

wss.on('close', () => console.log('closed'));
