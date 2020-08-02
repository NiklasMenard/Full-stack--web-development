const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url =
  `mongodb+srv://nmenard:${password}@cluster0.emsi9.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length > 3) {
  const pName = process.argv[3]
  const pNumber = process.argv[4]

  const person = new Person({
    name: pName,
    number: pNumber,
  })

  person.save().then(result => {
    console.log(`added ${pName} number ${pNumber} to phonebook`)
    mongoose.connection.close()
  })
}

