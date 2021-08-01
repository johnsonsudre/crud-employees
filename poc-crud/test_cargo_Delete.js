const mysql = require("mysql2/promise");
const { tb_cargos, tb_funcs, db_config } = require("./db_config.json");
const id = 4;
const run = async () => {
  try {
    const conn = await mysql.createConnection(db_config);
    try {
      const [result] = await conn.query(
        `DELETE FROM ${tb_cargos} WHERE id=${id} AND id NOT IN (SELECT id_cargo FROM ${tb_funcs}) LIMIT 1`
      );
      console.log("Delete cargo", result);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};
run();
