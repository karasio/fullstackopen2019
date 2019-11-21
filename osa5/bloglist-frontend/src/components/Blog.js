import React, { useState } from 'react';

const Blog = ({ id, title, author, url, likes, blogUser, removeBlog, likeBlog, user }) => {

  const [detailsVisible, setDetailsVisible] = useState(false);
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' };
  const showWhenVisible = { display: detailsVisible ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'dotted',
    radius: 2,
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='blogListItem'>
        <p onClick={() => setDetailsVisible(true)}>
          {title} {author}
        </p>
      </div>
      <div style={showWhenVisible} className='extraInfo'>
        <div onClick={() => setDetailsVisible(false)}>
          <p>{title} {author}</p>
          <p>{url}</p>
          <p>{likes} likes
            <button onClick={() => likeBlog(id)}>like</button></p>
          { blogUser.name !== undefined ? <p>added by {blogUser.name}</p> : <p>no idea who added this</p> }
        </div>
        { blogUser.username === user.username ? <button onClick={() => removeBlog(id)}>remove</button> : <></> }
      </div>
    </div>
  );
};

export default Blog;