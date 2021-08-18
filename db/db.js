const mysql = require("mysql2/promise");
const { db_config } = require("./configDB.json");
module.exports = mysql.createConnection(db_config);
