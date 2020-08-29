import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
const App = () => {
//state
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setSearch(response.data)
      })
  }, [])
  


 //handle
  const changeNameHandle = (e) =>{
    setNewName(e.target.value)
    document.getElementById('message').textContent = ''

  }
  const changeNumberHandle = (e) =>setNewNumber(e.target.value)
  const searchHandle = (e) =>{
    console.log(persons)
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
    <div style={{margin:'20px'}}>
      <h2>Phonebook</h2>
      <Filter searchHandle = {searchHandle}/>
      <h3>Add a new</h3>
      <PersonForm submitHandle ={submitHandle} changeNameHandle= {changeNameHandle} changeNumberHandle = {changeNumberHandle} newName ={newName} newNumber = {newNumber} />
      <h2>Numbers</h2>
       <p id ='message' style={{color:'red'}}></p>
       <Persons persons ={search}/>
    </div>
  )
}
export default App