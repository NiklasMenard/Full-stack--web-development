import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import RenderCountries from './components/RenderCountries'

import axios from 'axios'

const App = () => {

  const [ countries, setCountries] = useState([])
  const [ newCountrySearch, setCountrySearch ] = useState('')
  const [ singleCountry, setSingleCountry ] = useState('')

  const countryhook = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  } 
  useEffect(countryhook, [])

  const handleCountrySearch = (event) => {
    if(newCountrySearch === '' ){
      setSingleCountry('')
    }
    setCountrySearch(event.target.value)
  }

  const countryClicked = (countryClicked) => {
  setSingleCountry(countryClicked)
  }

  const countriesToShow = !newCountrySearch
  ? countries
  : countries.filter
  (country => country.name.toLowerCase().includes(newCountrySearch.toLowerCase()))

  return(

    <div>
      <Filter 
      newCountrySearch = {newCountrySearch}
      handleCountrySearch = {handleCountrySearch}
      />

      <RenderCountries
      countriesToShow = {countriesToShow}
      newCountrySearch = {newCountrySearch}
      countryClicked = {countryClicked}
      singleCountry = {singleCountry}
      />
    </div>

    )
}

export default App
