
import React from 'react'
const Display =({props})=>{
    const {name,capital,population,flag,langList} =props
    return (
        <div>
          <h2>{name}</h2>
          <p>{capital}</p>
          <p>{population}</p>
          <h3>Spoken languages</h3>
          <ul style = {{listStyle:"none"}}>
            {langList}
          </ul>
          <img src={flag} alt="flag"/>
        </div>
    )
}
export default Display