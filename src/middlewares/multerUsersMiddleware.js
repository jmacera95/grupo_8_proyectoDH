const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../../public/images/usersImage"));
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`); // TODO: verificar si este nombre nos sirve o si deberíamos customizarlo más.
  },
});
const uploadFile = multer({ storage });
module.exports = uploadFile;
