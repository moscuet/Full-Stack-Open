import React,{useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import Countries from './components/Countries'
function App() {
  const [countries, setCountries]=useState([])
  const [search, setSearch]=useState([])

useEffect( ()=>{
  axios.get('https://restcountries.eu/rest/v2/all')
  .then(response=>{
    setCountries(response.data)
  })
},[])

const handleChange =(e)=>{
  let filteredCountries = countries.filter( country =>country.name.toUpperCase().includes(e.target.value.toUpperCase()))
  setSearch(filteredCountries)
}
const updateSearchState = (newCountry) => {
  setSearch(newCountry)
}

if(countries){
  return (
    <div className="App">
      <h2>Type country name</h2>
      <input onChange = {handleChange}/>
      <div id= 'display'>
      <Countries countries = {search} updateSearchState={updateSearchState}/>
      </div>
    </div>
  );
}
}

export default App;
