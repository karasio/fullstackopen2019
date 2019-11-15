import React, { useState, useEffect } from 'react';
//import logo from './logo.svg';
import './app.css';
import Blog from './components/Blog';
import loginService from './services/login';
import blogService from './services/blogs';
import CreateForm from './components/CreateForm';
import Notification from './components/Notification';

const App = () => {
  const [notification, setNotification] = useState({msg: null, sort: null});
  const [blogs, setBlogs] = useState([]);
  //const [newBlog, setNewBlog] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs));
  }, []);

  useEffect(() => {
    const loggerUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if(loggerUserJSON) {
      const user = JSON.parse(loggerUserJSON);
      //console.log('useEffectissä user', user);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem(
          'loggedBloglistUser', JSON.stringify(user)
      )
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setNotification({msg: 'wrong credentials', sort: 'error'});
      setTimeout(() => {
        setNotification({msg: null, sort: null});
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
      user: user
    };

    blogService
        .create(blogObject)
        .then(data => {
          setBlogs(blogs.concat(data));
          setTitle('');
          setAuthor('');
          setUrl('');
          setNotification({ msg: `${title} by ${author} added`, sort: 'info' });
          setTimeout(() => {
            setNotification({msg: null, sort: null})
          }, 5000);
    })
  };

  const rows = () => blogs.map(blog => {
        //console.log('rowsin blog', blog);
        return (
          <Blog
              key={blog.id}
              title={blog.title}
              author={blog.author}
          />
        )
  });

  const loginForm = () => (
      <div>
        <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
                type='text'
                value={username}
                name={'Username'}
                onChange={({ target }) => setUsername(target.value)}
                />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
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
      {user === null ? loginForm() : blogView()}
    </>
  );
};



export default App;


