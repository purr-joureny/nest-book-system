import * as multer from 'multer'
import * as fs from 'fs'

const storage = multer.diskStorage({
  destination: function (req, File, callback) {
    try {
      fs.mkdirSync('uploads')
    } catch (e) {
      callback(null, 'uploads')
    }
  },
  filename: function (req, file, callBack) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname
    callBack(null, uniqueSuffix)
  }
})


export { storage }