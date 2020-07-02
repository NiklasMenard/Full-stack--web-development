import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import axios from 'axios'

const App = () => {

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showName, setShowName ] = useState('')

  const hook = () => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  } 
  useEffect(hook, [])

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