const util = require("util");
const multer = require("multer"),
    maxSize = 2 * 1024 * 1024,

    storage = multer.diskStorage({
        "destination": (req, file, cb) => {

            cb(
                null,
                `${__basedir}/resources`
            );

        },
        "filename": (req, file, cb) => {

            console.log(file.originalname);
            cb(
                null,
                file.originalname
            );

        }
    }),

    uploadFile = multer({ // To restrict file size
        storage,
        "limits": {"fileSize": maxSize}
    }).single("file"),

    uploadFileMiddleware = util.promisify(uploadFile); // Makes the exported middleware object can be used with async-await.
module.exports = uploadFileMiddleware;
