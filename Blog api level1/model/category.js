const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
})

//* collection or model
const Register = new mongoose.model('Category', categorySchema)

module.exports = Register