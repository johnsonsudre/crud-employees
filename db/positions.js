const { tbPositions, tbEmployees } = require("./dbConfig.json");

const init = (connection) => {
  const start = async () => {
    const conn = await connection;
    const [result] = await conn.query(`show tables like '${tbPositions}'`);
    if (result.length === 0) {
      await conn.query(`
          CREATE TABLE ${tbPositions} (
            id INT(11) NOT NULL AUTO_INCREMENT,
            PRIMARY KEY (id),
            description VARCHAR(128) NULL DEFAULT NULL
          )
          COMMENT='Table ${tbPositions}';
        `);
    }
  };

  const listAll = async () => {
    const conn = await connection;
    const [result] = await conn.query(`SELECT * FROM ${tbPositions}`);
    return result;
  };

  const create = async (data) => {
    const conn = await connection;
    await conn.query(
      `INSERT INTO ${tbPositions} (description) VALUES ('${data}')`
    );
  };

  const remove = async (id) => {
    console.log("db id: ", id);
    const conn = await connection;
    await conn.query(
      `DELETE FROM ${tbPositions} WHERE id=${id} AND id NOT IN (SELECT idPosition FROM ${tbEmployees}) LIMIT 1`
    );
  };

  const update = async (id, data) => {
    const conn = await connection;
    await conn.query(
      `UPDATE ${tbPositions} SET description = '${data}' WHERE id=${id}`
    );
  };

  return {
    start,
    create,
    remove,
    listAll,
    update,
  };
};

module.exports = init;
