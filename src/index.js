const app = require('./app');


const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);










app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
})
