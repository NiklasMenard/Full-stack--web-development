import React from 'react'

const Notification = ({ person }) => {

	if (person === null) {
		return null
	}

	return (
		<div className="notification">
		Added {person}
		</div>
		)
}

export default Notification