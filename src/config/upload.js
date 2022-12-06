const multer = require('multer');
const path = require('path');

const uploadPath = 'public/uploads';

module.exports = {
    uploadPath,

    storage: multer.diskStorage({
        destination: (request, file, callback) => {
            callback(null, uploadPath);
        },
        filename: (request, file, callback) => {
            const time = new Date().getTime();
            const filename = `${time}_${file.originalname}`;
            callback(null, filename);
        }
    }),
}