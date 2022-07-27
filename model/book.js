const connection = require('./connection');


class Book {
    constructor() {
        this.connection = connection.createConnection();
        this.connection.connect((err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('connect success');
            }
        });
    }

    GetAllBook() {
        return new Promise((resolve, reject) => {
            this.connection.query('select * from Sach', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data)
                    console.log(data)
                }
            });
        });
    }

    insertBook(book) {
        const sqlInsert = `insert into Sach(TenSach, MoTa, HinhAnh, TinhTrang_id, TheLoai_id, NXB_id, Kho_id)
                           values ('${book.TenSach}', '${book.Mota}', '${book.HinhAnh}', '${book.TinhTrang_id}',
                                   '${book.TheLoai_id}', '${book.NXB_id}', '${book.Kho_id}')`;
        this.connection.query(sqlInsert, (err, data) => {
            if (err) {
                console.log(err)
            } else
                console.log('1 record inserted')
        });
    }

    getBook(id) {
        return new Promise((resolve, reject) => {
            let query = `select *
                         from Sach
                         where id ={$id}`;
            this.connection.query(query, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    updateBook(id, book) {
        let query = `update Sach
                     set name = '${book.TenSach}', '${book.Mota}', '${book.HinhAnh}', '${book.TinhTrang_id}',
                             '${book.TheLoai_id}', '${book.NXB_id}', '${book.Kho_id}'`
        this.connection.query(query, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Fixing Done')
            }
        })
    }

    deleteBook(id) {
        let query = `delete
                     from Sach
                     where id = ${id}`;
        this.connection.query(query, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Delete Done')
            }
        })
    }
}

module.exports = Book;

// //đậpnpm i react-dev-utils@10.0.0
// const connectionMysql = require('./connection').createConnection()
// module.exports = class Book {
//     constructor() {
//     }
//
//     getTypeBook() {
//         return new Promise((resolve, reject) => {
//             let sql = `select *
//                        from TheLoai`
//             connectionMysql.query(sql, (err, result) => {
//                 if (err) {
//                     reject(err)
//                 } else {
//                     resolve(result)
//                 }
//             })
//         })
//     }
//
//     insertBook(TenSach, Mota, Theloai) {
//         return new Promise((resolve, reject) => {
//             let sql = `insert into Sach(Tensach, Mota, TheLoai_id)
//                        values ('${TenSach}', '${Mota}', '${Theloai}')`
//             connectionMysql.query(sql, (err, result) => {
//                 if (err) {
//                     reject(err)
//                 }
//                 resolve('Done')
//             })
//         })
//     }
//
//     deleteBook(index) {
//         return new Promise((resolve, reject) => {
//             let sql = `delete
//                        from Sach
//                        where id = ${index}`
//             connectionMysql.query(sql, (err, result) => {
//                 if (err) {
//                     reject(err)
//                 }
//                 resolve('Delete Done')
//             })
//         })
//     }
//
//     updateBook(TenSach, Mota, Theloai, index) {
//         return new Promise((resolve, reject) => {
//             let sql = `update Sach
//                        set TenSach='${TenSach}',
//                            MoTa='${Mota}',
//                            TheLoai_id='${Theloai}'
//                        where id = '${index}'`
//             connectionMysql.query(sql, (err, result) => {
//                 if (err) {
//                     reject(err)
//                 }
//                 resolve('Update Done')
//
//             })
//         })
//     }
//
//     findBookUpdateById(idUpdate) {
//         return new Promise((resolve, reject) => {
//             let sql = `select s.TenSach, s.MoTa, t.TheLoai
//                        from Sach s
//                                 join TheLoai t on s.TheLoai_id = t.TheLoai
//                        where s.id = '${idUpdate}'`
//             connectionMysql.query(sql, (err, result) => {
//                 if (err) {
//                     reject(err)
//                 }
//                 resolve(result)
//
//             })
//
//         })
//     }
// }
