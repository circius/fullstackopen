const blog1 = {
  title: 'whatever',
  author: undefined,
  url: 'example.com',
  likes: 0,
}
const blog2 = {
  title: 'another',
  author: undefined,
  url: 'beispiel.com',
  likes: 3,
}
const blog3 = {
  title: 'last',
  author: undefined,
  url: 'example.fr',
  likes: 2,
}
const blogs0 = []
const blogs1 = [blog1]
const blogs2 = [blog1, blog2]
const blogs3 = [blog1, blog2, blog3]

module.exports = {
  blog1, blog2, blog3, blogs0, blogs1, blogs2, blogs3
}