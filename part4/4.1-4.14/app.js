const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const logger = require('./utils/logger')

// logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true})
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

module.exports = app