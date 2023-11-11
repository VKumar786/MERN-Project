const router = require('express').Router()
const User = require('../model/user')
const Category = require('../model/category')
const bcrypt = require('bcrypt')

//* Create Category
router.post('/', async (req, res) => {
    const newCategory = new Category(req.body)
    try {
        const saveCategory = await newCategory.save()
        res.status(200).json(saveCategory);
    } catch (error) {
        res.status(500).json(error)
    }
})

//* Get All Category
router.get('/', async (req, res) => {
    try {
        const allCategory = await Category.find({})
        res.status(200).json(allCategory);
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router