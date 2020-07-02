import React from 'react'

const Filter = (props) => {

	const {newCountrySearch, handleCountrySearch} = props

	return (
		<form>
		<div> Find countries: <input value={newCountrySearch} onChange={handleCountrySearch}/> </div>
		</form>
		)
}

export default Filter