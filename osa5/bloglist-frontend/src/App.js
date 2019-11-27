import React, { useState, useEffect } from 'react';
import './app.css';
import Blog from './components/Blog';
import loginService from './services/login';
import blogService from './services/blogs';
import CreateForm from './components/CreateForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { useField } from './hooks';

const App = () => {
  const [notification, setNotification] = useState({ msg: null, sort: null });
  const [blogs, setBlogs] = useState([]);
  const username = useField('text');
  const password = useField('password');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const blogFormRef = React.createRef();

  useEffect(() => {
    console.log('user muuttui', user);
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
    blogService
      .getAll()
      .then(initialBlogs => sortAndSetBlogs(initialBlogs));
  }, []);

  const sortAndSetBlogs = (preSortBlogs) => {
    preSortBlogs.sort((a, b) => (b.likes - a.likes));
    setBlogs(preSortBlogs);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username: username.object.value, password: password.object.value });
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      );
      setUser(user);
      blogService.setToken(user.token);
      username.reset();
      password.reset();

    } catch (exception) {
      console.log(exception);
      setNotification({ msg: 'wrong credentials', sort: 'error' });
      setTimeout(() => {
        setNotification({ msg: null, sort: null });
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
    username.reset();
    password.reset();
  };

  const addBlog = (event) => {
    event.preventDefault();

    console.log('addBlog user = ', user);
    const blogObject = {
      title: title,
      author: author,
      url: url,
      user: user
    };

    blogService
      .create(blogObject)
      .then(() => {
        blogService
          .getAll()
          .then(freshBlogs => sortAndSetBlogs(freshBlogs));
        setTitle('');
        setAuthor('');
        setUrl('');
        setNotification({ msg: `${title} by ${author} added`, sort: 'info' });
        setTimeout(() => {
          setNotification({ msg: null, sort: null });
        }, 5000);
      });
  };


  // 5.9* BLOGIN POISTAMINEN
  const removeBlog = (id) => {
    const blogToRemove = blogs.find(b => b.id === id);
    const sureToDelete = window.confirm(`Delete ${blogToRemove.title}?`);

    if(sureToDelete) {
      blogService
        .remove(id)
        .then(() => {
          setNotification({ msg: `${blogToRemove.title} by ${author} was removed`, sort: 'info' });
          setTimeout(() => {
            setNotification({ msg: null, sort: null });
          }, 5000);
          blogService
            .getAll()
            .then(freshBlogs => sortAndSetBlogs(freshBlogs));
        })
        .catch(error => {
          console.log('Virhe removessa', error.response.data.error);
          setNotification({ msg: error.response.data.error, sort: 'error' });
          setTimeout(() => {
            setNotification({ msg: null, sort: null });
          }, 5000);
        });
    }
  };

  // 5.7* tykkäykset toimii
  const likeBlog = (id) => {
    console.log('likeBlogissa', id);
    const blogLiked = blogs.find(b => b.id === id);
    console.log('this blog was liked', blogLiked);
    if (!blogLiked.likes) {
      blogLiked.likes = 1;
    } else {
      blogLiked.likes += 1;
    }
    console.log('this blog was liked now with added likes', blogLiked);

    blogService
      .update(id, blogLiked)
      .then(response => {
        blogService
          .getAll()
          .then(freshBlogs => sortAndSetBlogs(freshBlogs));
        setNotification({ msg: `${response.title} was liked!`, sort: 'info' });
        setTimeout(() => {
          setNotification({ msg: null, sort: null });
        }, 5000);
      });

  };

  const rows = () =>
    blogs.map(blog => {
    //console.log('rowsin tööt');
      return (
        <Blog
          key={blog.id}
          blog={blog}
          id={blog.id}
          title={blog.title}
          author={blog.author}
          url = {blog.url}
          likes = {blog.likes}
          blogUser = {blog.user}
          removeBlog = {removeBlog}
          likeBlog = {likeBlog}
          user = {user}
        />
      );
    });

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
            username
          <input {...username.object}/>
        </div>
        <div>
            password
          <input {...password.object}/>
        </div>
        <button type='submit'>login</button>
      </form>
      <Notification message={notification} />
    </div>
  );

  const blogView = () => (
    <div>
      <div>
        <h1>blogs</h1>
        <Notification message={notification} />
      </div>
      <div>
        {user.name} is logged in { user !== null && logoutButton() }
      </div>
      <div>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <h1>create new</h1>
          <CreateForm
            title = {title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            addBlog={addBlog}
          />
        </Togglable>
      </div>
      <div>
        {rows()}
      </div>
    </div>
  );

  const logoutButton = () => (
      <>
        <button onClick={handleLogout}>Logout</button>
      </>
  );

  return (
      <>
        {/*<button onClick={() => console.log('user on ', user)}>KUKA KÄYTTÄÄ</button>*/}
        {/*<button onClick={() => console.log('blogsissa', blogs)}>LOGGAA BLOGI</button>*/}
        {user === null ? loginForm() : blogView()}
      </>
  );
};



export default App;