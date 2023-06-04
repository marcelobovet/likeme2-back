const { Pool } = require('pg')
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    allowExitOnIdle: true
});


const obtenerPosts = async () => {
    const { rows } = await pool.query('SELECT * FROM posts ORDER BY id');
    return rows;
};

const agregarPost = async (post) => {
    const consulta = 'INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4)';
    const values = [post.titulo, post.img, post.descripcion, post.likes];
    await pool.query(consulta, values);
    return { mensaje: 'post agregado' };
}

const eliminarPost = async (id) => {
    const consulta = 'DELETE FROM posts WHERE id = $1'
    const values = [id];
    await pool.query(consulta, values);
    return { mensaje: 'Post eliminado' };
}

const likePost = async (id) => {
    const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    const post = rows[0]
    const consulta = 'UPDATE posts SET likes = $1 WHERE id = $2'
    const likes = post.likes ? post.likes + 1 : 1;
    const values = [likes, id];
    await pool.query(consulta, values);
    return { mensaje: 'Post modificado' };
};

module.exports = { obtenerPosts, agregarPost, eliminarPost, likePost }