 import React, { useState } from 'react';
import './weather.css';
import search_icon from '../assets/search.png';
import clear from '../assets/clear.png';
import humidity from '../assets/humidity.png';
 
import wind from '../assets/wind.png';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=16b0719a3418d4680e3f31e4bc14bd7a&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();  
    search(city);        
  };

  return (
    <div className='weather'>
      <div className='search-bar'>
        <form onSubmit={handleSearch}>
          <input 
            type='text' 
            placeholder='Search city' 
            value={city}
            onChange={(e) => setCity(e.target.value)}  
          />
          <button type='submit'>
            <img src={search_icon} alt='search icon' />
          </button>
        </form>
      </div>
      {weatherData && weatherData.main && (
        <>
          <img src={clear} className="weather-icon" alt="clear weather" />
          <p className='temp'>{weatherData.main.temp}°C</p>
          <p className='place'>{weatherData.name}</p>
          <div className='data'>
            <div className='col'>
              <img src={humidity} alt="humidity icon" />
              <div>
                <p>{weatherData.main.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind} alt="wind icon" />
              <div>
                <p>{weatherData.wind.speed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
