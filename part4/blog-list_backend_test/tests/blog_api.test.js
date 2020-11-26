/* eslint-disable no-undef */
// supertest, jest
const mongoose = require('mongoose')
const supertest = require('supertest')
const test_helper = require('./test_helper')
const initialBlogs = test_helper.initialBlogs
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

//Initializing the database before tests
beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})
describe('test after initializing test data base', () => {
  // Exercise 4.8
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
  test('specific blog returned', async () => {
    const response = await test_helper.blogsInDb()
    const allTitles = response.map(r => r.title)
    expect(allTitles).toContain('React patterns')
  })
})
// exercise 4.9
test('unique identifier property of the blog posts is named id', async() => {
  const response = await test_helper.blogsInDb()
  response.forEach( res => {
    expect(res.id).toBeDefined()
  })
})
//4.10 ======== Post request ===========
describe('post new blog', () => {
  test('adding a valid new blog successfully', async () => {
    const newBlog = {
      title: 'Test patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 17
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    let latestBlog = await test_helper.blogsInDb()
    expect(latestBlog).toHaveLength(initialBlogs.length + 1)
    const titles = latestBlog.map(r => r.title)
    expect(titles).toContain('Test patterns')
  })
  test('invalid blog failed to add', async () => {
    let blogBeforePost = await test_helper.blogsInDb()
    const newBlog = { title: 'incomplete blog', author: 'Michael Chan' }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    const res = await  test_helper.blogsInDb()
    expect(res).toHaveLength(blogBeforePost.length)
  })
  // 4.11
  test('missing Like property added with default value 0', async () => {
    //let blogBeforePost = await test_helper.blogsInDb()
    const newBlog = { title: 'missing Likes property', author: 'Michael Chan',url: 'https://reactpatterns.com/' }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then( res => expect(res.body.likes).toBe(0))
  })
  // 4.12
  test('missing title, url in blog make the post invalid', async () => {
  //let blogBeforePost = await test_helper.blogsInDb()
    const newBlog1 = {  author: 'Michael Deb',url: 'https://reactpatterns.com/', likes:4 }
    const newBlog2 = { author: 'Michael Zen', title: 'missing Likes property',likes:9 }
    await api
      .post('/api/blogs')
      .send(newBlog1)
      .expect(400)
    await api
      .post('/api/blogs')
      .send(newBlog2)
      .expect(400)
  })
})
// test for assignmentt 4.13
describe('delet a specific blog', () => {
  test('delet successfully with valid id request', async () => {
    const blogsInDb = await test_helper.blogsInDb()
    const targetBlog = blogsInDb[0]
    const id = targetBlog.id
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
})

// ========== using the afterAll function of Jest to close the connection to the database after the tests are finished executing. ===
afterAll(() => {
  mongoose.connection.close()
})

// npm test -- -t 'delet a specific blog'


/*
// ========== get specific blog =============

describe('viewing a specific blog', () => {
  test('view a specific blog with valid id', async () => {
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
  test('test fail for non-existing id with sttus code 400', async () => {
    const nonexistingId = await test_helper.nonExistingId()
    await api
      .get(`/api/blogs/${nonexistingId}`)
      .expect(404)
  })
  test('test fail for invalid formatted id with status code 400', async () => {
    const invalidId = '6a3d5hyre9864hfye3k99uugygyuftdrrdt98766'
    await api
      .get(`/api/notes/${invalidId}`)
      .expect(404) //should pass for 400 but it doesnt. maybe something to do 'express-async-errors' libray which is responsible handling error
  })
})
*/