const express = require("express");
const cors = require("cors");
const dbConnection = require("./db/dbConnection");
const positions = require("./db/positions")(dbConnection);
const employees = require("./db/employees")(dbConnection);

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

// POSITIONS

const positionsList = () => positions.listAll();
positions.start();
employees.start();

app.get("/positions", async (req, res) => {
  res.send(await positionsList());
});

app.post("/createPosition", async (req, res) => {
  try {
    await positions.create(req.body.description);
    res.send(await positionsList());
  } catch (err) {
    console.log("err", err);
  }
});

app.post("/removePosition", async (req, res) => {
  await positions.remove(req.body.id);
  res.send(await positionsList());
});

app.post("/editPosition", async (req, res) => {
  await positions.update(req.body.id, req.body.description);
  res.send(await positionsList());
});

// EMPLOYEES

const employeesList = () => employees.listAll();

app.get("/employees", async (req, res) => {
  res.send(await employeesList());
});

app.post("/createEmployee", async (req, res) => {
  await employees.create(req.body);
  res.send(await employeesList());
});

app.post("/removeEmployee", async (req, res) => {
  await employees.remove(req.body.id);
  res.send(await employeesList());
});

app.post("/editEmployee", async (req, res) => {
  await employees.update(req.body.id, req.body);
  res.send(await employeesList());
});

//

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
