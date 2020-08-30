import React from 'react'
import DisplayCountry from './DisplayCountry'
import DisplayWeather from './DisplayWeather'
const Countries = ({countries,updateSearchState}) =>{
    
    const clickHandle =(e)=>{
      let country = countries.filter( country => country.name===e)[0]
       updateSearchState([country])
    }

    if(countries.length>10) return <p style ={{color:'red'}}>too many matches, specify another filter</p>
    else if(countries.length>1){
      let countriesList = countries.map( country => <li key ={country.name}>{country.name} <button onClick={ ()=> clickHandle(country.name)} > view</button></li>)
   return(
     <ul style ={{listStyleType:' none'}}>
       {countriesList}
     </ul>
   )
    }
    else if(countries.length===1){
      let langs = countries[0].languages.map( lang=>lang.name)
      let langList = langs.map((lang,index) => {
        return <li key={index+lang}>{lang}</li>
      })
      const {name,capital,population,flag} = countries[0]
      return(
        <> 
        <DisplayCountry props ={{name,capital,population,flag,langList}} />
        <DisplayWeather country = {name} capital={capital}/>
        </>

      )
    }
    else{
      return <p style ={{color:'red'}}>No matches</p>
    }
  }
export default Countries  