const mysql = require("mysql2/promise");
const { tb_funcs, db_config } = require("./db_config.json");

const id = 2;

const run = async () => {
  try {
    const conn = await mysql.createConnection(db_config);
    try {
      const [result] = await conn.query(
        `DELETE FROM ${tb_funcs} WHERE id=${id} LIMIT 1`
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};
run();
