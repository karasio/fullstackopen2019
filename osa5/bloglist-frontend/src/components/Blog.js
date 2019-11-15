import React from 'react'

const Blog = ({ title, author }) => {
  //console.log('Blog.js blog', blog);
  return (
      <p>
        {title} {author}
      </p>
  )
};



export default Blog