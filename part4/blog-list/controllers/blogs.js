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
  console.log('blog')
  res.json( `blogs`)
})

*/

blogsRouter.post('/', (req, res, next) => {
  const blog = new Blog(req.body)
  blog.save().then(savedBlog => {
    res.status(201).json(savedBlog)
  })
})
module.exports = blogsRouter
