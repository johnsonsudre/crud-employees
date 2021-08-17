const { tb_cargos, tb_funcs } = require("./configDB.json");

const init = (connection) => {
  const create = async (data) => {
    const conn = await connection;
    await conn.query(`INSERT INTO ${tb_cargos} (descricao) VALUES ('${data}')`);
  };

  const remove = async (id) => {
    console.log("db id: ", id);
    const conn = await connection;
    await conn.query(
      `DELETE FROM ${tb_cargos} WHERE id=${id} AND id NOT IN (SELECT id_cargo FROM ${tb_funcs}) LIMIT 1`
    );
  };

  const listAll = async () => {
    const conn = await connection;
    const [result] = await conn.query(`SELECT * FROM ${tb_cargos}`);
    return result;
  };

  const update = async (id, data) => {
    const conn = await connection;
    await conn.query(
      `UPDATE ${tb_cargos} SET descricao = '${data}' WHERE id=${id}`
    );
  };
  return {
    create,
    remove,
    listAll,
    update,
  };
};
module.exports = init;
