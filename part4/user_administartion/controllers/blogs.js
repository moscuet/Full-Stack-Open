//server
/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
/* following helper function canbe used to get token instead of middleware tokenextractor function
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
// getting token inside router: const token = getTokenFrom(request)
*/

blogsRouter.get('/', async(req, res) => {
  const blogs = await Blog.find({}).populate('user', { username:1,name:1,id:1 }) //selected: username,name,id deselect blogs
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
  const body = req.body
  const token = req.token
  console.log('token',token)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  //const user = await User.findById(body.userId)
  const blog = new Blog({
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes? body.likes:0,
    user:user._id
  })
  const savedBlog = await blog.save()
  //updating user's bloglist
  user.blogs =  user.blogs.concat(savedBlog._id)
  await user.save()
  res.json(savedBlog) //  res.json(savedBlog.toJSON())
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
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIyIiwiaWQiOiI1ZmM4OWQ1NTBjOWM1YjUwNjBhN2E3ZmYiLCJpYXQiOjE2MDY5ODMxMTN9.6rEmu450XnpgRwbJrtOoHlYVN9ekt1Nk9cZ2dRqvlBo",
    "username": "user2",
    "name": "name2"
}
 "password": "pass2"


{
        "blogs": [],
        "username": "rahman",
        "name": "mostafizur",
        "id": "5fc5dd965f9c6d182e3b54fc"
    }

{
        "title": "testing user blog 2",
        "author": "remanama",
        "url": "url",
        "likes": 0,
        "user": "5fc52bad3a03c70689de220e",
        "id": "5fc52d58aa11d6069721bde0"
    }


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