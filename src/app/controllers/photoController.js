const { imageUpload, deleteImage } = require("../../config/multer");
const { promisify } = require("util");
const Photo = require("../models/Photo");

class PhotoController {
  async uploadImage(req, res) {
    const uploader = promisify(imageUpload().array("images", 3));
    try {
      await uploader(req, res);
      //   verifica se os arquivos foram selecionados
      if (!req.files.length) {
        return res
          .status(400)
          .json({ message: "Selecione os arquivos para enviar" });
      }
      // Envia os arquivos
      const files = req.files.map((file) => file.location);
      return res
        .status(200)
        .json({ message: "Arquivos enviados com sucesso", images: files });
    } catch (err) {
      console.log(err);

      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(500).json({
          message: "O tamanho da imagem não pode ser superior a 5 MB.",
        });
      }

      if (err.code === "LIMIT_FILE_COUNT") {
        return res.status(500).json({
          message: "Não é possível fazer upload de mais de 3 imagens.",
        });
      }

      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res
          .status(500)
          .json({ message: "Selecione um arquivo de imagem para enviar." });
      }

      return res
        .status(500)
        .json({ message: "Falha ao carregar. Havia um erro." });
    }
  }

  async deleteImage(req, res) {
    const result = await deleteImage(req.params.image);

    if (res.status(200)) {
      return res.status(200).json({ message: 'arquivo excluido com sucesso', result });
    } else if (res.status(500)) {
      return res.json({ message: 'houve um error, não foi possivel excluir' });
    }

  }


}

module.exports = new PhotoController();
