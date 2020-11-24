/* eslint-disable no-undef */
// supertest, jest
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const initialBlogs = require('./test_helper').initialBlogs
const Blog = require('../models/blog')
const test_helper = require('./test_helper')

//Initializing the database before tests
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})
// --initializing ended here--

//using the methods provided by supertest for verifying the status code and content-type header
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

//====== verify the format and content of the response data with the expect method of Jest. =======
test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

//======= verify the format and content of the response data with the expect method of Jest. ======
test('the third blogs is about IT', async () => {
  //const response = await api.get('/api/blogs')
  const response = await test_helper.blogsInDb()
  const allTitles = response.map(r => r.title)
  expect(allTitles).toContain('React patterns')
})


// post request

//======== adding new blogs testing ===========
test('adding a valid new blog', async () => {
  const newBlog = {
    title: 'Test patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 17
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  let latestBlog = await test_helper.blogsInDb()
  const titles = latestBlog.map(r => r.title)
  expect(latestBlog).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain('Test patterns')
})

//======= reject adding incomplete blog =========
test('note without content is not added', async () => {

  const newBlog = { title: 'incomplete blog', author: 'Michael Chan' }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  const res = await  test_helper.blogsInDb()
  expect(res).toHaveLength(initialBlogs.length)
})

// ========== get specific blog =============
test('view a specific blog', async () => {
  const blogsInDb = await test_helper.blogsInDb()
  const targetBlog = blogsInDb[0]
  const id = targetBlog.id
  const result = await api
    .get(`/api/blogs/${id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const processedTargetBlog = JSON.parse(JSON.stringify(targetBlog))
  expect(result.body).toEqual(processedTargetBlog)
})


//=========== delete specific blog ===========

test('delet a specific blog', async () => {
  const blogsInDb = await test_helper.blogsInDb()
  //console.log('blogs',blogsInDb)
  const targetBlog = blogsInDb[0]
  const id = targetBlog.id
  console.log(id)
  await api
    .delete(`/api/blogs/${id}`)
    .expect(204)

  const latestBlogs = await  test_helper.blogsInDb()

  expect( latestBlogs).toHaveLength(
    initialBlogs.length - 1
  )

  const contents = latestBlogs.map(r => r.title)

  expect(contents).not.toContain(targetBlog.title)
})

// ========== using the afterAll function of Jest to close the connection to the database after the tests are finished executing. ===
afterAll(() => {
  mongoose.connection.close()
})

// npm test -- -t 'delet a specific blog'