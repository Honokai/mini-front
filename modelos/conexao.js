const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host     : '127.0.0.1',
    user     : 'root',
    password : '865358',
    database : 'universidade'
})

module.exports = pool;