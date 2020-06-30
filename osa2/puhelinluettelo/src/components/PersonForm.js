import React from 'react'


const PersonForm = ({persons, setPersons, setNewName, setNewNumber,
 newName, handleNameChange, newNumber, handleNumberChange}) => {

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
		<form onSubmit={AddName}>
		<div> name: <input value={newName} onChange={handleNameChange}/> </div>
		<div> number: <input value={newNumber} onChange={handleNumberChange}/> </div>
		<div> <button type="submit">add</button> </div>
		</form>
		)
}

export default PersonForm