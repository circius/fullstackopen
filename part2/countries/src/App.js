import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { CountryInfo } from './CountryInfo';

function App() {
  const [ countries, setCountries ] = useState([])
  const [ countryFilter, setCountryFilter ] = useState("")

  const updateCountryFilter = (event) => {
    setCountryFilter(event.target.value)
  }

  const allCountriesEndpoint = "https://restcountries.eu/rest/v2/all"

  const filterCountries = (str) => countries.filter((country) => {
    const regexp = new RegExp(".*" + str + ".*", "i")
    return country.name.match(regexp) !== null
  })

  const filteredCountries = filterCountries(countryFilter)

  useEffect(() => {
    axios
      .get(allCountriesEndpoint)
      .then(response => setCountries(response.data)
      )}, [])

  return (
    <div className="App">
      <ControlledField 
        label="find countries"
        value={countryFilter}
        changeHandler={(updateCountryFilter)}/>
      <Countries 
        filteredCountries={filteredCountries} 
        countrySelectClickHandler={updateCountryFilter}/>
    </div>
  );
}

const Countries = ({filteredCountries, countrySelectClickHandler}) => {
  const listLength = filteredCountries.length
  if (listLength === 0) {
    return "no matching country found"
  } else if (listLength > 10) {
    return "too many matches, specify another filter"
  } else if (listLength === 1) {
    return <CountryInfo country={filteredCountries[0]} />
  } else {
    return <CountryList 
              countries={filteredCountries}
              countrySelectClickHandler={countrySelectClickHandler} />
  }
}

const CountryList = ({countries, countrySelectClickHandler}) => (
  countries.map((country) => (
    <p key={country.name}>
      {country.name} 
      <CountrySelectButton country={country} clickHandler={countrySelectClickHandler}/>
    </p>
  ))
)

const CountrySelectButton = ({country, clickHandler}) => (
  <button onClick={clickHandler} value={country.name}>show</button>
)

const ControlledField = ({ label, value, changeHandler }) => (
  <div>
    {label} <input value={value} onChange={changeHandler} />
  </div>
);


export default App;
