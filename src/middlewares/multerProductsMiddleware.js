const path = require("path");
const multer = require("multer");

const storage = multer.memoryStorage();
function fileFilter(req, file, cb) {
  const acceptedFileExtensions = [".jpg", ".png", ".jpeg",".JPG", ".PNG", ".JPEG"];
  const isAccepted = acceptedFileExtensions.includes(
    path.extname(file.originalname)
  );
  if (!isAccepted) {
    req.file = file;
  }
  cb(null, isAccepted);
}
const multerProductsMiddleware = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = multerProductsMiddleware;
