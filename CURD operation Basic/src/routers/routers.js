const express = require('express')
const router = new express.Router()
const Users = require('../model/users')
const multer = require('multer')
const fs = require('fs')

//* image upload
const pathname = process.env._DIRNAME + "uploads"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathname)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
})

//* image middleware
const upload = multer({
    storage: storage,
}).single('image') //? <img name="image"/>


router.get('/', async (req, res) => {
    try {
        const data = await Users.find({})
        res.render('index', {
            title: 'Home Page',
            users: data
        })
    } catch (error) {
        console.log(err)
        res.json({
            type: 'danger',
            message: err.message
        })
    }
})

router.get('/add', async (req, res) => {
    res.render('add_users', {
        title: 'Add Users',
    })
})

router.post('/add', upload, async (req, res) => {
    console.log(req.body)
    try {
        const obj = new Users({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: req.file.filename,
        })
        const data = await obj.save()
        req.session.message = {
            type: 'success',
            message: 'User Added Successfully'
        }
        res.redirect('/')
    } catch (err) {
        console.log(err)
        res.json({
            type: 'danger',
            message: err.message
        })
    }
})

router.get('/edit/:_id', async (req, res) => {
    try {
        const data = await Users.findById(req.params);
        if(data == null) res.redirect('/')
        res.render('edit_users', {
            title : 'Edit User',
            user : data
        })
    } catch (error) {
        res.redirect('/')
    }
})

router.post('/update/:_id', upload, async (req, res) => {
    try {
        let new_image = ''
        if(req.file) {
            new_image = req.file.filename
            //! imp
            try {
                fs.unlinkSync(process.env._DIRNAME + "uploads/"+ req.body.old_image)
            } catch (error) { console.log(error) }
        } else new_image = req.body.old_image

        const obj = await Users.findByIdAndUpdate(req.params, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: new_image,
        });

        const data = await obj.save()
        req.session.message = {
            type: 'success',
            message: 'User Updated Successfully'
        }
        res.redirect('/')
    } catch (error) {
        console.log(err)
        res.json({
            type: 'danger',
            message: err.message
        })
    }
})

router.get('/delete/:_id', upload, async (req, res) => {
    try {
        const data = await Users.findByIdAndDelete(req.params)
        if(data.image != '') {
            try {
                fs.unlinkSync(process.env._DIRNAME + "uploads/"+ data.image)
            } catch (error) { console.log(error) }
        }
        req.session.message = {
            type: 'success',
            message: 'User Deleted Successfully'
        }
        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.json({
            type: 'danger',
            message: error.message
        })
    }
})

module.exports = router