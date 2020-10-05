const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

/* 
   RESTful api endpoints that allow for CRUD (Create, Read, Update, Destroy)
   operations on database objects

   GET    /posts/
   GET    /posts/id
   PUT    /posts/id
   DELETE /posts/id
   POST   /posts/id
*/

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch(err) {
        res.json({ message: err});
    }
});

router.get('/:postId', async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch(err) {
        console.log(err);
        res.json({ message: err });
    }
});

router.put('/:postId', async (req, res) => {
    try{
        const post = await Post.findByIdAndUpdate(
            req.params.postId, { 
                $set: {
                    title: req.body.title,
                    desc: req.body.desc
                }
            }
        );
        res.json(post);
    } catch(err) {
        res.json({ message: err });
    }
});

router.delete('/:postId', async (req, res) => {
    try{
        const post = await Post.findByIdAndDelete(req.params.postId);
        res.json(post);
    } catch(err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        desc: req.body.desc
    });

    try{
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(err) {
        res.json({ message: err });
    }
});



module.exports = router;