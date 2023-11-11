const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    //* user f.k
    email: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
        required: false,
    },
}, {
    timestamps: true,
})

//* collection or model
const Post = new mongoose.model('Post', postSchema)

module.exports = Post