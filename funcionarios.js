const { tb_cargos, tb_funcs } = require("./configDB.json");
const init = (connection) => {
  const create = async (data) => {
    const conn = await connection;
    await conn.query(
      `INSERT INTO ${tb_funcs} (nome,id_cargo,dt_nasc,salario) VALUES ('${data.nome}',${data.id_cargo},'${data.dt_nasc}',${data.salario})`
    );
  };

  const remove = async (id) => {
    const conn = await connection;
    await conn.query(`DELETE FROM ${tb_funcs} WHERE id=${id} LIMIT 1`);
  };

  const listAll = async () => {
    const conn = await connection;
    const [result] = await conn.query(`SELECT * FROM ${tb_funcs}`);
    return result;
  };

  const listByCargo = async (id_cargo) => {
    const conn = await connection;
    const [result] = await conn.query(`SELECT * FROM ${tb_funcs} WHERE id_cargo=${id_cargo}`);
    return result;
  };

  const update = async (id, data) => {
    const conn = await connection;
    await conn.query(
      `UPDATE ${tb_funcs} SET nome='${data.nome}', id_cargo=${data.id_cargo}, dt_nasc='${data.dt_nasc}', salario=${data.salario} WHERE id=${id}`
    );
  };

  return {
    create,
    remove,
    listAll,
    listByCargo,
    update,
  };
};
module.exports = init;
