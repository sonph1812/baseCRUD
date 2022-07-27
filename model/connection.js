const mysql = require('mysql');
class connection{
    static  createConnection(){
        let configToMySQL ={
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: "BookManagement"
        };
        return mysql.createConnection(configToMySQL);
    }
}
module.exports = connection;