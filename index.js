const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const entry = require("./model/entry.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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
const PORT = 5000;

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

app.post("/submitAll", async (req, res) => {
  for (let entry of req.body) {
    Entry.create({ ...entry }).catch(e => console.log(e));
  }
  return res.sendStatus(200);
});

app.get("/mockup", (req, res) => {
  Entry.drop();
  return res.sendStatus(200);
});

app.listen(PORT, HOST);
