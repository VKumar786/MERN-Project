const Users = require('../model/users')
const Contacts = require('../model/contact')

const express = require('express')
const router = new express.Router()
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const XLSX = require('xlsx')

//* image upload
const pathname = path.join(__dirname, '..', '../public/images')
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
            users: data,
        })
    } catch (error) {
        console.log(error)
        res.json({
            type: 'danger',
            message: error.message
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
            pan: req.body.pan,
            dob: req.body.dob,
            unit: req.body.unit,
            public_date: req.body.dob.slice(0, 10),
        })
        const data = await obj.save()
        req.session.message = {
            type: 'success',
            message: 'User Added Successfully'
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

router.get('/edit/:_id', async (req, res) => {
    try {
        const data = await Users.findById(req.params);
        if (data == null) res.redirect('/')
        res.render('edit_users', {
            title: 'Edit User',
            user: data
        })
    } catch (error) {
        res.redirect('/')
    }
})

router.post('/update/:_id', upload, async (req, res) => {
    try {
        let new_image = ''
        if (req.file) {
            new_image = req.file.filename
            //! imp
            try {
                fs.unlinkSync(pathname + "/" + req.body.old_image)
            } catch (error) { console.log(error) }
        } else new_image = req.body.old_image

        const obj = await Users.findByIdAndUpdate(req.params, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: new_image,
            pan: req.body.pan,
            dob: req.body.dob,
            unit: req.body.unit,
            public_date: req.body.dob.slice(0, 10),
            paid: req.body.paid
        });

        const data = await obj.save()
        req.session.message = {
            type: 'success',
            message: 'User Updated Successfully'
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

router.get('/delete/:_id', upload, async (req, res) => {
    try {
        const data = await Users.findByIdAndDelete(req.params)
        if (data.image != null) {
            try {
                fs.unlinkSync(pathname + "/" + data.image)
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

router.get('/contact', async (req, res) => {
    res.render('contact', {
        title: 'Contact Page'
    })
})

router.post('/contact', async (req, res) => {
    console.log(req.body)
    try {
        const obj = await Contacts(req.body)
        const data = await obj.save()

        req.session.message = {
            type: 'success',
            message: 'Contact Form Send Successfully'
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

router.get('/about', async (req, res) => {
    res.render('about', {
        title: 'About Page'
    })
})

router.get('/convertToExcel', async (req, res) => {
    try {
        const usersJson = await Users.find({})
        let data = []
        for (let i = 0; i < Object.keys(usersJson).length; i++) {
            const { name, email, phone, image, pan, unit, public_date, paid } = usersJson[i]
            data.push({ name, email, phone, image, pan, unit, public_date, paid })
        }

        const workSheet = XLSX.utils.json_to_sheet(data);
        const workBook = XLSX.utils.book_new();
    
        XLSX.utils.book_append_sheet(workBook, workSheet, "students")
        // Generate buffer
        XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
    
        // Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    
        XLSX.writeFile(workBook, "studentsData.xlsx")

        req.session.message = {
            type: 'success',
            message: 'Excel File Converted Successfully'
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