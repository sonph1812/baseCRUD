const http = require('http');
const url = require('url');
const fs = require('fs');
const HomeController = require("./controller/home-controller");
const ErrorController = require("./controller/error-controller");
const bookController = require("./controller/bookcontroller");

const bookcontroll = new bookController()
const homecontroll = new HomeController();
const errorcontroll = new ErrorController();

const mimeTypes = {
    "html": "text/html",
    "js": "text/javascript",
    "css": "text/css",
    "min.js": "text/javascript",
    "js.map": "text/javascript",
    "css.map": "text/css",
    "min.css": "text/css",
    "jpg": "image/jpg",
    "png": "image/png",
    "gif": "image/gif",
    "woff": "text/html",
    "ttf": "text/html",
    "woff2": "text/html",
    "eot": "text/html",
};


let server = http.createServer((req, res) => {
    let path = url.parse(req.url)
    let pathUrl = path.pathname;
    console.log(pathUrl)
    let method = req.method;
    switch (pathUrl) {
        case '/': {
            homecontroll.showhomepage(req, res);
            break;
        }
        case '/admin/bookmanagement/add': {
            if (method === 'GET') {
                bookcontroll.showBookList(req, res);
            } else {
                bookcontroll.addBook(req, res);
            }
            break;
        }
        case '/views/admin/bookmanagement/list': {
            fs.readFile('views/bookmanagement/list.html', 'utf-8', (err, data) => {
                if (err) {
                    throw new Error(err.message)
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data);
                    return res.end();
                }
            });

            break;
        }
        case '/views/admin/bookmanagement/update/': {
            if (method == 'GET') {
                bookcontroll.showEditForm(req,res)
            } else {
                bookcontroll.editBook(req,res)
            }
            break;
        }


        default:

            const filesDefences = req.url.match(/\.js|\.css|\.png|\.jpg/);
            if (filesDefences) {
                const extension = mimeTypes[filesDefences[0].toString().split('.')[1]];
                res.writeHead(200, {'Content-Type': extension});
                fs.createReadStream(__dirname + "/" + req.url).pipe(res)
            } else {
                res.end();
            }

            break;

    }
})

server.listen(8003, () => {
    console.log('Server is running http//:localhost:8003');
});