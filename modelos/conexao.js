const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host     : '127.0.0.1',
    user     : 'dev',
    password : 'dev',
    database : 'universidade'
})

module.exports = pool;