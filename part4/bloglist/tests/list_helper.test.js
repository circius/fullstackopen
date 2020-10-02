const listHelper = require('../utils/list_helper');

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

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes(blogs0)).toBe(0);
  });
  test('of bloglist of 1 is the likes of the solitary member', () => expect(listHelper.totalLikes(blogs1)).toBe(0));
  test('varies depending on likes of blogs', () => {
    expect(listHelper.totalLikes(blogs2)).toBe(3);
    expect(listHelper.totalLikes(blogs3)).toBe(5);
  });
});

describe('favorite blog', () => {
  test('of empty bloglist is undefined', () => expect(listHelper.favoriteBlog(blogs0)).toBe(undefined));
  test('of bloglist of 1 is the solitary member', () => expect(listHelper.favoriteBlog(blogs1)).toEqual(blog1));
  test('of longer bloglist is the most liked', () => expect(listHelper.favoriteBlog(blogs3)).toEqual(blog2));
});

describe('most blogs', () => {
  test('of empty bloglist is undefined', () => expect(listHelper.mostBlogs(blogs0)).toBe(undefined));
  test('of bloglist of 1 is the solitary member', () => expect(listHelper.mostBlogs(blogs1)).toEqual(
    {
      author: 'whoever',
      blogs: 1,
    },
  ));
  test('of longer bloglist is most prolific author', () => expect(listHelper.mostBlogs(blogs3)).toEqual(
    {
      author: 'whoever',
      blogs: 2,
    },
  ));
});

describe('most likes', () => {
  test('of empty bloglist is undefined', () => expect(listHelper.mostLikes(blogs0)).toBe(undefined));
  test('of bloglist of 1 is the solitary member', () => expect(listHelper.mostLikes(blogs1)).toEqual(
    {
      author: 'whoever',
      likes: 0,
    },
  ));
  test('of longer bloglist is most liked author', () => expect(listHelper.mostLikes(blogs3)).toEqual(
    {
      author: 'whoever',
      likes: 3,
    },
  ));
});
