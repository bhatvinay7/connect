const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { diskStorage } = require('multer');

const storage = diskStorage({
  destination: (req, file, cb) => {
    try {
      // Handle destination path logic
      cb(null, './upload/Alumni/Alumni.Photos');
    } catch (err) {
      // Handle errors during destination assignment
      console.error('Error setting destination:', err);
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    try {
      // Generate a unique filename
      const uniqueName = '_' + uuidv4() + file.originalname;
      cb(null, uniqueName);
    } catch (err) {
      // Handle errors during filename generation
      console.error('Error setting filename:', err);
      cb(err);
    }
  },
});

const upload = multer({ storage: storage });
module.exports = upload;

