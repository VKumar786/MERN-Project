const router = require('express').Router()
const User = require('../model/user')
const Post = require('../model/post')
const bcrypt = require('bcrypt')

//* Create Post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savePost = await newPost.save()
        res.status(200).json(savePost);
    } catch (error) {
        res.status(500).json(error)
    }
})

//* Update Post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (post.email === req.body.email) {
            try {
                const updatePost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
                res.status(200).json(updatePost)
            } catch (error) {
                res.status(401).json(error)
            }
        } else res.status(401).json("You can update only your post")
    } catch (error) {
        res.status(500).json(error)
    }
})

//* Delete Post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (post.email === req.body.email) {
            try {
                await Post.findByIdAndDelete(post.id)
                res.status(200).json("Post has been deleted...")
            } catch (error) {
                // console.log('asdfd');
                res.status(401).json(error)
            }
        } else res.status(401).json("You can delete only your post")
    } catch (error) {
        res.status(500).json(error)
    }
})

//* Get Post by id
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json(error)
    }
})

//* Get All Post
router.get('/', async (req, res) => {
    const email = req.query.email
    const catName = req.query.cat

    try {
        let posts
        if (email) {
            posts = await Post.find({ email })
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            })
        } else {
            posts = await Post.find()
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json(error)
    }
})


module.exports = router