const mysql = require("mysql2/promise");
const { tb_funcs, tb_cargos, db_config } = require("./db_config.json");

const nome = "Janalina";

const run = async () => {
  try {
    const conn = await mysql.createConnection(db_config);
    console.log("conected");
    try {
      console.log("creating register ");
      const [result] = await conn.query(
        `INSERT INTO ${tb_funcs} (nome) VALUES ('${nome}')`
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
