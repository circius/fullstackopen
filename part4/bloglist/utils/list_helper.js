const totalLikes = blogs => blogs.reduce(
  (acc, blog) => acc + blog.likes, 0
)

const favoriteBlog = blogs => 
  blogs.length === 0 ? 
  undefined : 
  blogs.reduce(
    (acc, cur) => cur.likes > acc.likes ? cur : acc
)

module.exports = {
  totalLikes,
  favoriteBlog
}