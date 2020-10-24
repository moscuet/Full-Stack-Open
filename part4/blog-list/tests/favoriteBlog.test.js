const favoriteBlog = require('../utils/list_helper').favoriteBlog
const blogs = require('../utils/blogs_for_testing')

describe('favoriteBlog', ()=> {
    test('when argument is undefined',()=>{
        expect(favoriteBlog()).toBe(undefined)
    })

    test('when blog-list array is empty',()=>{
        expect(favoriteBlog([])).toBe(null)
    })
    test('when blog-list of multiple blogs',()=>{
        expect(favoriteBlog(blogs)).toEqual(blogs[2])
    })
})



// single test run from root: npm test -- -t favoriteBlog

