import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'


const App = () => {

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showName, setShowName ] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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

    if (persons.some(e => e.name.toLowerCase() === newName.toLowerCase() && 
    	e.number===newNumber)) {
    	window.alert(`${newName} is already in the phonebook`)
    }

    else if (persons.some(e => e.name.toLowerCase() === newName.toLowerCase() && 
    	e.number!==newNumber)) {
    	const result = window.confirm(`${newName} is already in the phonebook, 
    	want to change the number?`)

    	if(result){

    	const changePerson =  persons.find(person => 
    	person.name.toLowerCase() === newName.toLowerCase())
    	const changedNumber = {...changePerson, number: newNumber}
    	    	personService
    	    	.update(changePerson.id, changedNumber)
    	    	.then(response => {
    	    	setPersons(persons.map(person => person.id !== changePerson.id ? person : response.data))
				})
      		} 
    	}
    else {
    	event.preventDefault()
    	const nameObject = {
        name: newName,
        number: newNumber
      }
     	personService
	    .create(nameObject)
	    .then(returnedPerson => {
	    setPersons(persons.concat(returnedPerson))
	    setNewName('')
	    setNewNumber('')})
  		}
    }

const RemoveContact = (name, id) => {
	const message =  `Do you want to delete '${name}'?`
	const result = window.confirm(message)
	if(result){
      personService
      .remove(id)
      	.then(removeMessage => {
      		window.alert(removeMessage)
      		setPersons(persons.filter(person => person.id !== id))
      	})
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
    	<Persons persons = {persons} showName = {showName} RemoveContact = {RemoveContact}/>
    </div>

    )
  }

  export default App