import httpServer from './http_server/index';
import wsServer from './ws_server/index';

const HTTP_PORT = 8181;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});

const WS_PORT = 8080;

wsServer.listen(WS_PORT, () => {
  console.log(`WS Server started on the ${WS_PORT} port!`);
});

process.on('SIGINT', () => {
  wsServer.close();
  httpServer.close();
});
