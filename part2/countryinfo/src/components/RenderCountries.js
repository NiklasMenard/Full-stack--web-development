import React from 'react'

const SingleCountryInfo = ({countryToShow}) => {

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

const RenderCountries = (props) => {

	const {countriesToShow, newCountrySearch, countryClicked, singleCountry} = props

	if(newCountrySearch === ''){
		return (
			<div>
			{countriesToShow.map((country, i) => 
				<li key={i}> {country.name}</li>)}
			</div>
		)
	}

	if(countriesToShow.length === 1 ){
		console.log(singleCountry)
		return(<SingleCountryInfo countryToShow = {countriesToShow}/>)
	}

	else if(singleCountry !== ''){

		const countryClicked = countriesToShow.filter
  		(country => country.name.toLowerCase().includes(singleCountry.toLowerCase()))

		return(<SingleCountryInfo countryToShow = {countryClicked}/>)
	}

	else if(countriesToShow.length > 10 && newCountrySearch){
		return(<p>Too many matches</p>)
	}

	else if(countriesToShow.length < 10){
		return (
			<div>
			{countriesToShow.map((country, i) => 
				<li key={i}> {country.name}
				<button onClick={() => countryClicked(country.name)}>Show</button> </li>)}
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