// //đập đi xây lại t4/26
// const bookModel = require('../model/book')
// const fs = require('fs');
// const qs = require('qs');
// const url = require('url');
// const Book = require("../model/book");
//
// module.exports = class bookController {
//     constructor() {
//         this.book = new Book();
//     }
//
//     errorPage(req, res) {
//         bookController.readfile('./views/book/404.html', req, res)
//     }
//
//     readfile(pathFile, req, res) {
//         fs.readFile(pathFile, 'utf-8', (err, data) => {
//             if (err) {
//                 throw err
//             }
//             res.writeHead(200, {'Content-Type': 'text/html'})
//             res.write(data)
//             res.end();
//         })
//     }
//
//     showFormAdd(pathFile, req, res) {
//         this.book.getTypeBook().then(MoTa => {
//             fs.readFile("./views/bookmanagement/add.html", 'utf-8', (err, data) => {
//                 if (err) {
//                     throw err
//                 }
//                 let html = ''
//                 MoTa.forEach(type => {
//                     html += `<input type="checkbox" value="${type.TheLoai_id}" name="The loai Sach">${type.TheLoai_id}`
//                 })
//                 data = data.replace('{list-type}', html)
//                 res.writeHead(200, {'Content-Type': 'text/html'})
//                 res.write(data)
//                 res.end();
//             })
//
//         }).catch(err => {
//             throw err
//         })
//     }
//
//     static showFormUpdate(pathFile, req, res, index) {
//         fs.readFile(pathFile, 'utf-8', (err, data) => {
//             if (err) {
//                 throw err
//             }
//             res.writeHead(200, {'Content-Type': 'text/html'})
//             res.write(data)
//             res.end();
//         })
//     }
//
//     addBook(req, res) {
//         if (req.method === 'GET') {
//             bookController.showFormAdd('./views/book/add.html', req, res)
//         } else {
//             let data = '';
//             req.on('data', chunk => {
//                 data += chunk
//             })
//             req.on('end', () => {
//                 const Book = qs.parse(data)
//                 console.log(Book)
//                 //save db sach
//                 book.insertBook(Book.TenSach, Book.MoTa, Book.TheLoai)
//                     .then(result => {
//                         res.writeHead(301, {location: '/'})
//                         res.end();
//                     })
//                     .catch(err => {
//                         throw  new Error(err.message)
//                     })
//             })
//         }
//     }
//
//     static deleteBook(req, res) {
//         const parseUrl = url.parse(req.url, true)
//         let indexParse = qs.parse(parseUrl.query).id;
//         console.log(indexParse)
//         bookModel.deleteBook(indexParse).then(result => {
//             res.writeHead(301, {location: '/'})
//             res.end();
//         })
//             .catch(err => {
//                 throw  new Error(err.message)
//             })
//     }
//
//     static updateBook(req, res) {
//         let parseUrl = url.parse(req.url, true)
//         let index = (qs.parse(parseUrl.query)).id;
//         if (req.method === 'GET') {
//             // check url
//             const urlPath = url.parse(req.url, true);
//             let queryString = urlPath.query;
//             let idUpdate = queryString.id;
//
//             console.log(idUpdate)
//
//             Book.findBookUpdateById(idUpdate)
//                 .then(result => {
//                     fs.readFile('./views/book/update.html', "utf-8", (err, data) => {
//                         if (err) {
//                             throw err
//                         }
//
//                         data = data.replace('value="TenSach"',
//                             `value="${result[0].TenSach}"`
//                         )
//                         data = data.replace('value="MoTa"',
//                             `value="${result[0].MoTa}"`
//                         )
//
//                         res.writeHead(200, {"Content-Type": "text/html"})
//                         res.write(data);
//                         res.end()
//                     })
//
//
//                 })
//                 .catch(err => {
//                     throw err;
//                 })
//
//
//         } else {
//             // take data and return from 2 tables sach and mota
//             let data = ''
//             req.on('data', chunk => {
//                 data += chunk
//             })
//             req.on('end', () => {
//                 const book = qs.parse(data)
//                 //update db
//                 console.log(book)
//
//
//                 Book.updateBook(book.TenSach, book.MoTa, book.TheLoai, index)
//                     .then(result => {
//                             res.writeHead(301, {location: '/'})
//                             res.end();
//                         }
//                     )
//                     .catch(err => {
//                         throw new Error(err.message)
//                     })
//             })
//         }
//     }
//
// }
