const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog.find({}).then(blogs => {
    console.log('blogs',blogs)
    res.json( blogs)
  })
})
/*
blogsRouter.get('/', (req, res) => {
  res.json('blogs')
})

<<<<<<< HEAD:part4/blog-list_frontend_test/controllers/blogs.js
blogsRouter.post('/', (req, res, ) => {
=======
*/

blogsRouter.post('/', (req, res, next) => {
>>>>>>> b94cceb7a27aedbfff5186fe169e82e66bc09955:part4/blog-list/controllers/blogs.js
  const blog = new Blog(req.body)
  blog.save().then(savedBlog => {
    res.status(201).json(savedBlog)
  })
})
module.exports = blogsRouter