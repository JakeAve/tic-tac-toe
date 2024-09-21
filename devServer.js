const express = require("express");
const path = require("path");
const fs = require("fs");
const https = require("https");

const app = express();

const PORT = 443;

const options = {
  key: fs.readFileSync("./cert/local_host.key"),
  cert: fs.readFileSync("./cert/local_host.crt"),
};

app.use("/tic-tac-toe", express.static(path.join(__dirname, "src")));

https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS Server is running on https://localhost/tic-tac-toe/`);
});
