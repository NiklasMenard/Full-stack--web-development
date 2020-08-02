import React from 'react'

const Persons = ({persons, showName, RemoveContact}) => {

	const namesToShow = !showName
	? persons
	:persons.filter
	(person => person.name.toLowerCase().includes(showName.toLowerCase()))

	return(
		<div>
		{namesToShow.map(person => 
			<li key={person.id}> {person.name} {person.number}
			&nbsp;
			<button onClick={() => RemoveContact(person.name, person.id)}>Delete</button></li>)}
		</div>
		)
}

export default Persons