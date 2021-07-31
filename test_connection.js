const mysql = require("mysql2/promise");

const run = async () => {
  try {
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "gerenc_func",
    });
    try {
      const [result] = await conn.query("select * from funcionarios");
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};
run();
