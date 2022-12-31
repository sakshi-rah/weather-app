import { useState, useEffect } from 'react';
import axios from 'axios';

import "./App.css"

import ImgCityIcon from "./city-icon.png"
import ImgCity from "./icon/city.png"
import ImgTemp from "./icon/temp.png"
import ImgHumidity from "./icon/humidity.png"
import ImgDesc from "./icon/desc.png"
import ImgCountry from "./icon/country.png"


function App() {
  const [city, setCity] = useState("Tumsar");
  const [temp, setTemp] = useState(0);
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState("");
  const [country, setCountry] = useState("");


  useEffect(() => {
    async function loadData() {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cdfb48f4614b10953b585539b4474103`)
      if (response.status === 200) {
        const temp = `${(Math.round(response.data.main.temp - 273.15))}°C`;
        setTemp(temp)
      }
      else {
        console.log("Error")
      }

      const description = response.data.weather[0].description;
      setDescription(description);

      const humidity = response.data.main.humidity;
      setHumidity(humidity);

      const country = response.data.sys.country;
      setCountry(country);



    }
    loadData();
  }, [city])

  return (
    <>
      <div className='app-title mb-4 mt-2'>
        <h1 className='app-title'>Weather App</h1>
      </div>
      <div className='search-container'>
        <img className='container-icon' src={ImgCityIcon} />
        <input className='input-city' type="text" placeholder='Enter city name'
          value={city} onChange={(e) => setCity(e.target.value)} />
      </div>

      <div className='main-container'>
        <div className='container-item'>
          <div className='container-style'> <img src={ImgCity} className='img-item'/> <h3>City : {city}</h3> </div>
          <div className='container-style'> <img src={ImgTemp} className='img-item'/> <h3>Temperature :  {temp}</h3></div>
        </div>

        <div className='container-item'>
          <div className='container-style'> <img src={ImgHumidity} className='img-item'/> <h3>Humidity : {humidity}</h3></div>
          <div className='container-style'> <img src={ImgDesc} className='img-item'/> <h3>Description : {description}</h3></div>
        </div>
        <div className='container-item'>
          <div className='container-style'> <img src={ImgCountry} className='img-item'/> <h3>Country :  {country}</h3></div>
        </div>

      </div>
    </>

  )
}

export default App