import React, { useState, useEffect } from 'react';
import axios from 'axios';
export const CountryInfo = ({ country }) => {

  const [weather, setWeather] = useState({});

  const capital = country.capital;
  const opencagedataAPIKey = process.env.REACT_APP_OPENCAGE_API_KEY;
  const latlongRequest = (str) => `https://api.opencagedata.com/geocode/v1/json?q=${str}&key=${opencagedataAPIKey}`;
  const weatherRequest = (lat, long) => `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${long}`;

  useEffect(() => {
    axios
      .get(latlongRequest(capital))
      .then(response => {
        const { lat, lng } = response.data.results.pop().geometry;
        axios
          .get(weatherRequest(lat, lng)).then(
            response => {
              const weatherNow = response.data.properties.timeseries[0].data.instant.details;
              setWeather(weatherNow);
            }
          );
      }
      );
  });

  return (
    <div>
      <h1>{country.name}</h1>
      <InfoBit label="capital" value={country.capital} />
      <InfoBit label="population" value={country.population} />
      <h3> languages spoken</h3>
      <ul>
        {country.languages.map(
          language => <li key={language.name}> {language.name}</li>
        )}
      </ul>
      <img src={country.flag} alt="country's flag" />
      <h1>weather in {country.capital}</h1>
      <Weather weather={weather} />
    </div>
  );
};
const Weather = ({ weather }) => (
  <div>
    {Object.keys(weather).map(
      (key) => <InfoBit key={key} label={key} value={weather[key]} />)}
  </div>
);
const InfoBit = ({ label, value }) => <p>{label}: {value}</p>;
