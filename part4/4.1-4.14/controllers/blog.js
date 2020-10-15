const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {

  if (!request.body.title) {
    return response.status(400).json({ error: 'title must be specified' })
  }
  if (!request.body.url) {
    return response.status(400).json({ error: 'url must be specified' })
  }
  if (!request.body.likes) {
    request.body.likes = 0
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes ? request.body.likes : 0,
      user: user._id
    })
    const savedBlog = await blog.save()
    savedBlog.populate('user', () => { })
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog.toJSON())
  
})

blogRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(401).json({ error: 'incorrect blog id' })
  }

  if ( blog.user.toString() === user._id.toString() ){
    await Blog.findByIdAndDelete(request.params.id)
    user.blogs = user.blogs.filter(blog => blog._id.toString() !== request.params.id)
    await User.findByIdAndUpdate(user.id, user, { new: true })
    return response.status(204).end()
  }
  response.status(401).json({ error: 'unauthorized operation: trying to delete someone other´s blog?' })
})



blogRouter.put('/:id', async (request, response, next) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true }).populate('user')
  response.status(200).end()
})

module.exports = blogRouter