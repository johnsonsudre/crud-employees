const mysql = require("mysql2/promise");
const { tb_funcs, db_config } = require("./db_config.json");

const id = 1;
const new_nome = "nova func - update";

const run = async () => {
  try {
    const conn = await mysql.createConnection(db_config);
    try {
      const [result] = await conn.query(
        `UPDATE ${tb_funcs} SET nome = '${new_nome}' WHERE id=${id}`
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
