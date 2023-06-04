const express = require('express');
const router = express.Router()
const postsServices = require('../services/posts');

router.post('/', postsServices.addPost);
router.get('/', postsServices.getPost);
router.put('/like/:id', postsServices.modPost);
router.delete('/:id', postsServices.deletePost);



module.exports = router;