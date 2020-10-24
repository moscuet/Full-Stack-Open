const listHelper = require('../utils/list_helper')
const blogs = require('../utils/blogs_for_testing')
describe('total likes', () => {
   // test for empty blog list
   let emptyBlog =[]
   test('when list has noe blog, equals the likes to zero', () => {
    const result = listHelper.totalLikes(emptyBlog)
    expect(result).toBe(0)
   })

    //test for single blog 
    let listWithOneBlog = [blogs[0]]
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(7)
    })

    test('of a bigger list calculated right', () => {
      const result = listHelper.totalLikes(blogs)
      expect(result).toBe(36)
    })

  })
  
  // single function all test (run from root): npm test -- -t 'total likes'
   // single function single test (run from root): npm test -- -t 'when list has noe blog, equals the likes to zero'
