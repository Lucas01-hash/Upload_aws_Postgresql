require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

class App {
  constructor() {
    this.server = express();
    this.server.use(cors());
    require("./app/database");

    this.middlewares();
    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "temp", "uploads"))
    );
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
