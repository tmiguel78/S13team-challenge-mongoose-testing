const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//Obtener todos los post

router.get('/', async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).send(error);
    }
})

// Crear un post 

router.post('/create', async (req, res) => { 
    try {
        const post = await Post.create(req.body)
        res.status(201).send(post);
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'There was a problem trying to create the post.'})
    }   
})


// Borrar un post por id

router.delete('/id/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const deletedPost = await Post.findByIdAndDelete(_id)
        res.json(deletedPost)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'There was a problem trying to delete the post.'}) 
    }
});

// Buscar por titulo
router.get('/title/:title', async (req, res) => {
    try{
        const post = await Post.findOne({ title: req.params.title});
        if(!post) return res.status(404).send({ message: "No hay posts con ese nombre"})
            res.send(post);
        } catch (error) {
        res.status(500).send(error);
    }
})

// Buscar por id

router.get('/id/:_id', async (req, res) => {
    try{
        const post = await Post.findById(req.params._id);
        if(!post) return res.status(404).send({ message: "No hay posts con ese id"})
            res.send(post);
        } catch (error) {
        res.status(500).send(error);
    }
})

// Actualizar post

router.put('/id/:_id', async(req, res) => {
   try {
    const newTitlePost = req.body.title;
    const newBodyPost = req.body.body;
    const post = await Post.findById(req.params._id);
    post.title = newTitlePost;
    post.body = newBodyPost;

    await post.save();

    res.json(post)
    
   } catch (error) {
    res.status(500).send(error);
   }
});

module.exports = router; 