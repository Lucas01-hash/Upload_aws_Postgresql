const { Router } = require("express");
const route = new Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

// importar controllers
const PhotoController = require("./app/controllers/photoController");

route.get("/", (req, res) => {
  res.send("olá mundo");
});

route.post("/files", PhotoController.uploadImage);

route.delete("/files/:image", PhotoController.deleteImage);

module.exports = route;
