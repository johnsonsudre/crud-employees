const db = require("./db");
const cargos = require("./cargos")(db);
const funcionarios = require("./funcionarios")(db);

  const dt = new Date().toISOString().slice(0, 10);
  const funcionario = {
    nome: "Flecha",
    id_cargo: 2,
    dt_nasc: dt,
    salario: 7000,
  };

const test = async () => {
  console.log("api test")
  // CARGOS
  //await cargos.create("novo cargo da api 2");
  await cargos.remove(8);
  //console.log(await cargos.listAll());
  //await cargos.update(2, "cargo 2 atualizado");
  //console.log(await cargos.listAll());
  // FUNCIONARIOS
  //await funcionarios.create(funcionario);
  //await funcionarios.remove(3);
  // console.log(await funcionarios.listAll());
  // await funcionarios.update(4, funcionario);
  //console.log(await funcionarios.listAll());
  console.log(await funcionarios.listByCargo(1));
  console.log("end api test")
};
test();
