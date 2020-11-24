//server
/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(req, res) => {
  try {
    const blogs = await Blog.find({})
    res.json( blogs.map( blog => blog.toJSON()))
  } catch(error){
    next(error)
  }
})
blogsRouter.get('/:id', async(req, res,next) => {
  const id = req.params.id
  try{
    const blog = await Blog.findById(id)
    if (blog) {
      res.json(blog)
    } else {
      res.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})


blogsRouter.post('/', async(req, res,next ) => {
  const blog = new Blog(req.body)
  try {
    const savedBlog = await blog.save()
    res.json(savedBlog.toJSON())
  } catch (exception){
    next(exception)
  }
})


blogsRouter.delete('/:id', async(req, res, next) => {
  console.log('idd',req.params.id)
  try {
    const id = req.params.id
    console.log('id',id)
    await Blog.findByIdAndRemove(id)
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter