import React,{useState, useEffect} from 'react';
import axios from 'axios'
const DisplayWeather = ({country,capital}) =>{
    const [weather, setWeather] = useState('')

    const api_key = process.env.REACT_APP_API_KEY
   useEffect( ()=>{
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country}`)
    .then(response=>{
        setWeather(response.data.current)
        console.log(response.data)
    })
  },[api_key, country])
  if(weather.temperature){
    const {temperature,feelslike,humidity,weather_icons,weather_descriptions,wind_speed} = weather
    return (
        <div>
            <h2> Weather in {capital}</h2>
    <p><strong>Temparature</strong> {temperature}</p>
    <p><strong>Feelslike</strong> {feelslike}</p>
    <p><strong>Humidity</strong> {humidity}</p>
    <img src={weather_icons} alt="weather_icons"/>
    <p><strong>Wind_speed</strong> {wind_speed}</p>
    <p><strong>Weather_descriptions</strong> {weather_descriptions[0]}</p>
    
        </div>
    )

  }
  return <p>No data Available</p>

   
}
export default DisplayWeather
