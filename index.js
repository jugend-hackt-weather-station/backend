const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const entry = require("./model/entry.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dbOptions = {
  name: "weatherstation",
  host: "localhost",
  port: "3306",
  username: "root",
  password: ""
};

const sequelize = new Sequelize(
  dbOptions.name,
  dbOptions.username,
  dbOptions.password,
  {
    host: dbOptions.host,
    port: dbOptions.port,
    dialect: "mysql"
  }
);

const Entry = entry.create(sequelize);
Entry.sync({ force: false });

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

const HOST = "localhost";
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Hey!");
});

app.get("/status", (req, res) => {
  res.sendStatus(200);
});

app.get("/getAll", async (req, res) => {
  Entry.findAll()
    .then(data => {
      return res.json(data);
    })
    .catch(e => console.log(e));
});

app.post("/submit", async (req, res) => {
  Entry.create({ ...req.body })
    .then(() => {
      return res.sendStatus(200);
    })
    .catch(e => console.log(e));
});

app.listen(PORT, HOST);
