import axios from "axios";
import React, { useEffect, useState } from "react";
import Clock, {} from 'react-clock';
import 'react-clock/dist/Clock.css';
export default function WeatherWidget() {
  const [data,setData] = useState({});
  const [clockState,setClockState] = useState();
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=hammam-lif&appid=797b49ff5173555891589273bac8914b&units=metric"
  

  useEffect(() => {
    getWeather();
    const interval  =setInterval(()=>{
   const date = new Date();
  setClockState(date.toLocaleTimeString());
 }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [])
  
  const getWeather=()=>{
    axios.get(apiUrl)
    .then((response) => {
      setData(response.data);
    })
  }
  return (

    <div className="weather">
      <div className="weatherCard">
        <div className="currentTemp">
        {data.main ?   <span className="temp">{data.main.temp.toFixed(0)}&deg; C </span>:null}
          <span className="location">{data.name}</span>
        </div>
        <div className="currentWeather">
          <div className="conditions">  {clockState}</div>  <div style={{position:"absolute",left:"16%"}}><Clock  value={clockState} size={120} renderNumbers={true}/></div>
          <div className="info">
          {data.main ? <span className="rain">{data.main.humidity}% <span className="miniTitle">Humidity</span></span>:null}
          {data.wind ? <span  className="wind">{data.wind.speed} <span className="miniTitle">MPH</span></span>:null}
            
          </div>
        </div>
        <div className="clouds">
        {data.weather ? <span>
          {data.weather[0].description} <img   src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weathericon"/> </span>:null}
        </div>
      </div>
      </div>
   




  );
}