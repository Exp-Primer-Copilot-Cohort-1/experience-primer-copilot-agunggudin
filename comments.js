// Create web server
// Create a new web server using the http module
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = `.${parsedUrl.pathname}`;
  if (pathname === './') {
    pathname = './index.html';
  }

  const ext = path.parse(pathname).ext;
  const type = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
  }[ext] || 'text/plain';

  fs.readFile(pathname, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('404 Not Found');
      return res.end();
    }
    res.writeHead(200, { 'Content-Type': type });
    res.write(data);
    return res.end();
  });
});

server.listen(8080);
console.log('Server runnning');