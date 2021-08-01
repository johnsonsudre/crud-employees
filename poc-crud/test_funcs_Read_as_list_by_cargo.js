const mysql = require("mysql2/promise");
const { tb_funcs, tb_cargos, db_config } = require("./db_config.json");
const id_cargo = 4;
const run = async () => {
  try {
    const conn = await mysql.createConnection(db_config);
    try {
      const [result] = await conn.query(
        `select * from ${tb_funcs} where id_cargo=${id_cargo}`
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
