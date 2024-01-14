const multer = require('multer');
const path = require('path');

// create the storage configuration to process the image:
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // We tell you where it will be saved:
    const route = path.join(__dirname, '..', 'public', 'images');
    callback(null, route);
  },
  filename: function (req, file, callback) {
    // We put a timestand to differentiate identical images ${Date.now()}
    const fileName = `${Date.now()}-${file.originalname}`;
    callback(null, fileName);
  },
});

// upload configuration:
const upload = multer({
  storage,
});

module.exports = upload;
