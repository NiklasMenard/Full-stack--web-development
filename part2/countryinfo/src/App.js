import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import RenderCountries from './components/RenderCountries'

import axios from 'axios'

const App = () => {

  const [ countries, setCountries] = useState([])
  const [ newCountrySearch, setCountrySearch ] = useState('')

  const hook = () => {
    console.log('effect')
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  } 
  useEffect(hook, [])

  const handleCountrySearch = (event) => {
    setCountrySearch(event.target.value)
  }


  return (

    <div>
    <Filter 
    newCountrySearch = {newCountrySearch}
    handleCountrySearch = {handleCountrySearch}
    />

    <RenderCountries
    countries = {countries}
    newCountrySearch = {newCountrySearch}
    />
    </div>
    )
}

export default App


/*{    {countries.map((country, i) => 
      <li key={i}> {country.name}</li>
      )}
    </div>}*/