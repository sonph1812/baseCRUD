const fs = require('fs');

class ErrorController {
    showErr404(req, res) {
        fs.readFile('views/404.html', 'utf-8', (err, data) => {
            if (err) {
                console.log('File notFound!');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
        });
    }
}

module.exports = ErrorController;