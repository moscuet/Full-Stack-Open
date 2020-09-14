import React from 'react'
const Persons = ({persons,del}) =>{
    const personsList = persons.map( (person,i) =><li key = {`${i}-${person.name}`}>{person.name} {person.number} <button key={`btn-${i}`} onClick= {()=> del(person.id)}>delet</button></li>)
     return(
      <ul>{personsList}</ul>
     )
   }
export default Persons