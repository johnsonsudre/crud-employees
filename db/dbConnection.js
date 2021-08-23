const mysql = require("mysql2/promise");
const { dbConfig } = require("./dbConfig.json");
module.exports = mysql.createConnection(dbConfig);
