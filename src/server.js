const app = require("./app");
try {
  app.listen(3333);
  console.log("foi conectado ao servidor");
} catch (err) {
  console.log("não foi conectado ao servidor: " + err);
}
