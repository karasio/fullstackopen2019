const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper.js');

describe('when there is initially something saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany();

    let blogObject = new Blog(helper.initialBlogs[0]);
    await blogObject.save();

    blogObject = new Blog(helper.initialBlogs[1]);
    await blogObject.save();
  });

  test('blogs returned as json', async () => {
    await api
      .get('/api/blogs/')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(helper.initialBlogs.length);
  });


  test('identifier is id field not _id', async () => {
    const response = await api.get('/api/blogs/');
    //console.log(response.body);
    const ids = response.body.map(r => r.id);
    //console.log(ids);
    ids.map(id => expect(id).toBeDefined());
  });

  describe('adding new blog(s) to database', () => {
    test('blog can be added to db', async () => {
      const newBlog = {
        title: 'A fancy new blog',
        author: 'A very eager writer',
        url: 'www.afancynewblog.com',
        likes: 1000
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const newBlogs = await helper.blogsInDb();
      const originalBlogs = helper.initialBlogs;
      //console.log('newblogs', newBlogs, 'orig', originalBlogs);
      expect(newBlogs.length).toBe(helper.initialBlogs.length + 1);
    });

    test('blog added without likes value gets default value', async () => {
      const newBlog = {
        title: 'Another very fancy new blog',
        author: 'Another very eager writer',
        url: 'www.anotherfancynewblog.com',
      };

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      //console.log('kantaan lisätty tämä ',response.body);
      expect(response.body.likes).toBe(0);
    });

    test('blog without title is not added to db', async () => {
      const originalBlogs = await helper.blogsInDb();

      const blogNoTitle = {
        author: 'Wannabe a real author one day',
        url: 'www.somefineblog.co.uk',
        likes: 2500
      };

      await api
        .post('/api/blogs')
        .send(blogNoTitle)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const newBlogs = await helper.blogsInDb();
      //console.log('newblogs', newBlogs, 'orig', originalBlogs);
      expect(newBlogs).toEqual(originalBlogs);
    });

    test('blog without url is not added to db', async () => {
      const originalBlogs = await helper.blogsInDb();

      const blogNoUrl = {
        title: 'mighty fine blog 4 u',
        author: 'jan mikkelsen',
        likes: 2
      };

      await api
        .post('/api/blogs')
        .send(blogNoUrl)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const newBlogs = await helper.blogsInDb();
      //console.log('newblogs', newBlogs, 'orig', originalBlogs);
      expect(newBlogs).toEqual(originalBlogs);
    });
  });

  describe('delete', () => {
    test('blog can be deleted', async () => {
      const originalBlogs = await helper.blogsInDb();
      //console.log('orig blogs', originalBlogs);
      const blogToBeRemoved = originalBlogs[0];

      await api
        .delete(`/api/blogs/${blogToBeRemoved.id}`)
        .expect(204);

      const newBlogs = await helper.blogsInDb();
      //console.log('newblogs', newBlogs);
      expect(newBlogs.length).toBe(originalBlogs.length-1);

      const titles = newBlogs.map(r => r.title);
      expect(titles).not.toContain(blogToBeRemoved.title);
    });
  });

  describe('modify', () => {
    test('modifying likes on a blog with a number', async () => {
      const originalBlogs = await helper.blogsInDb();
      let blogToModify = originalBlogs[0];
      //console.log('toModify',blogToModify);

      blogToModify.likes = 4444;
      //console.log('likes should be 4444', blogToModify);

      await api
        .put(`/api/blogs/${blogToModify.id}`)
        .send(blogToModify)
        .expect(200);

      const modifiedBlog = await api.get(`/api/blogs/${blogToModify.id}`);
      //console.log(modifiedBlog.body);
      expect(modifiedBlog.body.likes).toBe(4444);
    });

    test('modifying likes on a blog with not a number', async () => {
      const originalBlogs = await helper.blogsInDb();
      let blogToModify = originalBlogs[0];

      const originalLikes = blogToModify.likes;
      blogToModify.likes = 'sköördiföö';

      await api
        .put(`/api/blogs/${blogToModify.id}`)
        .send(blogToModify)
        .expect(400);

      const modifiedBlog = await api.get(`/api/blogs/${blogToModify.id}`);
      //console.log(modifiedBlog.body);
      expect(modifiedBlog.body.likes).toBe(originalLikes);
    });

    test('title can not be changed', async () => {
      const originalBlogs = await helper.blogsInDb();
      let blogToModify = originalBlogs[0];
      const originalTitle = blogToModify.title;

      blogToModify.title = 'THIS SHOULD NOT BE BLOG TITLE';

      await api
        .put(`/api/blogs/${blogToModify.id}`)
        .send(blogToModify);

      const modifiedBlog = await api.get(`/api/blogs/${blogToModify.id}`);
      //console.log('modified', modifiedBlog.body);
      expect(modifiedBlog.body.title).toEqual(originalTitle);
    });
  });
});

describe('user testing', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: 'root', password: 'sekret' });
    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const originalUsers = await helper.usersInDb();

    const newUser = {
      username: 'jannepuu',
      name: 'Janne Puumaa',
      password: 'hottentotti17'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const newUsers = await helper.usersInDb();
    expect(newUsers.length).toBe(originalUsers.length + 1);

    const usernames = newUsers.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with correct statuscode if username exists already', async () => {
    const originalUsers = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'megauser',
      password: 'salasana'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');

    const newUsers = await helper.usersInDb();
    expect(newUsers.length).toBe(originalUsers.length);
  });

  test('creation fails with too short password', async () => {
    const originalUsers = await helper.usersInDb();

    const newUser = {
      username: 'megaman22',
      name: 'megauser',
      password: 'ii'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('password (min. 3 characters) needs to be defined');

    const newUsers = await helper.usersInDb();
    expect(newUsers.length).toBe(originalUsers.length);
  });

  test('creation fails without a username', async () => {
    const originalUsers = await helper.usersInDb();

    const newUser = {
      name: 'megauser',
      password: 'ii3333'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` is required');

    const newUsers = await helper.usersInDb();
    expect(newUsers.length).toBe(originalUsers.length);
  });

  test.only('add blog with user', async () => {
    const originalBlogs = await helper.blogsInDb();
    const users = await helper.usersInDb();
    const someUser = users[0];

    const newBlog = {
      title: 'Perez Hilton - Celebrity news',
      author: 'Perez Hilton',
      url: 'https://perezhilton.com/',
      userId: someUser.id
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const newBlogs = await helper.blogsInDb();
    expect(newBlogs.length).toBe(originalBlogs.length + 1);
  });
});


afterAll(() => {
  mongoose.connection.close();
});