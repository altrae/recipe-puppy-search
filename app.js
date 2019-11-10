const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;

    const pathname = url.parse(req.url).pathname;
    const extension = pathname.split('.').pop();
    const dirs = pathname.split('/');

    let file = `.${pathname}`,
        isImage = false,
        contentType,
        fileToLoad;

    if (pathname === '/') {
        file = 'index.html';
        contentType = 'text/html';
        isImage = 2;
    } else if (dirs[1] !== 'hidden' && pathname !== '/app.js') {
        switch (extension) {
            case 'ico':
                contentType = 'image/jpg';
                isImage = true;
                break;
            case 'jpg':
                contentType = 'image/jpg';
                isImage = true;
                break;
            case 'png':
                contentType = 'image/png';
                isImage = true;
                break;
            case 'js':
                contentType = 'text/javascript';
                isImage = false;
                break;
            case 'json':
                contentType = 'application/json';
                isImage = false;
                break;
            case 'css':
                contentType = 'text/css';
                isImage = false;
                break;
            case 'html':
                contentType = 'text/html';
                isImage = false;
                break;
        }
    }

    if (isImage) {
        fileToLoad = fs.readFileSync(file);
        res.writeHead(200, { 'Content-Type': contentType, 'Retry-After': 3600 });
        res.end(fileToLoad, 'binary');
    } else if (!isImage) {
        fileToLoad = fs.readFileSync(file, 'utf8');
        res.writeHead(200, { 'Content-Type': contentType, 'Retry-After': 3600 });
        res.write(fileToLoad);
        res.end();
    }
});

server.listen(port, hostname, () => {
    console.info(`Server running at http://${hostname}:${port}/`);
});