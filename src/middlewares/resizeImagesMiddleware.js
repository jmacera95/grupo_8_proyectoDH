const path = require('path');
const sharp = require("sharp");

const resizeImagesMiddleware = async (req, res, next) => {
  const file = req.file;

  if (!file) return next();

  const fileName = file.originalname
  const filePath = path.join(__dirname, '../../public/images/products');
  const newFilename = `${Date.now()}_${fileName.substr(0, fileName.lastIndexOf("."))}.png`;

  await sharp(file.buffer)
    .resize(400, 400, {
      fit: sharp.fit.inside,
    })
    .toFormat("png")
    .png({quality: 100})
    .toFile(`${filePath}/${newFilename}`);

  req.file.filename = newFilename;

  next();
};

module.exports = resizeImagesMiddleware;