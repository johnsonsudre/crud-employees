const mysql = require("mysql2/promise");
const { tb_cargos, db_config } = require("./db_config.json");

const id = 2;
const new_desc = "nova desc cargo - update";

const run = async () => {
  try {
    const conn = await mysql.createConnection(db_config);
    try {
      const [result] = await conn.query(
        `UPDATE ${tb_cargos} SET descricao = '${new_desc}' WHERE id=${id}`
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
