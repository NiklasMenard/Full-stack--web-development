import React, { useState, useEffect } from 'react'

import axios from 'axios'


const SingleCountryInfo = ({countryToShow}) => {

	const api_key = process.env.REACT_APP_API_KEY
	const [ weather, setWeather]  = useState([])

	const weatherhook = () => {
		axios
		.get('http://api.weatherstack.com/current', {
			params: {
			access_key : api_key,
			query : countryToShow[0].name
			}})
		.then(response => {
			setWeather(response.data)})} 
			useEffect(weatherhook, [])

	if(weather.current){
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
		<h2>Weather in {countryToShow[0].capital}</h2>
			<p>
			Temperature: {weather.current.temperature}
			<br/>
			<img src = {weather.current.weather_icons[0]} width="100" height="100" alt = "flag"/>
			<br/>
			Wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}
			</p>
		</div>
		)
	}
	return (null)
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

	else if(countriesToShow.length > 10 && newCountrySearch){
		return(<p>Too many matches</p>)
	}

	else if(countriesToShow.length === 1 ){
		return(<SingleCountryInfo countryToShow = {countriesToShow}/>)
	}

	else if(singleCountry !== ''){

		const countryClicked = countriesToShow.filter
		(country => country.name.toLowerCase().includes(singleCountry.toLowerCase()))

		return(<SingleCountryInfo countryToShow = {countryClicked}/>)
	}

	else if(countriesToShow.length < 10){
		return (
			<div>
			{countriesToShow.map((country, i) => 
				<li key={i}> {country.name}
				<button onClick={() => countryClicked(country.name)}>Show</button> </li>)}
			</div>
		)
	}
}

export default RenderCountries