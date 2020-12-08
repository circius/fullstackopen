import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { blogsLikeOne } from '../reducers/blogsReducer'

import Comments from './Comments'



const BlogInfo = () => {
  const dispatch = useDispatch()
  const blogId = useParams().id
  const blog = useSelector(state => state.blogs.find(blog => blog.id === blogId))

  const doLike = async () => {
    dispatch(blogsLikeOne(blog))
  }

  return !blog ? null : (<div>
    <h2>{blog.title}</h2>
    <ul>
      <li id={`${blog.id}-likes`}>likes: {blog.likes} <button onClick={doLike}>like</button></li>
      <li id={`${blog.id}-url`}>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
      </li>
      <li id={`${blog.id}-url`}>{blog.user.username}</li>
    </ul>
    <Comments blog={blog} />
  </div>)
}

export default BlogInfo