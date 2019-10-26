const express = require("express");

// Constants
const HOST = "localhost";
const PORT = 8080;

// App
const app = express();
app.get("/", (req, res) => {
  res.send("Hello world\n");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
