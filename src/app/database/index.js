const Sequelize = require("sequelize");

// importar todos o models da aplicação
const Photo = require("../models/Photo");

// importar a config do banco de dados
const databaseConfig = require("../../config/database");

// meus modelos
const models = [Photo];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    if (this.connection) {
      console.log("foi conectado ao banco");
    }

    models.map((model) => model.init(this.connection));
    // .map(
    //   (model) => model.associate && model.associate(this.connection.models)
    // );
  }
}

module.exports = new Database();
