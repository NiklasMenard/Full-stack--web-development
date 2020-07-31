import React from 'react'

const Filter = ({showName, handleShowName}) => {
	return (
		<form>
		<div> Filter by name: <input value={showName} onChange={handleShowName}/> </div>
		</form>
		)
}

export default Filter