/* eslint-disable no-undef */

const mostLikes = require('../utils/list_helper').mostLikes
const blogs = require('../utils/blogs_for_testing')

describe('Most liked blog', () => {
  test('when argument is undefined',() => {
    expect(mostLikes()).toBe(undefined)
  })

  test('when blog-list array is empty',() => {
    expect(mostLikes([])).toBe(null)
  })
  test('when blog-list of multiple blogs',() => {
    expect(mostLikes(blogs)).toEqual({
      author: blogs[2].author,
      likes:blogs[2].likes
    })
  })
})
