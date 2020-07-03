import React from 'react'

const SingleCountryInfo = ({countries, singleCountry}) => {

	const countryToShow = countries.filter
	(country => country.name.toLowerCase().includes(singleCountry.toLowerCase()))

	return (

		<div>
		<h2>{countryToShow[0].name}</h2>
		<p>
		Capital: {countryToShow[0].capital}
		<br/>
		Population: {countryToShow[0].population}
		</p>
		<h2>Languages</h2>
		{countryToShow[0].languages.map((language, i) =>
			<li key = {i}> {language.name}</li>)}
		<img src = {countryToShow[0].flag} width="100" height="100" alt = "flag"/>
		</div>

		)
}

const RenderCountries = ({countries, newCountrySearch, showSingleCountry, setSingleCountry, singleCountry}) => {

	const countriesToShow = !newCountrySearch
	? countries
	: countries.filter
	(country => country.name.toLowerCase().includes(newCountrySearch.toLowerCase()))

	if(newCountrySearch === ''){
		setSingleCountry('')
		return (
			<div>
			{countriesToShow.map((country, i) => 
				<li key={i}> {country.name}</li>)}
			</div>

		)
	}

	if(countriesToShow.length === 1 ){
		console.log(countriesToShow[0].name)
		return(<SingleCountryInfo countries = {countries} singleCountry = {countriesToShow[0].name}/>)
	}

	else if(singleCountry !== ''){
		return(<SingleCountryInfo countries = {countries} singleCountry = {singleCountry}/>)
	}

	else if(countriesToShow.length > 10 && newCountrySearch){
		return(<p>Too many matches</p>)
	}

	else if(countriesToShow.length < 10){
		return (
			<div>
			{countriesToShow.map((country, i) => 
				<li key={i}> {country.name}
				<button onClick={() => showSingleCountry(country.name)}>Show</button> </li>)}
			</div>
			)

	} else {

		return (
			<div>
			{countriesToShow.map((country, i) => 
				<li key={i}> {country.name}</li>)}
			</div>

			)
	}
}

export default RenderCountries