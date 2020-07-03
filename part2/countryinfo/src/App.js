import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import RenderCountries from './components/RenderCountries'

import axios from 'axios'

const App = () => {

  const [ countries, setCountries] = useState([])
  const [ newCountrySearch, setCountrySearch ] = useState('')
  const [ singleCountry, setSingleCountry ] = useState('')

  const hook = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  } 
  useEffect(hook, [])

  const handleCountrySearch = (event) => {
    setCountrySearch(event.target.value)
  }

  const showSingleCountry = (event) => {
  setSingleCountry(event)
  }

  return(

    <div>
    <Filter 
    newCountrySearch = {newCountrySearch}
    handleCountrySearch = {handleCountrySearch}
    />

    <RenderCountries
    countries = {countries}
    newCountrySearch = {newCountrySearch}
    showSingleCountry = {showSingleCountry}
    setSingleCountry = {setSingleCountry}
    singleCountry = {singleCountry}
    />
    </div>

    )
}

export default App
