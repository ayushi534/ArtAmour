// src/config/multer.js
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// destination folder relative to project root
const UPLOADS_FOLDER = path.join(__dirname, '..', '..', 'uploads'); // adjust as needed

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = uuidv4() + ext;
    cb(null, safeName);
  }
});

// file filter: accept only images
function fileFilter(req, file, cb) {
  const allowed = /jpeg|jpg|png|gif|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp).'));
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5 MB
});

module.exports = upload;
