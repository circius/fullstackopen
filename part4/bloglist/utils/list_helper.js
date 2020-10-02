const totalLikes = blogs => blogs.reduce(
  (acc, blog) => acc + blog.likes, 0
)

const favoriteBlog = blogs =>
  blogs.length === 0 ?
    undefined :
    blogs.reduce(
      (acc, cur) => cur.likes > acc.likes ? cur : acc
    )

const mostBlogs = blogs => {
  const blogCountAcc = (blogs, acc) => {
    if (blogs.length === 0) {
      return acc
    } else {
      const blog = blogs[0]
      const author = blog.author
      const newAcc = {
        ...acc,
        [author]: acc[author] === undefined ? 1 : acc[author] + 1
      }
      return blogCountAcc(blogs.slice(1), newAcc)
    }
  }
  const getMostBlogs = countObj => {
    const authors = Object.keys(countObj)
    if (authors.length === 0) {
      return undefined
    } else {
      const mostProlific = authors.reduce(
        (acc, cur) => countObj.cur > countObj.acc ? cur : acc
      )
      return {
        author: mostProlific,
        blogs: countObj[mostProlific]
      }
    }}
  return getMostBlogs(blogCountAcc(blogs, {}))
}

const mostLikes = blogs => {
  const likesCountAcc = (blogs, acc) => {
    if (blogs.length === 0) {
      return acc
    } else {
      const blog = blogs[0]
      const { author, likes } = blog
      const newAcc = {
        ...acc,
        [author]: acc[author] === undefined ? likes : acc[author] + likes
      }
      return likesCountAcc(blogs.slice(1), newAcc)
    }
  }
  const getMostLiked = countObj => {
    const authors = Object.keys(countObj)
    if (authors.length === 0) {
      return undefined
    } else {
      const mostLiked = authors.reduce(
        (acc, cur) => countObj.cur > countObj.acc ? cur: acc
      )
      return {
        author: mostLiked,
        likes: countObj[mostLiked]
      }
    }
  }
  return getMostLiked(likesCountAcc(blogs, {}))
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}