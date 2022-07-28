const fs = require('fs');
const qs = require('qs');
const Book = require("../model/book")

class BookController {
    constructor() {
        this.book = new Book();
    }


    addBook(req, res) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            let book = qs.parse(data);
            this.book.insertBook(book);
            res.writeHead(301, {location: '/admin/bookmanagement'})
            return res.end()
        });
    }

    showBookList(req, res) {
        fs.readFile('views/bookmanagement/list.html', 'utf-8', async (err, data) => {
            if (err) {
                console.log('File not Found');
            } else {
                let books = await this.book.GetAllBook();
                let tbody = '';
                books.map((book, index) => {
                    tbody += ` <tr>
                                            <td>
                                                <div class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" id="customCheck${
                        index + 1
                    }">
                                                                <label class="custom-control-label" for="customCheck${
                        index + 1
                    }">&nbsp;</label>
                                                            </div>
                                            </td>
                                         
                                            <td>${books[index].TenSach}</td>
                                            <td>${books[index].MoTa}</td>
                                            <td>${books[index].TinhTrang_id}</td>
                                            <td>${books[index].TheLoai_id}</td>
                                            <td>${books[index].NXB_id}</td>
                                            <td>${books[index].Kho_id}</td>
                                            
                                            <td>
                                                <a href="/admin/bookmanagement/edit?=${books[index].id}" class="action-icon btn btn-primary text-white">Edit</a>
                                                <a href="/admin/bookmanagement/delete?=${books[index].id}" class="action-icon  btn btn-danger  text-white">Delete</a>
                                            </td>
                                        </tr>`
                    data = data.replace('{listbook}', tbody);
                    res.writeHead(200, {'content-type': 'text/html'});
                    res.write(data);
                    return res.end();
                })
                res.writeHead(200, {'content-type': 'text/html'});
                res.write(data);
                return res.end();
            }
        })
    }

    editBook(req, res, id) {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            let book = qs.parse(data);
            this.book.updateBook(id, book);
            res.writeHead(301, {
                location: "/admin/bookmanagement/edit",
            });
            return res.end();
        })
    }

    showEditForm(req, res, idUpdate) {
        fs.readFile("views/bookmanagement/edit.html", "utf-8", async (err, data) => {
            if (err) {
                console.log("File notFound");
            } else {
                let book = await this.book.GetAllBook(idUpdate);
                if (book.length > 0) {
                    data = data.replace("{id}", book[0].id);
                    data = data.replace("{name}", book[0].name);
                    data = data.replace("{description}", book[0].description);
                }
                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(data);
                return res.end()
            }
        });
    }
    deleteBook(req, res, id) {
        this.book.deleteBook(id).then(() => {
            res.writeHead(301, {
                location: "/admin/bookmanagement",
            });
            return res.end();
        });
    }
    showBookFormCreate(req, res) {
        fs.readFile("views/bookmanagement/create.html", "utf-8", (err, data) => {
            if (err) {
                console.log("File NotFound!");
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(data);
                return res.end();
            }
        });
    }

}

module.exports = BookController;


