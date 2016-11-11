var configs = require('../configs').db;
var mysql = require('promise-mysql');

var pool = mysql.createPool(configs);

pool.on('error', console.log);

module.exports = pool;