const cors = require("cors");
const db = require("./db");
const cargos = require("./cargos")(db);
const funcionarios = require("./funcionarios")(db);
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

const port = 3001;

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

app.get("/cargos", async (req, res) => {
  const listCargos = await cargos.listAll();
  res.send(listCargos);
});

app.post("/createCargo", async (req, res) => {
  console.log("create: ", req.body);
  await cargos
    .create(req.body.descricao)
    .then(res.send(await cargos.listAll()));
});

app.post("/removeCargo", async (req, res) => {
  console.log("remove: ", req.body);
  await cargos.remove(req.body.id).then(res.send(await cargos.listAll()));
});

app.post("/editCargo", async (req, res) => {
  console.log("edit: ", req.body);
  await cargos
    .update(req.body.id, req.body.descricao)
    .then(res.send(await cargos.listAll()));
});

/* ------------------------------ */

app.get("/employees", async (req, res) => {
  const listFuncionarios = await funcionarios.listAll();
  res.send(listFuncionarios);
});

app.post("/createEmployee", async (req, res) => {
  console.log("create: ", req.body);
  await funcionarios
    .create(req.body)
    .then(res.send(await funcionarios.listAll()));
});

app.post("/removeEmployee", async (req, res) => {
  await funcionarios
    .remove(req.body.id)
    .then(res.send(await funcionarios.listAll()));
});

app.post("/editEmployee", async (req, res) => {
  await funcionarios
    .update(req.body.id, req.body)
    .then(res.send(await funcionarios.listAll()));
});

// FUNCIONARIOS
//await funcionarios.create(funcionario);
//await funcionarios.remove(3);
// console.log(await funcionarios.listAll());
// await funcionarios.update(4, funcionario);
//console.log(await funcionarios.listAll());
// console.log(await funcionarios.listByCargo(2));
// console.log("end api test");
