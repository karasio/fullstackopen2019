import React, {useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => setCountries(response.data))
  }, []);

  const handleFilterValue = (event) => {
    setFilterValue(event.target.value);
  };

  return (
      <div>
        <form>
          find countries <input
            value={filterValue}
            onChange={handleFilterValue}
          />
        </form>
        <div>
          <Countries countries={countries} filterValue={filterValue} setFilterValue={setFilterValue}/>
        </div>
      </div>
  )
}

const Countries = ({ countries, filterValue, setFilterValue }) => {
  const [weather, setWeather] = useState('');
  const filterValueToLowerCase = filterValue.toLowerCase();
  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filterValueToLowerCase));

  const small = {
    height: '100px'
  };

  if(countriesToShow.length > 10) {
    return (
        <div>
          Too many matches, please specify search criteria!
        </div>
    )
  }
  let countryList;

  if (countriesToShow.length === 1) {
    countryList = () => countriesToShow.map(country =>
          <div key={country.name}>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            <ul>
              {country.languages.map(value =>
              <li key={value.iso639_1}>{value.name}</li>)}
            </ul>
            <img src={country.flag} style={small} alt={`flag of ${country.name}`}/>
            <Weather country={country} weather={weather} setWeather={setWeather}/>
          </div>
      );
  } else {
    countryList = () => countriesToShow.map(country =>
        <div key={country.name}>
          {country.name} <button onClick={handleButtonClick.bind(this, country.name)} value={country.name}>show</button>
        </div>
    );
  }

  const handleButtonClick = (props) => {
    setFilterValue(props);
  };

  return (
      <div>
        {countryList()}
      </div>
  )

};

const Weather = ({country, weather, setWeather}) => {
  //console.log('sääpropsi',props.value);
  const url = 'http://api.weatherstack.com/current?access_key=3af74978960c2a744ba2372d42673f6a&query=' + country.capital;
  //console.log('url', url);

  
  useEffect(() => {
    axios
    .get(url)
    .then(response => {
      setWeather(response.data)
      console.log('response data',response.data);

    })
        .catch(error => {
          console.log("ERROR", error);

    })
  }, []);

  if(weather.current) {
    return (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>temperature {weather.current.temperature}º Celsius</p>
          <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]}/>
          <p>wind: {weather.current.wind_speed} kph direction {weather.current.wind_dir}</p>
        </div>
    )
  } else {
    return null;
  }
  };


export default App;


/*
apixu api key f3ad331331d346b71640eb5c75a84409
 */