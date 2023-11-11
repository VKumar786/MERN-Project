const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        validate(val) {
            if(!validator.isEmail(val)) {
                throw new Error('Invalid Email')
            }
        },
    },
    phone : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        required : true,
    },
    created : {
        type : Date,
        required : true,
        default : Date.now,
    }
})

//* collection or model
const Users = new mongoose.model('User', userSchema)

module.exports = Users