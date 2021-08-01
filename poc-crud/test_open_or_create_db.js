const mysql = require("mysql2/promise");
const { tb_funcs, tb_cargos, db_config } = require("./db_config.json");

const run = async () => {
  try {
    const conn = await mysql.createConnection(db_config);
    try {
      const [result] = await conn.query(`show tables like '${tb_funcs}'`);
      if (result.length === 0) {
        console.log(`Creating ${tb_funcs} table...`);
        await conn.query(`
          CREATE TABLE ${tb_funcs} (
            id INT(11) NOT NULL AUTO_INCREMENT,
            PRIMARY KEY (id),
            nome VARCHAR(256) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
            id_cargo INT(11) NOT NULL DEFAULT '0',
            dt_nasc DATE NULL DEFAULT NULL,
            salario FLOAT NULL DEFAULT NULL
          )
          COMMENT='Tabela ${tb_funcs}';
        `);
        console.log(`Creating ${tb_cargos} table...`);
        await conn.query(`
          CREATE TABLE ${tb_cargos} (
            id INT(11) NOT NULL AUTO_INCREMENT,
            PRIMARY KEY (id),
            descricao VARCHAR(128) NULL DEFAULT NULL
          )
          COMMENT='Tabela ${tb_cargos}';
        `);
        console.log(`Done.`);
      }
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};
run();
