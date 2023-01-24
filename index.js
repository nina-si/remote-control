import httpServer from './src/http_server/index.js';
import wsServer from './src/ws_server/index.js';

const HTTP_PORT = 8181;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});

const WS_PORT = 8080;

wsServer.listen(WS_PORT, () => {
  console.log(`WS Server started on the ${WS_PORT} port!`);
});
