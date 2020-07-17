import React from 'react'

const ErrorMessage = ({ message }) => {

	if (message === null) {
		return null
	}

	return (
		<div className="errorMessage">
		{message} was already removed from the phonebook
		</div>
		)
}

export default ErrorMessage