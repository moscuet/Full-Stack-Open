import React from 'react'
const Persons = ({persons}) =>{
    const personsList = persons.map( (person,i) =><li key = {i+person.name}>{person.name} {person.number}</li>)
     return(
      <ul>{personsList}</ul>
     )
   }
export default Persons