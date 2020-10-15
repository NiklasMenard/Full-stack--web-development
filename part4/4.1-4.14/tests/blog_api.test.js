const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const BlogHelper = require('../utils/blog_test_helper')

const User = require('../models/user')
const Blog = require('../models/blog')


beforeEach(async () => {

  await User.deleteMany({})
  await api.post('/api/users').send(BlogHelper.initialUsers[0])
  await api.post('/api/users').send(BlogHelper.initialUsers[1])
  const usersInDB = await BlogHelper.usersInDB()
  const blogs = await BlogHelper.initialBlogs.map(blog => blog = { ...blog, user: usersInDB[0].id })
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(BlogHelper.initialBlogs.length)
})

test('a specific blog is within the returned blog', async () => {
  const response = await api.get('/api/blogs')
  const title = response.body.map(r => r.title)
  expect(title).toContain('Test 1')
})

test('identifying field is ID', async () => {
  const response = await api.get('/api/blogs')
  const keys = Object.keys(response.body[0])
  expect(response.body[0].id).toBeDefined()
  expect(keys[5]).toContain('id')
})

test('an user with less than 3 character password or username cannot be created', async () => {
  const user1 = {
    "username": "testuser",
    "name": "testname",
    "password": "a"
  }

  await api
    .post('/api/users')
    .send(user1)
    .expect(400)

  const user2 = {
    "username": "t",
    "name": "testname",
    "password": "password"
  }

  await api
    .post('/api/users')
    .send(user2)
    .expect(400)


})

test('a blog is added correctly with POST request', async () => {

  const usersInDB = await BlogHelper.usersInDB()
  const loginCredentials = {
    username: BlogHelper.initialUsers[0].username,
    password: BlogHelper.initialUsers[0].password
  }

  const login = await api.post('/api/login').send(loginCredentials)
  const token = login.body.token
  const blog =
  {
    title: 'test',
    author: 'testauthor',
    url: 'testurl',
    likes: 1,
    user: usersInDB[0].id
  }

  const response = await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(blog)
  expect(response.status).toBe(201)

  const blogsInEnd = await BlogHelper.blogsInDB()
  expect(blogsInEnd).toHaveLength(BlogHelper.initialBlogs.length + 1)

  const contents = blogsInEnd.map(n => n.title)
  expect(contents).toContain(
    'test'
  )
})

test('blog with undefined likes returns 0 likes', async () => {

  const usersInDB = await BlogHelper.usersInDB()
  const loginCredentials = {
    username: BlogHelper.initialUsers[0].username,
    password: BlogHelper.initialUsers[0].password
  }

  const login = await api.post('/api/login').send(loginCredentials)
  const token = login.body.token
  const blog =
  {
    title: 'test',
    author: 'testauthor',
    url: 'testurl',
    user: usersInDB[0].id
  }

  const response = await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(blog)
  expect(response.status).toBe(201)
  const blogsInEnd = await BlogHelper.blogsInDB()
  expect(blogsInEnd[2].likes).toBe(0)
})

test('blog without title and url is not added, 400 status', async () => {

  const usersInDB = await BlogHelper.usersInDB()
  const loginCredentials = {
    username: BlogHelper.initialUsers[0].username,
    password: BlogHelper.initialUsers[0].password
  }

  const login = await api.post('/api/login').send(loginCredentials)
  const token = login.body.token
  const blog =
  {
    author: 'testauthor',
    user: usersInDB[0].id
  }

  const response = await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(blog)
  expect(response.status).toBe(400)
  const blogsInEnd = await BlogHelper.blogsInDB()
  expect(blogsInEnd).toHaveLength(BlogHelper.initialBlogs.length)

})

describe('Deleting a blog', () => {
test('Deletion succeeds with status code 204 if id is valid and there should be one less blogs', async () => {
  const blogsAtStart = await BlogHelper.blogsInDB()
  const loginCredentials = {
    username: BlogHelper.initialUsers[0].username,
    password: BlogHelper.initialUsers[0].password
  }

  const login = await api.post('/api/login').send(loginCredentials)
  const token = login.body.token
  const response = await api.delete(`/api/blogs/${blogsAtStart[0].id}`).set('Authorization', `bearer ${token}`).send()
  expect(response.status).toBe(204)

  const blogsAtEnd = await BlogHelper.blogsInDB()
  expect(blogsAtEnd).toHaveLength(BlogHelper.initialBlogs.length - 1
  )
})
})

describe('Blog likes can be altered', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await BlogHelper.blogsInDB()
    const blogToModify = blogsAtStart[0]

    const usersInDB = await BlogHelper.usersInDB()
    const loginCredentials = {
      username: BlogHelper.initialUsers[0].username,
      password: BlogHelper.initialUsers[0].password
    }
  
    const login = await api.post('/api/login').send(loginCredentials)
    const token = login.body.token
    const newBlog =
    {
      title: 'test',
      author: 'testauthor',
      url: 'testurl',
      likes: 8,
      user: usersInDB[0].id
    }
  
    const response = await api.put(`/api/blogs/${blogToModify.id}`).set('Authorization', `bearer ${token}`).send(newBlog)
    expect(response.status).toBe(200)
    
    const modifiedBlog = await api.get(`/api/blogs/${blogsAtStart[0].id}`)
    expect(modifiedBlog.body.likes).not.toBe(blogsAtStart[0].likes)
  })
})


test('creation succeeds with a fresh username', async () => {
  const usersAtStart = await BlogHelper.usersInDB()

  const newUser = {
    username: 'User 1',
    name: 'User 2',
    password: 'salainen',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await BlogHelper.usersInDB()
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

  const usernames = usersAtEnd.map(u => u.username)
  expect(usernames).toContain(newUser.username)
})

afterAll(() => {
  mongoose.connection.close()
})