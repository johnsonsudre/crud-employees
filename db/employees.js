const { tbPositions, tbEmployees } = require("./dbConfig.json");

const init = (connection) => {
  const start = async () => {
    const conn = await connection;
    const [result] = await conn.query(`show tables like '${tbEmployees}'`);
    if (result.length === 0) {
      await conn.query(`
      CREATE TABLE ${tbEmployees} (
        id INT(11) NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (id),
        name VARCHAR(256) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
        idPosition INT(11) NOT NULL DEFAULT '0',
        dateBirth DATE NULL DEFAULT NULL,
        wage FLOAT NULL DEFAULT NULL
      )
      COMMENT='Tabela ${tbEmployees}';
    `);
    }
  };

  const create = async (data) => {
    const conn = await connection;
    await conn.query(
      `INSERT INTO ${tbEmployees} (name,idPosition,dtBirth,wage) VALUES ('${data.name}',${data.idPosition},'${data.dtBirth}',${data.wage})`
    );
  };

  const remove = async (id) => {
    const conn = await connection;
    await conn.query(`DELETE FROM ${tbEmployees} WHERE id=${id} LIMIT 1`);
  };

  const listAll = async () => {
    const conn = await connection;
    const [result] = await conn.query(`SELECT * FROM ${tbEmployees}`);
    return result;
  };

  const listByPosition = async (idPosition) => {
    const conn = await connection;
    const [result] = await conn.query(
      `SELECT * FROM ${tbEmployees} WHERE idPosition=${idPosition}`
    );
    return result;
  };

  const update = async (id, data) => {
    const conn = await connection;
    await conn.query(
      `UPDATE ${tbEmployees} SET name='${data.name}', idPosition=${data.idPosition}, dtBirth='${data.dtBirth}', wage=${data.wage} WHERE id=${id}`
    );
  };

  return {
    start,
    create,
    remove,
    listAll,
    listByPosition,
    update,
  };
};
module.exports = init;
