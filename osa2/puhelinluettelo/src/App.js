import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [ persons, setPersons] = useState([

    { id: 1, name: 'Arto Hellas', number: '040040040'},
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }

    ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showName, setShowName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleShowName = (event) => {
    setShowName(event.target.value)
  }

  const AddName = (event) => {

    if (persons.some(e => e.name === newName)) {
      window.alert(`${newName} is already in the phonebook`)
    }

    else {

      event.preventDefault()
      const nameObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }
  return (

  <div>
    <h2>Phonebook</h2>
    <Filter showName={showName} handleShowName={handleShowName} />
    <div>
      <h2>Add a new contact</h2>
      <PersonForm
      AddName = {AddName}
      persons = {persons}
      setPersons = {setPersons}
      setNewName = {setNewName}
      setNewNumber = {setNewNumber}
      newName= {newName} 
      handleNameChange = {handleNameChange}
      newNumber = {newNumber}
      handleNumberChange = {handleNumberChange}
      />
    </div>
    <h3>Numbers</h3>
    <Persons persons = {persons} showName = {showName}
    />
  </div>

    )
}

export default App