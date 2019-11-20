const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    console.log('täälööä');
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 });
  console.log(blogs);
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog.toJSON());
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

// blogsRouter.post('/', async (request, response, next) => {
//   const body = request.body;
//
//   const user = await User.findById(body.userId);
//
//   const blog = new Blog({
//     author: body.author,
//     title: body.title,
//     url: body.url,
//     likes: body.likes,
//     user: user._id
//   });
//
//   try {
//     const savedBlog = await blog.save();
//     user.blogs = user.blogs.concat(savedBlog._id);
//     await user.save();
//     response.json(savedBlog.toJSON());
//   } catch (exception) {
//     next(exception);
//   }
// });


blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      console.log('back/controller/blogs/65');
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.json(savedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  console.log('päästäänkö tänne ikinä frontin kans');

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if(!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    console.log('decoded token', decodedToken);

    const user = await User.findById(decodedToken.id);
    console.log('user', user);

    if(blog.user.toString() === user.id.toString()) {
      try {
        await Blog.findByIdAndRemove(request.params.id);
        console.log('päästäänkö tänne ikinä frontin kans');
        response.status(204).end();
        console.log('back rivi 106');
      } catch (exception) {
        console.log('vai joutuuks tänne');
        next(exception);
      }
    } else {
      return response.status(403).json({ error: 'only blog adder can delete' });
    }
  } catch (exception) {
    next(exception);
  }

});

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  if (typeof(body.likes) === 'number') {
    const blog = { likes: Number(body.likes) };

    try {
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: body.likes });
      response.json(updatedBlog.toJSON());
    } catch (exception) {
      next(exception);
    }
  } else {
    response.status(400).end();
  }

});

module.exports = blogsRouter;