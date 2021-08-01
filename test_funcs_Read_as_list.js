const mysql = require("mysql2/promise");
const { tb_funcs, db_config } = require("./db_config.json");

const run = async () => {
  try {
    const conn = await mysql.createConnection(db_config);
    try {
      const [result] = await conn.query(`select * from ${tb_funcs}`);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};
run();
