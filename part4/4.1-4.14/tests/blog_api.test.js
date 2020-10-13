const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const BlogHelper = require('../utils/test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

const initialBlogs = [
  { title: 'Test 1', author: 'Test Author 1', url: 'Test url 1', likes: 1 },
  { title: 'Test 2', author: 'Test Author 2', url: 'Test url 2', likes: 2 }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
  })


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
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
  expect(keys[4]).toContain('id')
})

// test('a valid post can be added ', async () => {
//   const newBlog = {
//     title: 'Test 3',
//     author: 'Test 3 author',
//     url: 'Test url 3',
//     likes: 3
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   const response = await api.get('/api/blogs')
//   const title = response.body.map(r => r.title)

//   expect(response.body).toHaveLength(initialBlogs.length + 1)
//   expect(title).toContain('Test 1')
// })

// test('blog with undefined likes returns 0 likes', async () => {

//   const newBlog = {
//     title: 'Test 3',
//     author: 'Test 3 author',
//     url: 'Test url 3',
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(200)

//   const response = await api.get('/api/blogs')
//   expect(response.body[0].likes).toBe(1)
// })

test('blog without title and url is not added, 400 status', async () => {

  const newBlog = {
    author: 'Test 4 author'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await BlogHelper.blogsInDB()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await BlogHelper.blogsInDB()

    expect(blogsAtEnd).toHaveLength(
      initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.content)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('blog likes can be altered', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await BlogHelper.blogsInDB()
    const blogToModify = blogsAtStart[0]

    const newBlog = {
      title: 'Test 3',
      author: 'Test 3 author',
      url: 'Test url 3',
      likes: 5
    }

    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(newBlog)
      .expect(200)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
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
})

afterAll(() => {
  mongoose.connection.close()
})