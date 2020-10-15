const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Test 1', 
        author:'Test Author 1',
        url: 'Test url 1',
        likes: 1
    },
    {
        title: 'Test 2',
        author: 'Test Author 2',
        url: 'Test url 2',
        likes: 2
    }
]

const initialUsers = [
    {
        username: "testUser1",
        name: "testName1",
        password: "test1"
    },
    {
        username: "testUser2",
        name: "testName2",
        password: "test2"
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}


module.exports = {
    initialBlogs,
    initialUsers,
    blogsInDB,
    usersInDB
}