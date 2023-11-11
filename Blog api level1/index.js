require('dotenv').config()
require('./db/connect')
const express = require('express')
const path = require('path')
const multer = require('multer')
const app = express()

//* Middleware
app.use(express.json())


//* Image
app.use('/images', express.static(path.join(__dirname, '/images')))
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        callback(null, 'file.png')
    },
})
const upload = multer({ storage })
app.post('/upload', upload.single('file'), async (req, res) => {
    res.status(200).json("file has been uploaded")
})

//* Routes
app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/users'))
app.use('/posts', require('./routes/posts'))
app.use('/categories', require('./routes/categories'))

const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))