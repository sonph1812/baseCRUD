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
        return new Promise((resolve, reject) => {
            let query = `delete
                         from Sach
                         where id = ${id}`;
            this.connection.query(query, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data)
                    console.log("DeleteDone")
                }
            })
        })
    }
}

module.exports = Book;

