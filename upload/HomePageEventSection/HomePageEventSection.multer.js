const multer = require('multer');
const {v4:uuidv4}=require('uuid');
const { diskStorage } = require('multer');

const storage = diskStorage({
    destination: (req, file, cb) => {
      cb(null,'./upload/homePageEventSection/homePageEventSection.Photos')
    },
    filename: (req, file, cb) => {
        cb(null,'_' +uuidv4()+file.originalname);
    }
});

const upload = multer({ storage: storage });
module.exports = upload;

