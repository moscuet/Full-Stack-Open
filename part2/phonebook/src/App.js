import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
const App = () => {
//state
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState(persons)
 //handle
  const changeNameHandle = (e) =>setNewName(e.target.value)
  const changeNumberHandle = (e) =>setNewNumber(e.target.value)
  const searchHandle = (e) =>{
    let filteredArr = persons.filter( a => a.name.toUpperCase().includes(e.target.value.toUpperCase()))
    setSearch(filteredArr)
  }

  const isExist = () =>persons.filter(person => newName === person.name).length>0

  const submitHandle = (e) => {
    e.preventDefault()
    if(newName.length>0){
      if(isExist()){
        window.alert(`${newName} is already added to phonebook`) 
        }
        else {
          setPersons(persons.concat({name:newName,number:newNumber}))
          setSearch(persons.concat({name:newName,number:newNumber}))
        }
        setNewName('')
        setNewNumber('')
    }
    else document.getElementById('message').textContent = 'Please enter a name'
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchHandle = {searchHandle}/>
      <h3>Add a new</h3>
      <PersonForm submitHandle ={submitHandle} changeNameHandle= {changeNameHandle} changeNumberHandle = {changeNumberHandle} newName ={newName} newNumber = {newNumber} />
      <h2>Numbers</h2>
       <p id ='message'></p>
       <Persons persons ={search}/>
    </div>
  )
}
export default App