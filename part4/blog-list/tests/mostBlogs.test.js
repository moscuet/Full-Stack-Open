const mostBlogs = require('../utils/list_helper').mostBlogs
const blogs = require('../utils/blogs_for_testing')
const mostLikedBlog = {
    author: blogs[2].author,
    likes:blogs[2].likes
}

describe('mostBlogs', ()=> {
    test('when argument is undefined',()=>{
        expect(mostBlogs()).toBe(undefined)
    })

    test('when blog-list array is empty',()=>{
        expect(mostBlogs([])).toBe(null)
    })
    test('when blog-list of multiple blogs',()=>{
        expect(mostBlogs(blogs)).toEqual(
            {
            author: "Robert C. Martin",
            blogs: 3
          })
    })
})






// npm test -- -t mostBlogs