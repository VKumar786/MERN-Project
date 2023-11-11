const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express()

//* multer is passed as middleware it means app.post('/', middleware, () => {})
//! cb -> callback is used to store where we want to store images cb(err,folder_name_where_you_want_to_store)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({ storage })

app.set('view engine', 'ejs')

app.get('/upload', (req, res) => {
    res.render('uploads')
})
 
//* upload.__ , __ contain many  option weather we want a single file or bluk in file
//* .single('input_field_name')
//! thunderclient use file option to check image
app.post('/upload', upload.single('image'), (req, res) => {
    res.send('image uploaded')
})

const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))