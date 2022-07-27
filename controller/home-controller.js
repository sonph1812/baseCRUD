const fs = require('fs');

class HomeController {
    showhomepage(req, res) {
        fs.readFile('views/home.html', 'utf-8', (err, data) => {
            if (err) {
                console.log('file Not found')
            } else {
                res.writeHead(200, {'content-type': 'text/html'});
                res.write(data);
                return res.end();
            }
        });
    }
}
module.exports = HomeController