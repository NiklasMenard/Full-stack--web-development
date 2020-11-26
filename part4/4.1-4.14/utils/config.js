require('dotenv').config('/env')

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'prod') { MONGODB_URI = process.env.TEST_MONGODB_URI }

module.exports = {
  MONGODB_URI,
  PORT
}