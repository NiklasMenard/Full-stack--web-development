import React from 'react'

const RenderCountries = ({countries, newCountrySearch}) => {

	const countriesToShow = !newCountrySearch
	? countries
	: countries.filter
	(country => country.name.toLowerCase().includes(newCountrySearch.toLowerCase()))

	if(countriesToShow.length > 10 && newCountrySearch){
		return(<p>Too many matches</p>)
	}

	if(countriesToShow.length === 1){

		return(

			<div>
			<h2>{countriesToShow[0].name}</h2>
			<p>
			Capital: {countriesToShow[0].capital}
			<br/>
			Population: {countriesToShow[0].population}
			</p>
			<h2>Languages</h2>
			{countriesToShow[0].languages.map((language, i) =>
			<li key = {i}> {language.name}</li>)}
			<img src = {countriesToShow[0].flag} width="100" height="100" alt = "flag"/>
			</div>
		)
	}

	return (
		<div>
		{countriesToShow.map((country, i) => 
		<li key={i}> {country.name}</li>)}
		</div>

	)
}

export default RenderCountries