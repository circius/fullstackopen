const blog1 = {
  _id: '5f75fec799dfaa36716c15ca',
  title: 'whatever',
  author: 'whoever',
  url: 'example.com',
  likes: 0,
  __v: 0,
};
const blog2 = {
  _id: '5f76fe485c8ddd651fd91ca7',
  title: 'another',
  author: 'whoever',
  url: 'beispiel.com',
  likes: 3,
  __v: 0,
};
const blog3 = {
  _id: '5f76fe705c8ddd651fd91ca8',
  title: 'last',
  author: 'jerome',
  url: 'example.fr',
  likes: 2,
  __v: 0,
};
const blogs0 = [];
const blogs1 = [blog1];
const blogs2 = [blog1, blog2];
const blogs3 = [blog1, blog2, blog3];

module.exports = {
  blog1, blog2, blog3, blogs0, blogs1, blogs2, blogs3
}