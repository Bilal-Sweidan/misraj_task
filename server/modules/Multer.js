// multer
const multer = require('multer')
const path = require('node:path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/images'))
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + path.extname(file.originalname))
    }
})
const upload = multer({ storage })

module.exports = {
    upload
}