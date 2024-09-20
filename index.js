const http = require('http');
const path = require('path');
const fs = require('fs');

// const server = http.createServer((req, res) => {
//     let filePath = path.join(__dirname, 'views', req.url === '/' ? 'index.html' : req.url);
//     fs.readFile(filePath, (err, content) => {
//         if (err) {
//             if (err.code == 'ENOENT') {
//                 fs.readFile(path.join(__dirname, 'views', '404.html'), (err, content) => {
//                     res.writeHead(200, {'Content-Type' : 'text/html'});
//                     res.end(content, 'utf8');
//                 })
//             } else {
//                 res.writeHead(500);
//                 res.end(`Server Error : ${err.code}`);
//             }
//         } else {
//             res.writeHead(200, {'Content-Type': 'text/html'});
//             res.end(content, 'utf8');
//         }
//     })
// })

// const PORT = process.env.PORT || 8080;
// server.listen(PORT, () => {
//     console.log(`Server running on port: ${PORT}`);
// })

const server = http.createServer((req, res) => {
    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }
    
    fs.readFile(path, (err, content) => {
        if (err) {
            console.log(err);
            res.writeHead(500, {'Content-Type': 'text/html'}); // In case of file read error
            res.end('<h1>Server Error</h1>', 'utf8');
        } else {
            res.writeHead(res.statusCode, {'Content-Type': 'text/html'}); // Use the correct status code
            res.end(content, 'utf8');
        }
    });
});

server.listen(8080, () => {
    console.log('Server running on port 8080');
});