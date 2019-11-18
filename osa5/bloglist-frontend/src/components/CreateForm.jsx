import React from 'react'

const createForm = ({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  addBlog
}) => {
  return (
      <form onSubmit={addBlog}>
        <div className='createNew'>
          title:
          <input
              type='text'
              value={title}
              name='title'
              onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className='createNew'>
          author:
          <input
              type='text'
              value={author}
              name='author'
              onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className='createNew'>
          url:
          <input
              type='text'
              value={url}
              name='url'
              onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
  )
};

export default createForm;

