//server
/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(req, res) => {
  const blogs = await Blog.find({})
  res.json( blogs.map( blog => blog.toJSON()))

})
// elimanating catch & error by using library: npm install express-async-errors
blogsRouter.get('/:id', async(req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})



blogsRouter.post('/', async(req, res) => {
  const blog = new Blog(req.body)
  if(!blog.likes)blog.likes =0
  const savedBlog = await blog.save()
  res.json(savedBlog.toJSON())
})

// delete a specific  blog
blogsRouter.delete('/:id', async(req, res) => {
  const id = req.params.id
  await Blog.findByIdAndRemove(id)
  res.status(204).end()

})

// Edit a specific  blog
blogsRouter.put('/:id', async(req, res) => {
  const id = req.params.id
  const blog = req.body
  console.log('id',id)
  Blog.findByIdAndUpdate(id, blog, { new: true })
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(error => next(error))
})
module.exports = blogsRouter




/* with try & cath error

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
*/