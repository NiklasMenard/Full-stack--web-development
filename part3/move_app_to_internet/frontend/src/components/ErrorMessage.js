import React from 'react'

const ErrorMessage = ({ message }) => {

	if (message === null) {
		return null
	}

	if (message === "addError") {
		return (
			<div className="errorMessage">
				Wrong input or name already in phonebook
			</div>
		)
	}

	return (
		<div className="errorMessage">
			{message} was already removed from the phonebook
		</div>
	)
}

export default ErrorMessage