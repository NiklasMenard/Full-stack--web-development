const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    console.log(blog)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

blogRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })

  module.exports = blogRouter