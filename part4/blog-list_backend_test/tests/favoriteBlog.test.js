//jest
/* eslint-disable no-undef */
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const blogs = require('../utils/blogs_for_testing')
const mostFavBlog = { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 }
describe('favoriteBlog', () => {
  test('when argument is undefined',() => {
    expect(favoriteBlog()).toBe(undefined)
  })

  test('when blog-list array is empty',() => {
    expect(favoriteBlog([])).toBe(null)
  })
  test('when blog-list of multiple blogs',() => {
    expect(favoriteBlog(blogs)).toEqual(mostFavBlog)
  })
})


