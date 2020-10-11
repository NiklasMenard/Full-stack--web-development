const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialNotes = [
  {title: 'Test 1', author: 'Test Author 1', url: 'Test url 1', likes: 1 }, 
  {title: 'Test 2', author: 'Test Author 2', url: 'Test url 2', likes: 2 }
  ]
   
   beforeEach(async () => {await Blog.deleteMany({})  
   let blogObject = new Blog(initialNotes[0])  
   await blogObject.save()  
   blogObject = new Blog(initialNotes[1])  
   await blogObject.save() })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialNotes.length)})

test('a specific blog is within the returned blog', async () => {
  const response = await api.get('/api/blogs')
  const title = response.body.map(r => r.title)
  expect(title).toContain('Test 1')
})

test('identifying field is ID', async () => {
  const response = await api.get('/api/blogs')
  const keys = Object.keys(response.body[0])
  expect(response.body[0].id).toBeDefined()
  expect(keys[4]).toContain('id')
})

test('a valid post can be added ', async () => {
  const newBlog = {
    title: 'Test 3',
    author: 'Test 3 author',
    url: 'Test url 3',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const title = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialNotes.length + 1)
  expect(title).toContain('Test 1')
})

test('blog with undefined likes returns 0 likes', async () => {

  const newBlog = {
    title: 'Test 3',
    author: 'Test 3 author',
    url: 'Test url 3',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)

  const response = await api.get('/api/blogs')
  expect(response.body[0].likes).toBe(1)
})

test('blog without title and title is not added', async () => {

  const newBlog = {
    author: 'Test 4 author'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialNotes.length)
})


afterAll(() => {
  mongoose.connection.close()
})