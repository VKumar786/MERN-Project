const router = require('express').Router()
const User = require('../model/user')
const Post = require('../model/post')
const bcrypt = require('bcrypt')

//* Update
router.post('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }

        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).send(updateUser)
        } catch (error) {
            res.status(500).send(error)
        }
    } else res.status(401).json("You can update only your account")
})

//* Delete 
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        //* delete all post of user and user account
        try {
            const user = await User.findById(req.params.id)
            try {
                await Post.deleteMany({ email: user.email })

                //* only delete user account
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("user has been deleted...")
            } catch (error) {
                res.status(500).json(error)
            }
        } catch (error) {
            res.status(404).json("user not found...")
        }
    } else res.status(401).json("You can delete only your account...")
})

//* Get
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        !user && res.status(400).json("No User 🔥")

        const {password, ...other} = user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(404).json("user not found...")
    }
})

module.exports = router