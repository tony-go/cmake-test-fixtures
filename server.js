const http = require('node:http');
const fs = require('node:fs');

const server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('Hello World!');
});

function closeServer() {
  if (server && server.listening) {
    server.close(() => {
      fs.unlinkSync('server.pid');
      process.exit(0);
    });
  }
}

server.listen(0, () => {
  fs.writeFile('server.pid', String(process.pid), err => {
    if (err) throw err;
  });

  const port = server.address().port;
  fs.writeFile('server.port', String(port), err => {
    if (err) throw err;
  });
});

process.on('SIGINT', () => {
  closeServer();
});

process.on('SIGTERM', () => {
  closeServer();
});

