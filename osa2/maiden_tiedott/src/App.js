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

  console.log(filterValue);
  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filterValue));
  console.log('countriesTOSHOW', countriesToShow);

  const Weather = (props) => {
    //console.log('sääpropsi',props.value);
    const url = 'http://api.weatherstack.com/current?access_key=f3ad331331d346b71640eb5c75a84409&query=' + props.value;
    //console.log('url', url);

    useEffect(() => {
      axios
      .get(url)
      .then(response => setWeather(response.data))
    }, []);

    console.log(weather);
    return (
        <div>
          <h3>Weather in {props.value}</h3>
          <p>temperature {weather.temperature}</p>
        </div>
    )
  };

  const small = {
    height: '100px'
  };

  if(countriesToShow.length > 10) {
    console.log('enempi ku 10');
    return (
        <div>
          Too many matches, please specify search criteria!
        </div>
    )
  }
  let countryList;

  if (countriesToShow.length === 1) {
    console.log('vain 1')
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
            {/*<Weather value={country.capital}/>*/}
          </div>
      );
  } else {
    console.log('muut määrät maita')
    countryList = () => countriesToShow.map(country =>
        <div key={country.name}>
          {country.name} <button onClick={handleButtonClick.bind(this, country.name)} value={country.name}>show</button>
        </div>
    );
  }

  const handleButtonClick = (props) => {
    console.log(props);
    setFilterValue(props);
  };

  console.log('SÄÄ ',weather);

  return (
      <div>
        {countryList()}
      </div>
  )

};

export default App;


/*
apixu api key f3ad331331d346b71640eb5c75a84409
 */