var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '123456',
	database : 'mind-app'
});
//抛出
module.exports = connection;