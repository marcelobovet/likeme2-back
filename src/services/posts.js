const fs = require('fs');
const path = require('path');

const postsFile = path.join(__dirname, '..', 'utilities', 'posts.json');
// const a = require('../utilities/canciones.json')

const { obtenerPosts, agregarPost, likePost, eliminarPost } = require('../utilities/consultas')

async function getPost(req, res) {
  const posts = await obtenerPosts()
  return res.send(posts)
}

async function addPost(req, res) {
  try {
    const respuesta = await agregarPost(req.body)
    return res.send(respuesta);
  } catch (error) {
    console.log(error)
    return res.status(500).send({ mensaje: 'error al agregar post' })
  }
};

async function modPost(req, res) {
  try {
    const idPost = req.params.id
    const newPost = await likePost(idPost);
    return res.send(newPost);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ mensaje: 'perdon no se pudo dar like' });
  }
};

async function deletePost(req, res) {
  try {
    const idPost = req.params.id;
    const resp = await eliminarPost(idPost);
    return res.send(resp);
  } catch (error) {
    return res.status(500).send({ mensaje: 'erro al eliminar el post' })
  }
};

module.exports = {
  addPost,
  getPost,
  modPost,
  deletePost
};