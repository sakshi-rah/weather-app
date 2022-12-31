import { useState, useEffect } from 'react';
import axios from 'axios';

import "./App.css"

import ImgCityIcon from "./smart-city-icon.png"

function App() {
  const [city, setCity] = useState("Nagpur");
  const [temp, setTemp] = useState(0);
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    async function loadData() {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cdfb48f4614b10953b585539b4474103`)
      console.log(response);
      if (response.status === 200) {
        const temp = `${response.data.main.temp - 273.15}°C`;
        setTemp(Math.round(temp))
        console.log(temp);
      }
      else {
        console.log("Error")
      }
      /*
      const description = response.weather[0].description;
      setDescription(description);

      const humidity = response.main.humidity;
      setHumidity(Math.round(humidity));

      const country = response.sys.country;
      setCountry(country);
      console.log(country);
*/

    }
    loadData();
  }, { city })

  return (
    <div>
      <h1 className='app-title'>Weather App</h1>

      <div className='search-container'>
        <img className='container-icon' src={ImgCityIcon} />
        <input className='input-city' type="text" placeholder='Enter city name' 
        value={city} onChange={(e) => setCity(e.target.value)} />
      </div>

      <div className='main-container'>
        <h3>City : {city}</h3>
        <h3>Temperature : {temp}</h3>
        
        <h3>Description : {description}</h3>
        <h3>Humidity : {humidity}</h3>
        <h3>Country : {country}</h3>
      </div>

    </div>
  )
}

export default App