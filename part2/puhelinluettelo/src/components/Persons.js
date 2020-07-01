import React from 'react'

const Persons = ({persons, showName}) => {

	const namesToShow = !showName
	? persons
	:persons.filter
	(person => person.name.toLowerCase() === showName.toLowerCase())

	return(
		<div>
		{namesToShow.map(person => 
			<li key={person.id}> {person.name} {person.number}</li>
			)}
		</div>
		)

}

export default Persons