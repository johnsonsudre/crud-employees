const express = require("express");
const cors = require("cors");
const dbConnection = require("./db/dbConnection");
const positions = require("./db/positions")(dbConnection);
const employees = require("./db/employees")(dbConnection);

const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;

// POSITIONS

positions.start();
employees.start();

app.get("/positions", async (req, res) => {
  const listPositions = await positions.listAll();
  res.send(listPositions);
});

app.post("/createPosition", async (req, res) => {
  try {
    await positions.create(req.body.description);
    await res.send(positions.listAll());
    console.log("created: ", req.body);
  } catch (err) {
    console.log("err", err);
  }
});

app.post("/removePosition", async (req, res) => {
  console.log("remove: ", req.body);
  await positions.remove(req.body.id).then(res.send(await positions.listAll()));
});

app.post("/editPosition", async (req, res) => {
  console.log("edit: ", req.body);
  await positions
    .update(req.body.id, req.body.description)
    .then(res.send(await positions.listAll()));
});

// EMPLOYEES

app.get("/employees", async (req, res) => {
  const listEmployees = await employees.listAll();
  res.send(listEmployees);
});

app.post("/createEmployee", async (req, res) => {
  console.log("create: ", req.body);
  await employees.create(req.body).then(res.send(await employees.listAll()));
});

app.post("/removeEmployee", async (req, res) => {
  await employees.remove(req.body.id).then(res.send(await employees.listAll()));
});

app.post("/editEmployee", async (req, res) => {
  await employees
    .update(req.body.id, req.body)
    .then(res.send(await employees.listAll()));
});

//

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

// TEST
//await employees.create(funcionario);
//await employees.remove(3);
// console.log(await employees.listAll());
// await employees.update(4, funcionario);
//console.log(await employees.listAll());
// console.log(await employees.listByPosition(2));
// console.log("end api test");
