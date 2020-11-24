const blogs = require('../utils/blogs_for_testing')
const _ = require('lodash')

// assinment 4.7
const mostLikes = blogs => {
  if(blogs===undefined) return undefined
  if(blogs.length===0) return null

  const mostLikedBlog =  _.maxBy(blogs, 'likes')
  return {
    author: mostLikedBlog.author,
    likes:mostLikedBlog.likes
  }
}

// assignment 4.6
const mostBlogs = blogs => {
  if(blogs===undefined) return undefined
  if(blogs.length===0) return null

  let authorByBlogCount =  _.countBy(blogs,'author')
  let maxCount = _.max(Object.values(authorByBlogCount))
  //const res = _.filter(authorByBlogCount, (value, ) => value===maxCount )
  let result ={}
  Object.entries(authorByBlogCount).forEach(([k,v]) => {
    if (v===maxCount) result ={ author:k,blogs:v }
  })
  return result

}
mostBlogs(blogs)


//4.5
const favoriteBlog = blogs => {
  if(blogs===undefined) return undefined
  if(blogs.length===0) return null
  const mostLikedBlog = blogs.reduce((a,b) => {
    return b.likes>a.likes?b:a
  })
  return mostLikedBlog
}

// 4.4
// eslint-disable-next-line no-unused-vars
const dummy = (_blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce( (sum, blog) => {
    return sum = sum+ blog.likes
  },0)
  return totalLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs
}

//node utils/list_helper.js
