const Multer = require("multer");
const crypto = require("crypto");
const AWS = require("aws-sdk");
const MulterS3 = require("multer-s3");
const dotenv = require("dotenv");

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const storage = MulterS3({
  s3: s3,
  bucket: process.env.AWS_S3_BUCKET,
  contentType: MulterS3.AUTO_CONTENT_TYPE,
  acl: "public-read",
  key: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) return cb(err);
      const filename = `${hash.toString("hex")}-${file.originalname}`;

      cb(null, filename);
    });
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = function (req, file, cb) {
  const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png", "image/gif"];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de arquivo inválido"));
  }
};

const imageUpload = () => {
  return new Multer({ storage, fileFilter, limits });
};

const deleteImage = async (file) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: file,
  };
  try {
    const result = await s3
      .deleteObject(params, function (err, data) {
        if (err) return err;
        else return data;
      })
      .promise();
    console.log("Resp: ", result);
  } catch (err) {
    console.log("Error: ", err);
    return false;
  }
};

module.exports = { imageUpload, deleteImage };
