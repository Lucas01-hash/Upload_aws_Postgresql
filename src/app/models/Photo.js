const Sequelize = require("sequelize");

class Photo extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        size: Sequelize.INTEGER,
        key: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3333/files/${this.key}`;
          },
        },
      },
      {
        sequelize,
        tableName: "Photos",
      }
    );
  }
}

module.exports = Photo;
